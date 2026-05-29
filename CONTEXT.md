# Portfolio Design Context

This context defines the shared language for the chinnakrit.dev portfolio design direction. It exists to keep future design and implementation decisions consistent across the homepage, navigation, demo index, demo details, and work intake surface.

## Language

**Modern SaaS Product Portfolio**:
The canonical visual direction for the public portfolio: friendly, product-led, spacious, conversion-aware, and grounded in real workflow proof. It owns the shared color, typography, spacing, navigation, card, and CTA system.
_Avoid_: Console portfolio, terminal portfolio, Bubble clone

**Operator Console Pattern**:
A content pattern used to express operational proof such as workflows, demos, checks, logs, and stateful tooling. It may appear inside the portfolio, but it must use the Modern SaaS Product Portfolio design system.
_Avoid_: Separate console theme, old control-center skin

**Public-Safe Demo**:
A portfolio demo that shows capability through fictional or sanitized records without exposing private data, credentials, private URLs, infrastructure internals, or nonpublic operational details.
_Avoid_: Real customer demo, private system mirror

**Workflow Proof**:
Evidence that a project can move from messy task to scoped prompt, prototype, working surface, verification, and handoff. It is broader than a static case-study card and should be visible near key conversion points.
_Avoid_: Screenshot-only proof, vague project claim

**Global SaaS Shell**:
The shared portfolio frame that gives every portfolio route the same navigation identity, design system, and conversion hierarchy. It applies to the homepage, demo index, demo details, and work intake route, while standalone product demos may keep their own shell.
_Avoid_: Per-page navbar theme, mixed portfolio shell

**Demo Gallery**:
The portfolio route that presents Public-Safe Demos as product proof cards. It may show operator proof signals such as status, scope, safety, and workflow evidence, but its primary job is to help visitors compare demos and open the right one.
_Avoid_: Demo control center, dashboard-first demo index

**Workflow Intake Page**:
The portfolio route that turns visitor interest into a scoped project brief. It should feel like a SaaS conversion page with safe intake notes, a clear form, and a local email preview rather than an internal console.
_Avoid_: Intake console, admin form, backend lead capture

**Demo Detail Surface**:
A Public-Safe Demo route that keeps the interaction model needed for its specific proof while sharing the Global SaaS Shell and Modern SaaS Product Portfolio visual system. Demo details do not need identical layouts when their workflows prove different skills.
_Avoid_: One-size-fits-all demo template, unrelated per-demo theme

**Portfolio Journey Navigation**:
The canonical navigation path for the portfolio shell: Home, Workflow, Systems, Demos, Stack, Work, and Contact. Navigation should point to real sections or high-intent routes, not legacy anchors, duplicated concepts, or external distractions.
_Avoid_: Timeline nav without a timeline section, duplicated Projects and Systems links, Prompts as a primary portfolio nav item

## Example Dialogue

Dev: "Should the demos page stay as a control center?"

Domain expert: "It can keep the Operator Console Pattern, but the page must still feel like the Modern SaaS Product Portfolio."

Dev: "So blue/slate panels and old squared console buttons are out?"

Domain expert: "Yes. Use the shared SaaS colors, type, spacing, cards, and CTA hierarchy. Console-like content is fine; a separate console theme is not."

Dev: "Should the standalone SaaS demo use the same navbar?"

Domain expert: "No. A standalone product demo may keep a separate shell. Portfolio routes use the Global SaaS Shell."

Dev: "Should `/demos` look like an operations dashboard?"

Domain expert: "No. `/demos` is a Demo Gallery. It can include operator proof signals, but the primary surface is SaaS-style product proof cards."

Dev: "Should `/work-with-me` stay as an intake console?"

Domain expert: "No. It is a Workflow Intake Page. Keep the brief form and email preview, but use the Modern SaaS Product Portfolio design system."

Dev: "Should every demo detail page use the same layout?"

Domain expert: "No. Each Demo Detail Surface can keep a workflow-specific layout, but the shell, colors, type, spacing, and CTA language should belong to the same portfolio design system."

Dev: "Should the navbar keep Timeline, Projects, and Prompts?"

Domain expert: "No. Use Portfolio Journey Navigation: Home, Workflow, Systems, Demos, Stack, Work, and Contact."
