# Data Paths and Runtime Services

> Scope: current content flow, browser-only integrations, derived metadata, and the absence of application services. The filename is retained for compatibility with existing documentation links.

## Runtime Model

The portfolio has no active service layer or runtime API. Components import compiled TypeScript data, select the active language in memory, and render it.

```text
src/data/portfolio.ts
  -> server route generation and metadata
  -> client components select projects[language] or articles[language]
  -> rendered static content plus local interaction state
```

## Source-to-Consumer Map

| Source | Consumers | Data used |
|--------|-----------|-----------|
| `navItems` | `Navbar.tsx` | Home, Work, Stack, and Contact destinations; labels map to locale JSON keys. |
| `publicContactUrl` | `work-with-me/page.tsx` | Public GitHub issue base URL for the final handoff. |
| `projects` | `HomePage.tsx` | Localized selected-work cards and links to project detail routes. |
| `projects.en` | `work/[slug]/page.tsx` | Static params, metadata, and valid-slug checks. |
| `projects[language]` | `ProjectContent.tsx` | Localized case study, highlights, stack, and project identity. |
| `articles` | `HomePage.tsx`, `ArticleContent.tsx` | Localized article listing, detail sections, and related articles. |
| `articles.en` | `article/[slug]/page.tsx` | Static params, metadata, and valid-slug checks. |
| `projects.en`, `articles.en` | `sitemap.ts` | Derived `/work/[slug]` and `/article/[slug]` URLs. |
| `src/i18n/*` | Shared shell and route client components | Active language, JSON translations, inline bilingual selection, and language changes. |
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

## Work Intake Handoff

```text
/work-with-me
  -> visitor selects project type and timeline
  -> visitor enters current context and desired outcome
  -> page requires at least 30 trimmed characters in both detail fields
  -> useMemo builds a plain-text brief and preview
  -> Clipboard API copies the brief
  -> public GitHub issue link opens in a new tab
     with a generated title and instructions to paste the brief
```

The form never posts to this application. It has no database, analytics write, CRM, email service, or server-side persistence. The GitHub issue is a separate public destination, and the brief is not embedded in its URL.

## Sitemap Flow

`src/app/sitemap.ts` uses a fixed production base URL and derives content routes from current English data:

```text
https://www.chinnakrit.dev
https://www.chinnakrit.dev/work-with-me
projects.en[] -> /work/{slug}
articles.en[] -> /article/{slug}
```

Adding or removing a project/article entry updates its sitemap route on the next build.

## Route Redirect

`src/app/saas/page.tsx` calls `redirect('/#work')`. This is an internal compatibility route, not a standalone FlowSync demo and not a redirect configured in `next.config.ts`.

## Active Server Surfaces

There are no `src/app/api/*/route.ts` files and no runtime data services. The application uses Next.js server components for route generation and metadata, but it does not expose an application API.

If server logic is introduced later, place it under `src/app/api/*` and document its validation, data ownership, and runtime environment requirements. Do not recreate a separate Express backend.

## Retired Architecture

Do not use these historical concepts to guide the refactor:

- Vite entrypoints or React Router pages;
- `src/services/*` and `src/hooks/*` fetch pipelines;
- Express endpoints for profile, projects, articles, or contact;
- runtime profile/social aggregation helpers;
- prompt, CMS, content-store, blob-storage, or AI-provider services;
- backend-selected language through request headers.

## Current Data-Path Gaps

1. English and Thai slug parity is required but not validated as a cross-locale invariant.
2. The intake handoff has two user actions: copy the brief, then open and complete a public issue. Clipboard denial or skipping the copy step leaves no automatic transfer path.
3. Copy and terminology are distributed across static data, locale JSON, and component-local dictionaries.
4. The sitemap base URL is a source constant; route entries are derived, but domain changes still require a code update.
