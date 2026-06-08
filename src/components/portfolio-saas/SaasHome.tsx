'use client'

import {
  ArrowRight,
  Bot,
  Boxes,
  CheckCircle2,
  Code2,
  Command,
  ExternalLink,
  FileText,
  Github,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
} from 'lucide-react'
import { profile, profileCommon, projects } from '@/data/portfolio'
import type { Language, Project } from '@/data/types'
import { useTranslation } from '@/i18n/useTranslation'
import { FadeUp, MotionCard, StaggerContainer } from '@/components/motion/MotionPrimitives'
import { SaasButton, SaasCard, SaasHeader, SaasSection } from './_shared'

type LocalCopy = {
  heroEyebrow: string
  heroTitle: string
  heroBody: string
  primaryCta: string
  secondaryCta: string
  reviewerLinks: Array<{ label: string; value: string; href: string; icon: typeof Code2 }>
  heroTrust: Array<{ label: string; value: string; icon: typeof Code2 }>
  workflowPanel: {
    eyebrow: string
    title: string
    subtitle: string
    command: string
    activeLabel: string
    pathLabel: string
    statusLabel: string
    steps: Array<{ title: string; body: string; icon: typeof Code2; tone: 'green' | 'blue' | 'violet' | 'coral' }>
    outputs: Array<{ label: string; value: string }>
    footer: string
  }
  selectedEyebrow: string
  selectedTitle: string
  selectedSubtitle: string
  featuredLabel: string
  supportingLabel: string
  safeDemoLabel: string
  demosEyebrow: string
  demosTitle: string
  demosSubtitle: string
  capabilitiesEyebrow: string
  capabilitiesTitle: string
  capabilitiesSubtitle: string
  capabilityCards: Array<{ title: string; statement: string; chips: string[] }>
  contactEyebrow: string
  contactTitle: string
  contactSubtitle: string
  contactCta: string
  contactTrust: string[]
  openDemo: string
  viewDemos: string
  viewWork: string
  problem: string
  built: string
  result: string
}

