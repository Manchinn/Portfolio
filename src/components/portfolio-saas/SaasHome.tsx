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
import { cn } from '@/lib/utils'

type LocalCopy = {
  heroEyebrow: string
  heroTitle: string
  heroBody: string
  primaryCta: string
  selectedEyebrow: string
  selectedTitle: string
  selectedSubtitle: string
  capabilitiesEyebrow: string
  capabilitiesTitle: string
  capabilitiesSubtitle: string
  capabilityCards: Array<{ title: string; statement: string }>
  contactEyebrow: string
  contactTitle: string
  contactSubtitle: string
  contactCta: string
  proofLabel: string
  problem: string
  built: string
  result: string
}

const localCopy: Record<Language, LocalCopy> = {
  en: {
    heroEyebrow: 'Chinnakrit Sripan · AI automation systems builder',
    heroTitle: 'I build AI automation and full-stack systems for real review.',
    heroBody:
      'I turn rough workflows into typed Next.js surfaces, assistant operations, and internal tools that reviewers can inspect without exposing private systems.',
    primaryCta: 'View selected work',
    selectedEyebrow: 'Selected work',
    selectedTitle: 'Verified work, shaped like product proof.',
    selectedSubtitle:
      'A cleaner view of the work that is currently safe to treat as source of truth. Each entry keeps the story clear: problem, build, and result.',
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
        statement: 'I compose product-quality interfaces with clear states, bilingual support, and reviewable workflow proof.',
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
    proofLabel: 'Proof summary',
    problem: 'Problem',
    built: 'Built',
    result: 'Result',
  },
  th: {
    heroEyebrow: 'ชินกฤต ศรีพันธุ์ · AI Automation / Full-stack / Internal Tools',
    heroTitle: 'ผมสร้าง AI automation และ full-stack systems ที่รีวิวได้จริง',
    heroBody:
      'ผมเปลี่ยน workflow ที่ยังดิบให้เป็น Next.js surfaces, assistant operations และ internal tools ที่ inspect ได้ โดยไม่เปิดระบบ private',
    primaryCta: 'ดูผลงานที่เลือกไว้',
    selectedEyebrow: 'Selected work',
    selectedTitle: 'งานที่ยืนยันได้ และอ่านเหมือน product proof',
    selectedSubtitle:
      'คัดเฉพาะงานที่ตอนนี้ใช้เป็น source of truth ได้ ให้เห็นเรื่องหลักชัดเจน: ปัญหา สิ่งที่สร้าง และผลลัพธ์',
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
        statement: 'ผมสร้าง interface คุณภาพ product มี clear states, bilingual support และ workflow proof ที่รีวิวได้',
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
    proofLabel: 'สรุปหลักฐาน',
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

  return (
    <main className="min-h-dvh overflow-x-hidden bg-transparent text-saas-ink">
      <SaasHero c={c} data={data} />
      <SelectedWork c={c} projects={selectedProjects} />
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
            <p className="mt-7 max-w-2xl break-words text-lg font-light leading-9 text-saas-muted text-pretty">{c.heroBody}</p>
          </MotionCard>
          <MotionCard>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <SaasButton href="/#work" icon={<ArrowRight className="size-4" />}>
                {c.primaryCta}
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
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-saas-muted">{project.category}</p>
        <span className="text-xs font-medium text-saas-muted">{project.date}</span>
      </div>

      <h3
        className={`${isFeatured ? 'text-3xl sm:text-4xl' : 'text-2xl'} mt-4 break-words font-bold leading-tight tracking-tight text-saas-ink`}
      >
        {project.title}
      </h3>
      <p className={cn(
        isFeatured ? 'max-w-2xl text-lg leading-9' : 'text-base leading-8',
        'mt-4 font-light text-saas-muted text-pretty'
      )}>
        {project.description}
      </p>

      {caseStudyRows.length > 0 && (
        <dl className={cn('mt-8 grid gap-6', isFeatured && 'sm:grid-cols-3')}>
          {caseStudyRows.map((row) => (
            <div key={row.label} className="min-w-0">
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-saas-muted">{row.label}</dt>
              <dd className="mt-2 break-words text-sm font-light leading-7 text-saas-ink text-pretty">{row.value}</dd>
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

      <p className="mt-8 text-sm font-semibold text-saas-muted">{c.proofLabel}</p>
    </article>
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
            <dd className="mt-3 max-w-md text-base font-light leading-8 text-saas-muted text-pretty">{card.statement}</dd>
          </div>
        ))}
      </dl>
    </SaasSection>
  )
}

function ContactSection({ c, email, location }: { c: LocalCopy; email: string; location: string }) {
  return (
    <SaasSection id="contact" className="pb-28">
      <FadeUp className="rounded-[28px] border border-saas-line bg-saas-surface px-6 py-14 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-saas-muted">{c.contactEyebrow}</p>
        <h2 className="mt-5 max-w-3xl text-balance break-words text-3xl font-bold leading-[1.06] tracking-tight sm:text-5xl">
          {c.contactTitle}
        </h2>
        <p className="mt-5 max-w-2xl text-lg font-light leading-9 text-saas-muted text-pretty">{c.contactSubtitle}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <SaasButton
            href={`mailto:${email}`}
            variant="primary"
            icon={<ArrowRight className="size-4" />}
            className="justify-center rounded-full bg-white px-6 py-3 text-black hover:bg-neutral-200"
          >
            {c.contactCta}
          </SaasButton>
          <span className="inline-flex items-center gap-2 text-sm font-light text-saas-muted">
            <Mail className="size-4 text-saas-muted" />
            {email}
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-light text-saas-muted">
            <MapPin className="size-4 text-saas-muted" />
            {location}
          </span>
        </div>
      </FadeUp>
    </SaasSection>
  )
}
