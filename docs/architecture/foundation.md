# Foundation Architecture

> Scope: `src/i18n/`, `src/data/`, `src/content/`, `src/lib/`, root configuration, and build/runtime assumptions. Current as of 2026-07-20.

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
| `tl({ en: "...", th: "..." })` | Select ad-hoc bilingual text with English fallback (prefer typed content modules for product copy). |
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
| `projects` | EN/TH project records, canonical slugs, case studies, and implementation stacks. |
| `articles` | EN/TH article metadata and structured article sections. |

`src/data/types.ts` defines `Project`, `ArticleSection`, `Article`, `Language`, and `LocalizedData<T>`. Slugs are shared across languages and act as the canonical identity used by generated routes.

## Copy Ownership

| Copy area | Current source |
|-----------|----------------|
| Navigation labels | `src/i18n/locales/en.json`, `src/i18n/locales/th.json` |
| Projects and articles | `src/data/portfolio.ts` |
| Shared chrome CTAs / case-study labels / public-issue notice | `src/content/shared.ts` |
| Home section messaging | `src/content/home.ts` |
| Article detail shared inquiry chrome | `getSharedChrome()` from `src/content/shared.ts` |
| Footer portfolio label / inquiry | `getSharedChrome()` via Footer |

Prefer extending `src/content/*` or `src/data/portfolio.ts` over new component-local bilingual dictionaries for product-facing strings.

## Utility Layer

`src/lib/utils.ts` exports the `cn()` class-name merger using `clsx` and `tailwind-merge`. There are no content stores, provider clients, fetch services, GitHub API helpers, or runtime data utilities.

## Build and UI Dependencies

| Tool | Role |
|------|------|
| Next.js 15 | App Router, static params, metadata, and security headers. |
| React 19 | Component and client-state runtime. |
| TypeScript | Content contracts and application typing. |
| Tailwind CSS 4 | Utility styling and theme tokens. |
| `lucide-react` | Interface icons. |
| `motion` / `motion/react` | Homepage stagger and reduced-motion-aware motion. |

## Build Gate

Implementation changes that affect the public app should pass `npm run build` (repository wrapper `scripts/build.mjs`). Local builds may write to `.next-build-local` when ports 3000–3003 are in use.
