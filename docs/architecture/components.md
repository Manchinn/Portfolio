# Component Architecture

> Scope: `src/app/` and `src/components/`. The live app uses Next.js App Router and a shared portfolio route-group shell.

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

  -> local project-brief form
  -> generated preview
  -> clipboard action
  -> public GitHub issue link

  -> redirect('/#work')
```

## Shared Components

| Component | File | Role |
|-----------|------|------|
| Navbar | `src/components/layout/Navbar/Navbar.tsx` | Sticky navigation from `navItems`, mobile menu, and EN/TH selector. |
| Footer | `src/components/layout/Footer.tsx` | Localized portfolio label and external inquiry link. |
| HomePage | `src/components/portfolio/HomePage.tsx` | Main home composition, localized home copy, project cards, article links, and contact CTA. |
| Shared home primitives | `src/components/portfolio/primitives.tsx` | Section, header, and link-button primitives used by the home surface. |
| Motion primitives | `src/components/motion/MotionPrimitives.tsx` | Reusable motion wrappers used by the home composition. |
| ArticleContent | `src/app/(portfolio)/article/[slug]/ArticleContent.tsx` | Localized article body and related-article navigation. |

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
| Work brief fields and copy status | `WorkWithMePage` | Local `useState`; generated brief and issue URL are derived in the browser. |
| Current project/article content | Detail client components | Lookup by canonical slug in the active language collection. |

There is no Redux, Zustand, React Query, custom fetch-hook state layer, or server-persisted form state.

## Content and Navigation Boundaries

- `navItems` defines the Navbar destination structure.
- `projects` drives home project cards only.
- `articles` drives home article links, `/article/[slug]` params, localized article detail, related articles, and article sitemap entries.
- `publicContactUrl` is consumed by homepage/footer/article inquiry CTAs.
- Home, work detail, article detail, intake, and footer also contain their own bilingual UI copy objects or `tl()` calls.

## Styling Patterns

- Tailwind CSS 4 utilities are the primary styling mechanism.
- Semantic `portfolio-*` colors, shadows, and radii are defined in `src/app/globals.css`.
- Shared home layout primitives reduce repeated section and action styling.
- Detail routes use unframed page sections, bordered content bands, and responsive fixed constraints for controls and tables.

## Refactor Watchpoints

1. `HomePage` and `portfolio-*` tokens are the current portfolio implementation. `/saas` is only a compatibility redirect, not a product page.
2. Copy ownership is distributed across data, locale JSON, and component-local dictionaries; a design refactor should decide whether to preserve or consolidate those boundaries.
3. English and Thai project/article entries must retain the same slugs because the server generates only English params while the client switches collections.
4. Contact is external via GitHub Issues; do not reintroduce a local form without product approval.
