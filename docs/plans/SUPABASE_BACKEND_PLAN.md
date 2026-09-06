# Supabase Backend Plan

> Status: Phase 1 implementation in progress. The public site remains an Astro 5 static build while the Supabase schema and import path are verified.

## Goal

Add a private content-management backend for projects, notes, and runbooks while keeping the public portfolio fast, cacheable, bilingual, and free of visitor tracking or contact intake.

The backend is for the owner and editors. It is not a public application API and it does not need to store visitor profiles, contact briefs, or analytics events.

## Target architecture

```text
Editor
  |
  v
Admin app (authenticated runtime)
  |
  v
Supabase Auth + Postgres (+ Storage only when media needs it)
  |
  | publish event / deploy hook
  v
Astro build -> static HTML, sitemap, OG pages -> CDN
```

- Supabase Postgres is the source of truth for published content after migration.
- The public Astro site reads only published records during `astro build` and emits static pages.
- The public site does not query Supabase in the browser, so page visits do not create a runtime dependency or tracking stream.
- The admin surface should be a separate runtime app or a first version using Supabase Studio. Do not convert the public Astro site to SSR just to host the dashboard.

## Content model

Use typed tables instead of one unstructured JSON document. Each entity has one shared record and one translation row per locale.

### `articles`

- `id` UUID primary key
- `slug` text, unique and stable
- `status` enum: `draft`, `review`, `published`, `archived`
- `published_at` timestamptz nullable
- `created_at`, `updated_at` timestamptz
- `created_by`, `updated_by` UUID references `auth.users`

### `article_translations`

- `article_id` UUID foreign key with cascade delete
- `locale` enum: `en`, `th`
- `title`, `description`, `body_markdown`
- `seo_title`, `seo_description`
- `reading_time_minutes` integer nullable
- composite primary key: (`article_id`, `locale`)

Projects use the same shape with `projects` and `project_translations`, plus typed fields for `category`, `date`, and the `problem`, `built`, and `result` case-study sections.

Add `tags` and a join table only when filtering or related-content navigation needs them. Keep media in the repository at first; add a private Supabase Storage bucket only when the admin workflow needs uploaded figures or OG assets.

## Bilingual publishing rule

An article or project cannot move to `published` unless both `en` and `th` translations exist and pass validation. Enforce this in two places:

1. An application-level validation in the admin editor for useful feedback.
2. A database function or publish transaction that rejects an incomplete pair.

This prevents the static build from producing an English page with a missing Thai counterpart, or the reverse. Slugs remain shared across locales and continue to be derived from the entity record rather than stored as locale-specific frontmatter.

## Auth and authorization

- Use Supabase Auth with an allowlist of owner/editor email addresses.
- Store the role in `app_metadata`, not user-editable profile data.
- Protect every admin route on the server and redirect unauthenticated users before loading editor data.
- Use Row Level Security on every content table.
- Anonymous users can read published records only if the build process uses the public key.
- Editors can create and edit `draft` and `review` records.
- Only the owner/admin role can publish or archive records.
- Never put `SUPABASE_SERVICE_ROLE_KEY` in browser code or `PUBLIC_*` variables.

If the first build integration runs in CI with a server-only key, keep that key in the deployment secret store and make the build query explicitly select `status = 'published'`. A public anon-key build with a matching read policy is also acceptable and reduces secret exposure.

## Publishing workflow

1. Create or edit an article/project as `draft`.
2. Complete both EN and TH translations and run the parity validator.
3. Move the record to `review` for a content check.
4. An owner publishes it. The publish transaction sets `published_at` and `updated_at`.
5. Supabase sends a webhook or the admin calls a Vercel/GitHub deploy hook.
6. The Astro build fetches published records, generates `/notes/`, `/th/notes/`, and the project pages, then deploys the static output.
7. A failed build leaves the previous deployment live and reports the failure to the owner.

The public site should not depend on a live Supabase request after deployment. A database outage must not take down already-published pages.

## Migration path

### Phase 0: current state

Keep the existing `src/content/projects/{en,th}` and `src/content/articles/{en,th}` collections as the build source. Remove claims from public copy that would become misleading once the backend exists.

### Phase 1: schema and seed

- Create Supabase migrations for enums, tables, indexes, timestamps, and RLS. The first migration is in `supabase/migrations/`.
- Write an import script that reads the current Astro collections and inserts both locales. The first importer is `scripts/supabase/import-content.mjs`.
- Add a parity check for slugs, required fields, and EN/TH completeness. The importer fails before writing when a locale pair is incomplete.
- Seed one article and one project in a non-production Supabase project.

### Phase 2: editorial workflow

- Start with Supabase Studio if a custom admin is not yet needed.
- Build a separate admin app only after the schema and publishing workflow are stable.
- Add markdown editing, preview, status transitions, bilingual validation, and a publish action.

### Phase 3: static build integration

- Replace the collection loader with a typed Supabase build loader behind one adapter.
- Keep the existing page components and route shape unchanged.
- Add build-time fallback or a clear build error during the migration window; do not silently publish an empty site.
- Trigger a preview build for review and a production build only after publish.

### Phase 4: hardening

- Add database backups and test restoring a backup.
- Add an audit table for publish/archive actions without storing visitor activity.
- Rotate keys, enforce MFA for the owner, and review RLS with a negative test suite.
- Add rate limits only to authenticated admin actions if the chosen admin host requires them.

## Recommended first implementation slice

The smallest useful backend milestone is:

1. Supabase project plus migrations for `articles`, `article_translations`, `projects`, and `project_translations`.
2. RLS policies and the EN/TH publish constraint.
3. A seed/import script from the current content collections.
4. A typed build loader used only in a staging build.
5. A deploy hook triggered manually after a successful content review.

This proves the data model and static publishing path before spending time on a full admin UI.

## Acceptance criteria

- The public routes remain static and pass `npm run build` without a runtime database request.
- Published content is available in both `/` and `/th/` route families with matching slugs.
- A record with only one locale cannot be published.
- Anonymous users cannot read drafts, review records, audit data, or editor metadata.
- No visitor profile, contact intake, analytics event, or tracking script is added.
- A failed Supabase/build operation does not remove the last successful public deployment.
- `npx astro check` and `npm run build` remain required gates for each implementation step.

## Decisions to confirm before implementation

- Whether Supabase Studio is enough for the first editorial workflow or a separate admin app is needed immediately.
- Whether Markdown remains the authoring format or the editor should use a structured rich-text format.
- Whether project and note media should stay in Git or move to Supabase Storage.
- Whether publishing should trigger Vercel directly or dispatch a GitHub Actions build.
