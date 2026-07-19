# Copilot / coding-agent instructions

This repository is a **static-first Next.js 15** bilingual portfolio.

## Read first (source of truth)

1. `AGENTS.md`
2. `PRODUCT.md`
3. `CONTEXT.md`
4. `DESIGN.md`
5. `docs/architecture/OVERVIEW.md`
6. `docs/agents/MEMORY.md`
7. `CHANGELOG.md`

## Current product surface

- `/` — one-page portfolio (selected work, capabilities, articles, contact)
- `/article/[slug]` — static article routes
- Contact CTAs open `publicContactUrl` (public GitHub Issues). No in-app form storage.

## Do not revive without explicit user approval

- Backend / API / CMS / admin / blob store / AI provider
- `/saas`, `/work/[slug]`, `/work-with-me`
- Vite + Express architecture, FlowSync SaaS landing, prompts library

## Implementation rules

- Keep EN/TH parity for user-facing content
- Content entities live in `src/data/portfolio.ts`
- Shared chrome copy: `src/content/shared.ts`
- Gate with `npm run build` (via `scripts/build.mjs`)
