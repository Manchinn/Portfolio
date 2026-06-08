# Chinnakrit Portfolio Frontend

Next.js portfolio for Chinnakrit Sripan, focused on AI automation, full-stack systems, source-of-truth project proof, and bilingual EN/TH content.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel deployment from `master`

## Key Paths

- `src/data/portfolio.ts` - bilingual portfolio content source of truth
- `src/app/(portfolio)/` - main portfolio, articles, and lead-capture pages
- `src/app/saas/` - standalone FlowSync SaaS landing page demo

## Local Commands

```powershell
npm run dev
npm run build
```

Use `npm run build` before considering implementation work complete.

## Content Rules

- Keep English and Thai content in sync in `src/data/portfolio.ts`.
- Keep public copy sanitized.
- Do not expose credentials, private URLs, internal route behavior, or nonpublic network details.
- Add API logic under `src/app/api/*`; do not recreate a separate `backend/` folder.
