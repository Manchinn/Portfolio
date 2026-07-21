---
name: Software Engineering Portfolio
description: Soft-pixel SE portfolio design baseline (EN/TH, static-first).
currentAsOf: "2026-07-21"
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
  portfolio-on-accent: "#f7f4ea"
  portfolio-line-strong: "#a39c8c"
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

The public surface is a **soft-pixel** software engineering portfolio: modern SE one-page IA (hero, selected work, capabilities, articles, contact) with a light retro skin—block borders, offset shadows, warm paper background, and restrained pixel labels—without full NES/game UI.

**Homepage macrostructure (Hallmark):** **Split Studio** — diptych hero (copy left · proof panel right), featured work as a workbench split (story | problem→built→result), capabilities as a numbered index list (not equal cards), articles as an index list, contact as a hard-border band. Hard ink borders + offset shadows are reserved for primary proof (hero panel, featured work, contact). Secondary content stays line-only.

Reference intent: structure like a clean SE portfolio (e.g. pixel-portfolio-xi style IA); aesthetic level **A / soft pixel**, not walkable game rooms or forced 8-bit body type.

There is no `/saas`, `/work/[slug]`, or `/work-with-me` product route.

## 2. Sources of Truth

| Concern | Implemented source |
|---------|--------------------|
| Color, radius, shadow, font tokens | `src/app/globals.css` |
| Fonts and global metadata | `src/app/layout.tsx` |
| Shared chrome labels and CTAs | `src/content/shared.ts` |
| Homepage marketing sections | `src/content/home.ts` |
| Article route chrome | `src/content/article.ts` |
| Section and button primitives | `src/components/portfolio/primitives.tsx` |
| Homepage composition | `src/components/portfolio/HomePage.tsx` |
| Article composition | `src/app/(portfolio)/article/[slug]/ArticleContent.tsx` |
| Navigation and language controls | `src/components/layout/Navbar/Navbar.tsx` |
| Contact CTA (external) | `publicContactUrl` + home/article/footer CTAs |
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
- `portfolio-on-accent` (`#f7f4ea`): text/icon on filled accent controls (not pure white).
- `portfolio-line-strong` (`#a39c8c`): scrollbar thumb and quieter meta numerals.

No gradient or neon game palette is in the active token set.

## 4. Typography

- **Display/body:** IBM Plex Sans (readable EN/TH).
- **Mono:** JetBrains Mono for tech chips and compact meta.
- **Pixel accent:** Silkscreen via `--font-pixel`, only on eyebrows, category labels, nav tagline, and small chrome—not body paragraphs or article prose.

Hierarchy:

- Hero: `text-4xl` → `sm:text-6xl` → `lg:text-[4.25rem]`, weight 600, line-height 1.06.
- Section heading: `text-3xl` → `sm:text-4xl` → `lg:text-[2.5rem]`, weight 600.
- Labels/eyebrows: default **off**. When used, ~10–11px Silkscreen, uppercase, teal or muted — at most a few chrome spots (brand tagline, one proof panel, project category).
- Body: ~1rem / 1.75rem; hero support ~1.125rem / 2rem.

Thai and English must wrap without clipping at mobile widths. Do not set body copy in the pixel face.

## 5. Layout and Surfaces

- Content width: shell/home proof may use 1280px; standard bands ~1180–1280px.
- Section padding: ~3.5–6rem across breakpoints; index blocks may use the compact rhythm.
- Soft-pixel **hard frames** (2px ink border + offset shadow) are reserved for primary proof: hero panel, featured work workbench, contact band, and primary/secondary buttons. Secondary lists use hairline rules without heavy tile chrome.
- Article body stays calm: thicker dividers and restrained category labels; prose remains Plex.

## 6. Controls

### Buttons and Links

Primary/secondary buttons: `rounded-portfolio-sm` (2px), **2px ink border**, teal or surface fill, `shadow-portfolio-sm`, press state via 1px translate and shadow removal. Min height 44px. Optional Lucide icons.

### Navigation

Sticky navbar: solid warm paper bg (no glass blur), **bottom border 2px** at low-opacity ink. Brand mark is a square accent tile with ink border and block shadow. Language control uses a light surface + hairline border (edge-aligned utility).

### Focus and Selection

Visible 2px teal focus outline with 2px offset plus soft double-ring shadow on interactive controls. Selection uses accent-soft. Primary interactive targets use min height 44px where practical. Keyboard focus must remain obvious after any skin change.

## 7. Motion

Homepage motion is **hero-only** stagger (copy column). Work, capabilities, and articles render immediately without scroll-triggered fade. Button press is a short transform. `prefers-reduced-motion` collapses CSS animation/transition durations globally and swaps motion wrappers to plain elements (no opacity gate). Motion must not gate content.

## 8. Signature Experiences

### Selected Work

In-page problem / built / result proof as a **workbench split** (story column | numbered case rows). Supporting projects (if any) stay line-framed, not full hard tiles. No separate work-detail route.

### Hero and Project Inquiry

Hero is a **diptych**: title/body/CTAs left, proof panel right. Primary CTA → `/#work`. Secondary and contact CTAs → public GitHub Issues with external affordance and public-data notice (shown once at contact, not repeated under hero CTAs). No local brief form.

### Article

**Macrostructure family: Long Document** under the same soft-pixel system. Header is a quiet diptych (title | category + excerpt). Body measure ~720px with numbered section heads (mono index, no pixel eyebrows). Inquiry CTA uses a hard frame + `PortfolioButton`. Related reading is an **index list** (not equal twin cards).

## 9. Refactor Guardrails

