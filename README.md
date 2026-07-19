# Software Engineering Portfolio

Static-first, anonymous software engineering portfolio with bilingual English and Thai content. It presents project proof, technical articles, capabilities, and a privacy-conscious project inquiry workflow.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel deployment from `master`

The app has no backend, application API, runtime database, CMS, or required runtime environment variables.

## Routes

- `/` - portfolio home inside the shared navbar/footer shell
- `/work/[slug]` - statically generated project proof
- `/article/[slug]` - statically generated technical article
- `/work-with-me` - local browser workflow that copies a project brief and opens a public GitHub issue handoff
- `/saas` - compatibility redirect to `/#work`

## Source of Truth

- `src/data/portfolio.ts` - EN/TH navigation, projects, articles, and public contact URL
- `src/data/types.ts` - static content contracts
- `src/i18n/` - language provider, helpers, and UI locale files
- `src/app/(portfolio)/` - portfolio routes and shared shell
- `src/components/portfolio/` - main portfolio experience
- `next.config.ts` - global security headers and build-only directory override

Keep English and Thai records synchronized, including project and article slugs.

## Local Development

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```powershell
npm run build
powershell -ExecutionPolicy Bypass -File scripts/verify.ps1
powershell -ExecutionPolicy Bypass -File scripts/review.ps1
powershell -ExecutionPolicy Bypass -File scripts/deploy-check.ps1 -Env preview
```

`npm run build` uses `scripts/build.mjs`. If a local dev server is running on ports `3000` through `3003`, the wrapper builds into `.next-build-local` so it does not disturb the active `.next` directory. CI and Vercel use the normal build output.

## Content and Privacy

- Keep English and Thai user-facing content in sync.
- Keep public copy free of credentials, private URLs, personal data, and internal operational details.
- `/work-with-me` does not submit or store form content. Users review and copy the generated brief locally before opening the public issue channel.
- Use `npm run build` as the required completion gate for implementation changes.
