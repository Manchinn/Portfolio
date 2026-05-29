'use client'

import {
  ArrowRight,
  Bot,
  Boxes,
  Code2,
  ExternalLink,
  Layers3,
  Mail,
  MapPin,
  Search,
  ShieldCheck,
  Store,
} from 'lucide-react'
import { profile, profileCommon, projects, skills } from '@/data/portfolio'
import type { Language, Project } from '@/data/types'
import { useTranslation } from '@/i18n/useTranslation'
import { SaasButton, SaasCard, SaasHeader, SaasSection } from './_shared'

type LocalCopy = {
  heroEyebrow: string
  heroTitle: string
  heroBody: string
  primaryCta: string
  secondaryCta: string
  profileEyebrow: string
  profileTags: string[]
  noteCards: Array<{ title: string; body: string; icon: typeof Code2 }>
  selectedEyebrow: string
  selectedTitle: string
  selectedSubtitle: string
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
    heroEyebrow: 'Developer portfolio',
    heroTitle: 'Full-stack developer building useful web apps and AI-assisted tools.',
    heroBody:
      'I design and ship practical interfaces, internal systems, and public-safe demos with Next.js, TypeScript, and AI-assisted workflows as a supporting edge.',
    primaryCta: 'View work',
    secondaryCta: 'Explore demos',
    profileEyebrow: 'Builder profile',
    profileTags: ['Full-stack apps', 'Interactive demos', 'Internal tools', 'AI-assisted systems'],
    noteCards: [
      {
        title: 'Product-minded UI',
        body: 'Clean SaaS-style sections, responsive cards, and routes that are easy to scan.',
        icon: Layers3,
      },
      {
        title: 'Build-ready systems',
        body: 'Typed frontends, API-aware composition, stateful demos, and verification before handoff.',
        icon: Code2,
      },
    ],
    selectedEyebrow: 'Selected work',
    selectedTitle: 'Projects that show the range.',
    selectedSubtitle:
      'A short scan of shipped systems, assistant tools, internal dashboards, and product-style demos using the existing portfolio data.',
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
    heroEyebrow: 'Developer portfolio',
    heroTitle: 'Full-stack developer ที่สร้างเว็บแอปและเครื่องมือ AI-assisted ที่ใช้งานได้จริง',
    heroBody:
      'ผมออกแบบและพัฒนา interface, internal system และ demo ที่เปิด public ได้ ด้วย Next.js, TypeScript และใช้ AI-assisted workflow เป็นจุดเสริมของงาน',
    primaryCta: 'ดูผลงาน',
    secondaryCta: 'ดู demos',
    profileEyebrow: 'Builder profile',
    profileTags: ['Full-stack apps', 'Interactive demos', 'Internal tools', 'AI-assisted systems'],
    noteCards: [
      {
        title: 'UI แบบ product',
        body: 'Section สไตล์ SaaS ที่อ่านง่าย card responsive และ route ที่ scan ได้เร็ว',
        icon: Layers3,
      },
      {
        title: 'ระบบที่พร้อม build ต่อ',
        body: 'Typed frontend, การจัดวางที่คิดถึง API, demo ที่มี state และตรวจ build ก่อนส่งต่อ',
        icon: Code2,
      },
    ],
    selectedEyebrow: 'Selected work',
    selectedTitle: 'โปรเจกต์ที่โชว์ range ของงาน',
    selectedSubtitle:
      'สรุปสั้นๆ จากข้อมูล portfolio เดิม ทั้งระบบที่ ship แล้ว assistant tools, internal dashboards และ demo แบบ product-style',
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
    problem: 'Problem',
    built: 'Built',
    result: 'Result',
  },
}

const demoIcons = [Store, Bot, Search]
const stackIcons = [Bot, Code2, ShieldCheck, Boxes]

