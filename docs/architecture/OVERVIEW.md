# Portfolio Architecture Overview

> Synthesized from: [components.md](./components.md) | [services.md](./services.md) | [foundation.md](./foundation.md)

## System Summary

A **React 19 single-page portfolio** with a separate Express.js backend serving static JSON data. Designed with a Neo-Brutalism visual language and custom multi-language support (EN/TH/ZH).

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)               │
│                                                         │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐ │
│  │  Pages   │→│  Sections │→│  Hooks   │→│ Services  │ │
│  │ Home     │  │ About    │  │usePfolio │  │ api.js   │ │
│  │ Article  │  │ Skills   │  │Data()    │  │ pfolioSvc│ │
│  └─────────┘  │ Exp/Proj │  └─────────┘  └──────────┘ │
│               │ Articles │         │             │      │
│               │ Contact  │         │      fetch + Accept│
│               └──────────┘         │      -Language     │
│                                    │             │      │
│  ┌─────────┐  ┌──────────┐        │             │      │
│  │  Layout  │  │   i18n   │←───────┘             │      │
│  │ Navbar   │  │ 3 locales│  (language change     │      │
│  │ Footer   │  │ t()/tl() │   triggers refetch)  │      │
│  └─────────┘  └──────────┘                       │      │
└──────────────────────────────────────────────────│──────┘
                                                   │
                                          HTTP (CORS)
                                                   │
┌──────────────────────────────────────────────────│──────┐
│                 BACKEND (Express.js)             │      │
│                                                  ▼      │
│  ┌──────────┐  ┌──────────────────────────────────────┐ │
│  │ server.js│→│ services/api.js (Express Router)      │ │
│  │ CORS     │  │ GET /profile, /skills, /experiences  │ │
│  │ JSON     │  │ GET /projects, /socials, /articles   │ │
│  │ Static   │  │ POST /contact                        │ │
│  └──────────┘  └───────────────┬──────────────────────┘ │
│                                │                        │
│                    ┌───────────▼───────────┐            │
│                    │ data/portfolioData.js  │            │
│                    │ In-memory static data  │            │
│                    │ Multi-lang (en/th/zh)  │            │
│                    └───────────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

## Key Architecture Decisions

| Decision | Choice | Trade-off |
|----------|--------|-----------|
| Data fetching | Hand-rolled hooks (no React Query/SWR) | Simple but no caching, dedup, or stale-while-revalidate |
| State management | React Context (language only) | Lightweight but each section fetches independently |
| i18n | Custom implementation (no react-i18next) | Full control but no pluralization/interpolation |
| Styling | Tailwind v4 + custom @theme | Consistent design tokens but some inline duplication |
| Backend data | Static JS objects (no database) | Zero infra but no dynamic CRUD |
| API contract | `{ success, data/error }` envelope | Uniform but requires unwrapping at every layer |

## Data Flow

```
User visits "/" → Home renders → 6 Sections mount simultaneously
  → Each section calls its own useXxx() hook
  → Each hook calls usePortfolioData(serviceFn)
  → serviceFn calls api.js endpoint
  → api.js sends fetch() with Accept-Language header
  → Backend reads lang → returns localized static data
  → Hook sets { data, loading: false }
  → Section renders

User switches language → localStorage updated
  → usePortfolioData detects change (500ms poll or storage event)
  → All mounted hooks refetch with new Accept-Language header
  → Sections re-render with new language data
```

## Cross-Cutting Concerns

### Error Handling
Three-layer strategy: API catches → Service throws → Hook catches + sets error state → Component renders `<ErrorDisplay onRetry={refetch} />`

### Loading States
Every section: `if (loading) return <Loading />` — full section replacement, no skeleton/partial loading.

### Language Support
3 languages (EN/TH/ZH) at both frontend (UI strings in JSON) and backend (content data per language). Synced via `Accept-Language` header read from `localStorage`.

## Architecture Health

### Strengths
- Clean separation: API → Service → Hook → Component
- Consistent Section component pattern across all 6 sections
- Coherent Neo-Brutalism design language
- Multi-language support end-to-end

### Weaknesses
| Issue | Impact | Priority |
|-------|--------|----------|
| No request caching/dedup | Duplicate API calls (e.g., useProfile called 3x) | P1 |
| No test coverage | Zero test files in entire project | P1 |
| Language polling (500ms setInterval) | Unnecessary CPU; should use custom event | P2 |
| Orphaned UI components (Card, Button, etc.) | Dead code | P2 |
| ArticlePage bypasses service layer | Inconsistent error handling | P2 |
| No request cancellation on unmount | Potential stale state updates | P2 |
| No 404 catch-all route | Blank page on unknown URLs | P3 |
| Double console.error logging | Noisy dev console | P3 |

## File Map

```
src/
├── main.jsx                          # Entry: BrowserRouter + LanguageProvider
├── App.jsx                           # Routes + persistent Navbar
├── index.css                         # Tailwind @theme + neo-brutalism utilities
├── pages/
│   ├── Home.jsx                      # Hero + 6 sections + Footer
│   └── ArticlePage.jsx               # Article detail page
├── components/
│   ├── layout/
│   │   ├── Navbar/Navbar.jsx         # Sticky nav + mobile menu + lang switcher
│   │   └── Footer.jsx                # Brand + socials
│   ├── Sections/
│   │   ├── About.jsx                 # Profile + education
│   │   ├── Skills.jsx                # Skill categories grid
│   │   ├── Experience.jsx            # Timeline layout
│   │   ├── Projects.jsx              # Grid + modal
│   │   ├── Articles.jsx              # Article cards
│   │   └── Contact.jsx               # Form + direct email
│   └── ui/
│       ├── Loading.jsx               # Loading, LoadingSkeleton, ErrorDisplay
│       ├── Card/Card.jsx             # (orphaned)
│       ├── Button/Button.jsx         # (orphaned)
│       ├── ExperienceCard.jsx        # (orphaned)
│       └── SkillTag.jsx              # (orphaned)
├── hooks/
│   └── usePortfolioData.js           # Generic fetch hook + all named hooks
├── services/
│   ├── api.js                        # HTTP client + all endpoint functions
│   └── portfolioService.js           # Service facade (unwrap envelope)
├── i18n/
│   ├── index.js                      # Locale registry
│   ├── useTranslation.jsx            # Provider + hook + t()/tl()
│   └── locales/{en,th,zh}.json       # Translation strings
├── data/
│   └── portfolio.js                  # navItems constant
└── utils/
    └── SEOHelper.jsx                 # Runtime <head> meta tag manager
```
