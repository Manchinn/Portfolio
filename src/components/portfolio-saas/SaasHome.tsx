'use client'

import Link from 'next/link'
import {
  ArrowRight,
} from 'lucide-react'
import { articles, projects } from '@/data/portfolio'
import type { Language, Project } from '@/data/types'
import { getSharedChrome, type SharedChromeCopy } from '@/content/shared'
import { useTranslation } from '@/i18n/useTranslation'
import { MotionCard, StaggerContainer } from '@/components/motion/MotionPrimitives'
import { SaasButton, SaasHeader, SaasSection } from './_shared'
import { cn } from '@/lib/utils'

type LocalCopy = {
  heroEyebrow: string
  heroTitle: string
  heroBody: string
  primaryCta: string
  proofItems: Array<{ label: string; value: string }>
  selectedEyebrow: string
  selectedTitle: string
  selectedSubtitle: string
  capabilitiesEyebrow: string
  capabilitiesTitle: string
  capabilitiesSubtitle: string
  capabilityCards: Array<{ title: string; statement: string }>
  proofLabel: string
  articlesEyebrow: string
  articlesTitle: string
  articlesSubtitle: string
  readArticle: string
  contactEyebrow: string
  contactTitle: string
  contactBody: string
}

type HomeCopy = LocalCopy & Pick<SharedChromeCopy, 'problem' | 'built' | 'result' | 'createBrief' | 'openProof'>

const localCopy: Record<Language, LocalCopy> = {
  en: {
    heroEyebrow: 'Software engineering · Full-stack systems',
    heroTitle: 'I build clear, maintainable software for real workflows.',
    heroBody:
      'I turn rough requirements into typed web applications, internal tools, and production-ready interfaces that teams can understand and maintain.',
    primaryCta: 'Start a project',
    proofItems: [
      { label: 'Static proof routes', value: 'Typed project and article pages' },
      { label: 'Bilingual interface', value: 'One shared EN/TH content contract' },
      { label: 'Local-first intake', value: 'No submission API or stored brief' },
    ],
    selectedEyebrow: 'Selected work',
    selectedTitle: 'Verified work, shaped like product proof.',
    selectedSubtitle:
      'A focused view of application work with the story kept clear: problem, implementation, and result.',
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: 'What I can build for you.',
    capabilitiesSubtitle:
      'Four software delivery areas behind the selected work.',
    capabilityCards: [
      {
        title: 'Full-stack Applications',
        statement: 'I build typed web applications with clear data flows, validation, and maintainable boundaries.',
      },
      {
        title: 'Internal Tools & Dashboards',
        statement: 'I build database-backed tools and admin workflows that teams can actually use.',
      },
      {
        title: 'Product Interfaces',
        statement: 'I compose responsive interfaces with clear states, bilingual support, and accessible controls.',
      },
      {
        title: 'Delivery & Operations',
        statement: 'I make builds, deployment checks, and operational workflows repeatable and reviewable.',
      },
    ],
    proofLabel: 'Proof summary',
    articlesEyebrow: 'Blog & Insights',
    articlesTitle: 'Writing on frontend and software architecture.',
    articlesSubtitle: 'Technical notes, implementation patterns, and development stories.',
    readArticle: 'Read article',
    contactEyebrow: 'Project inquiry',
    contactTitle: 'Have a workflow that needs a clearer software path?',
    contactBody: 'Shape the context, desired result, and constraints into a concise brief before starting the conversation.',
  },
  th: {
    heroEyebrow: 'Software engineering · Full-stack systems',
    heroTitle: 'สร้างซอฟต์แวร์ที่ชัดเจน ดูแลต่อได้ และรองรับ workflow จริง',
    heroBody:
      'เปลี่ยน requirements ที่ยังไม่ชัดให้เป็น web applications, internal tools และ interfaces ที่พร้อมใช้งานจริงและทีมดูแลต่อได้',
    primaryCta: 'เริ่มคุยโปรเจกต์',
    proofItems: [
      { label: 'Static proof routes', value: 'Project และ article pages แบบ typed' },
      { label: 'Bilingual interface', value: 'ใช้ content contract ร่วมกันใน EN/TH' },
      { label: 'Local-first intake', value: 'ไม่มี submission API หรือการเก็บ brief' },
    ],
    selectedEyebrow: 'Selected work',
    selectedTitle: 'งานที่ยืนยันได้ และอ่านเหมือน product proof',
    selectedSubtitle:
      'นำเสนองาน application แบบโฟกัส ให้เห็นเรื่องหลักชัดเจน: ปัญหา การพัฒนา และผลลัพธ์',
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: 'สิ่งที่ผมสร้างให้คุณได้',
    capabilitiesSubtitle:
      'สี่ด้านของการพัฒนาซอฟต์แวร์ที่อยู่เบื้องหลัง selected work',
    capabilityCards: [
      {
        title: 'Full-stack Applications',
        statement: 'สร้าง web applications แบบ typed มี data flow, validation และ boundaries ที่ดูแลต่อได้',
      },
      {
        title: 'Internal Tools & Dashboards',
        statement: 'ผมสร้าง tools และ admin workflows ที่มี database รองรับและทีมใช้งานได้จริง',
      },
      {
        title: 'Product Interfaces',
        statement: 'สร้าง responsive interface ที่มี clear states, bilingual support และ controls ที่เข้าถึงได้',
      },
      {
        title: 'Delivery & Operations',
        statement: 'ทำ build, deployment checks และ operational workflows ให้เรียกซ้ำและตรวจสอบได้',
      },
    ],
    proofLabel: 'สรุปหลักฐาน',
    articlesEyebrow: 'บทความและสาระ',
    articlesTitle: 'บันทึกเรื่อง Frontend และสถาปัตยกรรมซอฟต์แวร์',
    articlesSubtitle: 'บันทึกเชิงเทคนิค แนวทาง implementation และเรื่องราวการพัฒนาซอฟต์แวร์',
    readArticle: 'อ่านบทความ',
    contactEyebrow: 'Project inquiry',
    contactTitle: 'มี workflow ที่ต้องการเส้นทางพัฒนาซอฟต์แวร์ให้ชัดขึ้นหรือไม่',
    contactBody: 'จัดบริบท ผลลัพธ์ที่ต้องการ และข้อจำกัดให้เป็น brief ที่กระชับก่อนเริ่มพูดคุย',
  },
}

