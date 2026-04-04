# SaaS Landing Page Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** เพิ่ม `/saas` route เป็น SaaS landing page demo (FlowSync) ภาษาไทย standalone ไม่มี portfolio Navbar และเพิ่ม project card ใน Projects section

**Architecture:** ใช้ Next.js App Router Route Group `(portfolio)` เพื่อแยก Navbar ออกจาก `/saas` route — portfolio pages ย้ายเข้า `(portfolio)/` group, `/saas` อยู่นอก group ไม่ได้รับ Navbar โดยอัตโนมัติ

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS 4, lucide-react

---

## File Map

### Modified
- `src/app/layout.tsx` — ลบ `<Navbar />` ออก, คง `<html>/<body>/<LanguageProvider>`
- `src/data/types.ts` — `github?: string` (optional)
- `src/data/portfolio.ts` — เพิ่ม project entry สำหรับ SaaS landing page

### Moved (Route Group Restructure)
- `src/app/page.tsx` → `src/app/(portfolio)/page.tsx`
- `src/app/article/` → `src/app/(portfolio)/article/`
- `src/app/not-found.tsx` → `src/app/(portfolio)/not-found.tsx`

### Created
- `src/app/(portfolio)/layout.tsx` — layout สำหรับ portfolio pages (มี Navbar)
- `src/app/saas/layout.tsx` — standalone layout (ไม่มี Navbar)
- `src/app/saas/page.tsx` — compose sections ทั้งหมด
- `src/app/saas/components/SaasNavbar.tsx`
- `src/app/saas/components/Hero.tsx`
- `src/app/saas/components/Features.tsx`
- `src/app/saas/components/HowItWorks.tsx`
- `src/app/saas/components/Pricing.tsx`
- `src/app/saas/components/Testimonials.tsx`
- `src/app/saas/components/Faq.tsx` (client component)
- `src/app/saas/components/CtaBanner.tsx`
- `src/app/saas/components/SaasFooter.tsx`

---

## Task 1: Route Group Restructure

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/(portfolio)/layout.tsx`
- Move: `src/app/page.tsx` → `src/app/(portfolio)/page.tsx`
- Move: `src/app/article/` → `src/app/(portfolio)/article/`
- Move: `src/app/not-found.tsx` → `src/app/(portfolio)/not-found.tsx`

- [ ] **Step 1: แก้ root `layout.tsx` ลบ Navbar ออก**

แก้ `src/app/layout.tsx` ให้เป็น:

```tsx
import type { Metadata } from 'next'
import { LanguageProvider } from '@/i18n/useTranslation'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chinnakrit Sripan — Portfolio',
  description: 'Frontend Developer / Full-stack Developer portfolio showcasing projects and skills.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: สร้าง `(portfolio)` group layout**

สร้าง `src/app/(portfolio)/layout.tsx`:

```tsx
import Navbar from '@/components/layout/Navbar/Navbar'

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
```

- [ ] **Step 3: ย้าย page.tsx เข้า route group**

```bash
mkdir -p src/app/\(portfolio\)
cp src/app/page.tsx src/app/\(portfolio\)/page.tsx
# ตรวจสอบแล้วลบ original
```

ตรวจสอบ content ว่า import paths ยังถูกต้อง (ใช้ `@/` alias ไม่กระทบ)

- [ ] **Step 4: ย้าย article/ เข้า route group**

```bash
cp -r src/app/article src/app/\(portfolio\)/article
```

ตรวจสอบ `src/app/(portfolio)/article/[slug]/page.tsx` — import paths ใช้ `@/` alias ทั้งหมด ไม่ต้องแก้

- [ ] **Step 5: ย้าย not-found.tsx เข้า route group**

```bash
cp src/app/not-found.tsx src/app/\(portfolio\)/not-found.tsx
```

- [ ] **Step 6: ลบไฟล์ต้นทางที่ย้ายแล้ว**

