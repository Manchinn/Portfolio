# Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate portfolio frontend from Vite React SPA to Next.js App Router with all data embedded statically (no backend).

**Architecture:** Single Next.js 15 app with App Router. All portfolio data imported as typed TypeScript modules. Client-side i18n via React Context (en/th). Deployed on Vercel with SSG.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, lucide-react

---

### Task 1: Scaffold Next.js project in-place

**Files:**
- Create: `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`
- Modify: `package.json`
- Delete: `vite.config.js`, `eslint.config.js`, `index.html`

- [ ] **Step 1: Create a new branch**

```bash
cd C:/Users/chinn/portfolio/frontend
git checkout -b feat/nextjs-migration
```

- [ ] **Step 2: Remove Vite-specific files**

```bash
rm vite.config.js index.html
```

- [ ] **Step 3: Replace package.json dependencies**

Replace the full `package.json` content:

```json
{
  "name": "portfolio",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "lucide-react": "^0.562.0",
    "next": "^15.3.1",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.4",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "tailwindcss": "^4.1.4",
    "typescript": "^5.8.3"
  }
}
```

- [ ] **Step 4: Create next.config.ts**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {}

export default nextConfig
```

- [ ] **Step 5: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 6: Create postcss.config.mjs**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}

export default config
```

- [ ] **Step 7: Install dependencies**

```bash
rm -rf node_modules package-lock.json
npm install
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 project, remove Vite config"
```

---

### Task 2: Create TypeScript data layer

**Files:**
- Create: `src/data/types.ts`, `src/data/portfolio.ts` (overwrite existing)
- Source: `../../backend/data/portfolioData.js` (reference only, not modified)

- [ ] **Step 1: Create `src/data/types.ts`**

```ts
export interface Profile {
  name: string
  title: string
  bio: string
  shortBio: string
  location: string
}

export interface ProfileCommon {
  image: string
  email: string
  phone: string
  resume: string
}

export interface SkillItem {
  name: string
  level: string
}

export interface SkillGroup {
  category: string
  items: SkillItem[]
}

export interface Experience {
  id: number
  year: string
  position: string
  company: string
  description: string
  achievements: string[]
}

export interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  tech: string[]
  image: string
  github: string
  demo: string
  date: string
  category: string
  highlights: string[]
}

export interface Social {
  name: string
  url: string
  icon: string
  color: string
}

export interface Article {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  tags: string[]
  category: string
  readTime: string
  date: string
  featured: boolean
}

export type Language = 'en' | 'th'

export interface LocalizedData<T> {
  en: T
  th: T
}
```

- [ ] **Step 2: Create `src/data/portfolio.ts`**

Copy the entire content of `backend/data/portfolioData.js` into this file, converting to TypeScript. Remove all `zh` keys. Add types to all exports. Keep `navItems` from the existing `src/data/portfolio.js`. Structure:

```ts
import type { Profile, ProfileCommon, SkillGroup, Experience, Project, Social, Article, Language, LocalizedData } from './types'

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
]

export const profile: LocalizedData<Profile> = {
  en: { name: "Chinnakrit Sripan", title: "Frontend Developer / Full-stack Developer", /* ... full data from backend ... */ },
  th: { /* ... full th data ... */ },
}

export const profileCommon: ProfileCommon = {
  image: "/profile/profile2.jpeg",
  email: "chinnakrit.srp@gmail.com",
  phone: "+66 94 665 0259",
  resume: "/Chinnakrit-Sripan_CV.pdf",
}

export const skills: LocalizedData<SkillGroup[]> = { en: [/* ... */], th: [/* ... */] }
export const experiences: LocalizedData<Experience[]> = { en: [/* ... */], th: [/* ... */] }
export const projects: LocalizedData<Project[]> = { en: [/* ... */], th: [/* ... */] }
export const socials: Social[] = [/* ... */]
export const articles: LocalizedData<Article[]> = { en: [/* ... */], th: [/* ... */] }

// Helper to get data by language
export const getData = (lang: Language) => ({
  profile: { ...profile[lang], ...profileCommon },
  skills: skills[lang],
  experiences: experiences[lang],
  projects: projects[lang],
  articles: articles[lang],
  socials,
})
```

The actual data values must be copied exactly from `backend/data/portfolioData.js`, removing only `zh` entries. The `image` path changes from `/static/profile/profile2.jpeg` to `/profile/profile2.jpeg` (Next.js serves from `public/`).

