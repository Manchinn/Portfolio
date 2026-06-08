'use client'

import {
  ArrowRight,
  Bot,
  Boxes,
  Code2,
  ExternalLink,
  Mail,
  MapPin,
  Search,
  ShieldCheck,
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
  selectedEyebrow: string
  selectedTitle: string
  selectedSubtitle: string
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
    selectedEyebrow: 'Selected work',
    selectedTitle: 'Three public-safe case studies, shaped like product proof.',
    selectedSubtitle:
      'A curated view of assistant systems, operational workflows, and knowledge tooling. Each card keeps the story clear: problem, build, and result.',
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
    selectedEyebrow: 'Selected work',
    selectedTitle: 'สาม case study แบบ public-safe ที่อ่านเหมือน product proof',
    selectedSubtitle:
      'คัดงาน assistant systems, operational workflows และ knowledge tooling ให้เห็นเรื่องหลักชัดเจน: ปัญหา สิ่งที่สร้าง และผลลัพธ์',
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
    <section id="home" className="relative">
      <div className="mx-auto max-w-[1080px] px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24 lg:px-8 lg:pt-36 lg:pb-28">
        <StaggerContainer delayChildren={0.05} staggerChildren={0.08}>
          <MotionCard>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-saas-muted">{c.heroEyebrow}</p>
          </MotionCard>
          <MotionCard>
            <h1 className="mt-6 max-w-[18ch] text-balance break-words text-4xl font-bold leading-[1.02] tracking-tight text-saas-ink sm:text-6xl lg:text-7xl">
              {c.heroTitle}
            </h1>
          </MotionCard>
          <MotionCard>
            <p className="mt-7 max-w-2xl break-words text-lg font-light leading-9 text-saas-muted">{c.heroBody}</p>
          </MotionCard>
          <MotionCard>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <SaasButton href="/#work" icon={<ArrowRight className="h-4 w-4" />}>
                {c.primaryCta}
              </SaasButton>
              <SaasButton href="/demos" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
                {c.secondaryCta}
              </SaasButton>
            </div>
          </MotionCard>
        </StaggerContainer>
      </div>
    </section>
  )
}

function SelectedWork({ c, projects: selectedProjects }: { c: LocalCopy; projects: Project[] }) {
  const [featuredProject, ...supportingProjects] = selectedProjects

  return (
    <SaasSection id="work" wide>
      <SaasHeader
        eyebrow={c.selectedEyebrow}
        title={c.selectedTitle}
        subtitle={c.selectedSubtitle}
        align="split"
        rightSlot={
          <SaasButton href="/demos" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
            {c.viewDemos}
          </SaasButton>
        }
      />
      <StaggerContainer className="mt-16 grid gap-x-12 gap-y-14 lg:grid-cols-2">
        {featuredProject && (
          <MotionCard className="min-w-0 lg:col-span-2">
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
    <article className="group flex min-h-full flex-col border-t border-saas-line pt-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-saas-green">{project.category}</p>
        <span className="text-xs font-medium text-saas-muted">{project.date}</span>
      </div>

      <h3
        className={`${isFeatured ? 'text-3xl sm:text-4xl' : 'text-2xl'} mt-4 break-words font-bold leading-tight tracking-tight text-saas-ink`}
      >
        {project.title}
      </h3>
      <p className={`${isFeatured ? 'max-w-2xl text-lg leading-9' : 'text-base leading-8'} mt-4 font-light text-saas-muted`}>
        {project.description}
      </p>

      {caseStudyRows.length > 0 && (
        <dl className={`mt-8 grid gap-6 ${isFeatured ? 'sm:grid-cols-3' : ''}`}>
          {caseStudyRows.map((row) => (
            <div key={row.label} className="min-w-0">
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-saas-muted">{row.label}</dt>
              <dd className="mt-2 break-words text-sm font-light leading-7 text-saas-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
        {(isFeatured ? project.tech : project.tech.slice(0, 4)).map((tech) => (
          <span key={tech} className="text-xs font-medium text-saas-muted">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-8">
        <SaasButton href={actionHref} variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
          {c.openDemo}
        </SaasButton>
      </div>
    </article>
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
