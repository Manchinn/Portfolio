# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Portfolio website for Chinnakrit Sripan — Next.js 15 App Router with TypeScript. All data is static (no backend API). Deployed on Vercel.

## Architecture

```
src/
  app/
    layout.tsx              → Root layout (Navbar, LanguageProvider)
    page.tsx                → Home page (Hero + all sections)
    article/[slug]/
      page.tsx              → SSG with generateStaticParams
      ArticleContent.tsx    → Client component for article rendering
    not-found.tsx           → 404 page
    globals.css             → Tailwind CSS + neo-brutalist theme
  components/
    layout/Navbar/Navbar.tsx → Sticky navbar with language switcher
    layout/Footer.tsx
    sections/               → About, Skills, Experience, Projects, Articles, Contact
    ui/Loading.tsx           → Loading spinner and error display
  data/
    portfolio.ts            → All portfolio data (en/th), single source of truth
    types.ts                → TypeScript interfaces
  i18n/
    LanguageContext.ts       → Context + useTranslation hook
    LanguageProvider.tsx     → Provider component (client-side, localStorage)
    useTranslation.ts        → Re-export (public API)
    locales/en.json, th.json → UI label translations
```

### Data Flow

Components import directly from `@/data/portfolio.ts`. Language selection via `useTranslation()` context picks en/th data. No API calls, no fetch hooks.

### Rendering

- `/` — Static (SSG)
- `/article/[slug]` — SSG via `generateStaticParams` from article slugs
- All section components are `'use client'` (use React context for i18n)

## Commands

```bash
npm run dev       # Next.js dev server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Next.js ESLint
```

## Key Libraries

- next 15, react 19, typescript
- tailwindcss 4 + @tailwindcss/postcss
- lucide-react (icons)

## Deployment

Vercel auto-deploys. Production domains: `chinnakrit.dev`, `www.chinnakrit.dev`

No environment variables needed (all data is static).
