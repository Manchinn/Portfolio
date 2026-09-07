# Product Baseline

> Current as of 2026-09-07. Describes the implemented public product (Astro + Fuwari).

## Product

A static-first, bilingual (EN/TH) personal site for curated notes, runbooks, and project records. Every public route uses the real Fuwari Astro template shell: banner, navbar, profile sidebar, categories/tags, post cards, TOC, theme controls, and back-to-top. Portfolio-specific hero, Work, and Capabilities content is adapted into that shell. Published content is read from Supabase Postgres at build time (edited via the owner-only `/admin` SPA, auto-rebuild on publish); a minimal contact form posts to the `submit-contact` Edge Function with an owner-only inbox. No analytics or visitor tracking.

## Users

- Hiring managers and technical reviewers evaluating implementation credibility.
- Readers looking for practical notes and runbooks.
- English- and Thai-speaking visitors scanning capabilities and work.

## Primary Journey

```text
Landing page
  -> read notes and runbooks
  -> review selected work (index + detail) and capabilities as they are published
  -> contact via the minimal form (owner-only inbox)
```

There is no separate local brief builder or `/saas` product page in the current build. Notes use the Fuwari post-card and Markdown detail surfaces; work uses a Fuwari-style index plus localized detail routes.

## Product Purpose

The site records learning, experiments, and reviewed project details in a public-safe format. Success means a visitor can understand what has been documented and move between the bilingual notes and project archive.

## Routes in Product

| Route | Role |
|-------|------|
| `/` | English one-page home (notes-first hero, work, capabilities, contact) |
| `/th/` | Thai one-page portfolio |
| `/posts/` | English notes and runbook index |
| `/th/posts/` | Thai notes and runbook index |
| `/posts/[slug]/` | English static note detail |
| `/th/posts/[slug]/` | Thai static note detail |
| `/work/` | English project index (Fuwari style) |
| `/th/work/` | Thai project index |
| `/work/[slug]/` | English static project detail |
| `/th/work/[slug]/` | Thai static project detail |
| `/about/`, `/th/about/` | Localized about pages |
| `/archive/`, `/th/archive/` | Localized archive pages |
| `/admin/` | Owner-only SPA (content editing + submissions inbox, `noindex`) |
| `/sitemap-index.xml` | Static sitemap |

**Retired (do not restore without explicit product approval):** `/saas`, `/work-with-me`, and the old Next.js `/article/[slug]`.

## Current Content Contract

- English and Thai are the only supported languages, via Astro i18n routing (`/` and `/th/`).
- Project and note entities live in content collections (`src/content/projects/{en,th}/`, `src/content/articles/{en,th}/`); both collections hold mirrored EN/TH records, and notes are curated from private working material before publication.
- At build time, published content is read from Supabase Postgres (`src/lib/cms.ts`, publishable key only, RLS-guarded) with a fallback to local collections; editing happens in `/admin`, and publish/unpublish auto-rebuilds production via the deploy-hook trigger.
- Chrome + marketing copy lives in `src/i18n/ui.ts`.
- The only contact path is the minimal form (`submit-contact` Edge Function → `contact_submissions` → `/admin` inbox). Do not expand it into analytics, visitor profiles, or tracking without explicit product approval.
- Public copy stays anonymized and must not expose credentials, private URLs, personal contact data, or nonpublic infrastructure details.

## Brand Personality

Clear, practical, and trustworthy. The voice is implementation-led and composed, with enough technical detail to establish credibility without presenting the portfolio as a fictional software company.

## Visual Direction

Fuwari theme: responsive banner and main grid, rounded content surfaces, profile/sidebar widgets, hue-driven light/dark colors, post cards, and article TOC. The portfolio's existing cyan/blue readout artwork remains in the localized OG banner cards and section content. Exact tokens and layout rules live in `DESIGN.md`, `src/config.ts`, `src/layouts/`, and `src/styles/global.css`.

## Design Principles

1. Show evidence before decoration: lead from reviewed notes and concrete project details.
2. Keep notes discoverable: home and shell CTAs reach the localized notes index.
3. Use one shared Fuwari shell across home, archive, and detail routes.
4. Keep the public surface safe: publish only reviewed, sanitized content.
5. Keep both languages equivalent: changes to copy and records must be checked in EN and TH.
6. Make technical work scannable: clear hierarchy, restrained motion, short labels, stable responsive layouts.

## Non-goals

- No runtime portfolio API, analytics write, or server-side lead storage beyond the existing minimal contact intake.
- No `/saas` or `/work-with-me` product surfaces unless explicitly restored.
- No new contact, lead-capture, or project-intake path beyond the existing minimal form unless product scope reopens it.
- No generic AI product claims that are not demonstrated by the current public work.
- No private contact details or operational internals in source-controlled public copy.

## Accessibility Baseline

Visible keyboard focus styles, semantic controls, responsive layouts, language-aware document state, and reduced-motion handling. Target WCAG AA contrast and bilingual text fit at mobile widths.
