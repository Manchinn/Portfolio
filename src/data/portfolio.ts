import type { Profile, ProfileCommon, SkillGroup, Experience, Project, Social, Article, Language, LocalizedData } from './types'

export const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Work", href: "/#work" },
  { label: "Stack", href: "/#stack" },
  { label: "Articles", href: "/#articles" },
  { label: "Contact", href: "/#contact" },
]

export const profile: LocalizedData<Profile> = {
  en: {
    name: "Chinnakrit Sripan",
    title: "AI Automation & Full-stack Systems Builder",
    bio: "I build practical AI automation and full-stack systems that connect web apps, internal APIs, server operations, and real notification channels. Recent work includes a LINE-connected AI assistant and database-backed internal tooling.",
    shortBio: "Building AI automation, full-stack tools, and production-ready assistant workflows.",
    location: "Thailand",
  },
  th: {
    name: "ชินกฤต (Chinnakrit Sripan)",
    title: "นักพัฒนา AI Automation / Full-stack / Internal Tools",
    bio: "ผมสร้างระบบ AI automation และ full-stack ที่ใช้งานได้จริง เชื่อมเว็บแอป, internal API, งานดูแลเซิร์ฟเวอร์ และช่องทางแจ้งเตือนจริง ผลงานล่าสุดมี LINE-connected AI assistant และ internal tooling ที่มี database รองรับ",
    shortBio: "สร้าง AI automation, full-stack tools และ assistant workflow ที่พร้อมใช้งานจริง",
    location: "ประเทศไทย",
  },
}

export const profileCommon: ProfileCommon = {
  image: "/profile/profile2.jpeg",
  email: "chinnakrit.srp@gmail.com",
  phone: "+66 94 665 0259",
  resume: "https://manchinn.github.io/resume/",
}

export const skills: LocalizedData<SkillGroup[]> = {
  en: [
    {
      category: "AI Automation",
      items: [
        { name: "AI assistant workflows", level: "Production" },
        { name: "LINE Messaging API", level: "Hands-on" },
        { name: "OpenRouter integration", level: "Hands-on" },
        { name: "RAG-style knowledge patterns", level: "Hands-on" },
        { name: "Codex CLI automation", level: "Hands-on" },
      ],
    },
    {
      category: "Full-stack Systems",
      items: [
        { name: "Next.js", level: "Advanced" },
        { name: "React", level: "Advanced" },
        { name: "TypeScript", level: "Intermediate" },
        { name: "Node.js", level: "Intermediate" },
        { name: "REST APIs", level: "Intermediate" },
      ],
    },
    {
      category: "DevOps & Infrastructure",
      items: [
        { name: "VPS deployment", level: "Hands-on" },
        { name: "Reverse proxy deployment", level: "Hands-on" },
        { name: "Service operations", level: "Hands-on" },
        { name: "Secure deployment basics", level: "Hands-on" },
        { name: "Health checks & alerts", level: "Hands-on" },
      ],
    },
    {
      category: "Frontend & Tools",
      items: [
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "Responsive UI", level: "Advanced" },
        { name: "Git/GitHub", level: "Advanced" },
        { name: "Vite", level: "Advanced" },
        { name: "Docker", level: "Beginner" },
      ],
    },
    {
      category: "Languages",
      items: [
        { name: "Thai", level: "Native" },
        { name: "English", level: "Intermediate" },
      ],
    },
  ],
  th: [
    {
      category: "AI Automation",
      items: [
        { name: "AI assistant workflows", level: "Production" },
        { name: "LINE Messaging API", level: "Hands-on" },
        { name: "OpenRouter integration", level: "Hands-on" },
        { name: "RAG-style knowledge patterns", level: "Hands-on" },
        { name: "Codex CLI automation", level: "Hands-on" },
      ],
    },
    {
      category: "ระบบ Full-stack",
      items: [
        { name: "Next.js", level: "Advanced" },
        { name: "React", level: "Advanced" },
        { name: "TypeScript", level: "Intermediate" },
        { name: "Node.js", level: "Intermediate" },
        { name: "REST APIs", level: "Intermediate" },
      ],
    },
    {
      category: "DevOps และ Infrastructure",
      items: [
        { name: "VPS deployment", level: "Hands-on" },
        { name: "Reverse proxy deployment", level: "Hands-on" },
        { name: "Service operations", level: "Hands-on" },
        { name: "Secure deployment basics", level: "Hands-on" },
        { name: "Health checks & alerts", level: "Hands-on" },
      ],
    },
    {
      category: "Frontend และเครื่องมือ",
      items: [
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "Responsive UI", level: "Advanced" },
        { name: "Git/GitHub", level: "Advanced" },
        { name: "Vite", level: "Advanced" },
        { name: "Docker", level: "Beginner" },
      ],
    },
    {
      category: "ภาษา",
      items: [
        { name: "ไทย", level: "Native" },
        { name: "อังกฤษ", level: "Intermediate" },
      ],
    },
  ],
}

