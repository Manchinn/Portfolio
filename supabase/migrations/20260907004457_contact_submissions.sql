-- Public contact / lead capture submissions.
create type public.contact_submission_status as enum ('new', 'in_progress', 'resolved', 'spam');

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 1 and 200),
  email text not null check (length(trim(email)) between 3 and 320),
  company text check (company is null or length(trim(company)) <= 200),
  budget text check (budget is null or length(trim(budget)) <= 100),
  message text not null check (length(trim(message)) between 1 and 5000),
  locale public.content_locale not null default 'en',
  status public.contact_submission_status not null default 'new',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  handled_by uuid references auth.users(id) on delete set null,
  handled_at timestamptz
);

create index contact_submissions_status_created_at_idx
  on public.contact_submissions (status, created_at desc);

create trigger contact_submissions_set_updated_at
before update on public.contact_submissions
for each row execute function public.set_updated_at();

alter table public.contact_submissions enable row level security;

-- Anonymous visitors may submit a new lead, but cannot choose its lifecycle status.
create policy contact_submissions_public_insert
on public.contact_submissions for insert
to anon, authenticated
with check (status = 'new');

create policy contact_submissions_editor_read
on public.contact_submissions for select
to authenticated
using (public.is_editor());

create policy contact_submissions_editor_update
on public.contact_submissions for update
to authenticated
using (public.is_editor())
with check (public.is_editor());

create policy contact_submissions_owner_delete
on public.contact_submissions for delete
to authenticated
using (public.is_owner());
