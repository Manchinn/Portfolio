# Portfolio Migration: Vite React SPA → Next.js App Router

**Date:** 2026-04-03
**Status:** Approved
**Approach:** B — Next.js App Router with SSG on Vercel

## Goal

Consolidate frontend (Vite + React SPA) and backend (Express.js static JSON API) into a single Next.js App Router project. Eliminate the backend entirely — all data lives in the frontend as static imports.

## Scope

### In Scope
- Migrate frontend repo from Vite React to Next.js 15 App Router
- Move `portfolioData.js` from backend into frontend as typed TypeScript data
- Move profile images from `backend/public/` to `frontend/public/`
- Convert JSX → TSX with proper types
- Replace API fetch layer with direct data imports
- Add SEO metadata to all pages
- Use `next/image` for optimized images
- Keep i18n (en, th only) — client-side via LanguageContext
- Keep Tailwind CSS v4
- Keep neo-brutalist design system as-is

### Out of Scope (TODO for later)
- Contact form submission (external service integration)
- New features or design changes
- Backend repo deletion (deprecate only)

## Architecture

### Project Structure
```
frontend/
  src/
    app/
      layout.tsx              → Root layout (Navbar, Footer, LanguageProvider)
      page.tsx                → Home page (all sections)
      article/[slug]/page.tsx → Article detail
      not-found.tsx           → 404
    components/
      layout/                 → Navbar, Footer
      sections/               → About, Skills, Experience, Projects, Articles, Contact
      ui/                     → Loading, shared UI
    data/
      portfolio.ts            → All portfolio data (typed, en/th)
      types.ts                → TypeScript interfaces
    i18n/
      index.ts                → translations config (en, th)
      locales/en.json, th.json
      useTranslation.tsx      → LanguageContext + provider
    lib/
      utils.ts                → Shared utilities
  public/
    profile/                  → Profile images (from backend)
  next.config.ts
  package.json
  tsconfig.json
```

### Data Flow
```
Component → import from data/portfolio.ts → use language from LanguageContext to pick en/th
```

No API calls. No fetch hooks. No service layer.

### Routing

| Path | Rendering | Notes |
|------|-----------|-------|
| `/` | SSG | Home with all sections |
| `/article/[slug]` | SSG via `generateStaticParams` | Pre-rendered at build |
| `/*` | Static | 404 page |

### Removed Features
- NotificationBell component
- Todos (backend-only, no UI existed)
- zh (Chinese) locale
- `services/api.js`, `services/portfolioService.js`, `hooks/usePortfolioData.js`
- Backend repo (deprecated, not deleted)

### Contact Section
- Display email + social links
- Form UI preserved but submit disabled / "Coming soon" state
- Future: integrate Formspree or Web3Forms

### Deployment
- Same Vercel project as current frontend
- Domain `chinnakrit.dev` / `www.chinnakrit.dev` unchanged
- Next.js auto-detected by Vercel — no special config needed
- Remove `VITE_API_URL` env var (no longer needed)

## Key Dependencies
- next 15
- react 19
- tailwindcss 4 + @tailwindcss/postcss
- react-router-dom → removed (Next.js has built-in routing)
- lucide-react — keep
- typescript — add

## Migration Strategy
- Work in the existing frontend repo on a new branch
- Incremental migration: scaffold Next.js → move components → convert to TSX → test → deploy
- Keep current Vite app on `master` until migration branch is verified on Vercel preview
