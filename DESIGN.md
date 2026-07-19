---
name: Software Engineering Portfolio
description: Soft-pixel SE portfolio design baseline (EN/TH, static-first).
currentAsOf: "2026-07-19"
colors:
  portfolio-bg: "#f4f1e8"
  portfolio-surface: "#fffdf8"
  portfolio-surface-soft: "#ebe6d9"
  portfolio-ink: "#1a1a1a"
  portfolio-muted: "#5c5a52"
  portfolio-line: "#cfc8b8"
  portfolio-accent: "#0f766e"
  portfolio-accent-strong: "#0b5f59"
  portfolio-accent-soft: "#d5ebe7"
radii:
  portfolio-sm: "2px"
  portfolio-md: "4px"
shadows:
  portfolio-sm: "2px 2px 0 rgba(26, 26, 26, 0.14)"
  portfolio-md: "4px 4px 0 rgba(26, 26, 26, 0.18)"
  portfolio-focus: "double-ring via outline offset"
typography:
  display: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
  mono: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
  pixel: "Silkscreen, JetBrains Mono, ui-monospace, monospace"
---

# Design Baseline: Software Engineering Portfolio

This document records what the current code implements. It is a refactor baseline, not a requirement to freeze every visual choice forever.

## 1. Current Direction

The public surface is a **soft-pixel** software engineering portfolio: modern SE one-page structure (hero, selected work, capabilities, articles, contact) with a light retro skin—block borders, offset shadows, warm paper background, and pixel labels—without full NES/game UI.

Reference intent: structure like a clean SE portfolio (e.g. pixel-portfolio-xi style IA); aesthetic level **A / soft pixel**, not walkable game rooms or forced 8-bit body type.

There is no `/saas`, `/work/[slug]`, or `/work-with-me` product route.

## 2. Sources of Truth

| Concern | Implemented source |
|---------|--------------------|
| Color, radius, shadow, font tokens | `src/app/globals.css` |
| Fonts and global metadata | `src/app/layout.tsx` |
| Shared chrome labels and CTAs | `src/content/shared.ts` |
| Section and button primitives | `src/components/portfolio/primitives.tsx` |
| Homepage composition | `src/components/portfolio/HomePage.tsx` |
| Navigation and language controls | `src/components/layout/Navbar/Navbar.tsx` |
| Contact CTA (external) | `publicContactUrl` + home contact section |
| Motion behavior | `src/components/motion/MotionPrimitives.tsx` |

When this document and source disagree, source is authoritative until both are updated together.

## 3. Color System

Warm paper neutrals, near-black ink, and a teal action family:

- `portfolio-bg` (`#f4f1e8`): page background with a light 12px dot grid.
- `portfolio-surface` (`#fffdf8`): cards, menus, footer, framed bands.
- `portfolio-surface-soft` (`#ebe6d9`): chips and subdued surfaces.
- `portfolio-ink` (`#1a1a1a`): primary text and hard borders on controls.
- `portfolio-muted` (`#5c5a52`): body support text and metadata.
- `portfolio-line` (`#cfc8b8`): softer borders where a full ink edge is too heavy.
- `portfolio-accent` (`#0f766e`): primary actions and labels.
- `portfolio-accent-strong` (`#0b5f59`): hover and emphasized action text.
- `portfolio-accent-soft` (`#d5ebe7`): selected control backgrounds.

No gradient or neon game palette is in the active token set.

## 4. Typography

- **Display/body:** IBM Plex Sans (readable EN/TH).
- **Mono:** JetBrains Mono for tech chips and compact meta.
- **Pixel accent:** Silkscreen via `--font-pixel`, only on eyebrows, category labels, nav tagline, and small chrome—not body paragraphs or article prose.

Hierarchy:

- Hero: `text-4xl` → `sm:text-6xl` → `lg:text-[4.25rem]`, weight 600, line-height 1.06.
- Section heading: `text-3xl` → `sm:text-4xl` → `lg:text-[2.5rem]`, weight 600.
- Labels/eyebrows: ~10–11px Silkscreen, uppercase, teal or muted.
- Body: ~1rem / 1.75rem; hero support ~1.125rem / 2rem.

Thai and English must wrap without clipping at mobile widths. Do not set body copy in the pixel face.

## 5. Layout and Surfaces

- Content width: 1180px standard; selected work may use 1280px.
- Section padding: 4.5rem → 5.5rem → 6rem across breakpoints.
- Soft-pixel surfaces use **2px borders**, **2–4px radii**, and **offset block shadows** on buttons, project cards, capability tiles, and the contact band.
- Article body stays calm: thicker dividers and pixel category labels only; prose remains Plex.

## 6. Controls

### Buttons and Links

Primary/secondary buttons: `rounded-portfolio-sm` (2px), **2px ink border**, teal or surface fill, `shadow-portfolio-sm`, press state via 1px translate and shadow removal. Min height 44px. Optional Lucide icons.

### Navigation

Sticky navbar: translucent warm bg, blur, **bottom border 2px** at low-opacity ink. Brand mark is a square accent tile with ink border and block shadow. Language menu uses ink border + offset shadow.

### Focus and Selection

Visible 2px teal focus outline with 2px offset. Selection uses accent-soft. Keyboard focus must remain obvious after any skin change.

## 7. Motion

Homepage stagger reveals via `motion/react` remain. Button press is a short transform. `prefers-reduced-motion` still collapses animation/transition durations globally. Motion must not gate content.

## 8. Signature Experiences

### Selected Work

In-page problem / built / result proof inside a bordered surface card. No separate work-detail route.

### Hero and Project Inquiry

Primary CTA → `/#work`. Secondary and contact CTAs → public GitHub Issues with external affordance and public-data notice. No local brief form.

## 9. Refactor Guardrails

- Preserve EN/TH parity and long Thai labels at mobile widths.
- Preserve focus, semantics, reduced-motion, and stable layout.
- Do not introduce secrets, private URLs, or personal contact details.
- Do not restore retired routes unless product scope reopens them.
- Update this document and `src/app/globals.css` together when tokens change.
- Keep soft-pixel at level A unless explicitly approved to go full NES/game.

## 10. Known Baseline Constraints

- User-facing copy is still split across `portfolio.ts`, locale JSON, and component-local objects; shared chrome lives in `src/content/shared.ts`.
- Initial language is English; saved language restores after client mount.
- Static article params come from English slugs; locale arrays must share slugs.
- Homepage lives under `src/components/portfolio/` with `portfolio-*` tokens.
