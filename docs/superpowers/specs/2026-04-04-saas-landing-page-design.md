# SaaS Landing Page Integration — Design Spec

**Date:** 2026-04-04  
**Project:** portfolio/frontend  
**Branch:** feat/nextjs-migration

---

## Overview

เพิ่ม SaaS landing page demo เข้า portfolio โดยเป็น fictional product ชื่อ "FlowSync" (AI task automation) ภาษาไทยทั้งหมด แสดงให้เห็นว่า SaaS landing page มี section อะไรบ้าง (showcase design patterns) และ integrate เข้า portfolio ผ่าน Projects section

---

## Architecture

### Approach

Next.js App Router route `/saas` — SSG, standalone layout (ไม่ inherit Navbar/Footer ของ portfolio)

### File Structure

```
src/app/
  saas/
    layout.tsx                → standalone layout (ไม่มี portfolio Navbar)
    page.tsx                  → compose sections, Server Component
    components/
      SaasNavbar.tsx           → Logo + CTA + Back button
      Hero.tsx                 → Headline, subheadline, CTA, mockup
      Features.tsx             → 3-6 feature cards
      HowItWorks.tsx           → 3-step flow
      Pricing.tsx              → 3 tiers (Free / Pro / Enterprise)
      Testimonials.tsx         → 3 fake reviews
      Faq.tsx                  → accordion 5 ข้อ ('use client')
      CtaBanner.tsx            → closing call-to-action
      SaasFooter.tsx           → links, copyright
```

`layout.tsx` ไม่ wrap `<html>/<body>` ซ้ำ — root layout ของ portfolio ยังคุม shell แต่ไม่ inject Navbar/Footer ของ portfolio เข้ามา

---

## Sections

| # | Section | Content |
|---|---------|---------|
| 1 | Navbar | Logo "FlowSync" + ปุ่ม "เริ่มใช้งานฟรี" + Back to portfolio |
| 2 | Hero | Headline ภาษาไทย, subheadline, 2 CTA buttons, product mockup placeholder |
| 3 | Features | 6 feature cards พร้อม icon (lucide-react) |
| 4 | How it works | 3 steps แบบ numbered flow |
| 5 | Pricing | Free / Pro (฿299/เดือน) / Enterprise |
| 6 | Testimonials | 3 fake reviews พร้อม avatar placeholder |
| 7 | FAQ | 5 ข้อ accordion (client component) |
| 8 | CTA Banner | ปิดท้ายชวน sign up |
| 9 | Footer | links + copyright |

---

## Data & Content

- Content **hardcode** ใน component โดยตรง (ไม่ใช้ i18n system)
- ภาษาไทยทั้งหมด
- Fictional product: **FlowSync** — "จัดการงานด้วย AI อัตโนมัติ"
- ใช้ `lucide-react` สำหรับ icons (มีใน project อยู่แล้ว)

---

## Styling

- **Tailwind CSS 4** (เหมือน portfolio หลัก)
- Color palette: `indigo` / `violet` — แยกอิสระจาก neo-brutalist theme ของ portfolio
- Mobile-first responsive
- แต่ละ section เป็น Server Component ยกเว้น FAQ ที่ต้องการ accordion state (`'use client'`)

---

## Portfolio Integration

### `src/data/portfolio.ts`

เพิ่ม project entry:

```ts
{
  title: { en: "SaaS Landing Page", th: "SaaS Landing Page" },
  description: {
    en: "A complete SaaS landing page demo showcasing modern design patterns — Hero, Pricing, FAQ, and more",
    th: "ตัวอย่าง SaaS landing page ครบทุก section ที่ใช้ในผลิตภัณฑ์จริง"
  },
  tags: ["Next.js", "Tailwind CSS", "TypeScript"],
  link: "/saas",
}
```

### Navigation Flow

- Projects section card → คลิก → `/saas`
- SaasNavbar มี Back button → `/#projects`
- `/saas` ไม่แสดง Navbar ของ portfolio

---

## SSG

`saas/page.tsx` เป็น Server Component ไม่มี dynamic data — Next.js SSG อัตโนมัติตอน build

---

## Out of Scope

- ไม่มี real backend / form submission
- ไม่มี animation library เพิ่ม (ใช้ Tailwind transitions เท่านั้น)
- ไม่มี dark mode
- ไม่มี i18n (Thai only)
