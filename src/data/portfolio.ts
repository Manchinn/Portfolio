import type { Profile, ProfileCommon, SkillGroup, Experience, Project, Social, Article, Language, LocalizedData } from './types'

export const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Work", href: "/#work" },
  { label: "Demos", href: "/demos" },
  { label: "Stack", href: "/#stack" },
  { label: "Contact", href: "/work-with-me" },
]

export const profile: LocalizedData<Profile> = {
  en: {
    name: "Chinnakrit Sripan",
    title: "AI Automation & Full-stack Systems Builder",
    bio: "I build practical AI automation and full-stack systems that connect web apps, internal APIs, server operations, and real notification channels. Recent work includes a LINE-connected AI assistant, Codex-to-Hermes DevOps workflows, and a read-only knowledge assistant from a sanitized Obsidian vault.",
    shortBio: "Building AI automation, full-stack tools, and production-ready assistant workflows.",
    location: "Thailand",
  },
  th: {
    name: "ชินกฤต (Chinnakrit Sripan)",
    title: "นักพัฒนา AI Automation / Full-stack / Internal Tools",
    bio: "ผมสร้างระบบ AI automation และ full-stack ที่ใช้งานได้จริง เชื่อมเว็บแอป, internal API, งานดูแลเซิร์ฟเวอร์ และช่องทางแจ้งเตือนจริง ผลงานล่าสุดมี LINE-connected AI assistant, workflow Codex-to-Hermes สำหรับ DevOps และ knowledge assistant แบบ read-only จาก Obsidian vault ที่ sanitize แล้ว",
    shortBio: "สร้าง AI automation, full-stack tools และ assistant workflow ที่พร้อมใช้งานจริง",
    location: "ประเทศไทย",
  },
}