export function SaasHome() {
  const { language } = useTranslation()
  const lang = language as Language
  const shared = getSharedChrome(lang)
  const c: HomeCopy = {
    ...localCopy[lang],
    problem: shared.problem,
    built: shared.built,
    result: shared.result,
    createBrief: shared.createBrief,
    openProof: shared.openProof,
  }
  const selectedProjects = projects[lang]
  const proofHref = selectedProjects[0] ? `/work/${selectedProjects[0].slug}#demo` : '/#work'

  return (
    <main className="min-h-dvh overflow-x-hidden bg-saas-bg text-saas-ink">
      <SaasHero c={c} proofHref={proofHref} />
      <SelectedWork c={c} projects={selectedProjects} />
      <CapabilitiesSection c={c} />
      <ArticlesSection c={c} />
      <ContactSection c={c} />
    </main>
  )
}

function SaasHero({ c, proofHref }: { c: HomeCopy; proofHref: string }) {
  return (
    <section id="home" className="relative">
      <div className="mx-auto max-w-[1180px] px-4 pt-18 pb-20 sm:px-6 sm:pt-24 sm:pb-24 lg:px-8 lg:pt-28 lg:pb-28">
        <StaggerContainer delayChildren={0.05} staggerChildren={0.08}>
          <MotionCard>
            <p className="text-xs font-semibold uppercase text-saas-accent">{c.heroEyebrow}</p>
          </MotionCard>
          <MotionCard>
            <h1 className="mt-5 max-w-[19ch] text-balance break-words text-4xl font-semibold leading-[1.06] text-saas-ink sm:text-6xl lg:text-[4.25rem]">
              {c.heroTitle}
            </h1>
          </MotionCard>
          <MotionCard>
            <p className="mt-6 max-w-2xl break-words text-lg leading-8 text-saas-muted text-pretty">{c.heroBody}</p>
          </MotionCard>
          <MotionCard>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <SaasButton href="/work-with-me" icon={<ArrowRight className="size-4" />}>
                {c.primaryCta}
              </SaasButton>
              <SaasButton href={proofHref} variant="secondary">
                {c.openProof}
              </SaasButton>
            </div>
          </MotionCard>
          <MotionCard>
            <dl className="mt-14 grid border-y border-saas-line sm:grid-cols-3">
              {c.proofItems.map((item) => (
                <div key={item.label} className="min-w-0 border-b border-saas-line py-5 last:border-b-0 sm:border-r sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:border-r-0">
                  <dt className="text-xs font-semibold uppercase text-saas-accent">{item.label}</dt>
                  <dd className="mt-2 text-sm leading-6 text-saas-muted">{item.value}</dd>
                </div>
              ))}
            </dl>
          </MotionCard>
        </StaggerContainer>
      </div>
    </section>
  )
}

