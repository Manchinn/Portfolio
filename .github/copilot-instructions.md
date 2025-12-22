# Copilot Instructions for This Repository

These instructions help AI coding agents work productively in this Vite + React + Tailwind portfolio codebase.

## Architecture Overview
- App shell: [src/main.jsx](src/main.jsx) mounts `App` under `BrowserRouter`; routes defined in [src/App.jsx](src/App.jsx).
- Pages & Sections: `Home` composes Section components in [src/pages/Home.jsx](src/pages/Home.jsx) and [src/components/Sections/*](src/components/Sections).
- Data access: Service layer toggles between API and static data.
  - API wrappers in [src/services/api.js](src/services/api.js) with `fetchWithTimeout()` and per-resource functions.
  - Uses backend API by default; falls back to [src/data/portfolio.js](src/data/portfolio.js) on failure with console warnings.
  - Hooks in [src/hooks/usePortfolioData.js](src/hooks/usePortfolioData.js) standardize `{ data, loading, error, refetch }` shape.
- Styling: Tailwind (see [tailwind.config.js](tailwind.config.js)) plus custom animations/utilities in [src/index.css](src/index.css). Design is neo‑brutalism (bold borders, `shadow-neo`).
- SEO: Lightweight meta updater in [src/utils/SEOHelper.jsx](src/utils/SEOHelper.jsx) for per-page tags.

## Local Dev & Build
- Scripts (see [package.json](package.json)):
  - Dev: `npm run dev` (Vite)
  - Build: `npm run build`
  - Preview: `npm run preview`
  - Lint: `npm run lint`
- Env flags (Vite-style):
  - Uses API; relies on `VITE_API_URL`.
  - `VITE_API_URL` = base URL like `https://your-backend.com/api`.
  - Create a `.env` from the guidance in [API_INTEGRATION.md](API_INTEGRATION.md).

## Data & API Patterns
- Prefer hooks for data access:
  - Example: `const { data: projects, loading, error, refetch } = useProjects()` from [src/hooks/usePortfolioData.js](src/hooks/usePortfolioData.js).
  - Render flow: show `Loading`/`ErrorDisplay` (see [API_INTEGRATION.md](API_INTEGRATION.md)), then map over `data`.
- Service behavior:
  - `portfolioService` calls `api.js`; on failure it logs a warning and returns static data.
  - `api.js` returns `{ success, data | error }`; do not throw in components—check `.success` or use the hook shape.
- Static assets referenced in [src/data/portfolio.js](src/data/portfolio.js) (e.g., `image`, `resume`) should exist in `public/`.

## Routing & Navigation
- Routes live in [src/App.jsx](src/App.jsx). Sections use hash anchors (e.g., `#about`, `#projects`).
- Navbar links are sourced from `navItems` in [src/data/portfolio.js](src/data/portfolio.js); ensure each item has a matching `id` on its Section.
- Use `BrowserRouter` (already set up). For new top-level pages, add a `<Route>` in `App.jsx` and a link in the navbar if needed.

## Styling Conventions
- Use Tailwind utility classes; keep the neo-brutalist look: thick borders (`border-4 border-black`), flat fills, and `shadow-neo`.
- Shared motion/utilities exist in [src/index.css](src/index.css) (e.g., `animate-fade-in`, `hover-shadow-lift`). Prefer these before adding new ad-hoc CSS.

## Common Tasks
- New API-backed Section:
  1) Add a service function or reuse `portfolioService` getter.
  2) Use the corresponding hook in a Section: `const { data, loading, error } = useX()`.
  3) Render `Loading`/error then content.
- Switch to real API:
  1) Add `.env` with `VITE_API_URL`.
  2) Ensure backend provides `/profile`, `/skills`, `/experiences`, `/projects`, `/socials`, `/contact` as in [API_INTEGRATION.md](API_INTEGRATION.md).
- Add a new nav item: update `navItems` in [src/data/portfolio.js](src/data/portfolio.js) and add a Section with that `id`.

## Notes & Gotchas
- React 19 + React Router 7 are in use; import `ReactDOM.createRoot` from `react-dom/client` (already wired in [src/main.jsx](src/main.jsx)).
- API timeouts default to 10s; adjust `API_TIMEOUT` in [src/services/api.js](src/services/api.js) if needed.
- Keep Thai copy intact unless explicitly asked to localize.
