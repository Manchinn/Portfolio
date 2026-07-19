# Modern SaaS Portfolio Redesign Spec

> **HISTORICAL ONLY (as of 2026-07-19).** This document is **not** the current product or design source of truth.
> Do **not** implement FlowSync, prompt workflows, CMS, multi-demo labs, or colorful SaaS token sets from this file.
> Active sources: `PRODUCT.md`, `CONTEXT.md`, `DESIGN.md`, `docs/architecture/*`, `docs/agents/MEMORY.md`.

Date: 2026-05-29
Scope: chinnakrit.dev portfolio redesign direction
Reference: bubble.io as visual inspiration only

## Non-Copy Rule

This spec extracts broad design principles from modern no-code SaaS landing pages. It must not copy Bubble branding, logos, assets, exact copywriting, component shapes, illustrations, CSS, color formulas, or layout 1:1.

The resulting direction should feel original to Chinnakrit's AI coding prompt workflows: practical, builder-focused, friendly, and credible.

## Observed Inspiration Principles

Bubble's public positioning emphasizes AI-assisted app creation, visual editing, speed from idea to launch, and complete app-building workflows across design, data, logic, and launch. The useful design principles for our portfolio are:

- Big confident hero type with a short promise.
- Friendly SaaS tone instead of dark terminal-heavy mood.
- Product proof close to the first viewport.
- Clear CTA hierarchy: one primary action, one secondary proof action.
- Rounded but still clean card system.
- Alternating section rhythm: hero, proof, feature cards, workflow, examples, CTA.
- Soft color surfaces with restrained high-contrast text.
- Responsive sections that collapse cleanly into stacked cards.

## 1. Tailwind Design Token Proposal

Add a new token family instead of deleting the current `console-*` tokens immediately. This allows a staged migration.

```css
@theme {
  --color-saas-bg: #fbfbf7;
  --color-saas-surface: #ffffff;
  --color-saas-surface-soft: #f3f7f2;
  --color-saas-ink: #17211b;
  --color-saas-muted: #647066;
  --color-saas-line: #dfe7dd;
  --color-saas-green: #1f8f5f;
  --color-saas-green-strong: #106b45;
  --color-saas-blue: #4169e1;
  --color-saas-lilac: #d9d2ff;
  --color-saas-mint: #dff7e8;
  --color-saas-cream: #fff4d6;
  --color-saas-coral: #ffb8a9;

  --shadow-saas-sm: 0 8px 24px rgba(23, 33, 27, 0.06);
  --shadow-saas-md: 0 18px 48px rgba(23, 33, 27, 0.08);
  --shadow-saas-focus: 0 0 0 4px rgba(31, 143, 95, 0.16);

  --radius-saas-sm: 8px;
  --radius-saas-md: 14px;
  --radius-saas-lg: 24px;
}
```

Usage rules:

- Page background: `bg-saas-bg`.
- Main text: `text-saas-ink`.
- Body copy: `text-saas-muted`.
- Cards: `bg-saas-surface border border-saas-line shadow-saas-sm`.
- CTA: green primary, neutral secondary.
- Accent blocks: mint, cream, lilac, coral, blue used sparingly.

Do not make the page one-note green. Use green as action color, not the whole identity.

## 2. Component Style Guide

### Page Shell

- Max width: `max-w-[1180px]` for content-heavy sections.
- Hero width: `max-w-[1280px]`.
- Section padding: `py-20 sm:py-24 lg:py-28`.
- Mobile padding: `px-4`.
- Desktop padding: `px-6 lg:px-8`.

### Typography

- Hero label: small uppercase, high tracking, muted.
- H1: bold, friendly, large, balanced.
- H2: strong but smaller than hero.
- Body: comfortable line height, max width 60-72 characters.
- Avoid terminal-only visual language for main headings.

Suggested utility patterns:

```tsx
<p className="text-xs font-black uppercase tracking-[0.16em] text-saas-green">
  AI coding workflow portfolio
</p>

<h1 className="mt-5 max-w-5xl text-balance text-5xl font-black leading-[0.95] text-saas-ink sm:text-7xl">
  Build useful AI workflows from prompt to production.
</h1>
```

### Cards

Card types:

- `ProofCard`: metric, result, or short signal.
- `WorkflowCard`: step-by-step process.
- `ProjectCard`: case study card from `src/data/portfolio.ts`.
- `ToolCard`: stack and capability.
- `CTABox`: high-intent conversion block.

Base card:

```tsx
className="rounded-[14px] border border-saas-line bg-saas-surface p-5 shadow-saas-sm"
```

Large card:

```tsx
className="rounded-[24px] border border-saas-line bg-saas-surface p-6 shadow-saas-md sm:p-8"
```

Rules:

- Cards can be rounded, but keep operational cards below 16px unless they are hero/proof panels.
- Avoid nested cards unless the inner card is a table row, metric strip, or form field.
- Use icons from `lucide-react`.
- Use real project data from `portfolio.ts`; do not invent new claims.

### Buttons / CTA Hierarchy

Primary CTA:

```tsx
className="inline-flex items-center justify-center rounded-full bg-saas-green px-5 py-3 text-sm font-black text-white shadow-saas-sm transition hover:bg-saas-green-strong"
```

