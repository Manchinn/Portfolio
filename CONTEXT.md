# Portfolio Design Context

This context defines the shared language for the chinnakrit.dev portfolio design direction. It exists to keep future design and implementation decisions consistent across the homepage, navigation, selected work, and work intake surface.

## Language

**Modern SaaS Product Portfolio**:
The canonical visual direction for the public portfolio: friendly, product-led, spacious, conversion-aware, and grounded in real workflow proof. It owns the shared color, typography, spacing, navigation, card, and CTA system.
_Avoid_: Console portfolio, terminal portfolio, Bubble clone

**Operator Console Pattern**:
A content pattern used to express operational proof such as workflows, checks, logs, and stateful tooling. It may appear inside the portfolio, but it must use the Modern SaaS Product Portfolio design system.
_Avoid_: Separate console theme, old control-center skin

**Workflow Proof**:
Evidence that a project can move from messy task to scoped prompt, prototype, working surface, verification, and handoff. It is broader than a static case-study card and should be visible near key conversion points.
_Avoid_: Screenshot-only proof, vague project claim

**Global SaaS Shell**:
The shared portfolio frame that gives every portfolio route the same navigation identity, design system, and conversion hierarchy. It applies to the homepage and work intake route, while standalone product experiments may keep their own shell.
_Avoid_: Per-page navbar theme, mixed portfolio shell

**Workflow Intake Page**:
The portfolio route that turns visitor interest into a scoped project brief. It should feel like a SaaS conversion page with safe intake notes, a clear form, a local brief preview, and an explicit public-contact handoff rather than an internal console. The brief stays in the browser until the visitor chooses to copy or open the contact channel.
_Avoid_: Intake console, admin form, backend lead capture

**Portfolio Journey Navigation**:
The canonical navigation path for the simplified portfolio shell: Home, Work, Stack, and Contact. Work points to selected project proof, Stack points to capabilities, and Contact points to the project inquiry route. Navigation should point to real sections or high-intent routes, not legacy anchors, duplicated concepts, or external distractions.
_Avoid_: Timeline nav without a timeline section, duplicated Projects and Systems links, Prompts as a primary portfolio nav item

## Example Dialogue

Dev: "Should the standalone SaaS demo use the same navbar?"

Domain expert: "No. A standalone product demo may keep a separate shell. Portfolio routes use the Global SaaS Shell."

Dev: "Should `/work-with-me` keep an email preview?"

Domain expert: "No. It is a Workflow Intake Page. Keep the brief form, local preview, and explicit public-contact handoff, but use the Modern SaaS Product Portfolio design system."

Dev: "Should the navbar keep Workflow, Systems, Work, Timeline, Projects, or Prompts?"

Domain expert: "No. Use the simplified Portfolio Journey Navigation: Home, Work, Stack, and Contact."