- [ ] **Step 3: Commit**

```bash
git add src/data/
git commit -m "feat: add typed portfolio data layer (en/th)"
```

---

### Task 3: Move static assets

**Files:**
- Copy: `../../backend/public/profile/*` → `public/profile/`

- [ ] **Step 1: Copy profile images**

```bash
mkdir -p public/profile
cp ../../backend/public/profile/* public/profile/
```

- [ ] **Step 2: Verify files exist**

```bash
ls public/profile/
```

Expected: `profile1.jpg`, `profile2.jpeg`, `profile-placeholder.svg`

- [ ] **Step 3: Commit**

```bash
git add public/
git commit -m "chore: move profile images from backend to public/"
```

---

### Task 4: Set up i18n (en/th only)

**Files:**
- Modify: `src/i18n/index.ts` (rename from .js)
- Modify: `src/i18n/useTranslation.ts` (rename from .js)
- Modify: `src/i18n/useTranslation.tsx` (rename from .jsx)
- Modify: `src/i18n/locales/en.json`, `src/i18n/locales/th.json`
- Delete: `src/i18n/locales/zh.json`

- [ ] **Step 1: Rename files to .ts/.tsx**

```bash
cd src/i18n
mv index.js index.ts
mv useTranslation.js useTranslation.ts
mv useTranslation.jsx useTranslation.tsx
rm locales/zh.json
```

- [ ] **Step 2: Update `src/i18n/index.ts`**

```ts
import en from './locales/en.json'
import th from './locales/th.json'

export const translations: Record<string, Record<string, unknown>> = { en, th }

export const languages = [
  { code: 'en' as const, name: 'EN', nativeName: 'English' },
  { code: 'th' as const, name: 'TH', nativeName: 'ไทย' },
]
```

- [ ] **Step 3: Update `src/i18n/useTranslation.ts`**

```ts
'use client'

import { createContext, useContext } from 'react'

export interface TranslationContext {
  t: (key: string) => string
  tl: (translations: Record<string, string>) => string
  language: string
  changeLanguage: (lang: string) => void
  languages: { code: string; name: string; nativeName: string }[]
}

export const LanguageContext = createContext<TranslationContext | null>(null)

export const useTranslation = (): TranslationContext => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}
```

- [ ] **Step 4: Update `src/i18n/useTranslation.tsx`**

Add `'use client'` directive at top. Remove zh references. Keep the same LanguageProvider logic, add TypeScript types. Import from `./useTranslation` for LanguageContext.

```tsx
'use client'

import { useState, useEffect } from 'react'
import { translations, languages } from './index'
import { LanguageContext } from './useTranslation'

const getInitialLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio-language')
    if (saved && translations[saved]) return saved
  }
  return 'en'
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: unknown = translations[language]
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[k]
      } else {
        let fallback: unknown = translations['en']
        for (const k2 of keys) {
          if (fallback && typeof fallback === 'object') {
            fallback = (fallback as Record<string, unknown>)[k2]
          } else return key
        }
        return (typeof fallback === 'string' ? fallback : key)
      }
    }
    return (typeof value === 'string' ? value : key)
  }

  const tl = (translationsObj: Record<string, string>): string => {
    return translationsObj[language] || translationsObj['en'] || Object.values(translationsObj)[0]
  }

  const changeLanguage = (lang: string) => {
    if (translations[lang]) setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ t, tl, language, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}
```

- [ ] **Step 5: Remove zh entries from locale JSONs**

Remove `notFound` zh references in components later. Locale files themselves don't have zh — they're per-language files. No change needed to en.json/th.json.

- [ ] **Step 6: Commit**

```bash
git add src/i18n/
git commit -m "feat: convert i18n to TypeScript, remove zh locale"
```

---

### Task 5: Create App Router layout and pages

**Files:**
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/not-found.tsx`, `src/app/globals.css`
- Create: `src/app/article/[slug]/page.tsx`
- Delete: `src/main.jsx`, `src/App.jsx`, `src/index.css`, `src/pages/` (all files)

- [ ] **Step 1: Create `src/app/globals.css`**

Move content from `src/index.css` (the existing Tailwind imports and custom styles). Add `@import "tailwindcss";` at the top.

```css
@import "tailwindcss";

