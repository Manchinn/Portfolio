---
name: Product Studio Portfolio
description: Product Studio design baseline (EN/TH, static Astro, light theme + single indigo accent).
currentAsOf: "2026-09-02"
---

# Design Baseline: Product Studio Portfolio

This document records the current implemented design system for the static Astro portfolio. It replaced the retired **soft-pixel** baseline on 2026-09-02. It is a refactor baseline, not a freeze — when this document and source disagree, source is authoritative until both are updated together.

## 1. Direction

A clean, light **Product Studio** look: a single-page software-engineering portfolio with a light background, a single indigo action accent, generous whitespace, rounded cards, and subtle borders/shadows. It reads as modern product UI, not retro/game — intentionally distinct from the retired soft-pixel system.

## 2. Sources of Truth

| Concern | Implemented source |
|---------|--------------------|
| Color, radius, shadow, font tokens | `src/styles/global.css` (`@theme`) |
| Fonts and global metadata | `src/layouts/BaseLayout.astro` |
| Chrome/marketing copy (EN/TH) | `src/i18n/ui.ts` |
| Section/label/button primitives | `src/components/ui/` |
| Homepage composition | `src/components/home/HomePage.astro` |
| Content records | `src/content/projects/` (EN/TH populated) + `src/content/articles/` (empty) |
| Contact CTA (external) | `PUBLIC_CONTACT_URL` |
| Motion behavior | `src/components/motion/Reveal.astro` |

## 3. Color System

Light product neutrals, near-black ink, and a single indigo action family:

| Token | Value | Use |
|-------|-------|-----|
| `--color-bg` | `#fafafa` | Page background |
| `--color-surface` | `#ffffff` | Cards, panels, nav/footer |
| `--color-surface-soft` | `#f4f4f5` | Chips, subtle surfaces |
| `--color-ink` | `#18181b` | Primary text |
| `--color-muted` | `#52525b` | Secondary/support text |
| `--color-line` | `#e4e4e7` | Soft borders |
| `--color-line-strong` | `#d4d4d8` | Hover borders, scrollbar |
| `--color-accent` | `#4f46e5` | Primary actions, links, eyebrows |
| `--color-accent-strong` | `#4338ca` | Hover on filled actions |
| `--color-accent-soft` | `#eef2ff` | Selected backgrounds |
| `--color-on-accent` | `#ffffff` | Text/icons on filled accent |

No gradient, neon, or retro palette.

## 4. Typography

- **Sans (body/display):** Inter, with Noto Sans Thai fallback for Thai glyphs.
- **Mono (code/chips/meta):** JetBrains Mono.
- Eyebrows/labels use the mono face (`.eyebrow`), uppercase, ~12px, letter-spacing 0.12em, accent color.

Hierarchy:
- Hero: `text-4xl`→`sm:text-5xl`→`lg:text-6xl`, weight 600, tight tracking, line-height ~1.08.
- Section heading: `text-3xl`→`sm:text-4xl`→`lg:text-[2.5rem]`, weight 600.
- Body: ~1rem / 1.5–1.75.

Thai and English must wrap without clipping at mobile widths. Do not set Thai body copy in the mono face.

## 5. Layout and Surfaces

- Content width: `max-w-[1200px]`.
- Section padding: ~16 (px-5/py-16) across breakpoints.
- Cards: `--color-surface`, `border 1px var(--color-line)`, `border-radius var(--radius-lg)` (16px), `box-shadow var(--shadow-sm)`. Hover lifts with `--shadow-md` + `translateY(-2px)` (`card-hover`).
- The Work section renders each project as a non-navigational card (category eyebrow, title, description, a Problem → Built → Result case-study block, tech chips); a dashed empty-state card appears only when the `projects` collection is empty.

## 6. Controls

### Buttons and Links

Primary/secondary buttons: `border-radius var(--radius-md)` (12px), min-height 44px. Primary = accent fill + on-accent text + shadow; secondary = surface fill + border. Press/hover via `translateY(-1px)`.

### Navigation

Sticky navbar with translucent `--color-bg/85` + backdrop blur and a bottom border. Brand is a rounded accent tile with the monogram. The language switch is a bordered link to the alternate locale.

### Focus and Selection

Visible 2px accent outline with 2px offset on interactive controls; selection uses `--color-accent-soft`.

## 7. Motion

Hero-only stagger via `Reveal` (CSS `@keyframes`, delay per item). Work, capabilities, and contact render immediately. `prefers-reduced-motion` collapses durations globally.

## 8. Refactor Guardrails

- Preserve EN/TH parity and long Thai labels at mobile widths.
- Preserve focus, semantics, reduced-motion, and stable layout.
- Do not introduce secrets, private URLs, or personal contact details.
- Do not restore retired routes (`/saas`, `/work/[slug]`, `/work-with-me`, `/article/[slug]`) unless product scope reopens them.
- Update this document and `src/styles/global.css` together when tokens change.
- Do not reintroduce the retired soft-pixel system unless explicitly approved.

## 9. Exports

Runtime source of truth: `src/styles/global.css` `@theme`. A plain-CSS mirror is at root `tokens.css` (update it if you change tokens). The Tailwind v4 `@theme` block in `global.css` is the canonical implementation.