```bash
rm src/app/page.tsx
rm -rf src/app/article
rm src/app/not-found.tsx
```

- [ ] **Step 7: รัน dev server ตรวจสอบว่า portfolio ยังทำงานปกติ**

```bash
npm run dev
```

เปิด `http://localhost:3000` — ต้องเห็น Navbar และ home page ปกติ
เปิด `http://localhost:3000/article/portfolio-techniques-overview` — ต้องเปิดได้

- [ ] **Step 8: Commit**

```bash
git add src/app/layout.tsx src/app/\(portfolio\)/
git rm src/app/page.tsx src/app/not-found.tsx
git rm -r src/app/article/
git commit -m "refactor: extract portfolio route group to isolate Navbar from saas route"
```

---

## Task 2: Update `types.ts` — Optional github field

**Files:**
- Modify: `src/data/types.ts`

- [ ] **Step 1: แก้ `github` เป็น optional ใน `Project` interface**

แก้ `src/data/types.ts` บรรทัด 44:

```ts
export interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  tech: string[]
  image: string
  github?: string   // optional — SaaS demo ไม่มี repo
  demo: string
  date: string
  category: string
  highlights: string[]
}
```

- [ ] **Step 2: ตรวจสอบ build ไม่มี type error**

```bash
npm run build 2>&1 | head -30
```

Expected: ไม่มี TypeScript error

- [ ] **Step 3: Commit**

```bash
git add src/data/types.ts
git commit -m "feat: make Project.github optional"
```

---

## Task 3: Add SaaS Project Entry ใน portfolio.ts

**Files:**
- Modify: `src/data/portfolio.ts`

- [ ] **Step 1: เพิ่ม project entry ใน `projects.en` array**

เพิ่มต่อจาก entry สุดท้ายใน `projects.en`:

```ts
{
  id: 4,
  title: "SaaS Landing Page",
  description: "A complete SaaS landing page demo showcasing modern design patterns",
  longDescription: "A complete SaaS landing page demo (FlowSync) built with Next.js and Tailwind CSS, showcasing all standard SaaS sections: Hero, Features, Pricing, Testimonials, FAQ, and more.",
  tech: ["Next.js", "Tailwind CSS", "TypeScript"],
  image: "https://placehold.co/600x400/6366f1/ffffff?text=FlowSync",
  demo: "/saas",
  date: "2025",
  category: "Landing Page",
  highlights: [
    "Standalone layout without portfolio Navbar",
    "9 complete SaaS sections",
    "Thai language content",
    "Mobile-first responsive design",
  ],
},
```

- [ ] **Step 2: เพิ่ม project entry ใน `projects.th` array**

เพิ่มต่อจาก entry สุดท้ายใน `projects.th`:

```ts
{
  id: 4,
  title: "SaaS Landing Page",
  description: "ตัวอย่าง SaaS landing page ครบทุก section ที่ใช้ในผลิตภัณฑ์จริง",
  longDescription: "ตัวอย่าง SaaS landing page (FlowSync) สร้างด้วย Next.js และ Tailwind CSS แสดงให้เห็น section มาตรฐานของ SaaS: Hero, Features, Pricing, Testimonials, FAQ และอื่นๆ",
  tech: ["Next.js", "Tailwind CSS", "TypeScript"],
  image: "https://placehold.co/600x400/6366f1/ffffff?text=FlowSync",
  demo: "/saas",
  date: "2025",
  category: "Landing Page",
  highlights: [
    "Layout แยกจาก portfolio Navbar",
    "9 section ครบครัน",
    "เนื้อหาภาษาไทย",
    "Responsive design แบบ mobile-first",
  ],
},
```

- [ ] **Step 3: Commit**

```bash
git add src/data/portfolio.ts
git commit -m "feat: add FlowSync SaaS landing page to portfolio projects"
```

---

## Task 4: SaaS Standalone Layout

**Files:**
- Create: `src/app/saas/layout.tsx`