Secondary CTA:

```tsx
className="inline-flex items-center justify-center rounded-full border border-saas-line bg-white px-5 py-3 text-sm font-black text-saas-ink transition hover:border-saas-green hover:text-saas-green"
```

Tertiary link:

```tsx
className="inline-flex items-center gap-2 text-sm font-black text-saas-green hover:text-saas-green-strong"
```

CTA rules:

- Hero: one primary, one secondary.
- Project cards: one clear "Open demo" action.
- Final CTA: one high-intent action only.

## 3. Homepage Section Structure

Keep original project copy and data. Change presentation, not facts.

Recommended homepage order:

1. **Hero**
   - Positioning: AI automation and full-stack systems builder.
   - Primary CTA: work-with-me.
   - Secondary CTA: demos.
   - First viewport includes visible proof strip.

2. **Proof Strip**
   - 3-4 compact proof cards.
   - Examples: AI assistant workflows, internal tools, sanitized demos, public-safe proof.

3. **Workflow Builder Section**
   - Shows "Prompt -> Prototype -> Tool -> Demo -> Deploy-ready workflow".
   - This makes the site unique to AI coding prompt workflows.

4. **Featured Systems**
   - Pulls from `projects[lang]`.
   - Cards become friendlier SaaS product cards.
   - Keep bilingual content.

5. **Capability Grid**
   - AI automation, full-stack, frontend systems, DevOps support.
   - Softer cards, icons, short copy.

6. **Demo Lab**
   - Links to `/demos`.
   - Use cards for public-safe demos.
   - Make the optical retail demo feel like a public product proof, not an isolated one-off.

7. **Stack / Tools**
   - Compact badge clusters.
   - Avoid overemphasizing terminal aesthetics.

8. **Final CTA**
   - Friendly conversion card.
   - Clear offer: scope a workflow, demo, or internal tool.

## 4. Reusable Patterns

### `SaasSection`

Purpose: consistent responsive spacing and max width.

```tsx
type SaasSectionProps = {
  id?: string
  children: React.ReactNode
  className?: string
  wide?: boolean
}
```

Pattern:

```tsx
<section id={id} className={`py-20 sm:py-24 lg:py-28 ${className ?? ''}`}>
  <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${wide ? 'max-w-[1280px]' : 'max-w-[1180px]'}`}>
    {children}
  </div>
</section>
```

### `SaasHeader`

Purpose: reusable section intro.

Props:

- eyebrow
- title
- subtitle
- align: left | center | split

### `SaasCard`

Purpose: base card primitive.

Props:

- children
- tone: default | mint | cream | lilac | dark
- hover

### `SaasButton`

Purpose: consistent CTA hierarchy.

Props:

- variant: primary | secondary | ghost
- href or onClick
- icon

### `ProjectProofCard`

Purpose: portfolio project card using existing `Project` data.

Must render:

- category
- title
- description
- caseStudy problem/built/result if present
- top 3 tech tags
- demo link

### `WorkflowStepper`

Purpose: prompt workflow proof.

Steps:

1. Capture business workflow.
2. Shape prompt/spec.
3. Build prototype.
4. Add state and validation.
5. Publish public-safe demo or internal tool.

## 5. Implementation Plan For Next.js

### Phase 1: Add New Design Layer

- Add `saas-*` tokens to `src/app/globals.css`.
- Add `src/components/portfolio-saas/_shared.tsx`.
- Add reusable primitives: `SaasSection`, `SaasHeader`, `SaasCard`, `SaasButton`.
- Do not remove `console-*` yet.

### Phase 2: Rebuild Homepage Presentation

- Replace `src/app/(portfolio)/page.tsx` imports with SaaS-style sections.
- Keep data source from `src/data/portfolio.ts`.
- Preserve language switching and bilingual content.
- Keep nav routes unchanged.

Suggested new section files:

```text
src/components/portfolio-saas/SaasHero.tsx
src/components/portfolio-saas/ProofStrip.tsx
src/components/portfolio-saas/WorkflowBuilder.tsx
src/components/portfolio-saas/FeaturedProjectCards.tsx
src/components/portfolio-saas/CapabilityCards.tsx
src/components/portfolio-saas/DemoLab.tsx
src/components/portfolio-saas/StackBadges.tsx
src/components/portfolio-saas/FinalCTA.tsx
```

### Phase 3: Align Demos

- Restyle `/demos` with the same `saas-*` primitives.
- Keep existing demo links.
- Keep new optical retail demo.
- Make demo detail pages gradually match the new system.

### Phase 4: Verification

Run:

```powershell
npm run build
```

Optional visual checks:

- Desktop 1440px.
- Tablet 768px.
- Mobile 390px.

Acceptance:

- No Bubble assets, logos, exact copy, or 1:1 layouts.
- Original Chinnakrit copy and bilingual project data preserved.
- Clear primary CTA and secondary CTA.
- Project cards still link to existing demos.
- Build passes.

## Design Direction Summary

Move from dark operator-console portfolio toward a softer modern SaaS product site:

- Keep the credibility of shipped systems.
- Make the first viewport friendlier and more marketable.
- Show workflow proof earlier.
- Present demos like product surfaces.
- Keep everything public-safe and grounded in real portfolio data.
