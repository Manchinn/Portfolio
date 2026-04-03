# Component Architecture

> Scope: `src/components/` and `src/pages/`

## Component Tree

```
main.jsx → BrowserRouter → LanguageProvider → App
  ├── Navbar (persistent, all routes)
  └── Routes
      ├── "/" → Home
      │   ├── Hero (inline JSX, ~70 lines)
      │   ├── About, Skills, Experience, Projects, Articles, Contact
      │   └── Footer
      ├── "/article/:slug" → ArticlePage
      ├── "/projects" → stub <div>
      └── "/contact" → stub <div>
```

## UI Patterns

### Section Pattern (all 6 sections follow this)
```jsx
if (loading) return <Loading />
if (error) return <ErrorDisplay error={error} onRetry={refetch} />
if (!data) return <div>No data</div>
return <section id="..." className="py-20 border-t-4 border-black scroll-mt-20">...</section>
```

### Neo-Brutalism Design System
- `border-4 border-black` — bold borders
- `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]` — flat offset shadows
- `font-black uppercase` — bold typography
- `hover:translate-x-[2px] hover:translate-y-[2px]` — press effect
- Pastel accent palette: `#FFADAD`, `#FFD6A5`, `#FDFFB6`, `#CAFFBF`, `#BDB2FF`

## State Management

| Layer | Mechanism |
|-------|-----------|
| Global (language) | `LanguageContext` via `useTranslation` |
| Server/async data | `usePortfolioData` custom hook per section |
| Local UI | `useState` (menu toggles, modals, form fields) |

No Redux, Zustand, or React Query.

## Styling
- Tailwind CSS v4 with `@theme` block in `src/index.css`
- Custom tokens: `--color-neo-yellow`, `--shadow-neo`, etc.
- No CSS Modules — 100% utility classes

## Orphaned Components (defined but never imported)
- `Card`, `Button`, `ExperienceCard`, `SkillTag` in `src/components/ui/`

## Issues
1. Hero section not componentised (~70 lines inline in Home.jsx)
2. Duplicate `useProfile()` calls in Home, About, Contact (3 identical API calls)
3. No 404 catch-all route
4. `/projects` and `/contact` routes are stubs
