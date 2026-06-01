---
target: homepage portfolio landing page
total_score: 25
p0_count: 0
p1_count: 2
timestamp: 2026-06-01T09-42-38Z
slug: src-app-portfolio-page-tsx
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Above-fold content can render invisible in captured/initial states because motion gates content behind opacity. |
| 2 | Match System / Real World | 3 | The proof language is mostly clear, but the hero panel can feel like a SaaS product rather than an individual portfolio. |
| 3 | User Control and Freedom | 3 | Navigation and CTAs are clear; no heavy trap states on the inspected landing page. |
| 4 | Consistency and Standards | 3 | Main SaaS portfolio system is cohesive; old neo-brutalist footer is out-of-scope unless imported elsewhere. |
| 5 | Error Prevention | 2 | Lead/contact flow was not deeply inspected; no strong form prevention evidence on the landing page. |
| 6 | Recognition Rather Than Recall | 3 | Nav, demos, and case-study language are discoverable. |
| 7 | Flexibility and Efficiency | 2 | Good direct links, but no strong fast path for reviewers who want resume, best demo, or contact immediately. |
| 8 | Aesthetic and Minimalist Design | 2 | Large blank areas dominate screenshots and weaken the brand landing first impression. |
| 9 | Error Recovery | 2 | Not much error surface on this page; no visible recovery patterns to score highly. |
| 10 | Help and Documentation | 3 | Demos and case-study explanations provide helpful context for a portfolio visitor. |
| **Total** | | **25/40** | **Acceptable, with one major first-impression bug** |

#### Anti-Patterns Verdict

**LLM assessment**: The page does not look like raw AI slop in its token system: Signal Green, Operator Ink, calm cards, and bilingual copy are coherent. The risk is not visual chaos; the risk is generic SaaS landing grammar and hidden proof. The first viewport is mostly blank in rendered screenshots, which makes the strongest work invisible at the exact moment the page needs to establish trust.

**Deterministic scan**: `detect.mjs --json` returned `[]` for the inspected source set: `src/app/(portfolio)/page.tsx`, `SaasHome.tsx`, `_shared.tsx`, `Navbar.tsx`, and `Footer.tsx`. No detector rule hits.

**Visual overlays**: Overlay injection was skipped because the available browser route was Playwright CLI screenshots, not a mutable browser tab API. Screenshots were captured at desktop 1440x1000 and mobile 390x844.

#### Overall Impression

The portfolio direction is in scope and worth fixing. It is already coherent enough to keep, but the first viewport blankness is a conversion problem, not a taste issue. The best next pass should make the hero reliably visible, then make the page feel more like Chinnakrit's operator portfolio and less like a fictional SaaS landing page.

#### What's Working

- The design system is consistent: green actions, soft neutral surfaces, rounded controls, and clear card hierarchy are aligned with `PRODUCT.md` and `DESIGN.md`.
- The bilingual content strategy is real, not bolted on. Thai and English copy both carry the portfolio story.
- The demos are public-safe and concrete; the page is doing the right kind of proof-led positioning.

#### Priority Issues

**[P1] Above-fold hero is invisible in rendered screenshots**
Why it matters: First-time visitors, preview bots, recruiters opening quickly, and visual QA see blank space before the portfolio explains who you are. That kills the brand landing job.
Fix: Make hero content visible by default. For above-fold hero, use `animate="visible"` or a non-gated animation instead of `whileInView` from hidden opacity. For below-fold cards, keep reveal motion but ensure no-JS/full-page screenshot fallback is visible.
Suggested command: `$impeccable polish homepage hero motion`

**[P1] The page leans too much toward fictional SaaS product grammar**
Why it matters: Your PRODUCT.md says not to make the portfolio feel like a fictional product company. The mock workflow panel is useful, but the top story needs more of you: name, role, strongest proof, and a direct reviewer path.
Fix: Rebalance the hero so Chinnakrit is the first signal, then use Assistant Ops Studio as proof, not the main identity.
Suggested command: `$impeccable clarify homepage hero`

**[P2] Reviewer fast paths are underpowered**
Why it matters: Hiring managers and technical reviewers often want one best demo, resume, GitHub, and contact fast. The nav is clean, but the page could make the best next action more obvious.
Fix: Add a compact reviewer strip or hero action set: best demo, resume, GitHub, contact. Keep it public-safe and not cluttered.
Suggested command: `$impeccable layout homepage reviewer fast paths`

**[P2] Legacy neo-brutalist footer is visually out of scope if it appears anywhere**
Why it matters: `Footer.tsx` still uses DEVFOLIO, black brutal styling, hard borders, and placeholder `href="#"` social links. It conflicts with the Operator Showcase system. It is not used by `src/app/(portfolio)/layout.tsx`, so do not fix it unless another live route imports it.
Fix: If used, redesign it into the SaaS portfolio system or remove dead surface. If unused, leave it for cleanup later.
Suggested command: `$impeccable audit footer usage`

#### Persona Red Flags

**Jordan (First-Timer)**: On the captured first viewport, Jordan sees almost nothing after the nav. The page fails the 5-second clarity test until scrolling reaches Selected Work. The fix is visible hero identity and role proof.

**Casey (Distracted Mobile User)**: Mobile screenshot also starts with a blank first screen, then eventually shows Selected Work. Casey is likely to bounce before understanding the offer. The mobile nav button exists and touch target looks large enough, but the content reveal is the blocker.

**Technical Reviewer**: The reviewer can find public-safe demos later, but the fastest proof path is not dominant enough. They should not have to decide between generic Work/Demos/Stack before seeing the strongest proof.

#### Minor Observations

- The old `Footer.tsx` social links use `href="#"`; harmless if unused, bad if visible.
- The repeated uppercase eyebrows are acceptable in moderation, but the page uses them often enough that future sections should vary the cadence.
- The current palette is coherent, but it is restrained enough that screenshots can read quiet; after the motion bug, consider one stronger identity moment.

#### Questions to Consider

- Should the hero lead with Chinnakrit's name and role, then show the mock workflow as supporting proof?
- What is the one demo a technical reviewer should open first?
- Should the portfolio optimize for hiring, freelance clients, or selling AI workflow packages first?
