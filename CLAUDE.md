# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Portfolio frontend — React 19 SPA with Vite and Tailwind CSS v4. JSX (not TypeScript). Fetches all data from the backend API.

## Architecture

```
src/
  App.jsx                          → Root component with react-router-dom v7
  main.jsx                         → Entry point
  pages/
    Home.jsx, ArticlePage.jsx, NotFound.jsx
  components/
    layout/   → Navbar, Footer
    Sections/ → About, Skills, Experience, Projects, Articles, Contact
    ui/       → Loading, NotificationBell
  services/
    api.js              → fetch wrapper with timeout, reads VITE_API_URL
    portfolioService.js → service layer wrapping api.js calls
  hooks/
    usePortfolioData.js → React hook for data fetching
  i18n/
    index.js, useTranslation.js → i18n, language in localStorage (key: portfolio-language)
  data/
    portfolio.js → static/fallback data
```

### Data Flow

`Component → usePortfolioData hook → portfolioService → api.js (fetch) → Backend /api/*`

All API responses have `{ success, data }` shape. Language sent via `Accept-Language` header.

## Commands

```bash
npm install
npm run dev       # vite dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview production build
npm run lint      # eslint
```

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000/api` |

## Key Libraries

- `react-router-dom` v7 — routing
- `lucide-react` — icons
- `@tailwindcss/vite` — Tailwind CSS v4 Vite plugin

## Deployment

Vercel auto-deploys. Standard Vite build.

- Production domains: `chinnakrit.dev`, `www.chinnakrit.dev`
