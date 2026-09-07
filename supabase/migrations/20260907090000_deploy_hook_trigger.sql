-- Vercel deploy hook: rebuild the static site when published content changes.
--
-- Fires when:
--   1. a project/article row enters or leaves 'published' (status flip), or
--   2. a translation row of a currently-'published' project/article changes
--      (title/description/body edits of live content).
--
-- The hook URL is read from the Supabase Vault (secret name:
-- 'vercel_deploy_hook_url') at fire time, so the secret never appears in
-- migration files or SQL history. If the secret is absent, publishing still
-- works — the rebuild is simply skipped (fail-open by design; the site keeps
-- its last good static output until a manual rebuild).

create extension if not exists pg_net;

-- Parent tables: fire only on transitions into/out of 'published'.
create or replace function public.notify_deploy_hook_parent()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  hook_url text;
begin
  if tg_op <> 'UPDATE' then
    return null;
  end if;
  if (old.status = 'published') = (new.status = 'published') then
    return null;
  end if;

  select decrypted_secret into hook_url
  from vault.decrypted_secrets
  where name = 'vercel_deploy_hook_url'
  limit 1;

  if coalesce(hook_url, '') = '' then
    return null;
  end if;

  perform net.http_post(
    url := hook_url,
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object(
      'type', tg_op,
      'table', tg_table_name,
      'slug', new.slug,
      'status', new.status
    ),
    timeout_milliseconds := 5000
  );

  return null;
end;
$$;

-- Translation tables: fire when live ('published') content is edited.
create or replace function public.notify_deploy_hook_translation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  hook_url text;
  parent_status text;
begin
  if tg_table_name = 'article_translations' then
    select status into parent_status from public.articles where id = new.article_id;
  else
    select status into parent_status from public.projects where id = new.project_id;
  end if;

  if parent_status is distinct from 'published' then
    return null;
  end if;

  select decrypted_secret into hook_url
  from vault.decrypted_secrets
  where name = 'vercel_deploy_hook_url'
  limit 1;

  if coalesce(hook_url, '') = '' then
    return null;
  end if;

  perform net.http_post(
    url := hook_url,
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object(
      'type', tg_op,
      'table', tg_table_name,
      'locale', new.locale
    ),
    timeout_milliseconds := 5000
  );

  return null;
end;
$$;

drop trigger if exists deploy_hook_articles on public.articles;
create trigger deploy_hook_articles
after update on public.articles
for each row execute function public.notify_deploy_hook_parent();

drop trigger if exists deploy_hook_projects on public.projects;
create trigger deploy_hook_projects
after update on public.projects
for each row execute function public.notify_deploy_hook_parent();

drop trigger if exists deploy_hook_article_translations on public.article_translations;
create trigger deploy_hook_article_translations
after insert or update on public.article_translations
for each row execute function public.notify_deploy_hook_translation();

drop trigger if exists deploy_hook_project_translations on public.project_translations;
create trigger deploy_hook_project_translations
after insert or update on public.project_translations
for each row execute function public.notify_deploy_hook_translation();
