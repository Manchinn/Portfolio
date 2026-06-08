---
name: Chinnakrit Portfolio Frontend
description: Bilingual brand portfolio for practical AI automation and full-stack systems proof.
colors:
  saas-bg: "#fbfbf7"
  saas-surface: "#ffffff"
  saas-surface-soft: "#f3f7f2"
  saas-ink: "#17211b"
  saas-muted: "#647066"
  saas-line: "#dfe7dd"
  saas-green: "#1f8f5f"
  saas-green-strong: "#106b45"
  saas-blue: "#4169e1"
  saas-lilac: "#d9d2ff"
  saas-mint: "#dff7e8"
  saas-cream: "#fff4d6"
  saas-coral: "#ffb8a9"
typography:
  display:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.75rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "0"
  headline:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "0"
  title:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0"
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 2
    letterSpacing: "0"
  label:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  saas-sm: "8px"
  saas-md: "14px"
  saas-lg: "24px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section-y: "clamp(5rem, 8vw, 7rem)"
components:
  button-primary:
    backgroundColor: "{colors.saas-green}"
    textColor: "{colors.saas-surface}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.saas-surface}"
    textColor: "{colors.saas-ink}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.saas-green}"
    rounded: "{rounded.pill}"
    padding: "0"
  card:
    backgroundColor: "{colors.saas-surface}"
    textColor: "{colors.saas-ink}"
    rounded: "{rounded.saas-md}"
    padding: "20px"
  chip:
    backgroundColor: "{colors.saas-surface-soft}"
    textColor: "{colors.saas-muted}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

# Design System: Chinnakrit Portfolio Frontend

## 1. Overview

**Creative North Star: "The Operator Showcase"**

This system presents a builder who can make messy technical work feel reviewable, safe, and product-ready. The page should feel like a focused workbench: clean surfaces, firm labels, practical proof, and just enough color to help the eye move from claim to evidence.

The design is a brand landing surface, not a generic software product shell. It borrows SaaS clarity for scanning, but the content stays personal and proof-led: case studies, workflow proof, bilingual copy, and a contact path. It explicitly rejects generic AI SaaS templates, purple-gradient startup pages, over-brutalist toy styling, vague automation hype, and public copy that exposes private operations.

**Key Characteristics:**
- Soft neutral surfaces with a decisive green signal color.
- Dense but readable case-study cards built for fast technical review.
- Rounded, calm controls that feel product-ready without becoming playful.
- Bilingual-safe spacing, wrapping, and line-height.
- Motion that supports entry and hover feedback without hiding content.

## 2. Colors

The palette uses quiet workbench neutrals, Operator Ink for credibility, and Signal Green for forward motion, proof, and action.

### Primary
- **Signal Green**: The main action and proof color. Use for primary buttons, status dots, section labels, active states, and icons that mark credible completion.
- **Deep Signal Green**: The hover and emphasis state for Signal Green. Use when an action needs more weight without introducing a new hue.

### Secondary
- **Operational Blue**: A sparing supporting accent for technology or workflow contrast.
- **Proof Lilac**: A soft secondary tint for assistant or system variation.
- **Mint Evidence**: The primary pale tint behind icons, badges, and trust indicators.
- **Coral Alert**: A small warm accent for visual punctuation and panel controls.
- **Cream Note**: A light highlight accent, used rarely so it does not turn the page into a beige theme.

### Neutral
- **Clean Workbench**: The page background. It is near-white with a slight green cast, used to keep the portfolio bright and usable.
- **White Surface**: Cards, panels, buttons, and elevated containers.
- **Soft Workbench**: Section bands and interior panel surfaces.
- **Operator Ink**: Primary text, dark panels, and the strongest structural line.
- **Muted Operator**: Body support text, chip labels, and metadata.
- **Quiet Line**: Borders, dividers, and low-contrast separation.

### Named Rules

**The Signal Rarity Rule.** Signal Green should lead actions and proof markers, not flood every surface. If every label is green, no label is important.

**The Public-Safe Palette Rule.** Do not use danger reds, terminal neon, or black-site styling to imply secret infrastructure. The brand is credible because it is controlled, not because it looks hidden.

## 3. Typography

**Display Font:** IBM Plex Sans with ui-sans-serif fallback.
**Body Font:** IBM Plex Sans with ui-sans-serif fallback.
**Label/Mono Font:** JetBrains Mono is available for technical snippets, but the current brand UI mostly uses IBM Plex Sans labels.

**Character:** The type system is direct, compact, and operational. IBM Plex Sans gives the page a technical tone without the costume of a mono-forward interface.

### Hierarchy
- **Display** (700, clamp from 3.75rem to 4.5rem, line-height 0.98): Hero headlines only. Use balanced wrapping and never let bilingual text overflow.
- **Headline** (700, clamp from 2.25rem to 3rem, line-height 1.04): Section headers and major conversion blocks.
- **Title** (700, 1.5rem, line-height 1.2): Card titles, panel titles, and demo names.
- **Body** (600, 1rem, line-height 2): Supporting explanation, case-study details, and bilingual paragraphs. Keep body copy at readable measure, roughly 65 to 75 characters when possible.
- **Label** (700, 0.75rem, letter-spacing 0.14em): Short metadata, category labels, and panel tags. Use uppercase only for labels of a few words.