export const profileCommon: ProfileCommon = {
  image: "/profile/profile2.jpeg",
  email: "chinnakrit.srp@gmail.com",
  phone: "+66 94 665 0259",
  resume: "/Chinnakrit-Sripan_CV.pdf",
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
        "Built Codex command wrappers for production health checks, LINE notifications, reports, and event logs",
        "Prepared a sanitized Obsidian vault export for read-only assistant context",
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
        "สร้าง Codex command wrappers สำหรับ production health check, LINE notifications, reports และ event logs",
        "เตรียม sanitized Obsidian vault export เพื่อใช้เป็น context แบบ read-only ให้ assistant",
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
      demo: "/demos/hermes-line-assistant",
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
      demo: "/demos/codex-devops",
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
      demo: "/demos/vault-assistant",
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
      demo: "/demos/internal-tools-dashboard",
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
    {
      id: 5,
      title: "Optical Retail Web App Demo",
      description: "Public-safe retail prototype for product discovery, store locator UX, booking, membership mock UI, and FAQ search.",
      longDescription: "Built a fictional optical retail web app prototype with product catalog filtering, product detail composition, store locator filtering, frontend-only booking state, membership mock UI, FAQ/search patterns, responsive layout, and SEO-ready route coverage.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "React State", "Retail UX"],
      image: "https://placehold.co/600x400/0f766e/ffffff?text=Optical+Retail",
      demo: "/demos/optical-retail",
      date: "2026",
      category: "Retail Prototype",
      caseStudy: {
        problem: "The portfolio needed a public-safe retail/e-commerce proof that shows product discovery, store booking, and account UI without using real brand data.",
        built: "A custom demo route with fictional products, fictional stores, client-side filters, booking validation, membership mock state, and searchable FAQ guidance.",
        result: "A crawlable portfolio demo that proves retail front-end workflows while keeping all records, branding, and integrations fictional.",
      },
      highlights: [
        "Built product catalog filtering, sorting, and product detail composition",
        "Added store locator UX and multi-step booking validation with React state",
        "Kept all retail data fictional and public-safe",
      ],
    },
    {
      id: 6,
      title: "FlowSync SaaS Landing Page",
      description: "A standalone SaaS landing page prototype for an AI workflow product.",
      longDescription: "Built a standalone FlowSync landing page demo with a separate route, product-focused navigation, hero section, feature grid, workflow explanation, pricing, testimonials, FAQ, and CTA sections.",
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Responsive UI"],
      image: "https://placehold.co/600x400/06b6d4/000000?text=FlowSync+SaaS",
      demo: "/saas",
      date: "2026",
      category: "Landing Page",
      caseStudy: {
        problem: "The portfolio needed a public-safe demo that shows landing page design, product messaging, and route-level layout control without exposing private systems.",
        built: "A standalone SaaS page outside the portfolio layout, with its own navbar and complete conversion-focused sections.",
        result: "A reusable demo that shows product-page execution, responsive UI composition, and clear separation between portfolio navigation and campaign pages.",
      },
      highlights: [
        "Created a standalone route without the portfolio Navbar",
        "Composed complete SaaS sections from hero through FAQ and CTA",
        "Kept all copy public-safe and prototype-focused",
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
      demo: "/demos/hermes-line-assistant",
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
      demo: "/demos/codex-devops",
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
      demo: "/demos/vault-assistant",
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
      longDescription: "สร้างและดูแล CS Logbook system สำหรับติดตามงานและความคืบหน้าของนักศึกษา มี records ที่เก็บใน database, authentication workflows, dashboard views และงานดูแล production ก่อน cleanup server และ reuse domain สำหรับ Hermes",
      tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      image: "https://placehold.co/600x400/f59e0b/000000?text=CS+Logbook",
      demo: "/demos/internal-tools-dashboard",
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
    {
      id: 5,
      title: "ต้นแบบเว็บร้านแว่นตาและระบบจองคิว",
      description: "ต้นแบบ retail web app สำหรับค้นหาสินค้า ค้นหาสาขา จองคิว mock membership และ FAQ/search ด้วยข้อมูลสมมติ",
      longDescription: "สร้างต้นแบบเว็บร้านแว่นตาด้วยข้อมูลสมมติทั้งหมด ครอบคลุม product catalog filtering, product detail, store locator, booking flow แบบ frontend-only, mock membership, FAQ/search, responsive layout และ SEO-ready route",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "React State", "Retail UX"],
      image: "https://placehold.co/600x400/0f766e/ffffff?text=Optical+Retail",
      demo: "/demos/optical-retail",
      date: "2026",
      category: "Retail Prototype",
      caseStudy: {
        problem: "Portfolio ต้องมี proof ฝั่ง retail/e-commerce ที่โชว์ product discovery, store booking และ account UI โดยไม่ใช้ข้อมูลหรือแบรนด์จริง",
        built: "สร้าง demo route แบบ custom ด้วยสินค้าสมมติ สาขาสมมติ client-side filters, booking validation, mock membership state และ searchable FAQ",
        result: "ได้ portfolio demo ที่เปิด public ได้และพิสูจน์ retail front-end workflow โดยเก็บข้อมูล แบรนด์ และ integration ทั้งหมดเป็น fictional",
      },
      highlights: [
        "สร้าง product catalog filtering, sorting และ product detail composition",
        "เพิ่ม store locator UX และ multi-step booking validation ด้วย React state",
        "รักษาข้อมูล retail ทั้งหมดให้เป็น fictional และ public-safe",
      ],
    },
    {
      id: 6,
      title: "FlowSync SaaS Landing Page",
      description: "Prototype หน้า SaaS landing page แบบ standalone สำหรับผลิตภัณฑ์ AI workflow",
      longDescription: "สร้างหน้า demo FlowSync แบบ standalone มี route แยก, product navigation, hero section, feature grid, วิธีทำงาน, pricing, testimonials, FAQ และ CTA ครบในหน้าเดียว",
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Responsive UI"],
      image: "https://placehold.co/600x400/06b6d4/000000?text=FlowSync+SaaS",
      demo: "/saas",
      date: "2026",
      category: "Landing Page",
      caseStudy: {
        problem: "Portfolio ต้องมี demo ที่เปิด public ได้ เพื่อโชว์ landing page design, product messaging และการแยก layout ระดับ route โดยไม่เปิดเผยระบบ private",
        built: "สร้างหน้า SaaS standalone ที่อยู่นอก portfolio layout พร้อม navbar ของตัวเอง และ section สำหรับ conversion ครบชุด",
        result: "ได้ demo ที่ใช้โชว์ execution ของ product page, responsive UI composition และการแยก navigation ระหว่าง portfolio กับ campaign page อย่างชัดเจน",
      },
      highlights: [
        "สร้าง route แยกโดยไม่มี portfolio Navbar",
        "ประกอบ section ของ SaaS ครบตั้งแต่ hero ถึง FAQ และ CTA",
        "รักษา copy ให้ public-safe และสื่อว่าเป็น prototype",
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
      title: "Portfolio Website Techniques Overview",
      excerpt: "A comprehensive guide to the techniques used in building this portfolio website - React, Tailwind CSS, i18n, and more.",
      content: `## Introduction

This portfolio website is built using modern web development techniques. Here's a detailed breakdown of each technology and approach used.

## 1. React + Vite

The frontend is built with React, a popular JavaScript library for building user interfaces. We use Vite as the build tool because it's extremely fast and provides instant server start.

### Key Benefits:
- Fast HMR (Hot Module Replacement)
- Optimized production builds
- Simple configuration

## 2. Tailwind CSS

We use Tailwind CSS for styling - a utility-first CSS framework that allows rapid UI development.

### Why Tailwind?
- No need to write custom CSS files
- Consistent design system
- Easy responsive design
- Small bundle size (purges unused styles)

## 3. Custom Hooks

We created a custom hook called \`usePortfolioData\` to handle data fetching across the application.

\`\`\`javascript
export const usePortfolioData = (fetchFunction) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // ... fetch logic
}
\`\`\`

This pattern allows reusable data fetching logic across all components.

## 4. Internationalization (i18n)

The website supports 3 languages: English, Thai, and Chinese. We implemented a custom i18n solution using context and localStorage.

### Features:
- Language switcher in navbar
- Persists language preference
- All text translatable

## 5. Service Layer Pattern

We separated API calls from components using a service layer:

- \`api.js\` - Low-level API functions
- \`portfolioService.js\` - Business logic layer

This makes the code more maintainable and testable.

## 6. Neo-Brutalism Design

The UI follows Neo-Brutalism style with:
- Bold black borders (4px)
- Hard shadows (no blur)
- Vibrant colors
- Comic/sans-serif fonts

## 7. Component Architecture

We organized components into:
- \`components/Sections\` - Page sections (About, Skills, Projects, etc.)
- \`components/ui\` - Reusable UI components
- \`components/layout\` - Layout components (Navbar, Footer)
- \`hooks\` - Custom React hooks
- \`services\` - API and business logic
- \`i18n\` - Internationalization

## Conclusion

These techniques combine to create a fast, maintainable, and visually distinctive portfolio website.`,
      coverImage: "https://placehold.co/800x400/FF6B6B/ffffff?text=Portfolio+Techniques",
      tags: ["React", "Vite", "Tailwind CSS", "i18n", "Tutorial"],
      category: "Development",
      readTime: "8 min read",
      date: "2026-03-02",
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
      tags: ["Portfolio", "React", "Vite"],
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
      title: "ภาพรวมเทคนิคการสร้างเว็บ Portfolio",
      excerpt: "คู่มือที่ครอบคลุมเกี่ยวกับเทคนิคที่ใช้ในการสร้างเว็บ Portfolio นี้ - React, Tailwind CSS, i18n และอื่นๆ",
      content: `## บทนำ

เว็บ Portfolio นี้สร้างขึ้นโดยใช้เทคนิคการพัฒนาเว็บสมัยใหม่ ต่อไปนี้คือรายละเอียดของแต่ละเทคโนโลยีและวิธีการที่ใช้

## 1. React + Vite

Frontend สร้างด้วย React ซึ่งเป็นไลบรารี JavaScript ยอดนิยมสำหรับสร้างส่วนติดต่อผู้ใช้ เราใช้ Vite เป็นเครื่องมือ build เพราะมันเร็วมากและให้การเริ่มต้น server ทันที

### ข้อดีหลัก:
- HMR (Hot Module Replacement) ที่รวดเร็ว
- Build production ที่ได้รับการ optimize
- การตั้งค่าที่ง่าย

## 2. Tailwind CSS

เราใช้ Tailwind CSS สำหรับ styling - framework CSS ที่เน้น utility-first ช่วยให้พัฒนา UI ได้รวดเร็ว

### ทำไมต้อง Tailwind?
- ไม่ต้องเขียนไฟล์ CSS เอง
- ระบบ design ที่สม่ำเสมอ
- ทำ responsive design ได้ง่าย
- ขนาด bundle เล็ก (ลบ styles ที่ไม่ได้ใช้ออก)

## 3. Custom Hooks

เราสร้าง custom hook ชื่อ \`usePortfolioData\` สำหรับจัดการดึงข้อมูลทั่วทั้งแอป

\`\`\`javascript
export const usePortfolioData = (fetchFunction) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // ... fetch logic
}
\`\`\`

รูปแบบนี้ทำให้ logic การดึงข้อมูลสามารถ reuse ได้ในทุก components

## 4. Internationalization (i18n)

เว็บรองรับ 3 ภาษา: อังกฤษ, ไทย และจีน เราใช้ i18n แบบกำหนดเองโดยใช้ context และ localStorage

### คุณสมบัติ:
- ปุ่มเปลี่ยนภาษาใน navbar
- บันทึกการตั้งค่าภาษา
- แปลได้ทุกข้อความ

## 5. Service Layer Pattern

เราแยก API calls ออกจาก components โดยใช้ service layer:

- \`api.js\` - ฟังก์ชัน API ระดับต่ำ
- \`portfolioService.js\` - layer สำหรับ business logic

ทำให้โค้ดมีความสามารถในการดูแลรักษาและทดสอบได้ดีขึ้น

## 6. Neo-Brutalism Design

UI ใช้สไตล์ Neo-Brutalism มี:
- ขอบดำหนา (4px)
- เงาแข็ง (ไม่มี blur)
- สีสดใส
- ฟอนต์ sans-serif

## 7. สถาปัตยกรรม Component

เราจัดระเบียบ components เป็น:
- \`components/Sections\` - ส่วนต่างๆ ของหน้า (About, Skills, Projects และอื่นๆ)
- \`components/ui\` - UI components ที่ใช้ซ้ำได้
- \`components/layout\` - components สำหรับ layout (Navbar, Footer)
- \`hooks\` - React hooks ที่กำหนดเอง
- \`services\` - API และ business logic
- \`i18n\` - การแปลภาษา

## สรุป

เทคนิคเหล่านี้รวมกันเพื่อสร้างเว็บ Portfolio ที่เร็ว ดูแลรักษาได้ และมีดีไซน์ที่โดดเด่น`,
      coverImage: "https://placehold.co/800x400/FF6B6B/ffffff?text=Portfolio+Techniques",
      tags: ["React", "Vite", "Tailwind CSS", "i18n", "Tutorial"],
      category: "Development",
      readTime: "8 นาที",
      date: "2026-03-02",
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
      tags: ["Portfolio", "React", "Vite"],
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