/* Copy all existing custom CSS from src/index.css — theme variables, neo-brutalist shadows, etc. */
```

- [ ] **Step 2: Create `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { LanguageProvider } from '@/i18n/useTranslation'
import Navbar from '@/components/layout/Navbar/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chinnakrit Sripan — Portfolio',
  description: 'Frontend Developer / Full-stack Developer portfolio showcasing projects and skills.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Create `src/app/page.tsx`**

Convert `src/pages/Home.jsx` → server-friendly page. Import data directly instead of `useProfile`. Mark as `'use client'` since it uses `useTranslation` context.

```tsx
'use client'

import { ArrowRight, Github, Linkedin, Mail, Check } from 'lucide-react'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Articles from '@/components/sections/Articles'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import { useTranslation } from '@/i18n/useTranslation'
import { profileCommon } from '@/data/portfolio'
import type { Language } from '@/data/types'
import { profile } from '@/data/portfolio'

export default function Home() {
  const { t, language } = useTranslation()
  const profileData = { ...profile[language as Language], ...profileCommon }

  return (
    <div className="font-sans text-black bg-neo-cream min-h-screen selection:bg-black selection:text-white">
      {/* Hero section — same JSX as current Home.jsx but using profileData directly */}
      <header id="home" className="relative overflow-hidden scroll-mt-20 py-20 bg-neo-cream">
        {/* ... exact same hero JSX from current Home.jsx ... */}
      </header>
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Articles />
      <Contact />
      <Footer />
    </div>
  )
}
```

Copy the full hero JSX from the current `Home.jsx`, replacing `profile.shortBio` with `profileData.shortBio` and `profile.email` with `profileData.email`.

- [ ] **Step 4: Create `src/app/article/[slug]/page.tsx`**

Convert `ArticlePage.jsx`. Replace `useArticle` hook and `useParams` with data imports and Next.js `params`. Add `generateStaticParams`.

```tsx
import { notFound } from 'next/navigation'
import { articles } from '@/data/portfolio'
import ArticleContent from './ArticleContent'

export function generateStaticParams() {
  return articles.en.map((article) => ({ slug: article.slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.en.find(a => a.slug === slug)
  if (!article) notFound()

  return <ArticleContent slug={slug} />
}
```

Create `src/app/article/[slug]/ArticleContent.tsx` as a `'use client'` component with the full article rendering logic (converted from current ArticlePage.jsx, using direct data import instead of API fetch).

- [ ] **Step 5: Create `src/app/not-found.tsx`**