export const experiences: LocalizedData<Experience[]> = {
  en: [
    {
      id: 1,
      year: "2026 - Present",
      position: "AI Automation & Systems Builder",
      company: "Independent production systems",
      description: "Built and operated AI assistant workflows that connect LINE, internal APIs, VPS infrastructure, and personal knowledge systems.",
      achievements: [
        "Deployed Hermes LINE AI Assistant with secure routing, service monitoring, and health checks",
        "Built production health checks, deployment routines, and service monitoring workflows",
        "Prepared public-safe project surfaces that explain system behavior without private internals",
      ],
    },
    {
      id: 2,
      year: "2024 - 2025",
      position: "Full-stack Web Developer",
      company: "Project-based work",
      description: "Built web applications and dashboards using React, Node.js, databases, and responsive UI patterns.",
      achievements: [
        "Built CS Logbook workflows for student activity tracking and administration",
        "Implemented authentication, database-backed features, and dashboard views",
        "Delivered responsive interfaces with React and Tailwind CSS",
      ],
    },
    {
      id: 3,
      year: "2023 - 2024",
      position: "Frontend Developer",
      company: "Portfolio and product experiments",
      description: "Created web interfaces, landing pages, and portfolio systems while building a foundation in modern frontend tooling.",
      achievements: [
        "Built React and Next.js interfaces with component-based structure",
        "Practiced SEO-ready pages, responsive layouts, and content-driven sections",
        "Used Git/GitHub workflows for project iteration",
      ],
    },
  ],
  th: [
    {
      id: 1,
      year: "2026 - ปัจจุบัน",
      position: "AI Automation & Systems Builder",
      company: "Independent production systems",
      description: "สร้างและดูแล workflow ของ AI assistant ที่เชื่อม LINE, internal API, VPS infrastructure และ personal knowledge system",
      achievements: [
        "Deploy Hermes LINE AI Assistant พร้อม secure routing, service monitoring และ health checks",
        "สร้าง production health checks, deployment routines และ workflow สำหรับ monitor service",
        "เตรียม public-safe project surfaces ที่อธิบายพฤติกรรมระบบโดยไม่เปิด private internals",
      ],
    },
    {
      id: 2,
      year: "2024 - 2025",
      position: "Full-stack Web Developer",
      company: "Project-based work",
      description: "สร้าง web applications และ dashboards ด้วย React, Node.js, databases และ responsive UI patterns",
      achievements: [
        "สร้าง workflow ของ CS Logbook สำหรับติดตามกิจกรรมนักศึกษาและงาน admin",
        "ทำ authentication, database-backed features และ dashboard views",
        "ส่งมอบ responsive interfaces ด้วย React และ Tailwind CSS",
      ],
    },
    {
      id: 3,
      year: "2023 - 2024",
      position: "Frontend Developer",
      company: "Portfolio and product experiments",
      description: "สร้าง web interfaces, landing pages และ portfolio systems พร้อมวางพื้นฐาน modern frontend tooling",
      achievements: [
        "สร้าง React และ Next.js interfaces ด้วย component-based structure",
        "ฝึกทำ SEO-ready pages, responsive layouts และ content-driven sections",
        "ใช้ Git/GitHub workflow ในการพัฒนาและ iterate โปรเจกต์",
      ],
    },
  ],
}

