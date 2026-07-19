# Component Architecture

> Scope: `src/app/` and `src/components/`. Current as of 2026-07-20. The live app uses Next.js App Router and a shared portfolio route-group shell.

## Route and Component Tree

```text
src/app/layout.tsx
  -> fonts and global metadata
  -> <LanguageProvider>
     -> route segment

src/app/(portfolio)/layout.tsx
  -> <Navbar />
  -> {children}
  -> <Footer />

src/app/(portfolio)/page.tsx
  -> <HomePage />
     -> PortfolioHero
     -> SelectedWork -> ProjectCard
     -> CapabilitiesSection
     -> ArticlesSection
     -> ContactSection

src/app/(portfolio)/article/[slug]/page.tsx
  -> generateStaticParams() from articles.en
  -> generateMetadata() and slug validation
  -> <ArticleContent slug={slug} />
     -> localized sections and related articles
     -> external inquiry CTA via getSharedChrome / publicContactUrl
```

Retired product surfaces (not in tree): `/saas`, `/work/[slug]`, `/work-with-me`.

## Shared Components

| Component | File | Role |
|-----------|------|------|
| Navbar | `src/components/layout/Navbar/Navbar.tsx` | Sticky navigation from `navItems`, mobile menu, and EN/TH selector. |
| Footer | `src/components/layout/Footer.tsx` | Localized portfolio label and external inquiry link. |
| HomePage | `src/components/portfolio/HomePage.tsx` | Home composition; marketing copy from `getHomeCopy()`. |
| Shared home primitives | `src/components/portfolio/primitives.tsx` | Section, header, and link-button primitives used by the home surface. |
| Motion primitives | `src/components/motion/MotionPrimitives.tsx` | Reusable motion wrappers used by the home composition. |
| ArticleContent | `src/app/(portfolio)/article/[slug]/ArticleContent.tsx` | Localized article body, related articles, and shared inquiry chrome. |

## Server and Client Boundaries

The root and portfolio layouts, home route entry, and dynamic route pages are server components. Dynamic route pages own static params, metadata, and English-slug validation.

Client components are used where language state, interaction state, animation, or browser APIs are required:

- `LanguageProvider.tsx`
- `Navbar.tsx` and `Footer.tsx`
- `HomePage.tsx` and motion primitives
- `ArticleContent.tsx`

## State Ownership

| State | Owner | Mechanism |
|-------|-------|-----------|
| Active language | `LanguageProvider` | React context, restored and persisted through `localStorage`. |
| Desktop language menu and mobile navigation | `Navbar` | Local `useState`; the language menu also installs a click-outside listener while open. |
| Current article content | `ArticleContent` | Lookup by canonical slug in the active language collection. |

There is no Redux, Zustand, React Query, custom fetch-hook state layer, or server-persisted form state.

## Content and Navigation Boundaries

- `navItems` defines the Navbar destination structure.
- `projects` drives home project cards only (no work-detail route).
- `articles` drives home article links, `/article/[slug]` params, localized article detail, related articles, and article sitemap entries.
- `publicContactUrl` is consumed by homepage/footer/article inquiry CTAs.
- Homepage marketing: `src/content/home.ts` via `getHomeCopy()`.
- Shared CTAs/labels: `src/content/shared.ts` via `getSharedChrome()`.
- Nav chrome labels: `src/i18n/locales/*.json`.

## Styling Patterns

- Tailwind CSS 4 utilities are the primary styling mechanism.
- Semantic soft-pixel `portfolio-*` colors, shadows, and radii are defined in `src/app/globals.css`.
- Shared home layout primitives reduce repeated section and action styling.
- Article body stays calm: pixel labels and dividers only; prose remains IBM Plex Sans.

## Refactor Watchpoints

1. `HomePage` and `portfolio-*` tokens are the current portfolio implementation. Do not restore `/saas` without product approval.
2. Prefer `src/content/*` and `src/data/portfolio.ts` over new component-local bilingual dictionaries for user-facing marketing/chrome.
3. English and Thai project/article entries must retain the same slugs because the server generates only English params while the client switches collections.
4. Contact is external via GitHub Issues; do not reintroduce a local form without product approval.
