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
import { profile, profileCommon, projects, skills } from '@/data/portfolio'
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
  stackEyebrow: string
  stackTitle: string
  stackSubtitle: string
  stackGroups: Array<{ heading: string; items: string[] }>
  contactEyebrow: string
  contactTitle: string
  contactSubtitle: string
  contactCta: string
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
      { label: 'Resume', value: 'Open PDF', href: profileCommon.resume, icon: FileText },
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
      eyebrow: 'Mock product workflow',
      title: 'Assistant Ops Studio',
      subtitle: 'Fictional panel showing how briefs become demo-ready systems.',
      command: 'Prepare a public demo from a sanitized workflow brief',
      activeLabel: 'Demo build plan',
      pathLabel: '4-step delivery path',
      statusLabel: 'Ready for review',
      steps: [
        {
          title: 'Capture the brief',
          body: 'Goal, audience, constraints, and public-safe boundaries.',
          icon: Command,
          tone: 'green',
        },
        {
          title: 'Shape the interface',
          body: 'Product section, typed state, responsive review path.',
          icon: Layers3,
          tone: 'blue',
        },
        {
          title: 'Assist the workflow',
          body: 'Draft, compare, and refine with AI as a supporting layer.',
          icon: Bot,
          tone: 'violet',
        },
        {
          title: 'Verify the handoff',
          body: 'Build checks, safe copy review, and concise delivery notes.',
          icon: CheckCircle2,
          tone: 'coral',
        },
      ],
      outputs: [
        { label: 'Data mode', value: 'Fictional or sanitized' },
        { label: 'Surface', value: 'Demo route + workflow panel' },
        { label: 'Review', value: 'Build, lint, typecheck' },
      ],
      footer: 'No private routes, secrets, or operational internals shown.',
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
    stackEyebrow: 'Stack',
    stackTitle: 'Tools I use to ship practical products.',
    stackSubtitle:
      'A compact view of the web, app, AI, and operations tools behind the selected work.',
    stackGroups: [
      {
        heading: 'AI & Models',
        items: ['ChatGPT', 'OpenAI API', 'Claude', 'OpenRouter', 'Prompt patterns', 'RAG-style retrieval'],
      },
      {
        heading: 'Web & App',
        items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Vercel Blob'],
      },
      {
        heading: 'Ops & Channels',
        items: ['LINE Messaging API', 'PowerShell', 'Codex CLI', 'VPS reverse proxy', 'Health checks', 'Docker'],
      },
    ],
    contactEyebrow: 'Contact',
    contactTitle: 'Have a project or role that fits this work?',
    contactSubtitle:
      'Send a short note about the app, demo, internal tool, or full-stack role you want to discuss.',
    contactCta: 'Get in touch',
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
      { label: 'Resume', value: 'เปิด PDF', href: profileCommon.resume, icon: FileText },
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
      eyebrow: 'Mock product workflow',
      title: 'Assistant Ops Studio',
      subtitle: 'Panel สมมติที่โชว์วิธีเปลี่ยน brief ให้เป็นระบบ demo-ready',
      command: 'เตรียม public demo จาก workflow brief ที่ sanitize แล้ว',
      activeLabel: 'Demo build plan',
      pathLabel: 'เส้นทางส่งมอบ 4 ขั้น',
      statusLabel: 'พร้อม review',
      steps: [
        {
          title: 'เก็บ brief',
          body: 'เป้าหมาย ผู้ใช้ constraints และขอบเขต public-safe',
          icon: Command,
          tone: 'green',
        },
        {
          title: 'วาง interface',
          body: 'Product section, typed state และ responsive review path',
          icon: Layers3,
          tone: 'blue',
        },
        {
          title: 'เสริม workflow ด้วย AI',
          body: 'Draft, compare และ refine โดยใช้ AI เป็นตัวช่วย',
          icon: Bot,
          tone: 'violet',
        },
        {
          title: 'ตรวจ handoff',
          body: 'Build checks, safe copy review และ delivery notes ที่กระชับ',
          icon: CheckCircle2,
          tone: 'coral',
        },
      ],
      outputs: [
        { label: 'Data mode', value: 'Fictional or sanitized' },
        { label: 'Surface', value: 'Demo route + workflow panel' },
        { label: 'Review', value: 'Build, lint, typecheck' },
      ],
      footer: 'ไม่โชว์ private routes, secrets หรือ operational internals',
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
    stackEyebrow: 'Stack',
    stackTitle: 'เครื่องมือที่ใช้ ship งานจริง',
    stackSubtitle:
      'สรุป stack ฝั่ง web, app, AI และ operations ที่อยู่เบื้องหลัง selected work',
    stackGroups: [
      {
        heading: 'AI & Models',
        items: ['ChatGPT', 'OpenAI API', 'Claude', 'OpenRouter', 'Prompt patterns', 'RAG-style retrieval'],
      },
      {
        heading: 'Web & App',
        items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Vercel Blob'],
      },
      {
        heading: 'Ops & Channels',
        items: ['LINE Messaging API', 'PowerShell', 'Codex CLI', 'VPS reverse proxy', 'Health checks', 'Docker'],
      },
    ],
    contactEyebrow: 'Contact',
    contactTitle: 'มีโปรเจกต์หรือ role ที่เข้ากับงานแนวนี้ไหม?',
    contactSubtitle:
      'ส่ง note สั้นๆ เกี่ยวกับ app, demo, internal tool หรือ full-stack role ที่อยากคุยได้เลย',
    contactCta: 'ติดต่อ',
    openDemo: 'เปิด demo',
    viewDemos: 'ดู demos ทั้งหมด',
    viewWork: 'ดูผลงานที่เลือกไว้',
    problem: 'ปัญหา',
    built: 'สิ่งที่สร้าง',
    result: 'ผลลัพธ์',
  },
}