export const projects: LocalizedData<Project[]> = {
  en: [
    {
      id: 1,
      title: "Hermes LINE AI Assistant",
      description: "Production AI assistant connected to LINE and deployed on a hardened VPS.",
      longDescription: "Built a LINE-connected AI assistant with secure webhook routing, a private gateway service, configurable model routing, service monitoring, deployment health checks, and locked-down public access patterns.",
      tech: ["Hermes", "LINE Messaging API", "Secure Routing", "Service Ops", "AI Gateway"],
      image: "https://placehold.co/600x400/111827/ffffff?text=Hermes+LINE+AI",
      github: "https://github.com/Manchinn",
      date: "2026",
      category: "AI Assistant",
      caseStudy: {
        problem: "The assistant needed to run on real messaging traffic with secure public routing, service monitoring, and safe fallback behavior.",
        built: "A VPS-hosted Hermes workflow with secure routing, private service management, deployment health checks, and configurable model routing.",
        result: "A production-ready assistant foundation that can receive messaging traffic, report service health, and keep sensitive internals private.",
      },
      highlights: [
        "Connected messaging traffic through secure routing to a private assistant gateway",
        "Added production health checks and service monitoring",
        "Kept private service internals out of the public surface",
      ],
    },
    {
      id: 2,
      title: "Codex DevOps Companion",
      description: "Local Codex-to-Hermes workflow for alerts, reports, event logs, and production checks.",
      longDescription: "Created a local command wrapper that lets Codex call Hermes through a secured internal API. The workflow supports hermes health, hermes notify, hermes report, hermes event, and prod-health commands for deployment alerts, server monitoring, LINE notifications, and lightweight operational logging.",
      tech: ["Codex CLI", "Hermes API", "Secure API", "PowerShell", "LINE Alerts"],
      image: "https://placehold.co/600x400/2563eb/ffffff?text=Codex+DevOps",
      github: "https://github.com/Manchinn",
      date: "2026",
      category: "DevOps Automation",
      caseStudy: {
        problem: "Operational checks, deployment notes, and LINE notifications were scattered across manual commands.",
        built: "A Codex-to-Hermes command workflow for health checks, notify, reports, event logs, and secured internal API calls.",
        result: "Repeatable local operations that let Codex report system state and send alerts without exposing private server internals.",
      },
      highlights: [
        "Wrapped production health checks into repeatable local commands",
        "Sent LINE notifications and reports through Hermes",
        "Recorded structured event logs for deployment and monitoring activity",
      ],
    },
    {
      id: 3,
      title: "Obsidian Vault Knowledge Assistant",
      description: "Read-only personal knowledge assistant built from a sanitized Obsidian vault export.",
      longDescription: "Prepared a sanitized Obsidian vault export for VPS-side read-only access by Hermes. The assistant pattern focuses on personal executive-assistant use cases, career learning, and RAG-style wiki context without exposing the local private vault directly.",
      tech: ["Obsidian", "Hermes", "Knowledge Base", "RAG Pattern", "VPS"],
      image: "https://placehold.co/600x400/16a34a/ffffff?text=Vault+Assistant",
      github: "https://github.com/Manchinn",
      date: "2026",
      category: "Knowledge System",
      caseStudy: {
        problem: "The private Obsidian vault should not be exposed directly to a server-side assistant.",
        built: "A sanitized, read-only knowledge export pattern for Hermes with personal assistant and wiki-style retrieval use cases.",
        result: "A safer assistant context path that keeps raw private notes local while still enabling structured knowledge lookup.",
      },
      highlights: [
        "Used a sanitized export instead of direct private vault access",
        "Designed for read-only personal knowledge retrieval",
        "Focused on executive assistant, career learning, and wiki-style context",
      ],
    },
    {
      id: 4,
      title: "CS Logbook System",
      description: "Full-stack logbook system for student activity tracking and admin workflows.",
      longDescription: "Built and operated a CS Logbook system for tracking student work and progress, including database-backed records, authentication workflows, dashboard views, and production deployment operations before the server was later cleaned and reused for Hermes.",
      tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      image: "https://placehold.co/600x400/f59e0b/000000?text=CS+Logbook",
      github: "https://github.com/Manchinn",
      date: "2024",
      category: "Full-stack App",
      caseStudy: {
        problem: "Student activity tracking and admin follow-up needed a structured workflow instead of scattered records.",
        built: "A full-stack logbook system with database-backed records, authentication workflows, dashboard views, and deployment operations.",
        result: "A maintainable student logbook foundation that supported administration workflows and later production handoff planning.",
      },
      highlights: [
        "Built student logbook and administration workflows",
        "Implemented database-backed features and dashboard screens",
        "Handled production backup, cleanup, and domain handoff planning",
      ],
    },
  ],
  th: [
    {
      id: 1,
      title: "Hermes LINE AI Assistant",
      description: "AI assistant ที่ใช้งานจริงผ่าน LINE และ deploy บน VPS ที่ harden แล้ว",
      longDescription: "สร้าง AI assistant ที่เชื่อม LINE ผ่าน secure webhook routing, private gateway service, configurable model routing, service monitoring, deployment health checks และ public access pattern ที่ล็อกไว้",
      tech: ["Hermes", "LINE Messaging API", "Secure Routing", "Service Ops", "AI Gateway"],
      image: "https://placehold.co/600x400/111827/ffffff?text=Hermes+LINE+AI",
      github: "https://github.com/Manchinn",
      date: "2026",
      category: "AI Assistant",
      caseStudy: {
        problem: "ต้องให้ assistant รับ messaging traffic จริงได้ โดยมี public routing ที่ปลอดภัย, monitoring และ fallback behavior ที่ควบคุมได้",
        built: "สร้าง Hermes workflow บน VPS พร้อม secure routing, private service management, health checks และ configurable model routing",
        result: "ได้ foundation ของ assistant ที่พร้อมใช้จริง รับ messaging traffic ได้ รายงาน service health และเก็บ internals ไว้เป็น private",
      },
      highlights: [
        "เชื่อม messaging traffic ผ่าน secure routing ไปยัง private assistant gateway",
        "เพิ่ม production health checks และแนวทาง monitor service",
        "เก็บ private service internals ออกจาก public surface",
      ],
    },
    {
      id: 2,
      title: "Codex DevOps Companion",
      description: "Workflow ให้ Codex เรียก Hermes เพื่อแจ้งเตือน, ทำ report, เก็บ event log และเช็ก production",
      longDescription: "สร้าง local command wrapper ให้ Codex เรียก Hermes ผ่าน secured internal API รองรับคำสั่ง hermes health, hermes notify, hermes report, hermes event และ prod-health สำหรับ deployment alerts, server monitoring, LINE notifications และ operational logging",
      tech: ["Codex CLI", "Hermes API", "Secure API", "PowerShell", "LINE Alerts"],
      image: "https://placehold.co/600x400/2563eb/ffffff?text=Codex+DevOps",
      github: "https://github.com/Manchinn",
      date: "2026",
      category: "DevOps Automation",
      caseStudy: {
        problem: "งานเช็กระบบ, บันทึก deployment และ LINE notification กระจายอยู่ในคำสั่ง manual หลายจุด",
        built: "สร้าง workflow ให้ Codex เรียก Hermes สำหรับ health check, notify, report, event log และ secured internal API",
        result: "ได้ operations ที่เรียกซ้ำได้จากเครื่อง local ให้ Codex รายงานสถานะและส่ง alert โดยไม่เปิด private server internals",
      },
      highlights: [
        "ทำ production health check ให้เรียกซ้ำได้ผ่าน local command",
        "ส่ง LINE notifications และ reports ผ่าน Hermes",
        "บันทึก structured event logs สำหรับ deployment และ monitoring",
      ],
    },
    {
      id: 3,
      title: "Obsidian Vault Knowledge Assistant",
      description: "Personal knowledge assistant แบบ read-only จาก Obsidian vault export ที่ sanitize แล้ว",
      longDescription: "เตรียม sanitized Obsidian vault export ให้ Hermes อ่านแบบ read-only บน VPS ใช้เป็น pattern สำหรับ personal executive assistant, career learning และ RAG-style wiki context โดยไม่เปิด private vault ในเครื่องโดยตรง",
      tech: ["Obsidian", "Hermes", "Knowledge Base", "RAG Pattern", "VPS"],
      image: "https://placehold.co/600x400/16a34a/ffffff?text=Vault+Assistant",
      github: "https://github.com/Manchinn",
      date: "2026",
      category: "Knowledge System",
      caseStudy: {
        problem: "ไม่ควรเปิด private Obsidian vault ตรงๆ ให้ assistant ที่ทำงานฝั่ง server",
        built: "ออกแบบ sanitized read-only knowledge export สำหรับ Hermes เพื่อใช้กับ personal assistant และ wiki-style retrieval",
        result: "ได้ทางเชื่อม context ที่ปลอดภัยขึ้น เก็บ raw private notes ไว้ local แต่ยังค้นคืนความรู้แบบมีโครงสร้างได้",
      },
      highlights: [
        "ใช้ sanitized export แทนการเปิด private vault โดยตรง",
        "ออกแบบสำหรับ read-only personal knowledge retrieval",
        "โฟกัส executive assistant, career learning และ wiki-style context",
      ],
    },
    {
      id: 4,
      title: "CS Logbook System",
      description: "ระบบ full-stack สำหรับ logbook นักศึกษาและ workflow ฝั่ง admin",
      longDescription: "สร้างและดูแล CS Logbook system สำหรับติดตามงานและความคืบหน้าของนักศึกษา มี records ที่เก็บใน database, authentication workflows, dashboard views และงานดูแล production ก่อน cleanup server และ reuse domain",
      tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      image: "https://placehold.co/600x400/f59e0b/000000?text=CS+Logbook",
      github: "https://github.com/Manchinn",
      date: "2024",
      category: "Full-stack App",
      caseStudy: {
        problem: "การติดตามกิจกรรมนักศึกษาและงาน follow-up ฝั่ง admin ต้องการ workflow ที่เป็นระบบกว่า scattered records",
        built: "สร้าง full-stack logbook system พร้อม database-backed records, authentication workflows, dashboard views และ deployment operations",
        result: "ได้ foundation สำหรับ student logbook ที่ดูแลต่อได้ รองรับ admin workflow และวางแผน handoff ฝั่ง production ได้",
      },
      highlights: [
        "สร้าง workflow สำหรับ student logbook และงาน administration",
        "ทำ database-backed features และ dashboard screens",
        "ดูแล production backup, cleanup และ domain handoff planning",
      ],
    },
  ],
}

