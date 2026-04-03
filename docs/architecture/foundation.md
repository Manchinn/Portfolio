# Foundation Architecture

> Scope: `src/i18n/`, `src/data/`, `src/utils/`, configs

## Internationalization (i18n)

Custom zero-dependency i18n system. No `react-i18next`.

### Files
```
src/i18n/
├── index.js           — locale registry, exports translations + languages list
├── useTranslation.jsx — LanguageProvider, t(), tl(), useTranslation() hook
└── locales/
    ├── en.json        — English (canonical schema)
    ├── th.json        — Thai
    └── zh.json        — Chinese Simplified
```

### API
| Function | Usage |
|----------|-------|
| `t('nav.about')` | JSON key lookup with English fallback |
| `tl({ en: 'Hello', th: 'สวัสดี', zh: '你好' })` | Inline translation object |
| `changeLanguage('th')` | Switch language + persist to localStorage |

### Locale Schema Namespaces
`nav`, `hero`, `about`, `skills`, `experience`, `projects`, `articles`, `contact`, `footer`

### Limitations
- No pluralization or interpolation
- All 3 locales eagerly bundled (no lazy loading)

## Static Data (`src/data/portfolio.js`)

Single export: `navItems` — 7 anchor-link navigation entries. All dynamic content is API-driven.

## Utilities (`src/utils/SEOHelper.jsx`)

Renderless component that updates `<head>` meta tags (title, OG, Twitter Card) via `document.querySelector`. Requires pre-existing tags in `index.html`.

## Build Tooling

| Tool | Version | Role |
|------|---------|------|
| Vite | ^5.4.0 | Build tool + dev server |
| React | ^19.2.0 | UI framework |
| Tailwind CSS | ^4.1.18 | Styling (v4, no tailwind.config.js) |
| ESLint | ^9.39.1 | Linting (flat config) |
| react-router-dom | ^7.9.6 | Routing |
| lucide-react | ^0.562.0 | Icons |

**Notable absences:** No test framework, no state management lib, no data-fetching lib.

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Backend API base URL (only env var used) |
| `VITE_API_TOKEN` | Documented in `.env.example` but not implemented |
