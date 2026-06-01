---
target: src/app/(portfolio)/page.tsx
total_score: 31
p0_count: 0
p1_count: 2
timestamp: 2026-06-01T10-55-03Z
slug: src-app-portfolio-page-tsx
---
# Homepage Critique: src/app/(portfolio)/page.tsx

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | The page is visible and stable after the motion fix; external resume/GitHub/contact links do not visually distinguish external destinations. |
| 2 | Match System / Real World | 3 | The builder positioning is clear, but phrases like public-safe demos and assistant operations still assume the reader understands the local vocabulary. |
| 3 | User Control and Freedom | 3 | Navigation, demos, contact, language switching, and resume routes are present; the reviewer fast-path helps, but external links lack target cues. |
| 4 | Consistency and Standards | 3 | The component system is consistent, though repeated pill cards, uppercase labels, and similar CTA treatments make sections blur together. |
| 5 | Error Prevention | 3 | Public-safe messaging is strong; the resume fast-path label says Open PDF even though it now opens an HTML resume page. |
| 6 | Recognition Rather Than Recall | 4 | The homepage gives clear routes: selected work, demos, stack, contact, resume, GitHub. A reviewer does not need to hunt. |
| 7 | Flexibility and Efficiency | 4 | The reviewer link strip is a meaningful improvement, especially for hiring/review use. |
| 8 | Aesthetic and Minimalist Design | 3 | The visual direction is polished, but the first two folds are dense and heavily card-based. |
| 9 | Error Recovery | 2 | There are few recoverable actions on this static surface; no major issue, but external failures have no fallback or explanatory copy. |
| 10 | Help and Documentation | 3 | Public-safe demos and case-study structure act as documentation, but the homepage could make the resume/demo distinction clearer. |
| **Total** | | **31/40** | **Strong, with polish backlog** |

## Anti-Patterns Verdict

**LLM assessment**: The homepage no longer has the serious hero visibility failure. It reads as a real portfolio with a coherent brand system: green signal color, workbench neutrals, proof-led cards, and bilingual-aware wrapping. It does not immediately scream "AI made this." The remaining AI-ish tells are structural rather than catastrophic: many rounded cards, repeated tiny uppercase labels, repeated icon-plus-card grammar, and a mock dashboard panel that risks feeling more like a SaaS template than a personal builder artifact.

**Deterministic scan**: Scoped detector scan returned zero findings for:
- `src/app/(portfolio)/page.tsx`
- `src/components/portfolio-saas/SaasHome.tsx`
- `src/components/portfolio-saas/_shared.tsx`
- `src/components/layout/Navbar/Navbar.tsx`

No detector issues were ignored. Earlier broad project scans still show unrelated warnings in other routes, especially `src/app/(portfolio)/demos/optical-retail/page.tsx`, but they are outside this homepage target.

**Visual overlays**: No reliable user-visible overlay is available for this run. Browser screenshots were captured successfully through `npx playwright` against a temporary dev server on port 3001, but the overlay injection path was not reliable in this environment because the Node REPL Playwright package could not resolve `playwright-core`, and the CLI screenshot flow does not expose the Impeccable console overlay.

## Overall Impression

This is now a credible, reviewable brand landing page. The biggest opportunity is not another redesign; it is sharpening the review path so the page feels less like a polished SaaS template and more like "Chinnakrit, the practical AI automation/full-stack builder, with proof ready to inspect."

## What's Working

1. **The hero now carries the right identity.** The name/role eyebrow and the direct headline make the page legible within seconds. The previous blank/hidden hero problem is gone.

2. **The reviewer fast-path is strategically good.** Best demo, resume, GitHub, and contact are exactly the choices a hiring manager or technical reviewer needs. This is a real improvement over burying proof lower on the page.

3. **The selected work section has the right proof model.** Problem, built, result is stronger than generic feature cards, and the sanitized/public-safe framing protects the portfolio from overexposing private work.

