# Task-Specific Checklist

## New Page or Section
- Confirm section ID matches navItems in src/data/portfolio.js before linking.
- Reuse existing Section pattern: section wrapper, container, heading hierarchy.
- Check design tokens in tailwind.config.js and src/index.css for colors, shadows, and animations before adding styles.
- Apply neo-brutalist defaults: border-2 border-black, shadow-neo, no rounded corners, bold typography.
- Validate mobile-first spacing (p-3 sm:p-4, py-8 md:py-12) and ensure responsiveness.

## New Component Variant
- Prefer composing existing components (Button, Card, SkillTag) with className overrides instead of custom markup.
- Keep interaction behaviour: hover translate press effect, shadow-neo default.
- Document required props and variants inline if behaviour is non-obvious.

## Data or API Changes
- Update services/portfolioService.js and hooks/usePortfolioData.js together to keep the hook shape consistent.
- Confirm fallback data in src/data/portfolio.js covers new fields.
- Run npm run lint after structural changes.

## Visual Tweaks
- Reference design tokens before introducing new colors or shadows.
- Maintain WCAG AA contrast; default text is black on light backgrounds.
- Use predefined animations (animate-fade-in, animate-stagger) instead of custom keyframes when possible.

## 🎨 Design System & Tokens

### Design Philosophy
- **Neo-Brutalism Style**: Bold borders, flat colors, dramatic shadows, and strong contrast
- **Mobile-First**: All components are responsive by default
- **Accessibility**: Maintain WCAG AA standards for contrast and interactivity

### Color Tokens

**Brand Colors** (defined in [src/index.css](../src/index.css) via `@theme`):
```css
/* @theme directive (Tailwind v4) */
@theme {
  --color-neo-yellow: #FFDE00;  /* → bg-neo-yellow, text-neo-yellow */
  --color-neo-pink: #FF90E8;    /* → bg-neo-pink, text-neo-pink */
  --color-neo-blue: #5471FF;    /* → bg-neo-blue, text-neo-blue */
  --color-neo-green: #90EE90;   /* → bg-neo-green, text-neo-green */
}

/* ใช้งาน: utility classes สร้างอัตโนมัติ */
bg-neo-yellow    /* Primary CTA */
bg-neo-pink      /* Secondary actions */
bg-neo-blue      /* Info/Links */
bg-neo-green     /* Success states */
text-black       /* Always high contrast */
```

**Neutral Colors**:
- `black` - Primary text, borders, shadows
- `white` - Backgrounds, inverse text
- `gray-50` to `gray-900` - Secondary text, disabled states, backgrounds

### Typography Tokens

**CSS Variables** (defined in [src/index.css](../src/index.css)):
```css
--font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
--font-weight-normal: 400;
--font-weight-bold: 700;
--font-weight-black: 900;

/* Font Sizes */
--text-xs: 0.75rem;    /* Captions, metadata */
--text-sm: 0.875rem;   /* Body small */
--text-base: 1rem;     /* Default body */
--text-lg: 1.125rem;   /* Subheadings */
--text-xl: 1.25rem;    /* Card titles */
--text-2xl to --text-6xl /* Headings */
```

**Tailwind Usage**:
- `font-mono` - Code snippets, timestamps
- `font-bold` (700) - Emphasis, buttons
- `font-black` (900) - Headings, hero text
- `uppercase` - Buttons, labels, emphasis

### Spacing Tokens

**CSS Variables** (defined in [src/index.css](../src/index.css)):
```css
--space-1: 0.25rem;   /* 4px - tight */
--space-2: 0.5rem;    /* 8px - button padding-y */
--space-3: 0.75rem;   /* 12px - card padding (mobile) */
--space-4: 1rem;      /* 16px - card padding (desktop) */
--space-6: 1.5rem;    /* 24px - section padding */
--space-8: 2rem;      /* 32px - large section */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px - section vertical */
```

**Responsive Spacing Pattern** (Tailwind):
```jsx
px-4 py-2        // Mobile button
sm:px-6 sm:py-3  // Desktop button

p-3 sm:p-4       // Card padding
py-8 md:py-12    // Section padding
```

### Border Tokens

**CSS Variables** (defined in [src/index.css](../src/index.css)):
```css
--border-width-default: 2px;    /* Standard components */
--border-width-thick: 4px;      /* Emphasis, hero */
--border-color: var(--color-black);
--border-radius-none: 0;        /* Neo-brutalism default */
--border-radius-sm: 0.125rem;   /* Images only (rare) */
```

**Tailwind Usage**:
- `border-2 border-black` - Default component borders
- `border-4 border-black` - Emphasis, hero elements
- `border-b-2` - Dividers
- `rounded-none` - Default (no rounded corners)

### Shadow Tokens

**Defined in [src/index.css](../src/index.css) via `@theme`**:

