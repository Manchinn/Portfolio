---
date: 2026-05-29
type: handoff
project: portfolio-optical-retail-demo
by: Manchinn + Agent
target_repo: C:\Users\chinn\web-projects\portfolio\frontend
---

# Optical Retail Web App Demo - Handoff

> Build a public-safe portfolio demo that proves front-end capability for retail/e-commerce, membership, store locator, booking, FAQ, and responsive UX workflows.

## Intent

Create a new portfolio case study/demo inspired by common optical retail website workflows. Do not clone OWNDAYS branding, copy, images, product names, or private business details. The goal is to show that Manchinn can build similar front-end systems with React/Next.js, TypeScript, Tailwind CSS, mock REST data, responsive UI, and SEO-ready pages.

## Repo Context

- Main portfolio repo: `C:\Users\chinn\web-projects\portfolio\frontend`
- Parent folder `C:\Users\chinn\web-projects\portfolio` is not the actual app repo.
- Existing portfolio content is bilingual. Preserve both English and Thai.
- Main content source is likely `src/data/portfolio.ts`.
- Existing demo routes may live under `src/app/(portfolio)/demos/...`.
- Add new crawlable demo URL to `src/app/sitemap.ts` if the repo uses static sitemap entries.
- Verify with `npm run build`.

## Recommended Demo Name

English:

`Optical Retail Web App Demo`

Thai:

`ต้นแบบเว็บร้านแว่นตาและระบบจองคิว`

Short description:

EN:
`A retail web app prototype for an optical store workflow, covering product discovery, membership UI, store locator, booking flow, FAQ, mock API data, responsive design, and SEO-ready pages.`

TH:
`ต้นแบบเว็บ retail/e-commerce สำหรับร้านแว่นตา ครอบคลุมการค้นหาสินค้า สมาชิก ค้นหาสาขา จองคิว FAQ mock API responsive UI และ SEO-ready pages`

## Scope

In:

- Add one public-safe demo/case study route to the portfolio.
- Show realistic front-end flows with static or mock data.
- Keep all data sanitized and fictional.
- Use existing portfolio styling patterns where possible.
- Update bilingual project/case-study copy.

Out:

- Real payment.
- Real auth provider.
- Real map provider API key.
- Real customer data.
- Any OWNDAYS brand assets, logos, product photos, text, or names.

## Core User Flows

### 1. Product Catalog

Purpose:

- Show e-commerce front-end skill.
- Prove ability to build product listing, filtering, search, and responsive product cards.

UI requirements:

- Product grid.
- Search input.
- Filters: frame type, color, material, price range, gender/style.
- Sort: recommended, price low-high, newest.
- Product cards with image placeholder, name, price, tags, CTA.

Mock data fields:

```ts
type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  frameType: "full-rim" | "half-rim" | "rimless";
  colors: string[];
  material: "acetate" | "metal" | "titanium" | "mixed";
  style: "daily" | "business" | "fashion" | "sport";
  image: string;
  badges: string[];
};
```

### 2. Product Detail

Purpose:

- Show detail-page composition and CTA design.

UI requirements:

- Product image area.
- Price and product specs.
- Color/material selector.
- Lens option mock.
- CTA buttons: `Add to wishlist`, `Book eye test`, `Find nearby store`.
- Related products.

### 3. Store Locator

Purpose:

- Show local retail UX and data filtering.

UI requirements:

- Search by province/area.
- Filter by BTS/MRT nearby, open now, eye-test available.
- Store cards with address, opening hours, phone, services.
- Optional simple map placeholder, no real map key needed.

Mock data fields:

```ts
type Store = {
  id: string;
  name: string;
  area: string;
  province: string;
  transit?: string;
  address: string;
  hours: string;
  services: Array<"eye-test" | "pickup" | "repair" | "contact-lens">;
  availableSlots: string[];
};
```

### 4. Booking Flow

Purpose:

- Show multi-step form, validation, and confirmation UX.

Steps:

1. Select store.
2. Select date/time.
3. Enter customer details.
4. Review.
5. Confirmation.

Fields:

- Name.
- Phone.
- Email.
- Service type.
- Preferred contact method.
- Note.

Validation:

- Required name, phone, email.
- Valid email format.
- Required store and time slot.

No backend needed. Store booking state in React state only.

### 5. Membership Mock

Purpose:

- Show auth/account UI without real auth.

UI requirements:

- Login/register mock panel.
- Member card.
- Points.
- Saved prescription mock.
- Purchase history mock.
- Notification preference mock.

Important:

- Do not claim real JWT implementation unless implemented.
- It is fine to explain as `mock auth state` or `frontend-only membership prototype`.

### 6. FAQ / Online Guide

Purpose:

- Show content-heavy page UX, accordion patterns, and SEO-friendly structure.

UI requirements:

- FAQ category tabs.
- Accordion questions.
- Search/filter FAQ.
- Online buying guide section.

Categories:

- Ordering.
- Lenses.
- Warranty.
- Store visit.
- Membership.
- Booking.

## Recommended Route Shape

Choose whichever matches the existing repo convention after inspection.

Likely option:

```text
src/app/(portfolio)/demos/optical-retail/page.tsx
```

Optional supporting files:

```text
src/app/(portfolio)/demos/optical-retail/data.ts
src/app/(portfolio)/demos/optical-retail/components/ProductCatalog.tsx
src/app/(portfolio)/demos/optical-retail/components/StoreLocator.tsx
src/app/(portfolio)/demos/optical-retail/components/BookingFlow.tsx
src/app/(portfolio)/demos/optical-retail/components/MemberPanel.tsx
src/app/(portfolio)/demos/optical-retail/components/FaqGuide.tsx
```

If the existing demo pages are single-file static prototypes, keep this demo single-file first. Split components only if the file becomes hard to maintain.

## Visual Direction

- Professional retail SaaS feel, not a landing-page clone.
- Clean product cards, dense but readable.
- Mobile-first responsive layout.
- Avoid using OWNDAYS colors as an exact brand match.
- Use neutral base with two accent colors.
- Keep cards at 8px radius or less unless existing portfolio style differs.
- Use existing icon library if the repo already has one.

## Copy To Add To Portfolio Projects

EN:

```text
Optical Retail Web App Demo

A public-safe retail prototype built with Next.js, TypeScript, and Tailwind CSS. It demonstrates product discovery, filtering, store locator UX, booking flow, membership mock UI, FAQ/search patterns, responsive layout, and SEO-ready structure using fictional data.
```

TH:

```text
ต้นแบบเว็บร้านแว่นตาและระบบจองคิว

ต้นแบบ retail web app ที่ปลอดภัยสำหรับ portfolio สร้างด้วย Next.js, TypeScript และ Tailwind CSS แสดงระบบค้นหาสินค้า filter ค้นหาสาขา จองคิว mock membership FAQ/search responsive layout และโครงสร้างที่พร้อมต่อยอดด้าน SEO โดยใช้ข้อมูลสมมติทั้งหมด
```

Skills shown:

- React/Next.js component architecture.
- TypeScript data modeling.
- Tailwind CSS responsive UI.
- Mock REST/API-ready data structure.
- Multi-step booking form.
- Product catalog filtering.
- Store locator UX.
- Membership/account UI.
- FAQ/content information architecture.
- SEO metadata and static route coverage.

## Acceptance Criteria

- Demo route renders on desktop and mobile.
- All mock data is fictional.
- No real OWNDAYS branding, copy, logos, product names, or images.
- Product filters visibly change the product list.
- Booking flow can reach confirmation state.
- FAQ accordions/search work.
- Bilingual portfolio project copy is updated if the project list is edited.
- Sitemap includes the new public route if the repo has static sitemap entries.
- `npm run build` passes.

## Suggested Implementation Plan For Next Codex Session

1. Open `C:\Users\chinn\web-projects\portfolio\AGENTS.md`.
2. Continue in `C:\Users\chinn\web-projects\portfolio\frontend`.
3. Run quick repo inspection:

```powershell
git status
rg --files -g "page.tsx" -g "portfolio.ts" -g "sitemap.ts" -g "package.json"
```

4. Inspect existing demo route patterns under:

```text
src/app/(portfolio)/demos
```

5. Add `optical-retail` demo route using existing styling conventions.
6. Add or update the bilingual portfolio project entry in `src/data/portfolio.ts`.
7. Add route to `src/app/sitemap.ts` if needed.
8. Run:

```powershell
npm run build
```

9. If asked to push, commit and push to `origin/master` after confirming git state.

## Paste-Ready Prompt For New Codex Session

```text
Read C:\Users\chinn\web-projects\portfolio\AGENTS.md first. Then continue in C:\Users\chinn\web-projects\portfolio\frontend, which is the real Next.js portfolio repo.

Goal: build a new public-safe portfolio demo/case study called "Optical Retail Web App Demo" based on C:\Users\chinn\OneDrive\เอกสาร\Obsidian Vault\output\optical-retail-demo-handoff.md.

Do not clone OWNDAYS branding or copy. Use fictional data only. Preserve bilingual EN/TH portfolio structure, especially src/data/portfolio.ts. Add a demo route, likely src/app/(portfolio)/demos/optical-retail/page.tsx, following existing demo patterns. Show product catalog/filtering, store locator, booking flow, membership mock, and FAQ/guide. Update sitemap if needed. Verify with npm run build.
```