- Preserve EN/TH parity and long Thai labels at mobile widths.
- Preserve focus, semantics, reduced-motion, and stable layout.
- Do not introduce secrets, private URLs, or personal contact details.
- Do not restore retired routes unless product scope reopens them.
- Update this document and `src/app/globals.css` together when tokens change.
- Keep soft-pixel at level A unless explicitly approved to go full NES/game.
- Future Hallmark runs **defer to this file** (system-managed). Amend here before inventing a new theme per page.

## 10. Known Baseline Constraints

- User-facing copy ownership: entities in `src/data/portfolio.ts`, shared chrome in `src/content/shared.ts`, homepage marketing in `src/content/home.ts`, article chrome in `src/content/article.ts`, nav chrome in `src/i18n/locales/*.json`.
- Initial language is English; saved language restores after client mount.
- Static article params come from English slugs; locale arrays must share slugs.
- Homepage lives under `src/components/portfolio/` with `portfolio-*` tokens.

## 11. Locked Hallmark system

Future Hallmark runs read this document first. Pages share tokens, type, CTA voice, and hard-frame discipline; they may differ only within the macrostructure family for the page type.

### System

- Genre · editorial (soft-pixel utilitarian skin)
- Marketing / home · Split Studio
- Content / article · Long Document
- Theme · portfolio soft-pixel (custom catalog for this product)
- Axes · light paper / grotesk-sans (IBM Plex) / cool-teal accent

### CTA voice

- Primary · accent fill · ink border 2px · radius 2px · offset shadow · on-accent text · press 1px translate
- Secondary · surface fill · same border/radius/shadow · hover soft surface

### Motion stance

- Hero-only stagger on home; article is motion-cut
- Button press transform only
- Reduced-motion · plain elements, CSS durations collapsed

### What pages MUST share

- `portfolio-*` tokens, IBM Plex + JetBrains Mono + Silkscreen accent
- Hard frames only on primary proof / primary CTA bands
- External inquiry via `publicContactUrl` (no app form store)
- EN/TH parity and static-first routes

### What pages MAY differ on

- Macrostructure within family (home Split Studio vs article Long Document)
- Whether a section uses a numbered index row vs workbench split

## 12. Exports

Runtime source of truth: `src/app/globals.css` `@theme`. Portable mirror: root `tokens.css`.

### tokens.css

See project-root `tokens.css` (mirrors `portfolio-*` custom properties).

### Tailwind v4 `@theme` (canonical in app)

```css
@theme {
  --color-portfolio-bg: #f4f1e8;
  --color-portfolio-surface: #fffdf8;
  --color-portfolio-surface-soft: #ebe6d9;
  --color-portfolio-ink: #1a1a1a;
  --color-portfolio-muted: #5c5a52;
  --color-portfolio-line: #cfc8b8;
  --color-portfolio-line-strong: #a39c8c;
  --color-portfolio-accent: #0f766e;
  --color-portfolio-accent-strong: #0b5f59;
  --color-portfolio-accent-soft: #d5ebe7;
  --color-portfolio-on-accent: #f7f4ea;

  --shadow-portfolio-sm: 2px 2px 0 rgba(26, 26, 26, 0.14);
  --shadow-portfolio-md: 4px 4px 0 rgba(26, 26, 26, 0.18);
  --shadow-portfolio-focus: 0 0 0 2px var(--color-portfolio-bg), 0 0 0 4px var(--color-portfolio-accent);

  --radius-portfolio-sm: 2px;
  --radius-portfolio-md: 4px;

  --font-display: var(--font-plex-sans, ui-sans-serif, system-ui, sans-serif);
  --font-mono: var(--font-jetbrains, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  --font-pixel: var(--font-silkscreen, var(--font-jetbrains), ui-monospace, monospace);
}
```

### DTCG `tokens.json` (portable)

```json
{
  "color": {
    "portfolio-bg": { "$value": "#f4f1e8", "$type": "color" },
    "portfolio-surface": { "$value": "#fffdf8", "$type": "color" },
    "portfolio-surface-soft": { "$value": "#ebe6d9", "$type": "color" },
    "portfolio-ink": { "$value": "#1a1a1a", "$type": "color" },
    "portfolio-muted": { "$value": "#5c5a52", "$type": "color" },
    "portfolio-line": { "$value": "#cfc8b8", "$type": "color" },
    "portfolio-line-strong": { "$value": "#a39c8c", "$type": "color" },
    "portfolio-accent": { "$value": "#0f766e", "$type": "color" },
    "portfolio-accent-strong": { "$value": "#0b5f59", "$type": "color" },
    "portfolio-accent-soft": { "$value": "#d5ebe7", "$type": "color" },
    "portfolio-on-accent": { "$value": "#f7f4ea", "$type": "color" }
  },
  "font": {
    "display": { "$value": "IBM Plex Sans", "$type": "fontFamily" },
    "mono": { "$value": "JetBrains Mono", "$type": "fontFamily" },
    "pixel": { "$value": "Silkscreen", "$type": "fontFamily" }
  },
  "radius": {
    "sm": { "$value": "2px", "$type": "dimension" },
    "md": { "$value": "4px", "$type": "dimension" }
  }
}
```

### shadcn/ui-style CSS variables (mapping)

```css
:root {
  --background: 244 241 232; /* portfolio-bg */
  --foreground: 26 26 26; /* portfolio-ink */
  --primary: 15 118 110; /* portfolio-accent */
  --primary-foreground: 247 244 234; /* portfolio-on-accent */
  --muted: 235 230 217; /* portfolio-surface-soft */
  --muted-foreground: 92 90 82; /* portfolio-muted */
  --border: 207 200 184; /* portfolio-line */
  --ring: 15 118 110; /* portfolio-accent */
  --radius: 2px;
}
```
