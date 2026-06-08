'use client'

import {
  ArrowRight,
  Mail,
  MapPin,
} from 'lucide-react'
import { profile, profileCommon, projects } from '@/data/portfolio'
import type { Language, Project } from '@/data/types'
import { useTranslation } from '@/i18n/useTranslation'
import { FadeUp, MotionCard, StaggerContainer } from '@/components/motion/MotionPrimitives'
import { SaasButton, SaasHeader, SaasSection } from './_shared'

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
  capabilityCards: Array<{ title: string; statement: string }>
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
      },
      {
        title: 'Internal Tools & Dashboards',
        statement: 'I build database-backed tools and admin workflows that teams can actually use.',
      },
      {
        title: 'SaaS & Product UI',
        statement: 'I compose product-quality interfaces with clear states, bilingual support, and public-safe demos.',
      },
      {
        title: 'Automation & Operations',
        statement: 'I automate deployment checks, notifications, and operational workflows from local commands.',
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
      },
      {
        title: 'Internal Tools & Dashboards',
        statement: 'ผมสร้าง tools และ admin workflows ที่มี database รองรับและทีมใช้งานได้จริง',
      },
      {
        title: 'SaaS & Product UI',
        statement: 'ผมสร้าง interface คุณภาพ product มี clear states, bilingual support และ public-safe demos',
      },
      {
        title: 'Automation & Operations',
        statement: 'ผมทำ deployment checks, notifications และ operational workflows ให้เรียกซ้ำได้จาก local command',
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
    <SaasSection id="demos">
      <SaasHeader
        eyebrow={c.demosEyebrow}
        title={c.demosTitle}
        subtitle={c.demosSubtitle}
        align="split"
        rightSlot={
          <SaasButton href="/demos" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
            {c.viewDemos}
          </SaasButton>
        }
      />
      <div className="mt-14 divide-y divide-saas-line border-t border-saas-line">
        {demoProjects.map((project) => (
          <a
            key={project.id}
            href={project.demo}
            className="group grid gap-3 py-7 transition lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
          >
            <div className="min-w-0">
              <div className="flex items-baseline gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-saas-green">{project.category}</p>
                <span className="text-xs font-light text-saas-muted">{project.tech.slice(0, 3).join(' · ')}</span>
              </div>
              <h3 className="mt-2 break-words text-2xl font-bold leading-tight tracking-tight text-saas-ink transition group-hover:text-saas-green">
                {project.title}
              </h3>
              <p className="mt-2 max-w-2xl text-base font-light leading-8 text-saas-muted">{project.description}</p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-saas-green">
              {c.openDemo}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </a>
        ))}
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
        align="left"
      />
      <dl className="mt-14 grid gap-x-12 gap-y-12 border-t border-saas-line pt-12 sm:grid-cols-2">
        {c.capabilityCards.map((card) => (
          <div key={card.title} className="min-w-0">
            <dt className="text-xl font-semibold tracking-tight text-saas-ink">{card.title}</dt>
            <dd className="mt-3 max-w-md text-base font-light leading-8 text-saas-muted">{card.statement}</dd>
          </div>
        ))}
      </dl>
    </SaasSection>
  )
}

function ContactSection({ c, email, location }: { c: LocalCopy; email: string; location: string }) {
  return (
    <SaasSection id="contact" className="pb-28">
      <FadeUp className="rounded-[28px] bg-saas-ink px-6 py-14 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-saas-mint">{c.contactEyebrow}</p>
        <h2 className="mt-5 max-w-3xl text-balance break-words text-3xl font-bold leading-[1.06] tracking-tight sm:text-5xl">
          {c.contactTitle}
        </h2>
        <p className="mt-5 max-w-2xl text-lg font-light leading-9 text-white/70">{c.contactSubtitle}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <SaasButton
            href={`mailto:${email}`}
            icon={<ArrowRight className="h-4 w-4" />}
            className="bg-white text-saas-ink hover:bg-saas-mint"
          >
            {c.contactCta}
          </SaasButton>
          <span className="inline-flex items-center gap-2 text-sm font-light text-white/70">
            <Mail className="h-4 w-4 text-saas-mint" />
            {email}
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-light text-white/70">
            <MapPin className="h-4 w-4 text-saas-mint" />
            {location}
          </span>
        </div>
      </FadeUp>
    </SaasSection>
  )
}
