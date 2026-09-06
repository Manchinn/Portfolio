# Portfolio Architecture Overview

> Current as of 2026-09-07. Describes the Astro 5 static portfolio using the Fuwari template shell.

## System Summary

This repository is a static-first bilingual (EN/TH) portfolio built with
**Astro 5**, TypeScript, Tailwind CSS 4, and the real
[Fuwari](https://github.com/saicaca/fuwari) layout pattern. Fuwari supplies the
shared blog shell and controls; portfolio-specific sections consume the
existing projects and articles content collections. The app has no active API
routes, backend service, database, or required runtime environment variables.

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
| `/notes/` | `src/pages/notes/index.astro` | English notes/runbook archive. |
| `/th/notes/` | `src/pages/th/notes/index.astro` | Thai notes/runbook archive. |
| `/notes/[slug]/` | `src/pages/notes/[slug].astro` | Generated English note detail. |
| `/th/notes/[slug]/` | `src/pages/th/notes/[slug].astro` | Generated Thai note detail. |
| `/sitemap-index.xml` | `@astrojs/sitemap` | Static sitemap. |

All public routes render through `MainGridLayout.astro`. Home pages insert the
portfolio hero, Work, and Capabilities sections; archive and detail pages use
the same Fuwari navbar, banner, sidebar, footer, and theme controls.

**Retired routes (not in tree):** `/saas`, `/work/[slug]`, `/work-with-me`,
`/article/[slug]`.

## Key Architecture Decisions

| Decision | Current choice | Trade-off |
|----------|----------------|-----------|
| Rendering model | Static SSG with per-locale pages | Fast, cacheable, SEO-friendly; content changes require a rebuild. |
| Template shell | Fuwari layout adapted in `src/layouts/` and `src/components/` | Reuses a proven blog interaction model while keeping portfolio content ownership local. |
| Content source | `projects` and `articles` collections + `src/i18n/ui.ts` | No runtime content service; curated records are built into static HTML. |
| Language model | Astro i18n (`en` at `/`, `th` at `/th/`) | Separate locale URLs support clear navigation and metadata. |
| Shared shell | `MainGridLayout.astro` around every public page | One navbar/sidebar/footer behavior across home, archive, and detail routes. |
| Styling | Tailwind CSS 4 + Fuwari theme tokens in `src/styles/global.css` | Centralized light/dark surfaces, hue control, cards, and responsive layout. |
| Interactive controls | Astro controls plus Svelte search | Small client islands for search, theme, hue, menu, TOC, and back-to-top. |

## Data Flow

```text
Home (en/th)
  page.astro -> PortfolioHome -> MainGridLayout
    -> ui = getUI(lang) from src/i18n/ui.ts
    -> projects and articles from content collections
    -> Work, Capabilities, and PostCard render static HTML

Notes (en/th)
  pages/notes/[slug].astro -> localized article entry -> Markdown -> static HTML
```

```text
Sitemap
  @astrojs/sitemap -> site + locale routes
```

## Cross-Cutting Concerns

### Public copy and privacy

Public copy must remain sanitized. The current site does not expose contact or
project-intake functionality.

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
secrets or application environment variables are required.

### Verification

`npx astro check` should report 0 errors, warnings, and hints. `npm run build`
is the required static implementation gate; route smoke checks should cover
both locales and note detail pages.

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