export function SaasHome() {
  const { language } = useTranslation()
  const lang = language as Language
  const c = localCopy[lang]
  const data = { ...profile[lang], ...profileCommon }
  const selectedProjects = projects[lang].slice(0, 4)
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
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-saas-mint/60 to-transparent" aria-hidden />
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:px-8 lg:py-24">
        <div className="relative min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-green">{c.heroEyebrow}</p>
          <h1 className="mt-5 max-w-full text-balance break-words text-5xl font-black leading-[0.95] text-saas-ink sm:max-w-5xl sm:text-6xl lg:text-7xl">
            {c.heroTitle}
          </h1>
          <p className="mt-6 max-w-full break-words text-lg leading-8 text-saas-muted sm:max-w-2xl">{c.heroBody}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <SaasButton href="/#work" icon={<ArrowRight className="h-4 w-4" />}>
              {c.primaryCta}
            </SaasButton>
            <SaasButton href="/demos" variant="secondary" icon={<ExternalLink className="h-4 w-4" />}>
              {c.secondaryCta}
            </SaasButton>
          </div>
        </div>

        <div className="relative grid min-w-0 gap-4 self-end">
          <SaasCard tone="dark" className="rounded-[24px] p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-mint">{c.profileEyebrow}</p>
                <h2 className="mt-4 break-words text-3xl font-black leading-tight">{data.name}</h2>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-white/10">
                <Code2 className="h-7 w-7 text-saas-mint" />
              </div>
            </div>
            <p className="mt-5 text-base leading-7 text-white/72">{data.title}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[...c.profileTags, data.location].map((item) => (
                <div key={item} className="rounded-[10px] border border-white/12 bg-white/7 px-3 py-2 text-sm font-bold text-white/82">
                  {item}
                </div>
              ))}
            </div>
          </SaasCard>
          <div className="grid gap-4 sm:grid-cols-2">
            {c.noteCards.map((item) => {
              const Icon = item.icon
              return (
                <SaasCard key={item.title} tone="mint">
                  <Icon className="h-5 w-5 text-saas-green" />
                  <p className="mt-3 text-sm font-black">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-saas-muted">{item.body}</p>
                </SaasCard>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function SelectedWork({ c, projects: selectedProjects }: { c: LocalCopy; projects: Project[] }) {
  return (
    <SaasSection id="work" className="bg-white/55">
      <SaasHeader
        eyebrow={c.selectedEyebrow}
        title={c.selectedTitle}
        subtitle={c.selectedSubtitle}
        align="split"
        rightSlot={
          <SaasButton href="/#work" variant="secondary">
            {c.viewWork}
          </SaasButton>
        }
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {selectedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} c={c} />
        ))}
      </div>
    </SaasSection>
  )
}

function ProjectCard({ project, c }: { project: Project; c: LocalCopy }) {
  return (
    <SaasCard hover className="flex min-h-full flex-col rounded-[24px] p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-saas-green">{project.category}</p>
          <h3 className="mt-3 break-words text-2xl font-black leading-tight text-saas-ink">{project.title}</h3>
        </div>
        <span className="rounded-full bg-saas-surface-soft px-3 py-1 text-xs font-black text-saas-muted">{project.date}</span>
      </div>
      <p className="mt-4 text-sm leading-7 text-saas-muted">{project.description}</p>
      {project.caseStudy && (
        <div className="mt-5 grid gap-3">
          {[
            [c.problem, project.caseStudy.problem],
            [c.built, project.caseStudy.built],
            [c.result, project.caseStudy.result],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[10px] bg-saas-surface-soft p-3">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-saas-green">{label}</p>
              <p className="mt-1 text-sm leading-6 text-saas-muted">{value}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.slice(0, 3).map((tech) => (
          <span key={tech} className="rounded-full border border-saas-line bg-white px-3 py-1 text-xs font-black text-saas-muted">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-6">
        <SaasButton href={project.demo} variant="ghost" icon={<ArrowRight className="h-4 w-4" />}>
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
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {visibleGroups.map((group) => (
          <SaasCard key={group.heading} className="rounded-[24px] p-6">
            <h3 className="text-lg font-black">{group.heading}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.slice(0, 6).map((item) => (
                <span key={item} className="rounded-full border border-saas-line bg-white px-3 py-1.5 text-xs font-black text-saas-muted">
                  {item}
                </span>
              ))}
            </div>
          </SaasCard>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {compactSkills.map((group, index) => {
          const Icon = stackIcons[index] ?? Boxes
          return (
            <SaasCard key={group.category} hover className="p-5">
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
          )
        })}
      </div>
    </SaasSection>
  )
}

function ContactSection({ c, email, location }: { c: LocalCopy; email: string; location: string }) {
  return (
    <SaasSection id="contact" className="pb-24">
      <div className="rounded-[24px] border border-saas-ink bg-saas-ink p-6 text-white shadow-saas-md sm:p-10 lg:p-12">
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
          <SaasButton href={`mailto:${email}`} icon={<ArrowRight className="h-4 w-4" />} className="bg-white text-saas-ink hover:bg-saas-mint">
            {c.contactCta}
          </SaasButton>
        </div>
      </div>
    </SaasSection>
  )
}
