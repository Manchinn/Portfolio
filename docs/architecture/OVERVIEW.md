# Portfolio Architecture Overview

> Current as of 2026-09-06. Describes the Astro 5 static portfolio in this repository.

## System Summary

This repo is a static-first bilingual (EN/TH) portfolio built with **Astro 5** (static SSG), TypeScript, Tailwind CSS 4, and a React island for the mobile menu. Content lives in **content collections** (three projects and localized notes); language routing uses Astro's built-in i18n. The app has no active API routes, backend service, database, or required runtime environment variables.

```text
Browser
  |
  v
Astro (static build output in /dist)
  |
  +-- src/pages/index.astro            English one-page home (/)
  +-- src/pages/th/index.astro         Thai one-page home (/th/)
  +-- src/pages/notes/                 English notes index + static note pages
  +-- src/pages/th/notes/              Thai notes index + static note pages
  +-- src/pages/404.astro              404 page
  |      |
  |      +-- src/layouts/BaseLayout.astro  (HTML shell, metadata, fonts)
  |      +-- src/components/home/          (Navbar, Hero, Work, Capabilities, Contact, Footer)
  |      +-- content collections          (projects + localized notes)
```

## Current Route Model

| Route | Primary files | Runtime role |
|-------|---------------|--------------|
| `/` | `src/pages/index.astro`, `src/components/home/HomePage.astro` | Static English one-page portfolio. |
| `/th/` | `src/pages/th/index.astro`, `src/components/home/HomePage.astro` | Static Thai one-page portfolio. |
| `/notes/` | `src/pages/notes/index.astro`, `src/pages/notes/[slug].astro` | English notes/runbook index and generated detail pages. |
| `/th/notes/` | `src/pages/th/notes/index.astro`, `src/pages/th/notes/[slug].astro` | Thai notes/runbook index and generated detail pages. |
| `/sitemap-index.xml` | `@astrojs/sitemap` | Auto-generated from `site` + i18n routes. |

Both language home pages render the `Work` section from the `projects` collection. Notes are generated from the localized `articles` collection and filtered to exclude drafts.

**Retired routes (not in tree):** `/saas`, `/work/[slug]`, `/work-with-me`, `/article/[slug]`.

## Key Architecture Decisions

| Decision | Current choice | Trade-off |
|----------|----------------|-----------|
| Rendering model | Static SSG with per-locale pages | Fast, cacheable, SEO-friendly; content changes require a rebuild. |
| Content source | Content collections (`projects`, `articles`) + `src/i18n/ui.ts` for chrome copy | No runtime content service; notes are curated into the repo and the slug is derived from the entry id. |
| Language model | Astro i18n routing (`en` at `/`, `th` at `/th/`) | Separate URLs per locale give better SEO; the language switch is a link. |
| Shared shell | `src/components/home/` (Navbar + Footer around the home route) | Consistent header/footer across the home routes. |
| Contact handoff | Public GitHub issue URL (`PUBLIC_CONTACT_URL`) | No visitor data is stored by this app; the destination is public. |
| Styling | Tailwind CSS 4 + Machine Readout tokens in `src/styles/global.css` | Centralized visual vocabulary (white field, cyan-blue accent). |
| Interactive island | `src/components/ui/MobileMenu.tsx` (React, `client:load`) | Mobile menu interactivity without a heavy app shell. |

## Data Flow

```text
Home (en/th)
  page.astro -> HomePage
    -> ui = getUI(lang) from src/i18n/ui.ts
    -> projects from the collection (records -> Work rows)

Notes (en/th)
  pages/notes/[slug].astro -> localized Markdown entry -> static HTML
```

```text
Contact handoff
  CTA -> PUBLIC_CONTACT_URL (GitHub Issues, external)
```

```text
Sitemap
  @astrojs/sitemap -> site + locale routes (includes notes and hreflang alternates)
```

## Cross-Cutting Concerns

### Public copy and privacy

Public copy must remain sanitized. Contact opens a public GitHub Issues URL and does not store form data in this application.

### Language support

English and Thai are active via i18n routing. The language switch is a link to the alternate locale (`/` ↔ `/th/`). The `html lang` attribute, canonical, and hreflang alternates are rendered by `BaseLayout`.

### Security and runtime

`astro.config.mjs` sets static output and the site URL. `vercel.json` pins the Vercel framework to Astro with `npm run build` and `dist` output. No runtime secrets or application environment variables are required.

### Verification

`npm run build` (astro build) is the implementation gate; `npx astro check` should report 0 errors.

## File Map

```text
src/
  content.config.ts                Content schemas + entrySlug() helper
  content/projects/{en,th}/        JSON project records (per locale) — populated
  content/articles/{en,th}/        Markdown notes/runbooks (per locale) — curated public content
  i18n/ui.ts                       EN/TH chrome + marketing copy (getUI)
  i18n/utils.ts                    Locale helpers
  layouts/BaseLayout.astro         HTML shell, metadata, fonts, hreflang
  pages/index.astro                English home (/)
  pages/th/index.astro             Thai home (/th/)
  pages/404.astro                  404 page
  components/home/                 Navbar, Hero, Work, Capabilities, Contact, Footer, HomePage
  components/ui/                   Button, SectionLabel, SectionHeading, MobileMenu (React island)
  components/motion/Reveal.astro   Hero-only stagger (reduced-motion aware)
  styles/global.css                Tailwind v4 @theme tokens + Machine Readout recipes
astro.config.mjs                   site, static output, i18n routing, integrations
vercel.json                        Vercel Astro framework + build/output
```