```css
/* @theme directive สร้าง utility classes อัตโนมัติ */
@theme {
  --shadow-neo: 4px 4px 0 #000;        /* → shadow-neo */
  --shadow-neo-sm: 2px 2px 0 #000;     /* → shadow-neo-sm */
  --shadow-neo-lg: 8px 8px 0 #000;     /* → shadow-neo-lg */
  --shadow-neo-soft: 4px 4px 0 rgba(0,0,0,0.3); /* → shadow-neo-soft */
}

/* ใช้งาน */
<div class="shadow-neo">              <!-- ใช้ utility class ตรง -->
<div class="shadow-neo-lg">           <!-- large shadow -->
<div class="hover:shadow-none">       <!-- ลบ shadow เมื่อ hover -->

/* Interactive Pattern */
hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
/* สร้าง "button press" effect */
```

**Component Classes** (ใน CSS ปกติ):
- `.neo-press` - Interactive press effect
- `.neo-card` - Card พร้อม border + shadow
- `.neo-btn` - Button base style
- `.hover-shadow-lift` - เพิ่ม shadow เมื่อ hover

### Animation Tokens

**Defined in [src/index.css](../src/index.css) via `@theme`**:

```css
/* @theme สร้าง animate-* utilities */
@theme {
  --animate-fade-in: fade-in 0.6s ease-out forwards;
  --animate-slide-in-left: slide-in-left 0.6s ease-out forwards;
  --animate-slide-in-right: slide-in-right 0.6s ease-out forwards;
  --animate-scale-up: scale-up 0.6s ease-out forwards;
  --animate-bounce-slow: bounce-slow 2s infinite;
  --animate-shimmer: shimmer 2s infinite;

  @keyframes fade-in { /* ... */ }
}

/* ใช้งาน */
<div class="animate-fade-in">         <!-- Fade + slide up -->
<div class="animate-slide-in-left">   <!-- Slide from left -->
<div class="animate-bounce-slow">     <!-- Bounce infinite -->
```

**Stagger Pattern** (CSS ปกติ):
```jsx
<div className="animate-stagger">
  <div>Item 1</div> {/* delays: 0s, 0.1s, 0.2s... */}
  <div>Item 2</div>
</div>
```

**Utility Classes ใน CSS**:
- `.transition-all-smooth` - All properties (cubic-bezier)
- `.transition-transform-smooth` - Transform only
- `.hover-lift` - Lift up on hover
- `.hover-glow` - Glow effect

### Interaction Tokens

**CSS Variables** (defined in [src/index.css](../src/index.css)):
```css
--transition-fast: 200ms;      /* Hover, active */
--transition-normal: 300ms;    /* Standard */
--transition-slow: 500ms;      /* Dramatic */
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);
--press-offset: 2px;           /* Button press shift */
--hover-lift: -5px;            /* Lift on hover */
```

**Button States** (Tailwind):
```jsx
// Default
bg-neo-yellow border-2 border-black shadow-neo

// Hover (or use .neo-press class)
hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none

// Active/Press
active:bg-white

// Disabled
opacity-50 cursor-not-allowed
```

**Ready-to-use Class**:
```jsx
// Using neo-press utility
<button className="neo-btn bg-neo-yellow">Click me</button>

// Using neo-card
<div className="neo-card p-4">Card content</div>
```

---

## 📦 UI Component Library

### Core Components

#### 1. **Button** ([src/components/Button/Button.jsx](../src/components/Button/Button.jsx))

**Purpose**: Primary action trigger with neo-brutalism style

**Props**:
- `text` (string, required) - Button label
- `color` (string, default: 'bg-neo-yellow') - Background color class
- `onClick` (function) - Click handler

**Variants**:
```jsx
// Primary CTA
<Button text="Download CV" color="bg-neo-yellow" onClick={handleClick} />

// Secondary
<Button text="Learn More" color="bg-neo-pink" onClick={handleClick} />

// Info/Link style
<Button text="View Project" color="bg-neo-blue" onClick={handleClick} />
```

**Design Tokens Used**:
- Colors: `bg-neo-yellow`, `bg-neo-pink`, `bg-neo-blue`
- Border: `border-2 border-black`
- Shadow: `shadow-neo`
- Typography: `font-bold text-sm sm:text-base`
- Spacing: `px-4 sm:px-6 py-2`
- Interaction: Press effect with translate + shadow removal

**Responsive Behavior**:
- Mobile: `px-4 py-2 text-sm`
- Desktop: `sm:px-6 sm:text-base`

---

#### 2. **Card** ([src/components/Card/Card.jsx](../src/components/Card/Card.jsx))

**Purpose**: Project/content card with image, title, description

**Props**:
- `title` (string, required) - Card title
- `desc` (string, required) - Description text
- `imgUrl` (string, required) - Image URL

**Design Tokens Used**:
- Border: `border-2 border-black`
- Shadow: `shadow-neo` → `hover:shadow-none`
- Spacing: `p-3 sm:p-4`
- Typography: `text-lg sm:text-xl font-black uppercase`
- Image height: `h-40 sm:h-48`
- Interaction: Lift effect on hover