const localCopy: Record<Language, LocalCopy> = {
  en: {
    heroEyebrow: 'Chinnakrit Sripan · AI automation systems builder',
    heroTitle: 'I build AI automation, full-stack systems, and public-safe demos for real review.',
    heroBody:
      'I turn rough workflows into typed Next.js surfaces, assistant operations, and internal tools that reviewers can inspect without exposing private systems.',
    primaryCta: 'View selected work',
    secondaryCta: 'Explore demos',
    reviewerLinks: [
      { label: 'Best demo', value: 'Hermes LINE AI', href: '/demos/hermes-line-assistant', icon: Bot },
      { label: 'Resume', value: 'Open resume', href: profileCommon.resume, icon: FileText },
      { label: 'GitHub', value: 'Manchinn', href: 'https://github.com/Manchinn', icon: Github },
      { label: 'Contact', value: 'Email me', href: `mailto:${profileCommon.email}`, icon: Mail },
    ],
    heroTrust: [
      { label: 'Demos', value: 'Public-safe surfaces', icon: ShieldCheck },
      { label: 'Locale', value: 'English + Thai', icon: Globe2 },
      { label: 'Stack', value: 'Next.js + TypeScript', icon: Code2 },
      { label: 'Workflow', value: 'AI-assisted delivery', icon: Sparkles },
    ],
    workflowPanel: {
      eyebrow: 'Builder dossier',
      title: 'Chinnakrit Sripan',
      subtitle: 'Practical AI automation and full-stack systems builder.',
      command: 'I turn rough workflows into reviewable product surfaces without exposing private systems.',
      activeLabel: 'Review packet',
      pathLabel: 'How I approach a build',
      statusLabel: 'Ready to inspect',
      steps: [
        {
          title: 'Find the working edge',
          body: 'Goal, audience, constraints, and the smallest proof that can be tested.',
          icon: Command,
          tone: 'green',
        },
        {
          title: 'Shape the surface',
          body: 'Typed Next.js UI, clear states, and a route reviewers can inspect.',
          icon: Layers3,
          tone: 'blue',
        },
        {
          title: 'Use AI as leverage',
          body: 'Draft, compare, and refine the workflow while keeping human judgement visible.',
          icon: Bot,
          tone: 'violet',
        },
        {
          title: 'Leave proof behind',
          body: 'Build checks, sanitized copy, and notes that make the work easy to review.',
          icon: CheckCircle2,
          tone: 'coral',
        },
      ],
      outputs: [
        { label: 'Based in', value: 'Thailand' },
        { label: 'Best fit', value: 'AI automation + full-stack' },
        { label: 'Proof style', value: 'Sanitized demos' },
      ],
      footer: 'Public work shows the shape of the system, not private routes, secrets, or operational internals.',
    },
    selectedEyebrow: 'Selected work',
    selectedTitle: 'Three public-safe case studies, shaped like product proof.',
    selectedSubtitle:
      'A curated view of assistant systems, operational workflows, and knowledge tooling. Each card keeps the story clear: problem, build, and result.',
    featuredLabel: 'Featured system',
    supportingLabel: 'Case study',
    safeDemoLabel: 'Public-safe demo',
    demosEyebrow: 'Interactive demos',
    demosTitle: 'Public-safe demos you can open and inspect.',
    demosSubtitle:
      'Each demo uses fictional or sanitized data so the interaction model is visible without exposing private records.',
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: 'What I can build for you.',
    capabilitiesSubtitle:
      'Four outcome areas behind the selected work, each backed by tools I use in production.',
    capabilityCards: [
      {
        title: 'AI Workflow Systems',
        statement: 'I connect AI models to real messaging channels, production workflows, and assistant patterns.',
        chips: ['LINE API', 'OpenRouter', 'RAG', 'Hermes', 'Codex CLI', 'Prompt patterns'],
      },
      {
        title: 'Internal Tools & Dashboards',
        statement: 'I build database-backed tools and admin workflows that teams can actually use.',
        chips: ['React', 'Node.js', 'TypeScript', 'REST APIs', 'Auth', 'Tailwind CSS'],
      },
      {
        title: 'SaaS & Product UI',
        statement: 'I compose product-quality interfaces with clear states, bilingual support, and public-safe demos.',
        chips: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'SSG', 'Responsive'],
      },
      {
        title: 'Automation & Operations',
        statement: 'I automate deployment checks, notifications, and operational workflows from local commands.',
        chips: ['VPS', 'PowerShell', 'Docker', 'LINE Alerts', 'Health checks', 'Reverse proxy'],
      },
    ],
    contactEyebrow: 'Contact',
    contactTitle: 'Have a project or role that fits this work?',
    contactSubtitle:
      'Send a short note about the app, demo, internal tool, or full-stack role you want to discuss.',
    contactCta: 'Get in touch',
    contactTrust: ['Public-safe demos', 'English + Thai', 'AI-assisted delivery'],
    openDemo: 'Open demo',
    viewDemos: 'View all demos',
    viewWork: 'View selected work',
    problem: 'Problem',
    built: 'Built',
    result: 'Result',
  },
  th: {
    heroEyebrow: 'ชินกฤต ศรีพันธุ์ · AI Automation / Full-stack / Internal Tools',
    heroTitle: 'ผมสร้าง AI automation, full-stack systems และ public-safe demos ที่รีวิวได้จริง',
    heroBody:
      'ผมเปลี่ยน workflow ที่ยังดิบให้เป็น Next.js surfaces, assistant operations และ internal tools ที่ inspect ได้ โดยไม่เปิดระบบ private',
    primaryCta: 'ดูผลงานที่เลือกไว้',
    secondaryCta: 'ดู demos',
    reviewerLinks: [
      { label: 'Demo หลัก', value: 'Hermes LINE AI', href: '/demos/hermes-line-assistant', icon: Bot },
      { label: 'Resume', value: 'เปิด resume', href: profileCommon.resume, icon: FileText },
      { label: 'GitHub', value: 'Manchinn', href: 'https://github.com/Manchinn', icon: Github },
      { label: 'Contact', value: 'ส่งอีเมล', href: `mailto:${profileCommon.email}`, icon: Mail },
    ],
    heroTrust: [
      { label: 'Demos', value: 'Public-safe', icon: ShieldCheck },
      { label: 'ภาษา', value: 'อังกฤษ + ไทย', icon: Globe2 },
      { label: 'Stack', value: 'Next.js + TypeScript', icon: Code2 },
      { label: 'Workflow', value: 'AI-assisted delivery', icon: Sparkles },
    ],
    workflowPanel: {
      eyebrow: 'Builder dossier',
      title: 'ชินกฤต ศรีพันธุ์',
      subtitle: 'AI Automation / Full-stack / Internal Tools builder',
      command: 'ผมเปลี่ยน workflow ที่ยังดิบให้เป็น product surface ที่ตรวจได้ โดยไม่เปิดระบบ private',
      activeLabel: 'Review packet',
      pathLabel: 'วิธีคิดเวลาสร้างงาน',
      statusLabel: 'พร้อม inspect',
      steps: [
        {
          title: 'หาแกนงานที่ต้องพิสูจน์',
          body: 'เป้าหมาย ผู้ใช้ constraints และ proof ที่เล็กพอให้ทดสอบได้',
          icon: Command,
          tone: 'green',
        },
        {
          title: 'วาง surface ให้ตรวจง่าย',
          body: 'Next.js UI, typed state และ route ที่ reviewer เปิดดูได้',
          icon: Layers3,
          tone: 'blue',
        },
        {
          title: 'ใช้ AI เป็นแรงเสริม',
          body: 'Draft, compare และ refine workflow โดยยังเห็น judgement ของคนทำ',
          icon: Bot,
          tone: 'violet',
        },
        {
          title: 'ทิ้ง proof ที่ส่งต่อได้',
          body: 'Build checks, sanitized copy และ notes ที่ช่วยให้ review ง่าย',
          icon: CheckCircle2,
          tone: 'coral',
        },
      ],
      outputs: [
        { label: 'Based in', value: 'Thailand' },
        { label: 'Best fit', value: 'AI automation + full-stack' },
        { label: 'Proof style', value: 'Sanitized demos' },
      ],
      footer: 'งาน public โชว์รูปทรงของระบบ ไม่โชว์ private routes, secrets หรือ operational internals',
    },
    selectedEyebrow: 'Selected work',
    selectedTitle: 'สาม case study แบบ public-safe ที่อ่านเหมือน product proof',
    selectedSubtitle:
      'คัดงาน assistant systems, operational workflows และ knowledge tooling ให้เห็นเรื่องหลักชัดเจน: ปัญหา สิ่งที่สร้าง และผลลัพธ์',
    featuredLabel: 'Featured system',
    supportingLabel: 'Case study',
    safeDemoLabel: 'Public-safe demo',
    demosEyebrow: 'Interactive demos',
    demosTitle: 'Demo แบบ public-safe ที่เปิดดูและ inspect ได้',
    demosSubtitle:
      'แต่ละ demo ใช้ข้อมูลสมมติหรือข้อมูลที่ sanitize แล้ว เพื่อให้เห็น interaction model โดยไม่เปิด private records',
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: 'สิ่งที่ผมสร้างให้คุณได้',
    capabilitiesSubtitle:
      'สี่ area ที่อยู่เบื้องหลัง selected work แต่ละ area มีเครื่องมือ production รองรับ',
    capabilityCards: [
      {
        title: 'AI Workflow Systems',
        statement: 'ผมเชื่อม AI models กับ messaging channels, production workflows และ assistant patterns ที่ใช้ได้จริง',
        chips: ['LINE API', 'OpenRouter', 'RAG', 'Hermes', 'Codex CLI', 'Prompt patterns'],
      },
      {
        title: 'Internal Tools & Dashboards',
        statement: 'ผมสร้าง tools และ admin workflows ที่มี database รองรับและทีมใช้งานได้จริง',
        chips: ['React', 'Node.js', 'TypeScript', 'REST APIs', 'Auth', 'Tailwind CSS'],
      },
      {
        title: 'SaaS & Product UI',
        statement: 'ผมสร้าง interface คุณภาพ product มี clear states, bilingual support และ public-safe demos',
        chips: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'SSG', 'Responsive'],
      },
      {
        title: 'Automation & Operations',
        statement: 'ผมทำ deployment checks, notifications และ operational workflows ให้เรียกซ้ำได้จาก local command',
        chips: ['VPS', 'PowerShell', 'Docker', 'LINE Alerts', 'Health checks', 'Reverse proxy'],
      },
    ],
    contactEyebrow: 'Contact',
    contactTitle: 'มีโปรเจกต์หรือ role ที่เข้ากับงานแนวนี้ไหม?',
    contactSubtitle:
      'ส่ง note สั้นๆ เกี่ยวกับ app, demo, internal tool หรือ full-stack role ที่อยากคุยได้เลย',
    contactCta: 'ติดต่อ',
    contactTrust: ['Public-safe demos', 'ไทย + อังกฤษ', 'AI-assisted delivery'],
    openDemo: 'เปิด demo',
    viewDemos: 'ดู demos ทั้งหมด',
    viewWork: 'ดูผลงานที่เลือกไว้',
    problem: 'ปัญหา',
    built: 'สิ่งที่สร้าง',
    result: 'ผลลัพธ์',
  },
}

