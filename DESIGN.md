---
name: Machine Readout Portfolio
description: Machine Readout design baseline (EN/TH, static Astro, white field + single cyan-blue + typewriter mono).
currentAsOf: "2026-09-03"
---

# Design Baseline: Machine Readout Portfolio

This document records the current implemented design system for the static
Astro portfolio. It replaced the **Product Studio** baseline on 2026-09-03.
It is a refactor baseline, not a freeze — when this document and source
disagree, source is authoritative until both are updated together.

## 1. Direction

A flat, technical-editorial **machine readout** look: a pure white field, a
single cyan-blue accent, typewriter monospace type, dashed blueprint
separators, and sharp (radius-0) geometry. It reads like a system diagnostic /
lab manual — deliberately distinct from the retired soft-pixel system and from
generic clean-SaaS templates.

## 2. Sources of Truth

| Concern | Implemented source |
|---------|--------------------|
| Color, radius, shadow, font tokens | `src/styles/global.css` (`@theme`; mirror at root `tokens.css`) |
| Fonts and global metadata | `src/layouts/BaseLayout.astro` |
| Chrome/marketing copy (EN/TH) | `src/i18n/ui.ts` |
| Section/label/button primitives | `src/components/ui/` |
| Homepage composition | `src/components/home/HomePage.astro` |
| Content records | `src/content/projects/` (EN/TH populated) + `src/content/articles/` (empty) |
| Contact CTA (external) | `PUBLIC_CONTACT_URL` |
| Motion behavior | `src/components/motion/Reveal.astro` |

## 3. Color System

Single-colour system — one cyan-blue acts as text, accent, and line colour on
a pure white field. No secondary accent, no gradients, no neon.

| Token | Value | Use |
|-------|-------|-----|
| `--color-bg` | `#ffffff` | Page background |
| `--color-surface` | `#ffffff` | Nav/footer, panels |
| `--color-surface-soft` | `#eef6fa` | Subtle chip/hover surfaces |
| `--color-ink` | `#0071a9` | Primary text and headings |
| `--color-muted` | `#2d7ca4` | Secondary/support text (≈4.6:1, AA) |
| `--color-line` | `#8fc2dc` | Dashed separators, hairlines |
| `--color-line-strong` | `#4da0c7` | Solid outlines, hover borders |
| `--color-accent` | `#0071a9` | Only accent: actions, links, eyebrows |
| `--color-accent-strong` | `#005a8a` | Hover on filled actions |
| `--color-accent-soft` | `#eaf4f9` | Selected/highlight backgrounds |
| `--color-on-accent` | `#ffffff` | Text on filled accent |

## 4. Typography

- **Typeface:** Courier Prime (typewriter mono) for Latin glyphs; Noto Sans
  Thai (fallback) carries Thai glyphs. The body default (`--font-sans`) is the
  same mono stack — the whole page speaks the "machine readout" voice.
- `.display`: mono, weight 400, uppercase, letter-spacing ~0.06em,
  line-height ~1.08 — hero + section headings. Thai headings keep natural
  case (Noto Sans Thai has no capitals) but inherit the same rhythm.
- `.eyebrow`: mono, ~0.72rem, uppercase, tracking 0.14em, accent colour.
- Body: ~1rem / 1.5–1.75.

Thai and English must wrap without clipping at mobile widths; Thai always
falls back to Noto Sans Thai glyphs.

## 5. Layout and Surfaces

- **Content width:** full viewport with fluid gutters via the `--u` unit —
  `--hw-gutter: max(calc(110 * var(--u)), 1.25rem)`,
  `--u: max(calc(100cqw / 1440), var(--u-anchor))` (desktop 1440px artboard;
  mobile re-anchors to a 760px artboard with `min()`).
- Section vertical padding ~`calc(96 * var(--u))`.
- **Flat:** no cards, boxes, shadows, or filled borders. The only structure is
  `1px dashed` lines in `--color-line` (blueprint separators).
- The Work section renders each project as a flat row: a duotone figure
  placeholder (`placeholder-fig`), the story (category, title, description,
  Problem → Built → Result), and a system readout (`REF` / `TECH` / `CASE` +
  line icon), separated by dashed lines. A dashed empty-state block appears
  only when the `projects` collection is empty.
- `placeholder-fig`: 4:3 blue-duotone gradient block, dashed border, and a
  language-aware caption (`FIG — IMAGE PLACEHOLDER`) awaiting real images.

## 6. Controls

- **Buttons:** square (radius 0), mono uppercase tracking ~0.1em, min-height
  44px, 1px solid border. Primary = accent fill + on-accent text; secondary =
  transparent + `--color-line-strong` border. Press/hover → `translateY(-1px)`.
- **Navigation:** sticky navbar with solid white background and a dashed
  bottom border. Brand monogram = 6×6 (`h-6 w-6`) accent outline box with the
  initial. Links are mono uppercase; the language switch is an outlined chip.
  MobileMenu shares the same flat language.

## 7. Motion

Hero-only stagger via `Reveal` (CSS `@keyframes`, delay per item). Work,
capabilities, and contact render immediately. `prefers-reduced-motion`
collapses durations globally.

## 8. Refactor Guardrails

- Preserve EN/TH parity and long Thai labels at mobile widths.
- Preserve focus, semantics, reduced-motion, and stable layout.
- Do not introduce secrets, private URLs, or personal contact details.
- Do not restore retired routes (`/saas`, `/work/[slug]`, `/work-with-me`,
  `/article/[slug]`) unless product scope reopens them.
- Update this document and `src/styles/global.css` (+ `tokens.css` mirror)
  together when tokens change.
- Do not reintroduce the retired soft-pixel or Product Studio systems unless
  explicitly approved.

## 9. Exports

Runtime source of truth: `src/styles/global.css` `@theme`. A plain-CSS mirror
is at root `tokens.css` (update it if you change tokens). The Tailwind v4
`@theme` block in `global.css` is the canonical implementation.
