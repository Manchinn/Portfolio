create extension if not exists pgcrypto;

create type public.content_status as enum ('draft', 'review', 'published', 'archived');
create type public.content_locale as enum ('en', 'th');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create table public.article_translations (
  article_id uuid not null references public.articles(id) on delete cascade,
  locale public.content_locale not null,
  title text not null check (length(trim(title)) > 0),
  description text not null check (length(trim(description)) > 0),
  body_markdown text not null check (length(trim(body_markdown)) > 0),
  seo_title text,
  seo_description text,
  reading_time_minutes integer check (reading_time_minutes is null or reading_time_minutes > 0),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (article_id, locale)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  status public.content_status not null default 'draft',
  project_date text check (project_date is null or length(trim(project_date)) > 0),
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create table public.project_translations (
  project_id uuid not null references public.projects(id) on delete cascade,
  locale public.content_locale not null,
  title text not null check (length(trim(title)) > 0),
  description text not null check (length(trim(description)) > 0),
  category text not null check (length(trim(category)) > 0),
  tech text[] not null default '{}',
  highlights text[] not null default '{}',
  problem text,
  built text,
  result text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (project_id, locale)
);

create index articles_status_published_at_idx
  on public.articles (status, published_at desc);
create index projects_status_published_at_idx
  on public.projects (status, published_at desc);

create or replace function public.is_editor()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('owner', 'editor')
    or coalesce(auth.jwt() ->> 'role', '') = 'service_role';
$$;

create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'owner'
    or coalesce(auth.jwt() ->> 'role', '') = 'service_role';
$$;

create or replace function public.enforce_publish_permissions()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  locale_count integer;
begin
  if new.status in ('published', 'archived')
     and (tg_op = 'INSERT' or old.status is distinct from new.status)
     and not public.is_owner() then
    raise exception 'Only an owner can publish or archive content';
  end if;

  if new.status = 'published' then
    if tg_table_name = 'articles' then
      select count(*) into locale_count
      from public.article_translations
      where article_id = new.id;
    else
      select count(*) into locale_count
      from public.project_translations
      where project_id = new.id;
    end if;

    if locale_count <> 2 then
      raise exception 'Published content requires both en and th translations';
    end if;

    if new.published_at is null then
      new.published_at = timezone('utc', now());
    end if;
  end if;

  return new;
end;
$$;

create or replace function public.assert_translation_pair()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  parent_status public.content_status;
  parent_id uuid;
  locale_count integer;
begin
  if tg_table_name = 'article_translations' then
    parent_id = case when tg_op = 'DELETE' then old.article_id else new.article_id end;
    select status into parent_status from public.articles where id = parent_id;
    if parent_status = 'published' then
      select count(*) into locale_count
      from public.article_translations
      where article_id = parent_id;
    end if;
  else
    parent_id = case when tg_op = 'DELETE' then old.project_id else new.project_id end;
    select status into parent_status from public.projects where id = parent_id;
    if parent_status = 'published' then
      select count(*) into locale_count
      from public.project_translations
      where project_id = parent_id;
    end if;
  end if;

  if parent_status = 'published' and locale_count <> 2 then
    raise exception 'Published content requires both en and th translations';
  end if;

  return null;
end;
$$;

create trigger articles_set_updated_at
before update on public.articles
for each row execute function public.set_updated_at();

create trigger article_translations_set_updated_at
before update on public.article_translations
for each row execute function public.set_updated_at();

create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

create trigger project_translations_set_updated_at
before update on public.project_translations
for each row execute function public.set_updated_at();

create trigger articles_publish_guard
before insert or update on public.articles
for each row execute function public.enforce_publish_permissions();

create trigger projects_publish_guard
before insert or update on public.projects
for each row execute function public.enforce_publish_permissions();

create trigger article_translations_pair_guard
after insert or update or delete on public.article_translations
for each row execute function public.assert_translation_pair();

create trigger project_translations_pair_guard
after insert or update or delete on public.project_translations
for each row execute function public.assert_translation_pair();

alter table public.articles enable row level security;
alter table public.article_translations enable row level security;
alter table public.projects enable row level security;
alter table public.project_translations enable row level security;

create policy articles_public_read
on public.articles for select
to anon, authenticated
using (status = 'published');

create policy articles_editor_read
on public.articles for select
to authenticated
using (public.is_editor());

create policy articles_editor_insert
on public.articles for insert
to authenticated
with check (public.is_editor());

create policy articles_editor_update
on public.articles for update
to authenticated
using (public.is_editor())
with check (public.is_editor());

create policy articles_owner_delete
on public.articles for delete
to authenticated
using (public.is_owner());

create policy article_translations_public_read
on public.article_translations for select
to anon, authenticated
using (exists (
  select 1 from public.articles
  where articles.id = article_translations.article_id
    and articles.status = 'published'
));

create policy article_translations_editor_read
on public.article_translations for select
to authenticated
using (public.is_editor());

create policy article_translations_editor_write
on public.article_translations for insert
to authenticated
with check (public.is_editor());

create policy article_translations_editor_update
on public.article_translations for update
to authenticated
using (public.is_editor())
with check (public.is_editor());

create policy article_translations_editor_delete
on public.article_translations for delete
to authenticated
using (public.is_editor());

create policy projects_public_read
on public.projects for select
to anon, authenticated
using (status = 'published');

create policy projects_editor_read
on public.projects for select
to authenticated
using (public.is_editor());

create policy projects_editor_insert
on public.projects for insert
to authenticated
with check (public.is_editor());

create policy projects_editor_update
on public.projects for update
to authenticated
using (public.is_editor())
with check (public.is_editor());

create policy projects_owner_delete
on public.projects for delete
to authenticated
using (public.is_owner());

create policy project_translations_public_read
on public.project_translations for select
to anon, authenticated
using (exists (
  select 1 from public.projects
  where projects.id = project_translations.project_id
    and projects.status = 'published'
));

create policy project_translations_editor_read
on public.project_translations for select
to authenticated
using (public.is_editor());

create policy project_translations_editor_write
on public.project_translations for insert
to authenticated
with check (public.is_editor());

create policy project_translations_editor_update
on public.project_translations for update
to authenticated
using (public.is_editor())
with check (public.is_editor());

create policy project_translations_editor_delete
on public.project_translations for delete
to authenticated
using (public.is_editor());