const demoIcons = [Store, Bot, Search]
const capabilityIcons = [Bot, Boxes, Code2, ShieldCheck]
const capabilityTones = ['mint', 'cream', 'lilac', 'coral'] as const

export function SaasHome() {
  const { language } = useTranslation()
  const lang = language as Language
  const c = localCopy[lang]
  const data = { ...profile[lang], ...profileCommon }
  const selectedProjects = projects[lang].slice(0, 3)
  const demoProjects = projects[lang].filter((project) => project.demo).slice(0, 3)

  return (
    <main className="min-h-screen overflow-x-hidden bg-saas-bg text-saas-ink">
      <SaasHero c={c} data={data} />
      <SelectedWork c={c} projects={selectedProjects} />
      <InteractiveDemos c={c} projects={demoProjects} />
      <CapabilitiesSection c={c} />
      <ContactSection c={c} email={data.email} location={data.location} />
    </main>
  )
}

function SaasHero({ c, data }: { c: LocalCopy; data: typeof profile.en & typeof profileCommon }) {
  return (
    <section id="home" className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-24">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-saas-mint/55 via-white/45 to-transparent" aria-hidden />
      <div className="absolute inset-y-16 right-0 hidden w-1/3 bg-gradient-to-l from-saas-lilac/40 to-transparent lg:block" aria-hidden />
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.92fr)] lg:items-center lg:gap-12 lg:px-8 lg:py-20">
        <StaggerContainer className="relative min-w-0" delayChildren={0.05} staggerChildren={0.07}>
          <MotionCard>
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-saas-line bg-white/80 px-3 py-2 text-xs font-semibold text-saas-muted shadow-saas-sm backdrop-blur">
              <Sparkles className="h-4 w-4 shrink-0 text-saas-green" />
              <span className="break-words">{c.heroEyebrow}</span>
            </div>
          </MotionCard>
          <MotionCard>
            <h1 className="mt-6 max-w-full text-balance break-words text-4xl font-black leading-[0.98] text-saas-ink sm:max-w-4xl sm:text-6xl lg:text-7xl">
              {c.heroTitle}
            </h1>
          </MotionCard>
          <MotionCard>
            <p className="mt-6 max-w-full break-words text-base font-semibold leading-8 text-saas-muted sm:max-w-2xl sm:text-lg">{c.heroBody}</p>
          </MotionCard>
          <MotionCard>
            <div className="mt-9 flex flex-wrap gap-3">
              <SaasButton href="/#work" icon={<ArrowRight className="h-4 w-4" />} className="min-h-12 px-6">
                {c.primaryCta}
              </SaasButton>
              <SaasButton href="/demos" variant="secondary" icon={<ExternalLink className="h-4 w-4" />} className="min-h-12 px-6">
                {c.secondaryCta}
              </SaasButton>
            </div>
          </MotionCard>
          <MotionCard>
            <div className="mt-6 grid max-w-3xl gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {c.reviewerLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex min-h-14 min-w-0 items-center gap-3 rounded-[14px] border border-saas-line bg-white/86 px-3 py-2.5 text-left shadow-saas-sm transition hover:-translate-y-0.5 hover:border-saas-green hover:bg-saas-mint focus-visible:outline-none focus-visible:shadow-saas-focus"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-saas-surface-soft text-saas-green transition group-hover:bg-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold text-saas-muted">{item.label}</span>
                      <span className="mt-0.5 block truncate text-sm font-bold text-saas-ink">{item.value}</span>
                    </span>
                  </a>
                )
              })}
            </div>
          </MotionCard>
        </StaggerContainer>

        <FadeUp className="relative min-w-0">
          <BuilderDossierPanel c={c} title={data.title} />
        </FadeUp>
      </div>
    </section>
  )
}