- [ ] **Step 1: สร้าง `src/app/saas/layout.tsx`**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FlowSync — จัดการงานด้วย AI อัตโนมัติ',
  description: 'FlowSync ช่วยให้ทีมของคุณทำงานได้อัตโนมัติด้วย AI ประหยัดเวลา เพิ่มประสิทธิภาพ',
}

export default function SaasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/saas/layout.tsx
git commit -m "feat: add standalone saas layout"
```

---

## Task 5: SaasNavbar Component

**Files:**
- Create: `src/app/saas/components/SaasNavbar.tsx`

- [ ] **Step 1: สร้าง SaasNavbar**

สร้าง `src/app/saas/components/SaasNavbar.tsx`:

```tsx
import Link from 'next/link'
import { Zap, ArrowLeft } from 'lucide-react'

export default function SaasNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-indigo-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FlowSync</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">ฟีเจอร์</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">วิธีใช้งาน</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">ราคา</a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">คำถามที่พบบ่อย</a>
          </div>

          {/* CTA + Back */}
          <div className="flex items-center gap-3">
            <Link
              href="/#projects"
              className="hidden sm:flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              กลับ Portfolio
            </Link>
            <a
              href="#cta"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              เริ่มใช้งานฟรี
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/saas/components/SaasNavbar.tsx
git commit -m "feat: add SaasNavbar component"
```

---

## Task 6: Hero Section

**Files:**
- Create: `src/app/saas/components/Hero.tsx`

- [ ] **Step 1: สร้าง Hero component**

สร้าง `src/app/saas/components/Hero.tsx`:

```tsx
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            ใหม่ — FlowSync AI 2.0 มาแล้ว
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            จัดการงานด้วย{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              AI อัตโนมัติ
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            FlowSync ช่วยให้ทีมของคุณทำงานได้เร็วขึ้น 3 เท่า ด้วย AI ที่เข้าใจ workflow ของคุณ
            จัดลำดับงาน มอบหมายอัตโนมัติ และแจ้งเตือนก่อนถึง deadline
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#cta"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              เริ่มใช้งานฟรี 14 วัน
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              <Play className="w-5 h-5 fill-current" />
              ดูวิธีทำงาน
            </a>
          </div>

          {/* Social Proof */}
          <p className="mt-8 text-sm text-gray-500">
            ✓ ไม่ต้องใส่บัตรเครดิต &nbsp;·&nbsp; ✓ ยกเลิกได้ทุกเมื่อ &nbsp;·&nbsp; ✓ ใช้งานได้ทันที
          </p>

          {/* Product Mockup */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-indigo-100 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-4 text-xs text-gray-400">app.flowsync.th</span>
              </div>
              <div className="p-8 bg-gradient-to-br from-indigo-50 to-violet-50 min-h-[280px] flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                  {['งานด่วน', 'กำลังดำเนินการ', 'เสร็จแล้ว'].map((col, i) => (
                    <div key={i} className="space-y-3">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{col}</div>
                      {[...Array(i === 1 ? 3 : 2)].map((_, j) => (
                        <div key={j} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                          <div className={`h-2 rounded ${['bg-red-300', 'bg-indigo-300', 'bg-green-300'][i]} mb-2`} style={{ width: `${60 + j * 20}%` }} />
                          <div className="h-2 bg-gray-100 rounded w-3/4" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/saas/components/Hero.tsx
git commit -m "feat: add SaaS Hero section"
```

---

## Task 7: Features Section

**Files:**
- Create: `src/app/saas/components/Features.tsx`

- [ ] **Step 1: สร้าง Features component**

สร้าง `src/app/saas/components/Features.tsx`:

```tsx
import { Zap, Brain, Bell, BarChart3, Users, Shield } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI จัดลำดับงานให้',
    description: 'AI วิเคราะห์งานทั้งหมดและจัดลำดับความสำคัญให้อัตโนมัติตาม deadline และทรัพยากรที่มี',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Users,
    title: 'มอบหมายงานอัตโนมัติ',
    description: 'ระบบตรวจสอบ workload ของแต่ละคนและมอบหมายงานให้คนที่เหมาะสมที่สุดโดยอัตโนมัติ',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Bell,
    title: 'แจ้งเตือนก่อน Deadline',
    description: 'ส่ง notification ล่วงหน้าผ่าน Line, Email หรือ Slack ก่อนถึงกำหนดส่งงาน',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: BarChart3,
    title: 'Dashboard แบบ Real-time',
    description: 'เห็นภาพรวม progress ของทีมทั้งหมดในหน้าเดียว อัปเดตทันทีแบบ real-time',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Zap,
    title: 'Automation สุดยืดหยุ่น',
    description: 'สร้าง workflow อัตโนมัติด้วย drag & drop ไม่ต้องเขียนโค้ด ตั้งค่าได้ในไม่กี่นาที',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Shield,
    title: 'ปลอดภัย ระดับองค์กร',
    description: 'ข้อมูลเข้ารหัส AES-256 รองรับ SSO, 2FA และ audit log ครบถ้วนตามมาตรฐาน ISO 27001',
    color: 'bg-rose-50 text-rose-600',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">ฟีเจอร์</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            ทุกสิ่งที่ทีมคุณต้องการ
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            FlowSync รวมทุก tool ที่จำเป็นไว้ในที่เดียว ไม่ต้องสลับแอปอีกต่อไป
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="p-8 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/saas/components/Features.tsx
git commit -m "feat: add SaaS Features section"
```

---

## Task 8: How It Works Section

**Files:**
- Create: `src/app/saas/components/HowItWorks.tsx`

- [ ] **Step 1: สร้าง HowItWorks component**

สร้าง `src/app/saas/components/HowItWorks.tsx`:

```tsx
import { Upload, Settings, TrendingUp } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: Upload,
    title: 'นำเข้างานของคุณ',
    description: 'เชื่อมต่อกับ Jira, Trello, Asana หรือนำเข้าจาก spreadsheet ได้ทันที ใช้เวลาไม่เกิน 5 นาที',
  },
  {
    step: '02',
    icon: Settings,
    title: 'ตั้งค่า AI ให้รู้จักทีม',
    description: 'บอก AI เกี่ยวกับ role ของแต่ละคน ความเชี่ยวชาญ และ capacity — AI จะจำและเรียนรู้ไปเรื่อยๆ',
  },
  {
    step: '03',
    icon: TrendingUp,
    title: 'ทีมทำงานได้เร็วขึ้น 3 เท่า',
    description: 'ดู dashboard แบบ real-time ติดตาม progress ทุกงาน และรับ report อัตโนมัติทุกสัปดาห์',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">วิธีใช้งาน</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            เริ่มต้นได้ใน 3 ขั้นตอน
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            ไม่มีการ setup ที่ซับซ้อน ไม่ต้องฝึกอบรมนาน ทีมของคุณจะพร้อมใช้งานภายในวันแรก
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-indigo-100" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.step} className="relative text-center">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-6 shadow-lg shadow-indigo-200">
                    <Icon className="w-8 h-8 text-white" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-violet-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/saas/components/HowItWorks.tsx
git commit -m "feat: add SaaS HowItWorks section"
```

---

## Task 9: Pricing Section

**Files:**
- Create: `src/app/saas/components/Pricing.tsx`

- [ ] **Step 1: สร้าง Pricing component**

สร้าง `src/app/saas/components/Pricing.tsx`:

```tsx
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'ฟรี',
    price: '0',
    period: 'ตลอดไป',
    description: 'สำหรับทีมขนาดเล็กที่เพิ่งเริ่มต้น',
    features: [
      'สมาชิกได้ถึง 3 คน',
      'งานสูงสุด 100 งาน',
      'AI จัดลำดับงานพื้นฐาน',
      'Dashboard มาตรฐาน',
      'Storage 1 GB',
    ],
    cta: 'เริ่มใช้ฟรี',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '299',
    period: 'ต่อคน/เดือน',
    description: 'สำหรับทีมที่ต้องการ AI เต็มรูปแบบ',
    features: [
      'สมาชิกไม่จำกัด',
      'งานไม่จำกัด',
      'AI เต็มรูปแบบ + Auto-assign',
      'Automation workflow',
      'Integration 50+ แอป',
      'Storage 100 GB',
      'Priority support',
    ],
    cta: 'ทดลอง 14 วันฟรี',
    highlighted: true,
    badge: 'ยอดนิยม',
  },
  {
    name: 'Enterprise',
    price: 'ติดต่อ',
    period: 'ราคาพิเศษ',
    description: 'สำหรับองค์กรขนาดใหญ่ที่ต้องการ custom',
    features: [
      'ทุกอย่างใน Pro',
      'SSO / SAML',
      'Audit log ละเอียด',
      'SLA 99.99% uptime',
      'Dedicated account manager',
      'Custom integration',
      'On-premise option',
    ],
    cta: 'ติดต่อทีมขาย',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">ราคา</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            ราคาที่โปร่งใส ไม่มีค่าใช้จ่ายแอบแฝง
          </h2>
          <p className="text-xl text-gray-500">ยกเลิกได้ทุกเมื่อ ไม่มีสัญญาผูกมัด</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border-2 ${
                plan.highlighted
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-2xl shadow-indigo-200 lg:-mt-4 lg:mb-4'
                  : 'border-gray-100 bg-white'
              }`}
            >
              {plan.badge && (
                <span className="inline-block bg-violet-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {plan.badge}
                </span>
              )}
              <h3 className={`text-2xl font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-indigo-200' : 'text-gray-500'}`}>
                {plan.description}
              </p>
              <div className="mb-8">
                <span className={`text-5xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price === 'ติดต่อ' ? '' : '฿'}{plan.price}
                </span>
                <span className={`ml-2 text-sm ${plan.highlighted ? 'text-indigo-200' : 'text-gray-500'}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-violet-300' : 'text-indigo-500'}`} />
                    <span className={`text-sm ${plan.highlighted ? 'text-indigo-100' : 'text-gray-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`block text-center py-3 px-6 rounded-xl font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/saas/components/Pricing.tsx
git commit -m "feat: add SaaS Pricing section"
```

---

## Task 10: Testimonials Section

**Files:**
- Create: `src/app/saas/components/Testimonials.tsx`

- [ ] **Step 1: สร้าง Testimonials component**

สร้าง `src/app/saas/components/Testimonials.tsx`:

```tsx
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'สมชาย วงศ์วิลาส',
    role: 'Head of Engineering',
    company: 'TechCorp Thailand',
    avatar: 'https://placehold.co/64x64/6366f1/ffffff?text=สช',
    content:
      'FlowSync เปลี่ยนวิธีทำงานของทีมเราไปเลย จากที่เคยประชุม standup นาน 45 นาที ตอนนี้เหลือแค่ 10 นาที เพราะทุกคนรู้งานของตัวเองแล้วจาก AI',
    rating: 5,
  },
  {
    name: 'ณัฐธิดา สุขสวัสดิ์',
    role: 'Product Manager',
    company: 'StartupX',
    avatar: 'https://placehold.co/64x64/8b5cf6/ffffff?text=ณธ',
    content:
      'ชอบมากที่ AI มอบหมายงานให้อัตโนมัติ ไม่ต้องมานั่งแบ่งงานให้เสียเวลา ทีม 12 คนทำงานได้เต็มศักยภาพทุกคน ROI คุ้มมากในเดือนแรก',
    rating: 5,
  },
  {
    name: 'วิชัย ธนาพร',
    role: 'CEO',
    company: 'Digital Agency BKK',
    avatar: 'https://placehold.co/64x64/06b6d4/ffffff?text=วช',
    content:
      'ทดลองใช้ 3 เดือน ตัดสินใจ upgrade เป็น Enterprise เลย เพราะ audit log และ SSO ตอบโจทย์ลูกค้า enterprise ที่ต้องการ compliance ทีมขายก็ helpful มากครับ',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">รีวิว</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            ทีมชั้นนำไว้วางใจ FlowSync
          </h2>
          <p className="text-xl text-gray-500">จากทีมนักพัฒนา, ผู้จัดการ และ CEO ทั่วประเทศไทย</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.name} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">"{item.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.role} · {item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/saas/components/Testimonials.tsx
git commit -m "feat: add SaaS Testimonials section"
```

---

## Task 11: FAQ Section (Client Component)

**Files:**
- Create: `src/app/saas/components/Faq.tsx`

- [ ] **Step 1: สร้าง Faq component**

สร้าง `src/app/saas/components/Faq.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'ทดลองใช้ฟรี 14 วัน ต้องใส่บัตรเครดิตไหม?',
    answer: 'ไม่ต้องครับ ทดลองใช้ฟรีได้เลยโดยไม่ต้องใส่ข้อมูลการชำระเงินใดๆ เมื่อครบ 14 วัน ระบบจะแจ้งให้คุณเลือกแพ็กเกจ ถ้าไม่ต่อก็จะ downgrade เป็น Free plan อัตโนมัติ',
  },
  {
    question: 'FlowSync รองรับกี่คนต่อทีม?',
    answer: 'Free plan รองรับสูงสุด 3 คน, Pro plan ไม่จำกัดจำนวนสมาชิก, Enterprise plan รองรับทีมขนาดใหญ่หลายพันคนพร้อม custom pricing',
  },
  {
    question: 'ข้อมูลของเราปลอดภัยไหม?',
    answer: 'ปลอดภัยมากครับ ข้อมูลทั้งหมดเข้ารหัสด้วย AES-256 ทั้ง in-transit และ at-rest เซิร์ฟเวอร์อยู่ใน data center ที่ได้รับการรับรอง ISO 27001 และ SOC 2 Type II',
  },
  {
    question: 'เชื่อมต่อกับ tools ที่ใช้อยู่ได้ไหม?',
    answer: 'ได้เลยครับ FlowSync รองรับ integration กับ Jira, Trello, Asana, Slack, Microsoft Teams, Google Workspace, GitHub, GitLab และอีกกว่า 50 แอป ผ่าน native integration และ Zapier',
  },
  {
    question: 'ยกเลิก subscription แล้วข้อมูลหายไหม?',
    answer: 'ไม่หายครับ หลังยกเลิก คุณยังเข้าถึงข้อมูลได้ 30 วัน และสามารถ export ข้อมูลทั้งหมดได้ในรูปแบบ CSV หรือ JSON ก่อนที่ account จะถูก deactivate',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            คำถามที่พบบ่อย
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-200 transition-colors"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/saas/components/Faq.tsx
git commit -m "feat: add SaaS FAQ section with accordion"
```

---

## Task 12: CTA Banner + Footer

**Files:**
- Create: `src/app/saas/components/CtaBanner.tsx`
- Create: `src/app/saas/components/SaasFooter.tsx`

- [ ] **Step 1: สร้าง CtaBanner component**

สร้าง `src/app/saas/components/CtaBanner.tsx`:

```tsx
import { ArrowRight } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section id="cta" className="py-20 bg-gradient-to-r from-indigo-600 to-violet-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
          พร้อมให้ทีมทำงานได้เร็วขึ้น 3 เท่าแล้วหรือยัง?
        </h2>
        <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
          เริ่มทดลองใช้ฟรี 14 วัน ไม่ต้องใส่บัตรเครดิต ยกเลิกได้ทุกเมื่อ
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
          >
            เริ่มใช้งานฟรีเลย
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors"
          >
            นัดดู Demo
          </a>
        </div>
        <p className="mt-6 text-indigo-200 text-sm">
          มากกว่า 2,000 ทีมในประเทศไทยไว้วางใจแล้ว
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: สร้าง SaasFooter component**

สร้าง `src/app/saas/components/SaasFooter.tsx`:

```tsx
import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function SaasFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">FlowSync</span>
            </div>
            <p className="text-sm leading-relaxed">
              จัดการงานด้วย AI อัตโนมัติ ช่วยให้ทีมทำงานได้เร็วและมีประสิทธิภาพมากขึ้น
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">ผลิตภัณฑ์</h4>
            <ul className="space-y-2 text-sm">
              {['ฟีเจอร์', 'ราคา', 'Changelog', 'Roadmap'].map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">บริษัท</h4>
            <ul className="space-y-2 text-sm">
              {['เกี่ยวกับเรา', 'Blog', 'ร่วมงานกับเรา', 'ติดต่อ'].map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">กฎหมาย</h4>
            <ul className="space-y-2 text-sm">
              {['นโยบายความเป็นส่วนตัว', 'ข้อกำหนดการใช้งาน', 'นโยบาย Cookie'].map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2025 FlowSync. สงวนลิขสิทธิ์</p>
          <Link
            href="/#projects"
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            ← ดู Portfolio ของ Chinnakrit
          </Link>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/saas/components/CtaBanner.tsx src/app/saas/components/SaasFooter.tsx
git commit -m "feat: add SaaS CtaBanner and Footer sections"
```

---

## Task 13: Assemble `saas/page.tsx`

**Files:**
- Create: `src/app/saas/page.tsx`

- [ ] **Step 1: สร้าง page.tsx รวม sections ทั้งหมด**

สร้าง `src/app/saas/page.tsx`:

```tsx
import SaasNavbar from './components/SaasNavbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import CtaBanner from './components/CtaBanner'
import SaasFooter from './components/SaasFooter'

export default function SaasPage() {
  return (
    <main>
      <SaasNavbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <Faq />
      <CtaBanner />
      <SaasFooter />
    </main>
  )
}
```

- [ ] **Step 2: รัน build ตรวจสอบ**

```bash
npm run build 2>&1 | tail -20
```

Expected: build สำเร็จ ไม่มี error, route `/saas` ปรากฏใน output

- [ ] **Step 3: รัน dev server และเปิดตรวจสอบ**

```bash
npm run dev
```

ตรวจสอบ:
- `http://localhost:3000` → portfolio Navbar ยังแสดง
- `http://localhost:3000/saas` → ไม่มี portfolio Navbar, แสดง FlowSync navbar และ sections ครบ
- `http://localhost:3000/article/portfolio-techniques-overview` → ยังเข้าได้ปกติ

- [ ] **Step 4: Commit**

```bash
git add src/app/saas/page.tsx
git commit -m "feat: assemble SaaS landing page with all sections"
```

---

## Task 14: Final Verification

- [ ] **Step 1: ตรวจสอบ portfolio projects section**

เปิด `http://localhost:3000` เลื่อนไปที่ Projects section — ต้องเห็น FlowSync card (id: 4)

- [ ] **Step 2: ตรวจสอบ navigation flow**

- คลิก FlowSync card → modal เปิด → คลิก "View Demo" → เปิด `/saas`
- บน `/saas` คลิก "← กลับ Portfolio" ใน Navbar → กลับ `/#projects`
- Footer link "← ดู Portfolio" → กลับ `/#projects`

- [ ] **Step 3: ตรวจสอบ mobile responsive**

Resize browser เป็น mobile (375px) — ตรวจสอบทุก section ว่า layout ไม่หัก

- [ ] **Step 4: Final build**

```bash
npm run build
```

Expected: ✓ ไม่มี error, `/saas` และ `/(portfolio)` routes ทั้งหมด generate สำเร็จ

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: complete SaaS landing page integration"
```
