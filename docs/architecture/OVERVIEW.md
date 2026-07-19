# Portfolio Architecture Overview

> Current as of 2026-07-20. This document describes the Next.js App Router application in this repository.

## System Summary

This repo is a static-first public portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, and client-side English/Thai language switching. Portfolio content is compiled from typed TypeScript modules; the app has no active API routes, backend service, database, or required runtime environment variables.

```text
Browser
  |
  v
Next.js App Router
  |
  +-- src/app/layout.tsx
  |     - global metadata and fonts
  |     - LanguageProvider
  |
  +-- src/app/(portfolio)/layout.tsx
  |     - Navbar
  |     - route content
  |     - Footer
  |
  +-- src/app/(portfolio)/page.tsx
  |     - HomePage portfolio composition
  |
  +-- src/app/(portfolio)/article/[slug]/page.tsx
  |     - static article routes from articles.en
  |     - localized ArticleContent
  |
  +-- src/app/sitemap.ts
        - derives article URLs from portfolio data
```

## Current Route Model

| Route | Primary files | Runtime role |
|-------|---------------|--------------|
| `/` | `src/app/(portfolio)/page.tsx`, `src/components/portfolio/HomePage.tsx` | Static portfolio landing page with client language selection. |
| `/article/[slug]` | `src/app/(portfolio)/article/[slug]/page.tsx`, `ArticleContent.tsx` | Pre-rendered article detail. Unknown slugs return 404. |
| `/sitemap.xml` | `src/app/sitemap.ts` | Metadata route derived from `articles.en` (and fixed home). |

Both dynamic content routes set `dynamicParams = false` and generate params from English entries. English and Thai records therefore need matching canonical slugs.

**Retired routes (not in tree):** `/saas`, `/work/[slug]`, `/work-with-me`.

## Key Architecture Decisions

| Decision | Current choice | Trade-off |
|----------|----------------|-----------|
| Rendering model | App Router with statically generated content routes | Fast and deployment-friendly; language preference is applied after client hydration. |
| Content source | `navItems`, `publicContactUrl`, `projects`, and `articles` in `src/data/portfolio.ts` | No runtime content service; content changes require a rebuild. |
| Language model | Custom client provider in `src/i18n/*` | Small and controlled; no locale-prefixed routes or server-selected locale. |
| Shared shell | `(portfolio)` route-group layout | Navbar and Footer stay consistent across home and article routes. |
| Contact handoff | Public GitHub issue URL (`publicContactUrl`) | No visitor data is stored by this app; the destination is public. |
| Marketing / chrome copy | `src/content/home.ts` + `src/content/shared.ts` | Typed EN/TH modules; UI components stay presentation-focused. |
| Styling | Tailwind CSS 4 and soft-pixel `portfolio-*` tokens in `globals.css` | Centralized visual vocabulary (level A soft-pixel). |

## Data Flow

```text
Home
  page.tsx -> HomePage
    -> useTranslation().language
    -> getHomeCopy(language) from src/content/home.ts
    -> projects[language] + articles[language]
```

```text
Article detail
  build -> generateStaticParams() from English canonical slugs
  request -> server page validates slug and generates metadata
  client content component -> selects the matching item in articles[language]
  -> shared chrome via getSharedChrome(language)
```

```text
Contact handoff
  CTA -> publicContactUrl (GitHub Issues, external)
```

```text
Sitemap
  fixed home URL
    + articles.en mapped to /article/[slug]
```

## Cross-Cutting Concerns

### Public copy and privacy

Public copy must remain sanitized. Selected work is summarized on the homepage. Contact opens a public GitHub Issues URL and does not store form data in this application.

### Language support

English and Thai are active. `LanguageProvider` starts with English, restores `localStorage["portfolio-language"]` after mount, persists changes, and updates `document.documentElement.lang`.

### Security and runtime

`next.config.ts` configures site-wide security headers and an optional build `distDir`. It does not define application redirects. No runtime secrets or application environment variables are required.

### Verification

`npm run build` calls `scripts/build.mjs`, not `next build` directly. On a local machine, the wrapper detects dev servers on ports 3000-3003 and uses `.next-build-local` through `NEXT_DIST_DIR` so the active `.next` runtime is not overwritten. CI, Vercel, and explicitly configured `NEXT_DIST_DIR` builds use their normal destination.

## Current Gaps

| Issue | Impact |
|-------|--------|
| English and Thai slug parity is required but not validated as a cross-locale invariant | A missing or mismatched Thai slug can render empty detail content after language switching. |
| Sitemap base URL is a source constant | Domain changes still require a code update. |
| Article detail still owns some page-local chrome beyond `getSharedChrome` | Minor terminology drift risk on article-only strings. |

## File Map

```text
src/
  app/
    layout.tsx                         Global metadata, fonts, LanguageProvider
    globals.css                        Tailwind CSS 4 and design tokens
    sitemap.ts                         Derived metadata route
    (portfolio)/
      layout.tsx                       Shared Navbar/Footer shell
      page.tsx                         Home route
      article/[slug]/
        page.tsx                       Static params, metadata, slug validation
        ArticleContent.tsx             Localized article rendering
  components/
    layout/Navbar/Navbar.tsx           Navigation and language switcher
    layout/Footer.tsx                  Shared footer
    motion/MotionPrimitives.tsx        Motion wrappers
    portfolio/HomePage.tsx             Home composition
    portfolio/primitives.tsx           Shared home primitives
  content/
    shared.ts                          Shared EN/TH chrome labels and CTAs
    home.ts                            Homepage EN/TH marketing sections
  data/
    portfolio.ts                       Navigation, contact URL, projects, articles
    types.ts                           Shared content contracts
  i18n/                                EN/TH provider, hook, and locale JSON
  lib/utils.ts                         Class-name utility
scripts/build.mjs                      Local-safe Next.js build wrapper
next.config.ts                         Security headers and optional distDir
```