const workflowToneClass = {
  green: 'bg-saas-mint text-saas-green',
  blue: 'bg-blue-50 text-saas-blue',
  violet: 'bg-saas-lilac/70 text-violet-700',
  coral: 'bg-saas-coral/55 text-rose-700',
}

function BuilderDossierPanel({ c, title }: { c: LocalCopy; title: string }) {
  return (
    <SaasCard className="rounded-[20px] border-saas-ink/10 bg-white/92 p-0 shadow-saas-md backdrop-blur">
      <div className="bg-saas-ink p-5 text-white sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-saas-mint">{c.workflowPanel.eyebrow}</p>
        <div className="mt-5 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] border border-white/14 bg-white text-lg font-black text-saas-ink">
            C/
          </div>
          <div className="min-w-0">
            <h2 className="break-words text-2xl font-black leading-tight sm:text-3xl">{c.workflowPanel.title}</h2>
            <p className="mt-2 break-words text-sm font-semibold leading-7 text-white/72">{title}</p>
          </div>
        </div>
        <p className="mt-6 text-base font-bold leading-8 text-white/86">{c.workflowPanel.command}</p>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-saas-line pb-4">
          <div>
            <p className="text-[11px] font-semibold text-saas-muted">{c.workflowPanel.activeLabel}</p>
            <p className="mt-1 text-sm font-bold text-saas-ink">{c.workflowPanel.pathLabel}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-saas-mint px-3 py-2 text-xs font-black text-saas-green">
            <span className="h-2 w-2 rounded-full bg-saas-green" />
            {c.workflowPanel.statusLabel}
          </span>
        </div>

        <div className="divide-y divide-saas-line">
          {c.workflowPanel.steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="grid gap-3 py-4 sm:grid-cols-[auto_1fr]">
                <span className={`flex h-10 w-10 items-center justify-center rounded-[12px] ${workflowToneClass[step.tone]}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-black text-saas-green">0{index + 1}</span>
                    <h3 className="break-words text-sm font-black text-saas-ink">{step.title}</h3>
                  </div>
                  <p className="mt-1 break-words text-sm font-semibold leading-7 text-saas-muted">{step.body}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid gap-2 border-t border-saas-line pt-4 sm:grid-cols-3">
          {c.workflowPanel.outputs.map((item) => (
            <div key={item.label} className="min-w-0">
              <p className="text-[11px] font-semibold text-saas-muted">{item.label}</p>
              <p className="mt-1 break-words text-sm font-bold leading-5 text-saas-ink">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-[14px] bg-saas-surface-soft p-3 text-xs font-bold leading-5 text-saas-muted">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-saas-green" />
          <span>{c.workflowPanel.footer}</span>
        </div>
      </div>
    </SaasCard>
  )
}

function SelectedWork({ c, projects: selectedProjects }: { c: LocalCopy; projects: Project[] }) {
  const [featuredProject, ...supportingProjects] = selectedProjects

  return (
    <SaasSection id="work" className="bg-white/60 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-12 before:bg-gradient-to-b before:from-saas-bg before:to-transparent" wide>
      <SaasHeader
        eyebrow={c.selectedEyebrow}
        title={c.selectedTitle}
        subtitle={c.selectedSubtitle}
        align="split"
        rightSlot={
          <SaasButton href="/demos" variant="secondary" icon={<ExternalLink className="h-4 w-4" />}>
            {c.viewDemos}
          </SaasButton>
        }
      />
      <StaggerContainer className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        {featuredProject && (
          <MotionCard className="min-w-0 lg:row-span-2">
            <ProjectCard project={featuredProject} c={c} variant="featured" />
          </MotionCard>
        )}
        {supportingProjects.map((project) => (
          <MotionCard key={project.id} className="min-w-0">
            <ProjectCard project={project} c={c} variant="supporting" />
          </MotionCard>
        ))}
      </StaggerContainer>
    </SaasSection>
  )
}

function ProjectCard({ project, c, variant }: { project: Project; c: LocalCopy; variant: 'featured' | 'supporting' }) {
  const isFeatured = variant === 'featured'
  const actionHref = project.demo ?? '/demos'
  const caseStudyRows = project.caseStudy
    ? [
        { label: c.problem, value: project.caseStudy.problem },
        { label: c.built, value: project.caseStudy.built },
        { label: c.result, value: project.caseStudy.result },
      ]
    : []

  return (
    <SaasCard
      hover
      className={`relative flex min-h-full flex-col rounded-[20px] p-0 ${
        isFeatured ? 'border-saas-ink/10 bg-white shadow-saas-md' : 'bg-white/92'
      }`}
    >
      {isFeatured && <span className="absolute inset-x-0 top-0 h-1 rounded-t-[20px] bg-saas-green" aria-hidden />}
      <div className={`${isFeatured ? 'p-6 sm:p-8 lg:p-9' : 'p-6 sm:p-7'}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-saas-mint px-3 py-1.5 text-[11px] font-black text-saas-green">
            <span className="h-1.5 w-1.5 rounded-full bg-saas-green" />
            {isFeatured ? c.featuredLabel : c.supportingLabel}
          </span>
          <span className="rounded-full border border-saas-line bg-white px-3 py-1.5 text-xs font-black text-saas-muted">{project.date}</span>
        </div>

        <div className={isFeatured ? 'mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(260px,0.7fr)]' : 'mt-6'}>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-saas-green">{project.category}</p>
            <h3 className={`${isFeatured ? 'text-3xl sm:text-4xl' : 'text-xl'} mt-3 break-words font-black leading-tight text-saas-ink`}>
              {project.title}
            </h3>
            <p className={`${isFeatured ? 'text-base leading-8' : 'text-sm leading-7'} mt-4 text-saas-muted`}>{project.description}</p>
          </div>

          <div className={`${isFeatured ? 'lg:border-l lg:border-saas-line lg:pl-6' : 'mt-5'} min-w-0`}>
            <p className="text-[11px] font-semibold text-saas-muted">{c.safeDemoLabel}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(isFeatured ? project.tech : project.tech.slice(0, 4)).map((tech) => (
                <span key={tech} className="rounded-full border border-saas-line bg-saas-surface-soft px-3 py-1 text-xs font-black text-saas-muted">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {caseStudyRows.length > 0 && (
          <dl className={`${isFeatured ? 'mt-8 grid gap-5 lg:grid-cols-3' : 'mt-6 divide-y divide-saas-line border-y border-saas-line'}`}>
            {caseStudyRows.map((row, index) => (
              <div key={row.label} className={isFeatured ? 'min-w-0' : 'py-4 first:pt-0 last:pb-0'}>
                <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-saas-green">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-saas-mint text-[10px]">{index + 1}</span>
                  {row.label}
                </dt>
                <dd className="mt-2 break-words text-sm font-semibold leading-7 text-saas-muted">{row.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="mt-auto border-t border-saas-line px-6 py-5 sm:px-7 lg:px-9">
        <SaasButton href={actionHref} variant={isFeatured ? 'primary' : 'ghost'} icon={<ArrowRight className="h-4 w-4" />}>
          {c.openDemo}
        </SaasButton>
      </div>
    </SaasCard>
  )
}

function InteractiveDemos({ c, projects: demoProjects }: { c: LocalCopy; projects: Project[] }) {
  return (
    <SaasSection id="demos" className="bg-saas-surface-soft">
      <SaasHeader
        eyebrow={c.demosEyebrow}
        title={c.demosTitle}
        subtitle={c.demosSubtitle}
        align="split"
        rightSlot={
          <SaasButton href="/demos" variant="secondary" icon={<ExternalLink className="h-4 w-4" />}>
            {c.viewDemos}
          </SaasButton>
        }
      />
      <div className="mt-12 overflow-hidden rounded-[20px] border border-saas-line bg-white shadow-saas-md">
        {demoProjects.map((project, index) => {
          const Icon = demoIcons[index] ?? Store
          return (
            <div key={project.id} className="grid gap-4 border-b border-saas-line p-5 last:border-b-0 sm:p-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-saas-mint text-saas-green">
                <Icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-saas-green">{project.category}</p>
                <h3 className="mt-2 break-words text-xl font-black leading-tight text-saas-ink">{project.title}</h3>
                <p className="mt-2 max-w-3xl text-sm font-semibold leading-7 text-saas-muted">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded-full bg-saas-surface-soft px-3 py-1 text-xs font-black text-saas-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <SaasButton href={project.demo} variant="ghost" icon={<ArrowRight className="h-4 w-4" />}>
                {c.openDemo}
              </SaasButton>
            </div>
          )
        })}
      </div>
    </SaasSection>
  )
}

function CapabilitiesSection({ c }: { c: LocalCopy }) {
  return (
    <SaasSection id="stack">
      <SaasHeader
        eyebrow={c.capabilitiesEyebrow}
        title={c.capabilitiesTitle}
        subtitle={c.capabilitiesSubtitle}
        align="center"
      />
      <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2">
        {c.capabilityCards.map((card, index) => {
          const Icon = capabilityIcons[index] ?? Boxes
          const tone = capabilityTones[index] ?? 'mint'
          return (
            <MotionCard key={card.title} className="min-w-0">
              <SaasCard hover tone={tone} className="flex min-h-full flex-col rounded-[20px] p-6 sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-white/70 text-saas-green shadow-saas-sm">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 break-words text-lg font-black leading-tight text-saas-ink sm:text-xl">{card.title}</h3>
                <p className="mt-3 break-words text-sm font-semibold leading-7 text-saas-muted">{card.statement}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {card.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/60 bg-white/55 px-3 py-1 text-xs font-black text-saas-muted"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </SaasCard>
            </MotionCard>
          )
        })}
      </StaggerContainer>
    </SaasSection>
  )
}

function ContactSection({ c, email, location }: { c: LocalCopy; email: string; location: string }) {
  return (
    <SaasSection id="contact" className="pb-24">
      <FadeUp className="relative overflow-hidden rounded-[20px] border border-saas-ink bg-saas-ink p-6 text-white shadow-saas-md sm:p-10 lg:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
          aria-hidden
        />
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-saas-green/20 blur-3xl" aria-hidden />
        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-saas-mint">{c.contactEyebrow}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {c.contactTrust.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-black text-saas-mint backdrop-blur"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                {item}
              </span>
            ))}
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="min-w-0">
              <h2 className="max-w-3xl text-balance break-words text-3xl font-black leading-[1.04] sm:text-5xl">{c.contactTitle}</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">{c.contactSubtitle}</p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-white/70">
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 text-saas-mint" />
                  {email}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-saas-mint" />
                  {location}
                </span>
              </div>
            </div>
            <SaasButton href={`mailto:${email}`} variant="secondary" icon={<ArrowRight className="h-4 w-4" />} className="min-h-12 border-white bg-white px-6 hover:bg-saas-mint">
              {c.contactCta}
            </SaasButton>
          </div>
        </div>
      </FadeUp>
    </SaasSection>
  )
}
