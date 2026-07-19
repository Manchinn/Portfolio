# Product Baseline

> Current as of 2026-07-20. Describes the implemented public product.

## Product

A static-first, bilingual software engineering portfolio. It presents selected full-stack work (problem / built / result on the homepage), implementation-oriented articles, and an external project inquiry handoff—without exposing personal contact details or private operational data.

## Users

- Hiring managers and technical reviewers evaluating implementation credibility.
- Founders and collaborators deciding whether to start a software project conversation.
- English- and Thai-speaking visitors scanning work, capabilities, and technical writing.

## Primary Journey

```text
Landing page
  -> review selected work and capabilities
  -> open a technical article (optional)
  -> open the public GitHub inquiry link
```

Article routes provide a secondary path into the same external inquiry handoff. There is no separate work-detail route, local brief builder, or `/saas` product page.

## Product Purpose

The site positions the work as software engineering and full-stack systems delivery. Success means a visitor can understand what was built, scan public-safe proof on the homepage, and reach the project inquiry handoff without the portfolio storing their brief.

## Routes in Product

| Route | Role |
|-------|------|
| `/` | One-page portfolio (hero, selected work, capabilities, articles, contact) |
| `/article/[slug]` | Statically generated technical article |
| `/sitemap.xml` | Static sitemap |

**Retired (do not restore without explicit product approval):** `/saas`, `/work/[slug]`, `/work-with-me`.

## Current Content Contract

- English and Thai are the only supported languages (client language switch; no locale-prefixed routes).
- Project and article entities live in `src/data/portfolio.ts` with matching slugs across locales.
- Shared chrome CTAs/labels: `src/content/shared.ts`.
- Homepage marketing sections: `src/content/home.ts`.
- Nav chrome labels: `src/i18n/locales/*.json`.
- Contact CTAs open `publicContactUrl` (public GitHub Issues). The app does not collect or store inquiry form data.
- Public copy stays anonymized and must not expose credentials, private URLs, personal contact data, or nonpublic infrastructure details.

## Brand Personality

Clear, practical, and trustworthy. The voice is implementation-led and composed, with enough technical detail to establish credibility without presenting the portfolio as a fictional software company.

## Visual Direction

Soft-pixel level A: warm paper palette, 2px block borders, offset shadows, Silkscreen on labels/chrome only, IBM Plex Sans for body. Exact tokens live in `DESIGN.md` and `src/app/globals.css`.

## Design Principles

1. Show evidence before decoration: lead from the problem, implementation, and result on the homepage.
2. Keep the path to contact explicit: homepage and shell CTAs reach the public GitHub inquiry URL or `#contact`.
3. Keep the public surface safe: this app does not store inquiry form data.
4. Keep both languages equivalent: changes to projects, articles, navigation, and marketing copy must be checked in EN and TH.
5. Make technical work scannable: clear hierarchy, restrained motion, short labels, stable responsive layouts.

## Non-goals

- No admin panel, CMS, runtime portfolio API, database, analytics write, or server-side lead storage.
- No `/saas`, `/work/[slug]`, or `/work-with-me` product surfaces unless explicitly restored.
- No in-app form submission/storage path unless product scope reopens it.
- No generic AI product claims that are not demonstrated by the current public work.
- No private contact details or operational internals in source-controlled public copy.

## Accessibility Baseline

Visible keyboard focus styles, semantic controls, responsive layouts, language-aware document state, and reduced-motion handling. Target WCAG AA contrast and bilingual text fit at mobile widths.