**Composition**:
```jsx
<Card>
  <img /> {/* Fixed aspect ratio container */}
  <h3 />  {/* Title: font-black uppercase */}
  <p />   {/* Description: font-mono line-clamp-2 */}
  <button /> {/* Internal CTA */}
</Card>
```

---

#### 3. **SkillTag** ([src/components/SkillTag.jsx](../src/components/SkillTag.jsx))

**Purpose**: Skill badge with proficiency level indicator

**Props**:
- `name` (string, required) - Skill name
- `level` (string, required) - 'Advanced' | 'Intermediate' | 'Beginner'

**Level Color Mapping**:
```javascript
'Advanced':    'bg-neo-pink'    // Expert level
'Intermediate': 'bg-neo-blue'   // Proficient
'Beginner':    'bg-neo-yellow'  // Learning
```

**Design Tokens Used**:
- Border: `border-2 border-black`
- Typography: `font-bold text-sm uppercase`
- Spacing: `px-4 py-2`
- Interaction: `hover:shadow-neo`

**Usage Pattern**:
```jsx
<SkillTag name="React" level="Advanced" />
<SkillTag name="TypeScript" level="Intermediate" />
```

---

#### 4. **ExperienceCard** ([src/components/ExperienceCard.jsx](../src/components/ExperienceCard.jsx))

**Purpose**: Timeline card for work experience/education

**Props** (inferred from usage):
- `year` (string) - Time period
- `position` (string) - Job title
- `company` (string) - Company name
- `description` (string) - Role description
- `achievements` (array) - Achievement list

**Design Pattern**:
- Timeline connector (vertical line + dot)
- Card container with neo-brutalism style
- Bullet list for achievements

---

#### 5. **Loading** ([src/components/Loading.jsx](../src/components/Loading.jsx))

**Purpose**: Loading state indicator

**Design Tokens Used**:
- Animation: `animate-shimmer` or custom spinner
- Colors: Neutral grays
- Typography: Small helper text

**Usage**:
```jsx
{loading && <Loading />}
{!loading && data && <Content data={data} />}
```

---

#### 6. **Navbar** ([src/components/Navbar/*](../src/components/Navbar))

**Purpose**: Main navigation with smooth scroll

**Design Tokens Used**:
- Background: Sticky header with backdrop blur
- Border: `border-b-2 border-black`
- Typography: `font-bold`
- Interaction: Active state highlighting

**Behavior**:
- Smooth scroll to sections (via hash anchors)
- Mobile responsive (hamburger menu)
- Active link indication

---

### Section Components

All sections follow consistent patterns:

**Common Structure**:
```jsx
<section id="section-name" className="py-12 md:py-20">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl md:text-5xl font-black mb-8">
      SECTION TITLE
    </h2>
    {/* Section content */}
  </div>
</section>
```

**Available Sections** ([src/components/Sections/*](../src/components/Sections)):
- `About.jsx` - Hero/bio section
- `Skills.jsx` - Skills grid with SkillTag components
- `Experience.jsx` - Timeline with ExperienceCard components
- `Projects.jsx` - Grid layout with Card components + modal
- `Contact.jsx` - Contact form + info
- `Footer.jsx` - Footer links + social icons

---

## 🎯 Component Usage Guidelines

### When Creating New Components

1. **Follow Neo-Brutalism Principles**:
   - Always use `border-2 border-black`
   - Add `shadow-neo` for depth
   - No rounded corners (`rounded-none`)
   - Use brand colors for accents

2. **Maintain Consistency**:
   ```jsx
   // ✅ CORRECT - Follows design system
   <div className="border-2 border-black bg-neo-yellow p-4 shadow-neo">
   
   // ❌ WRONG - Inconsistent with design
   <div className="rounded-lg shadow-lg bg-blue-500 p-3">
   ```

3. **Responsive Design Pattern**:
   ```jsx
   // Mobile-first approach
   <Component 
     className="p-3 text-sm sm:p-4 sm:text-base md:p-6 md:text-lg"
   />
   ```

4. **Interactive States**:
   ```jsx
   // Standard button press effect
   <button className="
     shadow-neo
     hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
     active:bg-white
     transition-all duration-200
   ">
   ```

5. **Animation Entry**:
   ```jsx
   // Fade in on mount
   <div className="animate-fade-in">
   
   // Stagger children
   <div className="animate-stagger">
     {items.map(item => <Item key={item.id} />)}
   </div>
   ```

### Composition Over Customization

Prefer composing existing components:

```jsx
// ✅ Good - Compose Button
<Button text="Submit" color="bg-neo-pink" onClick={handleSubmit} />

// ❌ Avoid - Custom inline styling
<button style={{background: '#FF90E8'}} onClick={handleSubmit}>
  Submit
</button>
```

### Extending Components

When you need variants:

```jsx
// Option 1: Pass className prop for extensions
<Button text="Large" color="bg-neo-yellow" className="text-xl px-8" />

// Option 2: Create specific variant component
const ButtonLarge = (props) => (
  <Button {...props} className="text-xl px-8 py-4" />
)
```

---