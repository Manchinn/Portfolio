# Data Paths and Runtime Services

> Scope: current content flow, browser-only integrations, derived metadata, and the absence of application services. Current as of 2026-07-20. The filename is retained for compatibility with existing documentation links.

## Runtime Model

The portfolio has no active service layer or runtime API. Components import compiled TypeScript data, select the active language in memory, and render it.

```text
src/data/portfolio.ts
  -> server route generation and metadata
  -> client components select projects[language] or articles[language]
  -> rendered static content plus local UI state

src/content/shared.ts + src/content/home.ts
  -> shared chrome and homepage marketing by language
```

## Source-to-Consumer Map

| Source | Consumers | Data used |
|--------|-----------|-----------|
| `navItems` | `Navbar.tsx` | Home, Work, Stack, and Contact destinations; labels map to locale JSON keys. |
| `publicContactUrl` | Home, Footer, Article CTAs | Public GitHub issue base URL for inquiry handoff. |
| `projects` | `HomePage.tsx` | Localized selected-work cards (problem / built / result on page). |
| `articles` | `HomePage.tsx`, `ArticleContent.tsx` | Localized article listing, detail sections, and related articles. |
| `articles.en` | `article/[slug]/page.tsx` | Static params, metadata, and valid-slug checks. |
| `articles.en` | `sitemap.ts` | Derived `/article/[slug]` URLs. |
| `src/content/home.ts` | `HomePage.tsx` | Homepage marketing sections EN/TH. |
| `src/content/shared.ts` | Home, Footer, Article CTAs | Shared inquiry labels, case-study labels, portfolio label. |
| `src/i18n/*` | Shared shell and route client components | Active language, JSON translations, and language changes. |
| `next.config.ts` | Next.js runtime | Optional build output directory and site-wide security headers. |

## Static Detail Flow

```text
Build
  -> generateStaticParams() reads English canonical slugs
  -> generateMetadata() reads the English record
  -> dynamicParams = false prevents ungenerated slugs

Client render
  -> useTranslation() supplies en or th
  -> detail component finds the same slug in that locale collection
  -> language changes replace the visible content without changing the URL
```

This contract relies on slug parity between locale arrays.

## Contact Handoff

```text
CTA click
  -> open publicContactUrl (public GitHub Issues)
  -> user writes the issue on GitHub
  -> portfolio stores nothing
```

There is no local brief builder, clipboard-based intake, or form submission path.

## Sitemap Flow

`src/app/sitemap.ts` uses a fixed production base URL and derives content routes from current English data:

```text
https://www.chinnakrit.dev
  home
  articles.en[] -> /article/{slug}
```

Adding or removing an article entry updates its sitemap route on the next build.

## Active Server Surfaces

There are no `src/app/api/*/route.ts` files and no runtime data services. The application uses Next.js server components for route generation and metadata, but it does not expose an application API.

If server logic is introduced later, place it under `src/app/api/*` and document its validation, data ownership, and runtime environment requirements. Do not recreate a separate Express backend.

## Retired Architecture

Do not use these historical concepts to guide work:

- Vite entrypoints or React Router pages;
- `src/services/*` and `src/hooks/*` fetch pipelines;
- Express endpoints for profile, projects, articles, or contact;
- runtime profile/social aggregation helpers;
- prompt, CMS, content-store, blob-storage, or AI-provider services;
- backend-selected language through request headers;
- `/saas`, `/work/[slug]`, `/work-with-me` product surfaces.

## Current Data-Path Gaps

1. English and Thai slug parity is required but not validated as a cross-locale invariant.
2. The sitemap base URL is a source constant; route entries are derived, but domain changes still require a code update.
3. Article-only UI strings outside `shared.ts` may still live near the article component.
