# Services & Hooks Architecture

> Scope: `src/services/` and `src/hooks/`

## Three-Tier Data Pipeline

```
Component → Named Hook → usePortfolioData → Service → API → fetchWithTimeout → fetch()
```

## API Layer (`src/services/api.js`)

- Base URL: `import.meta.env.VITE_API_URL || 'http://localhost:3000/api'`
- Timeout: 10s via `AbortController`
- Headers: `Content-Type: application/json`, `Accept-Language: <from localStorage>`
- Response envelope: `{ success: true, data }` or `{ success: false, error }`
- **Never rejects promises** — callers must check `response.success`

### Endpoints
| Function | Method | Path |
|----------|--------|------|
| `fetchProfile` | GET | `/profile` |
| `fetchSkills` | GET | `/skills` |
| `fetchExperiences` | GET | `/experiences` |
| `fetchProjects` | GET | `/projects` |
| `fetchSocials` | GET | `/socials` |
| `fetchArticles` | GET | `/articles` |
| `fetchFeaturedArticles` | GET | `/articles/featured` |
| `fetchArticleBySlug` | GET | `/articles/:slug` |
| `submitContactForm` | POST | `/contact` |
| `fetchAllPortfolioData` | parallel GET | all read endpoints via `Promise.all` |

## Service Layer (`src/services/portfolioService.js`)

Pure adapter: unwraps `{ success, data }` envelope → returns `data` on success, throws `Error` on failure. No business logic, no payload transformation.

## Hook Layer (`src/hooks/usePortfolioData.js`)

Generic hook: `usePortfolioData(fetchFunction) → { data, loading, error, refetch }`

- Fetches on mount and on language change
- Language detection: `window.storage` event (cross-tab) + 500ms polling (same-tab)
- Named hooks: `useProfile`, `useSkills`, `useExperiences`, `useProjects`, `useSocials`, `useArticles`, `useFeaturedArticles`, `useArticle(slug)`, `useAllPortfolioData`

## Error Handling (3 layers)

| Layer | Strategy |
|-------|----------|
| API | Catches all errors → returns `{ success: false }` + `console.error` |
| Service | Checks `success` flag → throws Error on failure |
| Hook | `try/catch` → sets `error` state + `console.error` |

**Issue:** Double `console.error` logging (API + hook layer)

## Known Issues
1. No request cancellation on unmount (no AbortController in useEffect cleanup)
2. No caching — every mount fires a fresh request
3. `ArticlePage.jsx` bypasses service layer with raw `fetch()`
4. `useArticle(slug)` creates unstable function ref on every render
5. 500ms localStorage polling is fragile (should use custom event)
