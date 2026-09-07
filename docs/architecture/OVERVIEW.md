# Portfolio Architecture Overview

> Current as of 2026-09-07. Describes the Astro 5 static portfolio using the Fuwari template shell.

## System Summary

This repository is a static-first bilingual (EN/TH) portfolio built with
**Astro 5**, TypeScript, Tailwind CSS 4, and the real
[Fuwari](https://github.com/saicaca/fuwari) layout pattern. Fuwari supplies the
shared blog shell and controls; portfolio-specific sections consume the
existing projects and articles content collections. The public output is fully
static with no required runtime environment variables. The only runtime
services are Supabase Postgres (build-time published-content reads via the
publishable key, the owner-only `/admin` SPA, and the `submit-contact` Edge
Function) plus the Vercel deploy hook that rebuilds production on publish.

```text
Browser
  |
  v
Astro (static build output in /dist)
  |
  +-- src/pages/index.astro             English home (/)
  +-- src/pages/th/index.astro          Thai home (/th/)
  +-- src/pages/notes/                  English archive + detail pages
  +-- src/pages/th/notes/               Thai archive + detail pages
  |      |
  |      +-- src/layouts/BaseLayout.astro       HTML shell and metadata
  |      +-- src/layouts/Layout.astro           Fuwari body/banner state
  |      +-- src/layouts/MainGridLayout.astro   Shared Fuwari page grid
  |      +-- src/components/Navbar.astro        Navbar and controls
  |      +-- src/components/widget/             Profile, categories, tags, TOC
  |      +-- src/components/PostCard.astro      Archive/home note cards
  |      +-- src/components/PortfolioHome.astro Portfolio composition
  |      +-- content collections                 Projects and localized notes
```

## Current Route Model

| Route | Primary files | Runtime role |
|-------|---------------|--------------|
| `/` | `src/pages/index.astro`, `src/components/PortfolioHome.astro` | Static English Fuwari portfolio home. |
| `/th/` | `src/pages/th/index.astro`, `src/components/PortfolioHome.astro` | Static Thai Fuwari portfolio home. |
| `/work/`, `/th/work/` | `src/pages/work/index.astro`, `src/pages/th/work/index.astro` | Static project archive using the shared Fuwari shell. |
| `/work/[slug]`, `/th/work/[slug]` | `src/pages/work/[slug].astro`, `src/pages/th/work/[slug].astro` | Localized static project detail routes. |
| `/posts/` | `src/pages/posts/index.astro` | English notes/runbook archive. |
| `/th/posts/` | `src/pages/th/posts/index.astro` | Thai notes/runbook archive. |
| `/posts/[slug]/` | `src/pages/posts/[slug].astro` | Generated English note detail. |
| `/th/posts/[slug]/` | `src/pages/th/posts/[slug].astro` | Generated Thai note detail. |
| `/about/`, `/th/about/` | `src/pages/about/index.astro`, `src/pages/th/about/index.astro` | Localized about pages. |
| `/archive/`, `/th/archive/` | `src/pages/archive/index.astro`, `src/pages/th/archive/index.astro` | Localized archive pages. |
| `/admin/` | `src/pages/admin/index.astro` | Owner-only SPA (Supabase Auth + RLS; content editing + submissions inbox). |
| `/sitemap-index.xml` | `@astrojs/sitemap` | Static sitemap. |

All public routes render through `MainGridLayout.astro`. Home pages insert the
portfolio hero, Work, and Capabilities sections; archive and detail pages use
the same Fuwari navbar, banner, sidebar, footer, and theme controls.

**Retired routes (not in tree):** `/saas`, `/work-with-me`,
`/article/[slug]`.

## Key Architecture Decisions

| Decision | Current choice | Trade-off |
|----------|----------------|-----------|
| Rendering model | Static SSG with per-locale pages | Fast, cacheable, SEO-friendly; content changes require a rebuild. |
| Template shell | Fuwari layout adapted in `src/layouts/` and `src/components/` | Reuses a proven blog interaction model while keeping portfolio content ownership local. |
| Content source | `projects` and `articles` collections + Supabase Postgres at build time (`src/lib/cms.ts`, local fallback) + `src/i18n/ui.ts` | Published rows are built into static HTML; a DB outage never takes down live pages. |
| Language model | Astro i18n (`en` at `/`, `th` at `/th/`) | Separate locale URLs support clear navigation and metadata. |
| Shared shell | `MainGridLayout.astro` around every public page | One navbar/sidebar/footer behavior across home, archive, and detail routes. |
| Styling | Tailwind CSS 4 + Fuwari theme tokens in `src/styles/global.css` | Centralized light/dark surfaces, hue control, cards, and responsive layout. |
| Interactive controls | Astro controls plus Svelte + React islands | Small client islands for search, theme, hue, menu, TOC, and back-to-top. |

## Data Flow

```text
Build-time content (en/th)
  cms.ts -> Supabase published rows (RLS) -> fallback local collections
    -> page.astro -> PortfolioHome -> MainGridLayout
      -> ui = getUI(lang) from src/i18n/ui.ts
      -> Work, Capabilities, Contact, and PostCard render static HTML

Notes (en/th)
  pages/posts/[slug].astro -> localized article entry -> Markdown -> static HTML

Work (en/th)
  pages/work/index.astro -> project index (Fuwari style)
  pages/work/[slug].astro -> localized project detail (Problem -> Built -> Result)

Contact intake (runtime, minimal)
  home Contact form -> submit-contact Edge Function -> contact_submissions
    -> owner-only /admin inbox

Publish path
  /admin edit -> Supabase publish -> deploy-hook trigger -> Vercel rebuild (~1 min)
```

```text
Sitemap
  @astrojs/sitemap -> site + locale routes
```

## Cross-Cutting Concerns

### Public copy and privacy

Public copy must remain sanitized. The only contact path is the minimal home
form (`submit-contact` Edge Function → `contact_submissions` → `/admin`
inbox); do not expand it into analytics, visitor profiles, or tracking.

### Language support

English and Thai are active through Astro i18n. The navbar language link swaps
`/` and `/th/`; `BaseLayout.astro` emits the matching `lang`, canonical, and
hreflang metadata.

### Theme and interaction

`config.ts` sets the banner, profile, navigation, TOC, and default hue.
`Layout.astro` applies Fuwari banner geometry. `MainGridLayout.astro` handles
scroll thresholds for the navbar, TOC, and back-to-top control. Theme and hue
preferences are stored locally in the browser.

### Security and runtime

`astro.config.mjs` sets static output and the site URL. `vercel.json` pins the
Vercel framework to Astro with `npm run build` and `dist` output. No runtime
secrets or application environment variables are required. The Supabase
publishable key in `src/lib/supabase.ts` is public by design (RLS is the
guard); the Vercel deploy-hook URL lives only in the Supabase Vault, never in
code. `/admin` authorization is enforced server-side by RLS (`is_editor()` /
`is_owner()` on `app_metadata.role`).

### Verification

`npx astro check` should report 0 errors, warnings, and hints. `npm run build`
is the required static implementation gate; route smoke checks should cover
both locales plus post and work detail pages.

## File Map

```text
src/
  config.ts                         Fuwari site, profile, nav, banner, TOC config
  content.config.ts                 Content schemas + entrySlug() helper
  content/projects/{en,th}/         JSON project records
  content/articles/{en,th}/         Curated Markdown notes/runbooks
  i18n/ui.ts                        EN/TH chrome + marketing copy
  layouts/BaseLayout.astro          HTML shell, metadata, fonts, hreflang
  layouts/Layout.astro              Fuwari body state and banner geometry
  layouts/MainGridLayout.astro      Shared navbar/banner/sidebar/grid/footer/TOC
  components/Navbar.astro           Fuwari navbar, search, theme and menu controls
  components/Footer.astro           Fuwari footer and attribution
  components/widget/                Profile, categories, tags, TOC, display settings
  components/PostCard.astro         Fuwari-style note card
  components/PortfolioHome.astro    Portfolio content inside the Fuwari shell
  components/home/                  Hero, Work, Capabilities sections
  styles/global.css                 Tailwind v4 + Fuwari theme recipes
astro.config.mjs                   Static output, i18n, integrations
vercel.json                        Vercel Astro framework + build/output
LICENSE-FUWARI                     Upstream Fuwari MIT attribution
```