export const socials: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/Manchinn",
    icon: "github",
    color: "hover:text-gray-800",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/chinnakrit-sripan-4674a436a",
    icon: "linkedin",
    color: "hover:text-blue-600",
  },
  {
    name: "Email",
    url: "mailto:chinnakrit.srp@gmail.com",
    icon: "mail",
    color: "hover:text-red-600",
  },
  {
    name: "Phone",
    url: "tel:+66946650259",
    icon: "phone",
    color: "hover:text-green-600",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/Manchinn",
    icon: "twitter",
    color: "hover:text-blue-400",
  },
]

export const articles: LocalizedData<Article[]> = {
  en: [
    {
      id: 1,
      slug: "portfolio-techniques-overview",
      title: "How This Portfolio Works in 2026",
      excerpt: "A current architecture tour of this portfolio: Next.js App Router, static TypeScript data, bilingual EN/TH rendering, and a no-backend work intake flow.",
      content: `## Introduction

This article documents the current portfolio architecture as of July 2026. The site is no longer a Vite app backed by an Express API. It is a static-first Next.js App Router portfolio with bilingual content and a lightweight contact workflow.

## 1. Next.js App Router

The app is organized around the Next.js App Router:

- src/app/layout.tsx defines global metadata, fonts, and the language provider
- src/app/(portfolio)/layout.tsx provides the shared portfolio Navbar and Footer
- src/app/(portfolio)/page.tsx renders the main portfolio home page
- src/app/(portfolio)/article/[slug]/page.tsx statically generates article routes
- src/app/(portfolio)/work-with-me/page.tsx handles the work intake flow

This keeps routing, metadata, and layout ownership in the framework instead of a client-only router.

## 2. Static TypeScript Data

Core portfolio content lives in src/data/portfolio.ts. The home page, article pages, navigation, footer, and work-intake mail target read from that module directly.

There is no runtime fetch layer for portfolio content. Updating profile copy, projects, or articles is a source change followed by a build.

## 3. Bilingual Rendering

The site supports English and Thai. Language state is managed by a custom LanguageProvider in src/i18n. The provider stores the selected language in localStorage and updates the document language on the client.

This approach is intentionally small: it avoids a larger i18n dependency while keeping the portfolio easy to maintain.

## 4. Portfolio Shell

The main portfolio routes share a Global SaaS Shell: sticky navigation, language controls, footer, and conversion paths. The homepage uses a Modern SaaS Product Portfolio direction to present workflow proof, selected work, capabilities, articles, and contact paths.

The standalone /saas route is a separate product landing demo. It should not be treated as the source of truth for the portfolio shell.

## 5. Article Routes

Article routes are generated from articles.en slugs at build time. The client article renderer then selects the matching localized article based on the active language.

That means English and Thai article slugs should stay aligned unless the app later introduces a canonical slug model.

## 6. Work Intake Page

The /work-with-me page uses local React state, client-side validation, and a mailto draft. It does not store visitor briefs on a backend.

This keeps the flow simple and privacy-preserving while still giving visitors a structured way to describe their problem and goal.

## 7. Design System Direction

The current public surface follows a modern SaaS product portfolio direction: clear hierarchy, proof-led sections, restrained motion, and conversion-focused calls to action.

Some legacy utility classes still exist in globals.css, but they are compatibility debt rather than the main visual direction.

## Conclusion

The portfolio is now a static-first Next.js application with direct module data, a small bilingual layer, and no active backend API. Future updates should keep docs, article content, navigation anchors, and sitemap entries aligned with that architecture.`,
      coverImage: "https://placehold.co/800x400/111827/ffffff?text=Portfolio+Architecture",
      tags: ["Next.js", "React", "Tailwind CSS", "i18n", "Architecture"],
      category: "Development",
      readTime: "8 min read",
      date: "2026-07-10",
      featured: true,
    },
    {
      id: 3,
      slug: "react-best-practices-2024",
      title: "React Best Practices for 2024",
      excerpt: "Essential React best practices that every developer should know in 2024.",
      content: "Full article content here...",
      coverImage: "https://placehold.co/800x400/3b82f6/ffffff?text=React+Best+Practices",
      tags: ["React", "JavaScript", "Best Practices"],
      category: "Development",
      readTime: "5 min read",
      date: "2024-12-15",
      featured: true,
    },
    {
      id: 4,
      slug: "tailwind-css-tips",
      title: "Tailwind CSS Tips & Tricks",
      excerpt: "Learn how to use Tailwind CSS more effectively with these tips.",
      content: "Full article content here...",
      coverImage: "https://placehold.co/800x400/10b981/ffffff?text=Tailwind+CSS+Tips",
      tags: ["Tailwind", "CSS", "Frontend"],
      category: "Tutorial",
      readTime: "3 min read",
      date: "2024-11-20",
      featured: false,
    },
    {
      id: 5,
      slug: "portfolio-development-journey",
      title: "My Portfolio Development Journey",
      excerpt: "How I built this portfolio website from scratch.",
      content: "Full article content here...",
      coverImage: "https://placehold.co/800x400/8b5cf6/ffffff?text=Portfolio+Journey",
      tags: ["Portfolio", "Next.js", "Static Site"],
      category: "Story",
      readTime: "7 min read",
      date: "2024-10-10",
      featured: true,
    },
  ],
  th: [
    {
      id: 1,
      slug: "portfolio-techniques-overview",
      title: "พอร์ตโฟลิโอนี้ทำงานอย่างไรในปี 2026",
      excerpt: "ภาพรวมสถาปัตยกรรมปัจจุบันของพอร์ตโฟลิโอ: Next.js App Router, static TypeScript data, EN/TH bilingual rendering และ work intake แบบไม่ใช้ backend storage",
      content: `## บทนำ

บทความนี้อธิบายสถาปัตยกรรมปัจจุบันของเว็บพอร์ตโฟลิโอ ณ กรกฎาคม 2026 เว็บนี้ไม่ใช่ Vite app ที่ต่อ Express API แล้ว แต่เป็น Next.js App Router แบบ static-first พร้อมคอนเทนต์สองภาษาและ workflow ติดต่อที่เบาและตรงไปตรงมา

## 1. Next.js App Router

แอปจัดโครงสร้างด้วย Next.js App Router:

- src/app/layout.tsx กำหนด metadata, fonts และ language provider ระดับ global
- src/app/(portfolio)/layout.tsx เป็น shell ร่วมของ portfolio routes พร้อม Navbar และ Footer
- src/app/(portfolio)/page.tsx render หน้า portfolio หลัก
- src/app/(portfolio)/article/[slug]/page.tsx สร้าง article routes แบบ static
- src/app/(portfolio)/work-with-me/page.tsx ดูแล workflow การรับ brief งาน

โครงสร้างนี้ทำให้ routing, metadata และ layout อยู่กับ framework แทนการพึ่ง client router อย่างเดียว

## 2. Static TypeScript Data

คอนเทนต์หลักของพอร์ตโฟลิโออยู่ใน src/data/portfolio.ts หน้า home, article, navigation, footer และ mail target ของ work intake อ่านข้อมูลจาก module นี้โดยตรง

ไม่มี runtime fetch layer สำหรับคอนเทนต์พอร์ตโฟลิโอ การแก้ profile, projects หรือ articles จึงเป็นการแก้ source แล้ว build ใหม่

## 3. การแสดงผลสองภาษา

เว็บรองรับภาษาอังกฤษและภาษาไทย สถานะภาษาถูกจัดการโดย LanguageProvider ใน src/i18n โดย provider จะเก็บภาษาที่เลือกไว้ใน localStorage และอัปเดต document language ฝั่ง client

แนวทางนี้ตั้งใจให้เล็กและดูแลง่าย โดยไม่ต้องเพิ่ม dependency i18n ขนาดใหญ่

## 4. Portfolio Shell

portfolio routes หลักใช้ Global SaaS Shell ร่วมกัน ได้แก่ sticky navigation, language controls, footer และเส้นทางติดต่อที่ชัดเจน หน้า home ใช้แนวทาง Modern SaaS Product Portfolio เพื่อนำเสนอ workflow proof, selected work, capabilities, articles และ contact paths

ส่วน /saas เป็น product landing demo แยกต่างหาก จึงไม่ควรถูกใช้เป็น source of truth ของ portfolio shell

## 5. Article Routes

article routes ถูกสร้างจาก slugs ใน articles.en ตอน build จากนั้น client article renderer จะเลือกบทความภาษาเดียวกันกับ active language

ดังนั้น slug ของบทความภาษาอังกฤษและไทยควรตรงกัน จนกว่าจะมี canonical slug model ในอนาคต

## 6. Work Intake Page

หน้า /work-with-me ใช้ local React state, client-side validation และสร้าง mailto draft โดยไม่เก็บ brief ของผู้ใช้ใน backend

แนวทางนี้ทำให้ flow เรียบง่ายและลดความเสี่ยงด้าน privacy แต่ยังให้ visitor อธิบายปัญหาและเป้าหมายได้เป็นระบบ

## 7. ทิศทาง Design System

public surface ปัจจุบันใช้ทิศทาง modern SaaS product portfolio: hierarchy ชัด, proof-led sections, motion แบบพอดี และ CTA ที่พาผู้ใช้ไปสู่การติดต่อ

utility class เก่าบางส่วนยังอยู่ใน globals.css แต่ควรมองเป็น compatibility debt ไม่ใช่ visual direction หลักของระบบ

## สรุป

พอร์ตโฟลิโอนี้เป็น Next.js application แบบ static-first ใช้ข้อมูลจาก module โดยตรง มี bilingual layer ขนาดเล็ก และไม่มี active backend API การอัปเดตรอบต่อไปควรรักษา docs, article content, navigation anchors และ sitemap ให้ตรงกับสถาปัตยกรรมนี้เสมอ`,
      coverImage: "https://placehold.co/800x400/111827/ffffff?text=Portfolio+Architecture",
      tags: ["Next.js", "React", "Tailwind CSS", "i18n", "Architecture"],
      category: "Development",
      readTime: "8 นาที",
      date: "2026-07-10",
      featured: true,
    },
    {
      id: 3,
      slug: "react-best-practices-2024",
      title: "แนวปฏิบัติที่ดีที่สุดของ React ในปี 2024",
      excerpt: "แนวปฏิบัติที่ดีที่สุดของ React ที่ทุกคนควรรู้ในปี 2024",
      content: "Full article content here...",
      coverImage: "https://placehold.co/800x400/3b82f6/ffffff?text=React+Best+Practices",
      tags: ["React", "JavaScript", "Best Practices"],
      category: "Development",
      readTime: "5 นาที",
      date: "2024-12-15",
      featured: true,
    },
    {
      id: 4,
      slug: "tailwind-css-tips",
      title: "เทคนิค Tailwind CSS ที่ควรรู้",
      excerpt: "เรียนรู้วิธีใช้ Tailwind CSS ให้มีประสิทธิภาพมากขึ้น",
      content: "Full article content here...",
      coverImage: "https://placehold.co/800x400/10b981/ffffff?text=Tailwind+CSS+Tips",
      tags: ["Tailwind", "CSS", "Frontend"],
      category: "Tutorial",
      readTime: "3 นาที",
      date: "2024-11-20",
      featured: false,
    },
    {
      id: 5,
      slug: "portfolio-development-journey",
      title: "การพัฒนาเว็บ Portfolio ของผม",
      excerpt: "วิธีที่ผมสร้างเว็บ Portfolio นี้ตั้งแต่เริ่มต้น",
      content: "Full article content here...",
      coverImage: "https://placehold.co/800x400/8b5cf6/ffffff?text=Portfolio+Journey",
      tags: ["Portfolio", "Next.js", "Static Site"],
      category: "Story",
      readTime: "7 นาที",
      date: "2024-10-10",
      featured: true,
    },
  ],
}

export const getData = (lang: Language) => ({
  profile: { ...profile[lang], ...profileCommon },
  skills: skills[lang],
  experiences: experiences[lang],
  projects: projects[lang],
  articles: articles[lang],
  socials,
})
