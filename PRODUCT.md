# Product Baseline

> Current as of 2026-09-05. Describes the implemented public product (Astro + Machine Readout).

## Product

A static-first, bilingual (EN/TH) software engineering portfolio. It presents a hero, capabilities, an external project inquiry handoff, and a **Work section populated from the projects content collection** (EN/TH records). No personal contact details or private operational data are exposed.

## Users

- Hiring managers and technical reviewers evaluating implementation credibility.
- Founders and collaborators deciding whether to start a software project conversation.
- English- and Thai-speaking visitors scanning capabilities and work.

## Primary Journey

```text
Landing page
  -> review capabilities
  -> (once populated) review selected work
  -> open the public GitHub inquiry link
```

There is no separate work-detail route, article route, local brief builder, or `/saas` product page in the current build.

## Product Purpose

The site positions the work as software engineering and full-stack systems delivery. Success means a visitor understands the engineering capability, can scan public-safe proof, and reaches the project inquiry handoff without the portfolio storing their brief.

## Routes in Product

| Route | Role |
|-------|------|
| `/` | English one-page portfolio (hero, work, capabilities, contact) |
| `/th/` | Thai one-page portfolio |
| `/sitemap-index.xml` | Static sitemap |

**Retired (do not restore without explicit product approval):** `/saas`, `/work/[slug]`, `/work-with-me`, and the old Next.js `/article/[slug]`.

## Current Content Contract

- English and Thai are the only supported languages, via Astro i18n routing (`/` and `/th/`).
- Project and note entities live in content collections (`src/content/projects/{en,th}/`, `src/content/articles/{en,th}/`); both collections hold mirrored EN/TH records, and notes are curated from private working material before publication.
- Chrome + marketing copy lives in `src/i18n/ui.ts`.
- Contact CTAs open `PUBLIC_CONTACT_URL` (public GitHub Issues) from `src/data/types.ts`. The app does not collect or store inquiry form data.
- Public copy stays anonymized and must not expose credentials, private URLs, personal contact data, or nonpublic infrastructure details.

## Brand Personality

Clear, practical, and trustworthy. The voice is implementation-led and composed, with enough technical detail to establish credibility without presenting the portfolio as a fictional software company.

## Visual Direction

Machine Readout: pure white field, single cyan-blue accent (`#0071a9`), Courier Prime typewriter mono + Noto Sans Thai, dashed blueprint separators, flat radius-0 shapes. Exact tokens live in `DESIGN.md` and `src/styles/global.css`.

## Design Principles

1. Show evidence before decoration: lead from the problem, implementation, and result.
2. Keep the path to contact explicit: home and shell CTAs reach the public GitHub inquiry URL or `#contact`.
3. Keep the public surface safe: this app does not store inquiry form data.
4. Keep both languages equivalent: changes to copy and records must be checked in EN and TH.
5. Make technical work scannable: clear hierarchy, restrained motion, short labels, stable responsive layouts.

## Non-goals

- No admin panel, CMS, runtime portfolio API, database, analytics write, or server-side lead storage.
- No `/saas`, `/work/[slug]`, or `/work-with-me` product surfaces unless explicitly restored.
- No in-app form submission/storage path unless product scope reopens it.
- No generic AI product claims that are not demonstrated by the current public work.
- No private contact details or operational internals in source-controlled public copy.

## Accessibility Baseline

Visible keyboard focus styles, semantic controls, responsive layouts, language-aware document state, and reduced-motion handling. Target WCAG AA contrast and bilingual text fit at mobile widths.
