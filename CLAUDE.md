# CLAUDE.md

This file provides architecture and workflow guidance for coding agents working in this repository.

## Overview

A static-first bilingual (English + Thai) software engineering portfolio built with **Astro 5**, TypeScript, and Tailwind CSS 4. Content lives in **content collections**; language routing uses Astro's built-in i18n (`en` at `/`, `th` at `/th/`). Every public route uses the real **Fuwari** template shell, adapted for the portfolio's content and localized OG cards — see `DESIGN.md`.

Production is deployed on Vercel at `chinnakrit.dev` and `www.chinnakrit.dev` from the `master` branch (`vercel.json` pins the Astro framework).

The public site remains static-first: published content is read from **Supabase Postgres** at build time (publishable/anon key only; RLS restricts anonymous reads to `published` rows) with a fallback to local content collections when the database is unreachable. Editing happens in the authenticated `/admin` SPA (Supabase Auth + RLS) and the public contact form posts to the `submit-contact` Edge Function. No service-role secret lives in the repo or the bundle, and no runtime environment variables are required.

## Architecture

```text
src/
  content.config.ts                 Content collection schemas + entrySlug() helper
  content/
    projects/{en,th}/               JSON project records (per locale) — populated
    articles/{en,th}/               Markdown notes/runbooks (per locale) — curated public content
  i18n/
    ui.ts                           All EN/TH chrome + marketing copy (getUI)
    utils.ts                        Locale helpers
  layouts/
    BaseLayout.astro                HTML shell, metadata, OG/Twitter meta, hreflang, self-hosted fonts
    Layout.astro                    Fuwari body state and banner geometry
    MainGridLayout.astro            Shared Fuwari navbar/banner/sidebar/grid/footer/TOC
  pages/
    index.astro                     English portfolio home (/)
    th/index.astro                  Thai portfolio home (/th/)
    404.astro
    admin/index.astro               Owner-only admin SPA (Supabase Auth + RLS)
  lib/
    supabase.ts                     Publishable-key Supabase clients (browser + build)
    cms.ts                          Build-time CMS loader (Supabase → local fallback)
  components/
    Navbar.astro                    Fuwari navbar, search, theme, and menu controls
    Footer.astro                    Fuwari footer and attribution
    widget/                         Profile, categories, tags, TOC, display settings
    PostCard.astro                  Fuwari-style note card
    PortfolioHome.astro             Portfolio composition inside the Fuwari shell
    home/                           Hero, Work, Capabilities sections
    ui/                             Remaining portfolio primitives and legacy helpers
    motion/Reveal.astro             Hero-only stagger (reduced-motion aware)
    motion/ScrollMotion.astro       Lenis + ScrollTrigger runtime (all routes)
  styles/
    global.css                      Tailwind v4 @theme tokens + Fuwari theme recipes
public/
  fonts/                            Self-hosted woff2 (Courier Prime, Noto Sans Thai) + fonts.css
  og/                               Static OG cards per locale (og-en.png, og-th.png, 1200x630)
scripts/
  og/                               OG card templates + render.sh (isolated Edge headless)
  fetch-fonts.py                    Downloads woff2 subsets + generates fonts.css
scripts/supabase/
  import-content.mjs                One-shot importer: Astro collections → Supabase (parity-checked)
supabase/
  migrations/                       Content schema, contact_submissions, deploy-hook triggers
  functions/submit-contact/         Edge Function: contact intake (origin allowlist, honeypot, rate limit)
astro.config.mjs                   site, static output, i18n routing, integrations
vercel.json                         Vercel Astro framework + build/output
```

## Route and Data Flow

- `/` renders the English home; `/th/` renders the Thai home.
- The `Work` section renders project records from the `projects` collection and shows a graceful empty state while it is empty.
- `/notes/` and `/th/notes/` list curated notes; localized `/notes/[slug]/` detail routes are generated from the articles collection.
- `/admin/` is the owner-only SPA: contact-submissions inbox plus projects/articles editing (translations and status transitions). Authorization is enforced server-side by RLS functions `is_editor()`/`is_owner()` reading `auth.jwt() -> 'app_metadata' ->> 'role'`.
- The contact form posts to the `submit-contact` Edge Function; submissions land in `contact_submissions` (anon can insert `status='new'` only; editors read/update; owner deletes).
- Publishing requires both EN and TH translations (database-enforced); publish/archive actions are owner-only.
- Publishing/unpublishing or editing live content fires deploy-hook triggers (`supabase/migrations/20260907090000_deploy_hook_trigger.sql`) that rebuild Vercel, so production updates within ~1 minute. The hook URL lives only in the Supabase Vault (`vercel_deploy_hook_url`).

## Configuration

- `astro.config.mjs` sets `output: 'static'`, `site: 'https://www.chinnakrit.dev'`, i18n routing with `prefixDefaultLocale: false`, and integrates React, sitemap, and Tailwind v4.
- `vercel.json` pins the Vercel framework to `astro` with `npm run build` and `dist` output.
- No application runtime environment variables. The Supabase publishable key is hardcoded in `src/lib/supabase.ts` by design (public by nature; RLS is the guard).

## Commands

```sh
npm run dev        # astro dev — http://localhost:4321
npm run build      # astro build — the implementation gate
npx astro check    # TypeScript diagnostics (expect 0 errors)
npm run preview    # serve the built dist/
```

## Editing Rules

- Keep the public site static-first; do not convert it to SSR and do not add runtime secrets or a new runtime data store without explicit approval.
- Update both English and Thai content when changing user-facing copy or records.
- Content lives in content collections; chrome/marketing copy lives in `src/i18n/ui.ts`.
- The existing contact intake is minimal by design: no analytics, no visitor profiles, no tracking. Do not expand it without explicit product approval.
- Never publish secrets, private URLs, personal data, or internal operational details.
- Review user changes before editing; do not overwrite unrelated work.

## Agent Workflow

- `AGENTS.md` contains the shared repository rules.
- GitHub Issues are the project tracker; supporting agent docs live under `docs/agents/`.
- Vercel auto-deploys production from `master`; pushing or changing deployment settings requires explicit user approval.
- Production is served by the single Vercel project `portfolio` (the duplicate `frontend` project was deleted 2026-09-07); its `cms-publish` deploy hook is what the Supabase triggers call.