const demoIcons = [Store, Bot, Search]
const stackIcons = [Bot, Code2, ShieldCheck, Boxes]

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
      <StackSection c={c} groups={c.stackGroups} skillGroups={skills[lang]} />
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
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-saas-line bg-white/80 px-3 py-2 text-xs font-black text-saas-green shadow-saas-sm backdrop-blur">
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
                      <span className="block text-[11px] font-black uppercase tracking-[0.08em] text-saas-muted">{item.label}</span>
                      <span className="mt-0.5 block truncate text-sm font-black text-saas-ink">{item.value}</span>
                    </span>
                  </a>
                )
              })}
            </div>
          </MotionCard>
          <MotionCard>
            <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-2">
              {c.heroTrust.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex min-w-0 items-start gap-3 rounded-[14px] border border-saas-line bg-white/78 p-3 shadow-saas-sm backdrop-blur">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-saas-mint text-saas-green">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-black uppercase text-saas-muted">{item.label}</span>
                      <span className="mt-0.5 block break-words text-sm font-black leading-5 text-saas-ink">{item.value}</span>
                    </span>
                  </div>
                )
              })}
            </div>
          </MotionCard>
        </StaggerContainer>

        <FadeUp className="relative min-w-0">
          <MockWorkflowPanel c={c} title={data.title} />
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