### Named Rules

**The Bilingual Fit Rule.** Thai and English must both fit the component. Reduce scale, increase wrapping, or rewrite the copy before allowing clipped labels or cramped headings.

**The Mono Discipline Rule.** Use JetBrains Mono only when the content is actually command-like or code-like. Do not use monospace as decoration for every technical phrase.

## 4. Elevation

This system uses a hybrid of tonal layering, borders, and soft structural lift. Shadows are present, but they should feel like hierarchy support rather than decorative glow. Cards sit on white or soft green surfaces with thin Quiet Line borders and low-alpha ink shadows.

### Shadow Vocabulary
- **Soft Lift** (`box-shadow: 0 8px 24px rgba(23, 33, 27, 0.06)`): Small cards, buttons, chips, and floating labels.
- **Medium Lift** (`box-shadow: 0 18px 48px rgba(23, 33, 27, 0.08)`): Major panels, featured cards, and contact blocks.
- **Focus Ring** (`box-shadow: 0 0 0 4px rgba(31, 143, 95, 0.16)`): Keyboard focus and action confirmation.

### Named Rules

**The Structural Lift Rule.** A lifted element must either be actionable, selected, or more important than its surroundings. Do not add shadow to make a weak section look designed.

**The No Ghost-Card Rule.** Do not pair heavy borders with wide decorative shadows. The current system uses one-pixel borders plus soft lift, or dark filled blocks, not both at full force.

## 5. Components

### Buttons
- **Shape:** Fully rounded pills for primary and secondary actions (9999px radius).
- **Primary:** Signal Green background with white text, bold label, 12px vertical padding, and optional lucide icon.
- **Hover / Focus:** Hover darkens to Deep Signal Green. Focus uses the green focus ring.
- **Secondary / Ghost:** Secondary buttons use white surfaces, Quiet Line borders, and Operator Ink. Ghost buttons use Signal Green text only and should stay lightweight.

### Chips
- **Style:** Rounded pill labels with Soft Workbench or White Surface backgrounds, Muted Operator text, and optional Quiet Line border.
- **State:** Chips communicate category, technology, metadata, or safety mode. They are not decorative confetti.

### Cards / Containers
- **Corner Style:** Cards default to gently curved corners (14px), with major hero and featured containers allowed to use large corners (24px).
- **Background:** White Surface for main cards, Soft Workbench for section bands, Operator Ink for strong contact or workflow panels.
- **Shadow Strategy:** Soft Lift for ordinary cards, Medium Lift for featured proof.
- **Border:** Quiet Line borders are the default separator. Dark borders are reserved for the strongest dark contact block.
- **Internal Padding:** 20px for compact cards, 24px to 36px for featured cards and panels.

### Inputs / Fields
- **Style:** There are no prominent form inputs in the current main surface. Future fields should use White Surface, Quiet Line border, 14px radius, 12px to 16px padding, and Operator Ink text.
- **Focus:** Use the Focus Ring token and keep error messages specific and public-safe.
- **Error / Disabled:** Error states should use clear text and restrained color. Do not expose implementation details.

### Navigation

Navigation should stay quiet, direct, and predictable. Labels are short, high-contrast, and route-focused. Mobile navigation must preserve language switching and contact access without crowding the header.

### Signature Component

The **Assistant Ops Studio** panel is the signature proof component: a dark Operator Ink sidebar paired with a light workflow grid. It should feel like a fictional but plausible operations interface, making AI-assisted delivery legible without exposing private internals.

## 6. Do's and Don'ts

### Do:
- **Do** use Signal Green for primary actions, credible completion, and selected proof.
- **Do** keep public-safe demo copy specific while omitting credentials, private URLs, hidden route behavior, and operational hardening details.
- **Do** preserve English and Thai content parity when changing portfolio copy or components.
- **Do** use IBM Plex Sans as the default brand face and rely on weight, scale, and spacing for hierarchy.
- **Do** test long Thai and English labels at mobile widths before shipping.
- **Do** keep shadows soft and structural, with Soft Lift and Medium Lift as the only default elevation styles.

### Don't:
- **Don't** use generic AI SaaS templates.
- **Don't** use purple-gradient startup pages as the default visual language.
- **Don't** use over-brutalist toy styling, hard black block shadows, or novelty colors on the primary portfolio surface.
- **Don't** use vague automation hype when a concrete workflow, demo, or case-study outcome can be shown instead.
- **Don't** expose private operations or nonpublic infrastructure details in public copy.
- **Don't** make the portfolio feel like a fictional product company when the main job is to prove an individual builder's credibility.
- **Don't** use monospace styling as a lazy shorthand for technical competence.
- **Don't** add repeated tiny uppercase labels above every section unless the label genuinely helps scanning.