function SelectedWork({ c, projects: selectedProjects }: { c: HomeCopy; projects: Project[] }) {
  const [featuredProject, ...supportingProjects] = selectedProjects

  return (
    <SaasSection id="work" wide>
      <SaasHeader
        eyebrow={c.selectedEyebrow}
        title={c.selectedTitle}
        subtitle={c.selectedSubtitle}
        align="split"
      />
      <StaggerContainer className="mt-12 grid gap-x-10 gap-y-12 lg:grid-cols-2">
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

function ProjectCard({ project, c, variant }: { project: Project; c: HomeCopy; variant: 'featured' | 'supporting' }) {
  const isFeatured = variant === 'featured'
  const caseStudyRows = project.caseStudy
    ? [
        { label: c.problem, value: project.caseStudy.problem },
        { label: c.built, value: project.caseStudy.built },
        { label: c.result, value: project.caseStudy.result },
      ]
    : []

  return (
    <article className="group flex min-h-full flex-col border-t border-saas-line pt-7">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-xs font-semibold uppercase text-saas-accent">{project.category}</p>
        <span className="text-xs font-medium text-saas-muted">{project.date}</span>
      </div>

      <h3
        className={`${isFeatured ? 'text-3xl sm:text-4xl' : 'text-2xl'} mt-3 break-words font-semibold leading-tight text-saas-ink`}
      >
        {project.title}
      </h3>
      <p className={cn(
        isFeatured ? 'max-w-2xl text-lg leading-8' : 'text-base leading-7',
        'mt-3 text-saas-muted text-pretty'
      )}>
        {project.description}
      </p>

      {caseStudyRows.length > 0 && (
        <dl className={cn('mt-7 grid gap-6', isFeatured && 'sm:grid-cols-3')}>
          {caseStudyRows.map((row) => (
            <div key={row.label} className="min-w-0">
              <dt className="text-xs font-semibold uppercase text-saas-accent">{row.label}</dt>
              <dd className="mt-2 break-words text-sm leading-6 text-saas-ink text-pretty">{row.value}</dd>
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

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-saas-line pt-5">
        <p className="text-sm font-medium text-saas-muted">{c.proofLabel}</p>
        <Link
          href={`/work/${project.slug}#demo`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-saas-accent-strong hover:text-saas-accent"
        >
          {c.openProof}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  )
}

function CapabilitiesSection({ c }: { c: HomeCopy }) {
  return (
    <SaasSection id="stack">
      <SaasHeader
        eyebrow={c.capabilitiesEyebrow}
        title={c.capabilitiesTitle}
        subtitle={c.capabilitiesSubtitle}
        align="left"
      />
      <dl className="mt-12 grid gap-x-12 gap-y-10 border-t border-saas-line pt-10 sm:grid-cols-2">
        {c.capabilityCards.map((card) => (
          <div key={card.title} className="min-w-0">
            <dt className="text-xl font-semibold text-saas-ink">{card.title}</dt>
            <dd className="mt-3 max-w-md text-base leading-7 text-saas-muted text-pretty">{card.statement}</dd>
          </div>
        ))}
      </dl>
    </SaasSection>
  )
}

function ArticlesSection({ c }: { c: HomeCopy }) {
  const { language } = useTranslation()
  const lang = language as Language
  const langArticles = articles[lang] ?? []

  if (langArticles.length === 0) return null

  return (
    <SaasSection id="articles">
      <SaasHeader
        eyebrow={c.articlesEyebrow}
        title={c.articlesTitle}
        subtitle={c.articlesSubtitle}
        align="left"
      />
      <div className="mt-12 divide-y divide-saas-line border-t border-saas-line">
        {langArticles.map((article) => (
          <article
            key={article.id}
            className="grid gap-4 py-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-xs font-semibold uppercase text-saas-accent">{article.category}</span>
                <span className="text-xs text-saas-muted">{article.readTime}</span>
              </div>
              <h3 className="mt-2 break-words text-2xl font-semibold leading-tight text-saas-ink">
                {article.title}
              </h3>
              <p className="mt-2 max-w-2xl text-base leading-7 text-saas-muted text-pretty">{article.excerpt}</p>
            </div>
            <Link
              href={`/article/${article.slug}`}
              className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-saas-accent-strong hover:text-saas-accent"
            >
              {c.readArticle}
              <ArrowRight className="size-4" />
            </Link>
          </article>
        ))}
      </div>
    </SaasSection>
  )
}

function ContactSection({ c }: { c: HomeCopy }) {
  return (
    <SaasSection id="contact">
      <div className="grid gap-8 border-y border-saas-line py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase text-saas-accent">{c.contactEyebrow}</p>
          <h2 className="mt-3 max-w-3xl break-words text-3xl font-semibold leading-tight text-saas-ink sm:text-4xl">
            {c.contactTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-saas-muted">{c.contactBody}</p>
        </div>
        <SaasButton href="/work-with-me" icon={<ArrowRight className="size-4" />}>
          {c.createBrief}
        </SaasButton>
      </div>
    </SaasSection>
  )
}