```tsx
'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/useTranslation'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-neo-cream flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-block bg-neo-red-light border-4 border-black px-8 py-4 shadow-neo-lg mb-8">
          <h1 className="text-8xl sm:text-9xl font-black text-black leading-none">404</h1>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-black uppercase mb-4">
          {t('notFound.title')}
        </h2>
        <p className="font-mono text-lg text-gray-700 mb-10 max-w-md mx-auto border-l-4 border-black pl-4 text-left">
          {t('notFound.description')}
        </p>
        <Link href="/" className="inline-block bg-neo-orange text-black border-2 border-black px-8 py-4 font-black text-lg shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo transition-all uppercase">
          {t('notFound.backToHome')}
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Delete old files**

```bash
rm src/main.jsx src/App.jsx src/index.css
rm -rf src/pages/
rm -rf src/services/
rm -rf src/hooks/
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: create App Router layout and pages, remove old SPA files"
```

---

### Task 6: Convert components to TypeScript (sections)

**Files:**
- Rename + modify: all files in `src/components/sections/` (`.jsx` → `.tsx`)
- Rename: directory `Sections` → `sections` (lowercase, Next.js convention)

For each component: add `'use client'` directive, replace `useProfile`/`useSkills`/etc hooks with direct data imports from `@/data/portfolio`, remove Loading/ErrorDisplay states (data is always available), add TypeScript types, replace `react-router-dom` `Link` with `next/link`, remove all `zh` from `tl()` calls.

- [ ] **Step 1: Rename directory**

```bash
mv src/components/Sections src/components/sections
```

- [ ] **Step 2: Convert About.tsx**

Key changes:
- Remove `useProfile` import → import `{ profile, profileCommon }` from `@/data/portfolio`
- Remove loading/error states
- Use `const profileData = { ...profile[language as Language], ...profileCommon }`
- Use `next/image` for profile image
- Remove zh from tl() calls

- [ ] **Step 3: Convert Skills.tsx**

Key changes:
- Remove `useSkills` → import `{ skills }` and use `skills[language as Language]`
- Remove loading/error states
- Remove `softSkillsZh`
- Remove zh from tl() calls

- [ ] **Step 4: Convert Experience.tsx**

Key changes:
- Remove `useExperiences` → import `{ experiences }` and use `experiences[language as Language]`
- Remove loading/error states
- Remove zh from tl() calls

- [ ] **Step 5: Convert Projects.tsx**

Key changes:
- Remove `useProjects` → import `{ projects }` and use `projects[language as Language]`
- Remove loading/error states
- Replace `Link` from react-router-dom with `next/link`
- Remove zh from tl() calls

- [ ] **Step 6: Convert Articles.tsx**

Key changes:
- Remove `useArticles` → import `{ articles }` and use `articles[language as Language]`
- Remove loading/error states
- Replace `Link` from react-router-dom with `next/link` Link
- Remove zh from tl() calls

- [ ] **Step 7: Convert Contact.tsx**

Key changes:
- Remove `useProfile` and `submitContact` imports
- Import `profileCommon` from `@/data/portfolio`
- Use `profileCommon.email` directly
- Remove loading/error states
- Form submit: show "Coming soon" or disable, remove API call
- Remove zh from tl() calls

- [ ] **Step 8: Commit**

```bash
git add src/components/sections/
git commit -m "feat: convert section components to TSX with static data"
```

---

### Task 7: Convert layout and UI components

**Files:**
- Modify: `src/components/layout/Navbar/Navbar.jsx` → `.tsx`
- Modify: `src/components/layout/Footer.jsx` → `.tsx`
- Modify: `src/components/ui/Loading.jsx` → `.tsx`
- Delete: `src/components/ui/NotificationBell.jsx`

- [ ] **Step 1: Convert Navbar.tsx**

Key changes:
- Add `'use client'`
- Remove `NotificationBell` import and all `<NotificationBell />` usage (2 places: desktop + mobile)
- Filter `languages` to show only en/th (already done via i18n changes)
- Remove zh from tl() calls
- Add TypeScript types

- [ ] **Step 2: Convert Footer.tsx**

Key changes:
- Add `'use client'`
- Remove zh from tl() calls
- Add TypeScript types

- [ ] **Step 3: Convert Loading.tsx**

Key changes:
- Add `'use client'`
- Remove zh from tl() calls
- Add TypeScript prop types
- Keep this component for potential future use (skeleton loading, etc.)

- [ ] **Step 4: Delete NotificationBell**

```bash
rm src/components/ui/NotificationBell.jsx
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: convert layout/ui components to TSX, remove NotificationBell"
```

---

### Task 8: Verify build and fix errors

**Files:**
- Potentially any file with type errors

- [ ] **Step 1: Run build**

```bash
npm run build
```

Expected: may have type errors to fix.

- [ ] **Step 2: Fix any TypeScript errors**

Address each error. Common issues:
- Missing `'use client'` directives
- Import path mismatches (case sensitivity `Sections` vs `sections`)
- Missing type annotations
- `next/image` requires width/height or fill prop

- [ ] **Step 3: Run dev server and verify**

```bash
npm run dev
```

Open `http://localhost:3000` — verify all sections render. Navigate to an article page. Check 404 page.

- [ ] **Step 4: Commit fixes**

```bash
git add -A
git commit -m "fix: resolve TypeScript and build errors"
```

---

### Task 9: Clean up and finalize

**Files:**
- Modify: `CLAUDE.md`
- Delete: `eslint.config.js` (if still exists, replaced by Next.js lint)

- [ ] **Step 1: Update CLAUDE.md**

Update to reflect Next.js architecture — remove references to Vite, API fetching, services layer.

- [ ] **Step 2: Remove unused docs**

```bash
rm -f eslint.config.js
rm -f PORTFOLIO_README.md README_NEW.md API_INTEGRATION.md
```

- [ ] **Step 3: Final build verification**

```bash
npm run build
npm run lint
```

Both should pass cleanly.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: update docs and clean up legacy files"
```

- [ ] **Step 5: Push branch for Vercel preview**

```bash
git push -u origin feat/nextjs-migration
```

Verify Vercel preview deployment works at the preview URL. Once confirmed, merge to master.