## Priority Issues

### [P1] Hero proof is dense in the first viewport

**Why it matters**: On desktop the first viewport contains hero copy, two primary CTAs, four reviewer links, four trust cards, and a full mock workflow panel. On mobile, the user gets a long sequence before reaching selected work. The page now shows content, but it asks the reviewer to parse too many proof signals at once.

**Fix**: Keep the reviewer fast-path, but collapse or reduce the trust grid. Let the right-side workflow panel carry the proof role on desktop, and make the trust items more compact or move them below the hero on mobile.

**Suggested command**: `$impeccable layout src/app/(portfolio)/page.tsx`

### [P1] Resume CTA copy is now inaccurate

**Why it matters**: The stale PDF was redirected to the HTML resume page, but the homepage still says `Open PDF`. That creates a trust nick at the exact moment the reviewer clicks a credibility asset.

**Fix**: Rename the reviewer link value to `Open resume` in English and a Thai equivalent such as `เปิด resume` or `เปิดเรซูเม่`. If the design wants to imply printable output, use `Resume page` instead of PDF.

**Suggested command**: `$impeccable clarify src/app/(portfolio)/page.tsx`

### [P2] The page still leans on repeated card grammar

**Why it matters**: The brand goal is practical, sharp, trustworthy. The current system is trustworthy, but the repetition of rounded cards, icon tiles, pill labels, and uppercase metadata makes the middle and lower sections feel more generated than authored.

**Fix**: Keep cards for case studies, but vary the stack and demo sections. For example: make stack a compact proof matrix, make demos a tighter list/table hybrid, or turn the workflow panel into a more distinctive "review dossier" component.

**Suggested command**: `$impeccable bolder src/app/(portfolio)/page.tsx`

### [P2] The personal identity could be stronger after the hero

**Why it matters**: The hero says Chinnakrit clearly, but the rest of the page quickly becomes systems, demos, stack, and contact. For a portfolio, the visitor should continue feeling they are evaluating a specific person, not a fictional AI ops product.

**Fix**: Add one small personal credibility line or "builder profile" moment near selected work or stack: availability, location/timezone, role fit, or how Chinnakrit works. Keep it factual and bilingual.

**Suggested command**: `$impeccable shape src/app/(portfolio)/page.tsx`

## Persona Red Flags

**Hiring Manager scanning in 45 seconds**: The fast-path helps a lot. Red flag: the resume tile says `Open PDF` but opens a web resume. That is small, but hiring flows are trust-sensitive. The manager may also miss the strongest proof if the hero trust tiles compete with the selected work cards.

**Technical Reviewer validating credibility**: The problem/built/result cards are useful. Red flag: the mock workflow panel looks plausible, but it is still a mock. The page should make the transition from mock proof to real case study feel unmistakable so the reviewer does not discount the whole page as staged.

**Thai-first collaborator**: The bilingual structure is preserved, and mobile wrapping is mostly safe. Red flag: Thai copy mixes English technical terms heavily. That is acceptable for this audience, but the UI should avoid cramped Thai labels in fast-path tiles and buttons.

## Minor Observations

- Desktop hero is now visually strong, but the H1 wraps into a heavy vertical block; it works, though it dominates the fold.
- The language switcher is visible and calm on desktop; mobile language controls are tucked inside the menu, which is acceptable.
- Contact section is clean and no longer has the invisible CTA issue.
- The page has no horizontal overflow in the captured mobile screenshot.
- The case-study cards are readable, but the featured card has a large empty lower area on desktop because its footer is pushed to the bottom.

## Questions to Consider

1. What should a reviewer remember after 10 seconds: "AI automation builder," "public-safe demos," or "full-stack systems"? The current hero tries to land all three with equal force.
2. Should the mock workflow panel feel like a product UI, or should it feel more like a behind-the-scenes builder dossier?
3. Which proof should get the premium treatment: Hermes LINE AI, the resume, or the selected-work trio?
