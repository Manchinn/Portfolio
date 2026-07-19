# Portfolio Architecture Overview

> Current as of 2026-07-11. This document describes the Next.js App Router application in this repository.

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
  |     - SaasHome portfolio composition
  |
  +-- src/app/(portfolio)/work/[slug]/page.tsx
  |     - static project routes from projects.en
  |     - localized ProjectContent and fictional interactive proof
  |
  +-- src/app/(portfolio)/article/[slug]/page.tsx
  |     - static article routes from articles.en
  |     - localized ArticleContent
  |
  +-- src/app/(portfolio)/work-with-me/page.tsx
  |     - browser-only brief builder
  |     - clipboard copy and public GitHub issue handoff
  |
  +-- src/app/saas/page.tsx
  |     - redirects to /#work
  |
  +-- src/app/sitemap.ts
        - derives work and article URLs from portfolio data
```

## Current Route Model

| Route | Primary files | Runtime role |
|-------|---------------|--------------|
| `/` | `src/app/(portfolio)/page.tsx`, `src/components/portfolio-saas/SaasHome.tsx` | Static portfolio landing page with client language selection. |
| `/work/[slug]` | `src/app/(portfolio)/work/[slug]/page.tsx`, `ProjectContent.tsx` | Pre-rendered project detail and public-safe interactive proof. Unknown slugs return 404. |
| `/article/[slug]` | `src/app/(portfolio)/article/[slug]/page.tsx`, `ArticleContent.tsx` | Pre-rendered article detail. Unknown slugs return 404. |
| `/work-with-me` | `src/app/(portfolio)/work-with-me/page.tsx` | Browser-only project brief builder; copies a brief and opens a prefilled public GitHub issue form. |
| `/saas` | `src/app/saas/page.tsx` | Compatibility route that redirects to `/#work`; it is not a separate demo surface. |
| `/sitemap.xml` | `src/app/sitemap.ts` | Metadata route derived from `projects.en` and `articles.en`. |

Both dynamic content routes set `dynamicParams = false` and generate params from English entries. English and Thai records therefore need matching canonical slugs.

## Key Architecture Decisions

| Decision | Current choice | Trade-off |
|----------|----------------|-----------|
| Rendering model | App Router with statically generated content routes | Fast and deployment-friendly; language preference is applied after client hydration. |
| Content source | `navItems`, `publicContactUrl`, `projects`, and `articles` in `src/data/portfolio.ts` | No runtime content service; content changes require a rebuild. |
| Language model | Custom client provider in `src/i18n/*` | Small and controlled; no locale-prefixed routes or server-selected locale. |
| Shared shell | `(portfolio)` route-group layout | Navbar and Footer stay consistent across home, work, article, and intake routes. |
| Contact handoff | Local form state, Clipboard API, and a public GitHub issue URL | No visitor data is stored by this app; visitors must understand that the destination is public. |
| Styling | Tailwind CSS 4 and semantic SaaS design tokens in `globals.css` | Centralized visual vocabulary; some user-facing copy remains component-local. |

## Data Flow

```text
Home
  page.tsx -> SaasHome
    -> useTranslation().language
    -> projects[language] + articles[language]
    -> localized component copy
```

```text
Work or article detail
  build -> generateStaticParams() from English canonical slugs
  request -> server page validates slug and generates metadata
  client content component -> selects the matching item in projects[language]
                              or articles[language]
```

```text
Work intake
  local form state -> minimum-length validation -> generated text preview
    -> Clipboard API copies the full brief
    -> publicContactUrl opens a new public GitHub issue with a title
       and instructions to paste the copied brief
```

```text
Sitemap
  fixed home + work-with-me URLs
    + projects.en mapped to /work/[slug]
    + articles.en mapped to /article/[slug]
```

## Cross-Cutting Concerns

### Public copy and privacy

Public copy must remain sanitized. Project proof uses fictional records. The intake page keeps form values in browser state and does not submit them to this application, but its GitHub destination is explicitly public.

### Language support

English and Thai are active. `LanguageProvider` starts with English, restores `localStorage["portfolio-language"]` after mount, persists changes, and updates `document.documentElement.lang`.

### Security and runtime

`next.config.ts` configures site-wide security headers and an optional build `distDir`. It does not define redirects. No runtime secrets or application environment variables are required.

### Verification

`npm run build` calls `scripts/build.mjs`, not `next build` directly. On a local machine, the wrapper detects dev servers on ports 3000-3003 and uses `.next-build-local` through `NEXT_DIST_DIR` so the active `.next` runtime is not overwritten. CI, Vercel, and explicitly configured `NEXT_DIST_DIR` builds use their normal destination.

## Current Gaps

| Issue | Impact |
|-------|--------|
| User-facing copy is split between `portfolio.ts`, locale JSON, and localized objects inside components | Messaging and terminology can drift during the design refactor. |
| Static params use English slugs while client rendering looks up the active locale | A missing or mismatched Thai slug can render an empty detail page after language switching. |
| The intake workflow depends on Clipboard API support and a separate public GitHub step | Clipboard failure needs user recovery, and the brief is not transferred automatically to the issue body. |
| `SaasHome` and `saas-*` names describe an earlier design direction | Names can be misleading during refactoring even though `/saas` is only a redirect now. |

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
      work/[slug]/
        page.tsx                       Static params, metadata, slug validation
        ProjectContent.tsx             Localized detail and proof demo
      article/[slug]/
        page.tsx                       Static params, metadata, slug validation
        ArticleContent.tsx             Localized article rendering
      work-with-me/page.tsx            Local brief and public issue handoff
    saas/page.tsx                      Redirect to /#work
  components/
    layout/Navbar/Navbar.tsx           Navigation and language switcher
    layout/Footer.tsx                  Shared footer
    motion/MotionPrimitives.tsx        Motion wrappers
    portfolio-saas/SaasHome.tsx        Home composition
    portfolio-saas/_shared.tsx         Shared home primitives
  data/
    portfolio.ts                       Navigation, contact URL, projects, articles
    types.ts                           Shared content contracts
  i18n/                                EN/TH provider, hook, and locale JSON
  lib/utils.ts                         Class-name utility
scripts/build.mjs                      Local-safe Next.js build wrapper
next.config.ts                         Security headers and optional distDir
```