function MockWorkflowPanel({ c, title }: { c: LocalCopy; title: string }) {
  return (
    <SaasCard className="rounded-[24px] border-saas-ink/10 bg-white/90 p-0 shadow-saas-md backdrop-blur">
      <div className="border-b border-saas-line bg-saas-surface-soft/80 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-saas-coral" />
            <span className="h-3 w-3 rounded-full bg-saas-cream" />
            <span className="h-3 w-3 rounded-full bg-saas-mint" />
          </div>
          <div className="min-w-0 rounded-full border border-saas-line bg-white px-3 py-1.5 text-center text-xs font-black text-saas-muted shadow-saas-sm">
            <span className="block truncate">{c.workflowPanel.title}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
        <aside className="border-b border-saas-line bg-saas-ink p-5 text-white lg:border-b-0 lg:border-r">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-mint">{c.workflowPanel.eyebrow}</p>
          <h2 className="mt-4 break-words text-2xl font-black leading-tight sm:text-3xl">{c.workflowPanel.title}</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-white/70">{c.workflowPanel.subtitle}</p>

          <div className="mt-6 rounded-[16px] border border-white/12 bg-white/8 p-4">
            <div className="flex items-start gap-3">
              <Command className="mt-0.5 h-5 w-5 shrink-0 text-saas-mint" />
              <p className="text-sm font-bold leading-6 text-white/82">{c.workflowPanel.command}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-2">
            {[title, c.workflowPanel.footer].map((item) => (
              <div key={item} className="flex items-start gap-2 text-xs font-bold leading-5 text-white/62">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-saas-mint" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="p-4 sm:p-5">
          <div className="rounded-[18px] border border-saas-line bg-saas-bg p-3 shadow-saas-sm sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase text-saas-muted">{c.workflowPanel.activeLabel}</p>
                <p className="mt-1 text-sm font-black text-saas-ink">{c.workflowPanel.pathLabel}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-black text-saas-green shadow-saas-sm">
                <span className="h-2 w-2 rounded-full bg-saas-green" />
                {c.workflowPanel.statusLabel}
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              {c.workflowPanel.steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="grid gap-3 rounded-[14px] border border-saas-line bg-white p-3 sm:grid-cols-[auto_1fr]">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-[12px] ${workflowToneClass[step.tone]}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-saas-surface-soft px-2 py-1 text-[11px] font-black text-saas-muted">0{index + 1}</span>
                        <h3 className="break-words text-sm font-black text-saas-ink">{step.title}</h3>
                      </div>
                      <p className="mt-1 break-words text-sm font-semibold leading-6 text-saas-muted">{step.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {c.workflowPanel.outputs.map((item) => (
              <div key={item.label} className="rounded-[14px] border border-saas-line bg-white p-3 shadow-saas-sm">
                <p className="text-[11px] font-black uppercase text-saas-muted">{item.label}</p>
                <p className="mt-2 break-words text-sm font-black leading-5 text-saas-ink">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SaasCard>
  )
}

function SelectedWork({ c, projects: selectedProjects }: { c: LocalCopy; projects: Project[] }) {
  const [featuredProject, ...supportingProjects] = selectedProjects

  return (
    <SaasSection id="work" className="bg-white/60" wide>
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
      className={`relative flex min-h-full flex-col rounded-[24px] p-0 ${
        isFeatured ? 'border-saas-ink/10 bg-white shadow-saas-md' : 'bg-white/92'
      }`}
    >
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
            <p className="text-xs font-black uppercase tracking-[0.14em] text-saas-green">{project.category}</p>
            <h3 className={`${isFeatured ? 'text-3xl sm:text-4xl' : 'text-2xl'} mt-3 break-words font-black leading-tight text-saas-ink`}>
              {project.title}
            </h3>
            <p className={`${isFeatured ? 'text-base leading-8' : 'text-sm leading-7'} mt-4 text-saas-muted`}>{project.description}</p>
          </div>

          <div className={`${isFeatured ? 'lg:border-l lg:border-saas-line lg:pl-6' : 'mt-5'} min-w-0`}>
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-saas-muted">{c.safeDemoLabel}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.slice(0, isFeatured ? 4 : 3).map((tech) => (
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
                <dt className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-saas-green">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-saas-mint text-[10px]">{index + 1}</span>
                  {row.label}
                </dt>
                <dd className="mt-2 break-words text-sm font-semibold leading-6 text-saas-muted">{row.value}</dd>
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
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {demoProjects.map((project, index) => {
          const Icon = demoIcons[index] ?? Store
          return (
            <SaasCard key={project.id} hover className="rounded-[24px] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-white text-saas-green shadow-saas-sm">
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-saas-green">{project.category}</p>
              <h3 className="mt-3 break-words text-xl font-black leading-tight">{project.title}</h3>
              <p className="mt-3 text-sm leading-7 text-saas-muted">{project.description}</p>
              <div className="mt-5">
                <SaasButton href={project.demo} variant="ghost" icon={<ArrowRight className="h-4 w-4" />}>
                  {c.openDemo}
                </SaasButton>
              </div>
            </SaasCard>
          )
        })}
      </div>
    </SaasSection>
  )
}

function StackSection({
  c,
  groups,
  skillGroups,
}: {
  c: LocalCopy
  groups: Array<{ heading: string; items: string[] }>
  skillGroups: typeof skills.en
}) {
  const visibleGroups = groups.slice(0, 3)
  const compactSkills = skillGroups.slice(0, 4)

  return (
    <SaasSection id="stack">
      <SaasHeader eyebrow={c.stackEyebrow} title={c.stackTitle} subtitle={c.stackSubtitle} align="center" />
      <StaggerContainer className="mt-12 grid gap-5 lg:grid-cols-3">
        {visibleGroups.map((group) => (
          <MotionCard key={group.heading}>
            <SaasCard className="rounded-[24px] p-6">
              <h3 className="text-lg font-black">{group.heading}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.slice(0, 6).map((item) => (
                  <span key={item} className="rounded-full border border-saas-line bg-white px-3 py-1.5 text-xs font-black text-saas-muted">
                    {item}
                  </span>
                ))}
              </div>
            </SaasCard>
          </MotionCard>
        ))}
      </StaggerContainer>
      <StaggerContainer className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4" delayChildren={0.05}>
        {compactSkills.map((group, index) => {
          const Icon = stackIcons[index] ?? Boxes
          return (
            <MotionCard key={group.category}>
              <SaasCard hover className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-saas-mint text-saas-green">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-black">{group.category}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.slice(0, 3).map((item) => (
                    <span key={item.name} className="rounded-full bg-saas-surface-soft px-3 py-1 text-xs font-black text-saas-muted">
                      {item.name}
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
      <FadeUp className="rounded-[24px] border border-saas-ink bg-saas-ink p-6 text-white shadow-saas-md sm:p-10 lg:p-12">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-mint">{c.contactEyebrow}</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
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
          <SaasButton href={`mailto:${email}`} variant="secondary" icon={<ArrowRight className="h-4 w-4" />} className="border-white bg-white hover:bg-saas-mint">
            {c.contactCta}
          </SaasButton>
        </div>
      </FadeUp>
    </SaasSection>
  )
}
