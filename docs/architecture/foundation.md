# Foundation Architecture

> Scope: `src/i18n/`, `src/data/`, `src/lib/`, root configuration, and build/runtime assumptions.

## Internationalization

The app uses a custom client-side i18n layer with English and Thai.

```text
src/i18n/
  index.ts              Locale registry and language list
  LanguageContext.ts    Context contract and guarded hook
  LanguageProvider.tsx  State, localStorage persistence, html lang update
  useTranslation.ts     Public re-export entrypoint
  locales/
    en.json
    th.json
```

### Public API

| Function/value | Usage |
|----------------|-------|
| `t("nav.work")` | Nested locale JSON lookup with English fallback. |
| `tl({ en: "...", th: "..." })` | Select component-local bilingual text with English fallback. |
| `language` | Active language key used to select typed portfolio data. |
| `changeLanguage("th")` | Validate and change the active language. |
| `languages` | Language selector options exported by the locale registry. |

### Runtime behavior

```text
Server/first client render uses en
  -> mount effect reads localStorage["portfolio-language"]
  -> supported saved value updates context
  -> loaded state enables persistence
  -> later changes update localStorage and <html lang>
  -> subscribed client components rerender
```

This is presentation-language state, not URL locale routing. The initial server HTML remains English.

## Typed Portfolio Data

`src/data/portfolio.ts` exports exactly four public values:

| Export | Purpose |
|--------|---------|
| `navItems` | Navbar labels used as translation-key suffixes and their route/anchor destinations. |
| `publicContactUrl` | Base URL for opening a public issue in `Manchinn/Portfolio`. |
| `projects` | EN/TH project records, canonical slugs, case studies, highlights, and implementation stacks. |
| `articles` | EN/TH article metadata and structured article sections. |

`src/data/types.ts` defines `Project`, `ArticleSection`, `Article`, `Language`, and `LocalizedData<T>`. Slugs are shared across languages and act as the canonical identity used by generated routes.

## Copy Ownership

| Copy area | Current source |
|-----------|----------------|
| Navigation labels and global UI translations | `src/i18n/locales/en.json`, `src/i18n/locales/th.json` |
| Projects and articles | `src/data/portfolio.ts` |
| Home section messaging | `src/components/portfolio/HomePage.tsx` |
| Project detail and proof labels | `src/app/(portfolio)/work/[slug]/ProjectContent.tsx` |
| Article detail actions | `src/app/(portfolio)/article/[slug]/ArticleContent.tsx` |
| Project brief form | `src/app/(portfolio)/work-with-me/page.tsx` |
| Footer phrasing | `src/components/layout/Footer.tsx` |

The split is functional but should be an explicit design-refactor decision because terminology can drift across these owners.

## Utility Layer

`src/lib/utils.ts` exports the `cn()` class-name merger using `clsx` and `tailwind-merge`. There are no content stores, provider clients, fetch services, GitHub API helpers, or runtime data utilities.

## Build and UI Dependencies

| Tool | Role |
|------|------|
| Next.js 15 | App Router, static params, metadata, redirect route, and security headers. |
| React 19 | Component and client-state runtime. |
| TypeScript | Content contracts and application typing. |
| Tailwind CSS 4 | Utility styling and theme tokens. |
| `lucide-react` | Interface icons. |
| `motion` | Home-page motion primitives. |
| `clsx` + `tailwind-merge` | Conditional class composition through `cn()`. |

## Runtime and Environment

The current app has:

- no active API route handlers;
- no separate backend;
- no database or blob storage;
- no runtime AI/provider integration;
- no required application environment variables.

`.env.example` intentionally documents that no runtime environment variables are required. Future server logic belongs in `src/app/api/*`; do not recreate the retired backend.

## Next.js Configuration

`next.config.ts` has two responsibilities:

1. Honor `NEXT_DIST_DIR` when the build wrapper supplies an isolated output directory.
2. Apply site-wide security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and Content-Security-Policy.

The development CSP additionally permits `unsafe-eval` and localhost WebSocket/HTTP connections required by local tooling. The config defines no redirects; `/saas` redirects inside its route component.

## Build Wrapper

`npm run build` executes `node scripts/build.mjs`.

On local non-CI builds, the wrapper checks ports 3000-3003. If a dev server is running and `NEXT_DIST_DIR` is not already set, it:

1. builds into `.next-build-local`;
2. snapshots `next-env.d.ts` and `tsconfig.json` before the build;
3. restores those files when the child build exits.

This prevents a production build from corrupting an active local `.next` dev runtime. CI/Vercel builds and callers with an explicit `NEXT_DIST_DIR` skip that local isolation behavior.

## Foundation Gaps

- The locale context is typed broadly as strings at its boundary, while data selection casts the active value to `Language` in consumers.
- Canonical slug parity between English and Thai is a data convention, not a compile-time cross-locale invariant.
- Copy ownership is distributed and needs deliberate consolidation or clear ownership rules during the design refactor.
- Shared chrome lives in `src/content/shared.ts`; homepage marketing copy is still partly local to `HomePage`.

## Verification

Run `npm run build` as the required production verification gate. The repository also provides `scripts/verify.ps1`, `scripts/review.ps1`, and `scripts/deploy-check.ps1` for broader checks.
