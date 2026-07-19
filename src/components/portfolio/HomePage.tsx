'use client'

import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Globe2,
} from 'lucide-react'
import { articles, projects, publicContactUrl } from '@/data/portfolio'
import type { Language, Project } from '@/data/types'
import { getSharedChrome, type SharedChromeCopy } from '@/content/shared'
import { useTranslation } from '@/i18n/useTranslation'
import { MotionCard, StaggerContainer } from '@/components/motion/MotionPrimitives'
import { PortfolioButton, PortfolioHeader, PortfolioSection } from './primitives'
import { cn } from '@/lib/utils'

type LocalCopy = {
  heroEyebrow: string
  heroTitle: string
  heroBody: string
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

type HomeCopy = LocalCopy &
  Pick<SharedChromeCopy, 'problem' | 'built' | 'result' | 'contactAction' | 'contactNotice' | 'viewSelectedWork'>

const localCopy: Record<Language, LocalCopy> = {
  en: {
    heroEyebrow: 'Software engineering · Full-stack systems',
    heroTitle: 'I build clear, maintainable software for real workflows.',
    heroBody:
      'I turn rough requirements into typed web applications, internal tools, and production-ready interfaces that teams can understand and maintain.',
    proofItems: [
      { label: 'Selected work on one page', value: 'Problem, build, and result in place' },
      { label: 'Bilingual interface', value: 'One shared EN/TH content contract' },
      { label: 'Static articles', value: 'Typed technical writing routes' },
    ],
    selectedEyebrow: 'Selected work',
    selectedTitle: 'Verified work, shaped like product proof.',
    selectedSubtitle:
      'A focused view of application work with the story kept clear: problem, implementation, and result.',
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: 'What I can build for you.',
    capabilitiesSubtitle: 'Four software delivery areas behind the selected work.',
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
    proofLabel: 'Case summary',
    articlesEyebrow: 'Blog & Insights',
    articlesTitle: 'Writing on frontend and software architecture.',
    articlesSubtitle: 'Technical notes, implementation patterns, and development stories.',
    readArticle: 'Read article',
    contactEyebrow: 'Project inquiry',
    contactTitle: 'Have a workflow that needs a clearer software path?',
    contactBody:
      'Share the context, desired result, and constraints in a public GitHub issue. This site does not collect or store a project brief.',
  },
  th: {
    heroEyebrow: 'Software engineering · Full-stack systems',
    heroTitle: 'สร้างซอฟต์แวร์ที่ชัดเจน ดูแลต่อได้ และรองรับ workflow จริง',
    heroBody:
      'เปลี่ยน requirements ที่ยังไม่ชัดให้เป็น web applications, internal tools และ interfaces ที่พร้อมใช้งานจริงและทีมดูแลต่อได้',
    proofItems: [
      { label: 'Selected work บนหน้าเดียว', value: 'ปัญหา การสร้าง และผลลัพธ์ในที่เดียว' },
      { label: 'Bilingual interface', value: 'ใช้ content contract ร่วมกันใน EN/TH' },
      { label: 'Static articles', value: 'บทความเทคนิคแบบ typed routes' },
    ],
    selectedEyebrow: 'Selected work',
    selectedTitle: 'งานที่ยืนยันได้ และอ่านเหมือน product proof',
    selectedSubtitle:
      'นำเสนองาน application แบบโฟกัส ให้เห็นเรื่องหลักชัดเจน: ปัญหา การพัฒนา และผลลัพธ์',
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: 'สิ่งที่ผมสร้างให้คุณได้',
    capabilitiesSubtitle: 'สี่ด้านของการพัฒนาซอฟต์แวร์ที่อยู่เบื้องหลัง selected work',
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
    proofLabel: 'สรุปเคส',
    articlesEyebrow: 'บทความและสาระ',
    articlesTitle: 'บันทึกเรื่อง Frontend และสถาปัตยกรรมซอฟต์แวร์',
    articlesSubtitle: 'บันทึกเชิงเทคนิค แนวทาง implementation และเรื่องราวการพัฒนาซอฟต์แวร์',
    readArticle: 'อ่านบทความ',
    contactEyebrow: 'Project inquiry',
    contactTitle: 'มี workflow ที่ต้องการเส้นทางพัฒนาซอฟต์แวร์ให้ชัดขึ้นหรือไม่',
    contactBody:
      'แชร์บริบท ผลลัพธ์ที่ต้องการ และข้อจำกัดผ่าน GitHub issue แบบสาธารณะ เว็บนี้ไม่เก็บหรือบันทึก project brief',
  },
}

export function HomePage() {
  const { language } = useTranslation()
  const lang = language as Language
  const shared = getSharedChrome(lang)
  const c: HomeCopy = {
    ...localCopy[lang],
    problem: shared.problem,
    built: shared.built,
    result: shared.result,
    contactAction: shared.contactAction,
    contactNotice: shared.contactNotice,
    viewSelectedWork: shared.viewSelectedWork,
  }
  const selectedProjects = projects[lang]

  return (
    <main className="min-h-dvh overflow-x-hidden bg-portfolio-bg text-portfolio-ink">
      <PortfolioHero c={c} />
      <SelectedWork c={c} projects={selectedProjects} />
      <CapabilitiesSection c={c} />
      <ArticlesSection c={c} />
      <ContactSection c={c} />
    </main>
  )
}

function PortfolioHero({ c }: { c: HomeCopy }) {
  return (
    <section id="home" className="relative">
      <div className="mx-auto max-w-[1180px] px-4 pt-18 pb-20 sm:px-6 sm:pt-24 sm:pb-24 lg:px-8 lg:pt-28 lg:pb-28">
        <StaggerContainer delayChildren={0.05} staggerChildren={0.08}>
          <MotionCard>
            <p className="font-[family-name:var(--font-pixel)] text-[10px] font-normal uppercase tracking-wide text-portfolio-accent sm:text-[11px]">
              {c.heroEyebrow}
            </p>
          </MotionCard>
          <MotionCard>
            <h1 className="mt-5 max-w-[19ch] text-balance break-words text-4xl font-semibold leading-[1.06] text-portfolio-ink sm:text-6xl lg:text-[4.25rem]">
              {c.heroTitle}
            </h1>
          </MotionCard>
          <MotionCard>
            <p className="mt-6 max-w-2xl break-words text-lg leading-8 text-portfolio-muted text-pretty">{c.heroBody}</p>
          </MotionCard>
          <MotionCard>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <PortfolioButton href="/#work" icon={<ArrowDown className="size-4" aria-hidden />}>
                {c.viewSelectedWork}
              </PortfolioButton>
              <PortfolioButton
                href={publicContactUrl}
                external
                variant="secondary"
                icon={<ArrowUpRight className="size-4" aria-hidden />}
              >
                {c.contactAction}
              </PortfolioButton>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-portfolio-muted">{c.contactNotice}</p>
          </MotionCard>
          <MotionCard>
            <dl className="mt-14 grid border-y-2 border-portfolio-ink/15 sm:grid-cols-3">
              {c.proofItems.map((item) => (
                <div
                  key={item.label}
                  className="min-w-0 border-b-2 border-portfolio-ink/10 py-5 last:border-b-0 sm:border-r-2 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:border-r-0"
                >
                  <dt className="font-[family-name:var(--font-pixel)] text-[10px] font-normal uppercase tracking-wide text-portfolio-accent">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-portfolio-muted">{item.value}</dd>
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
    <PortfolioSection id="work" wide>
      <PortfolioHeader
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
    </PortfolioSection>
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
    <article className="group flex min-h-full flex-col rounded-portfolio-md border-2 border-portfolio-ink bg-portfolio-surface p-6 shadow-portfolio-sm sm:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-[family-name:var(--font-pixel)] text-[10px] font-normal uppercase tracking-wide text-portfolio-accent">
          {project.category}
        </p>
        <span className="font-mono text-xs font-medium text-portfolio-muted">{project.date}</span>
      </div>

      <h3
        className={`${isFeatured ? 'text-3xl sm:text-4xl' : 'text-2xl'} mt-3 break-words font-semibold leading-tight text-portfolio-ink`}
      >
        {project.title}
      </h3>
      <p
        className={cn(
          isFeatured ? 'max-w-2xl text-lg leading-8' : 'text-base leading-7',
          'mt-3 text-portfolio-muted text-pretty',
        )}
      >
        {project.description}
      </p>

      {caseStudyRows.length > 0 && (
        <dl
          className={cn(
            'mt-7 grid gap-6 border-t-2 border-portfolio-ink/10 pt-6',
            isFeatured && 'sm:grid-cols-3',
          )}
        >
          {caseStudyRows.map((row) => (
            <div key={row.label} className="min-w-0">
              <dt className="font-[family-name:var(--font-pixel)] text-[10px] font-normal uppercase tracking-wide text-portfolio-accent">
                {row.label}
              </dt>
              <dd className="mt-2 break-words text-sm leading-6 text-portfolio-ink text-pretty">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {(isFeatured ? project.tech : project.tech.slice(0, 4)).map((tech) => (
          <span
            key={tech}
            className="rounded-portfolio-sm border-2 border-portfolio-ink/15 bg-portfolio-surface-soft px-2.5 py-1 font-mono text-[11px] font-medium text-portfolio-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-7 border-t-2 border-portfolio-ink/10 pt-5">
        <p className="font-[family-name:var(--font-pixel)] text-[10px] font-normal uppercase tracking-wide text-portfolio-muted">
          {c.proofLabel}
        </p>
      </div>
    </article>
  )
}

function CapabilitiesSection({ c }: { c: HomeCopy }) {
  return (
    <PortfolioSection id="stack">
      <PortfolioHeader
        eyebrow={c.capabilitiesEyebrow}
        title={c.capabilitiesTitle}
        subtitle={c.capabilitiesSubtitle}
        align="left"
      />
      <dl className="mt-12 grid gap-4 border-t-2 border-portfolio-ink/15 pt-10 sm:grid-cols-2">
        {c.capabilityCards.map((card) => (
          <div
            key={card.title}
            className="min-w-0 rounded-portfolio-md border-2 border-portfolio-ink/15 bg-portfolio-surface px-5 py-6 shadow-portfolio-sm"
          >
            <dt className="text-xl font-semibold text-portfolio-ink">{card.title}</dt>
            <dd className="mt-3 max-w-md text-base leading-7 text-portfolio-muted text-pretty">{card.statement}</dd>
          </div>
        ))}
      </dl>
    </PortfolioSection>
  )
}

function ArticlesSection({ c }: { c: HomeCopy }) {
  const { language } = useTranslation()
  const lang = language as Language
  const langArticles = articles[lang] ?? []

  if (langArticles.length === 0) return null

  return (
    <PortfolioSection id="articles">
      <PortfolioHeader
        eyebrow={c.articlesEyebrow}
        title={c.articlesTitle}
        subtitle={c.articlesSubtitle}
        align="left"
      />
      <div className="mt-12 divide-y-2 divide-portfolio-ink/10 border-y-2 border-portfolio-ink/15">
        {langArticles.map((article) => (
          <article
            key={article.id}
            className="grid gap-4 py-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-[family-name:var(--font-pixel)] text-[10px] font-normal uppercase tracking-wide text-portfolio-accent">
                  {article.category}
                </span>
                <span className="font-mono text-xs text-portfolio-muted">{article.readTime}</span>
              </div>
              <h3 className="mt-2 break-words text-2xl font-semibold leading-tight text-portfolio-ink">
                {article.title}
              </h3>
              <p className="mt-2 max-w-2xl text-base leading-7 text-portfolio-muted text-pretty">{article.excerpt}</p>
            </div>
            <Link
              href={`/article/${article.slug}`}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-portfolio-accent-strong hover:text-portfolio-accent"
            >
              {c.readArticle}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </article>
        ))}
      </div>
    </PortfolioSection>
  )
}

function ContactSection({ c }: { c: HomeCopy }) {
  return (
    <PortfolioSection id="contact">
      <div className="rounded-portfolio-md border-2 border-portfolio-ink bg-portfolio-surface px-5 py-10 shadow-portfolio-md sm:px-8 sm:py-12 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="min-w-0">
            <p className="font-[family-name:var(--font-pixel)] text-[10px] font-normal uppercase tracking-wide text-portfolio-accent sm:text-[11px]">
              {c.contactEyebrow}
            </p>
            <h2 className="mt-3 max-w-3xl break-words text-3xl font-semibold leading-tight text-portfolio-ink sm:text-4xl">
              {c.contactTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-portfolio-muted">{c.contactBody}</p>
            <p className="mt-5 flex max-w-2xl gap-2 text-sm leading-6 text-portfolio-muted">
              <Globe2 className="mt-0.5 size-4 shrink-0 text-portfolio-accent" aria-hidden />
              <span>{c.contactNotice}</span>
            </p>
          </div>
          <PortfolioButton
            href={publicContactUrl}
            external
            icon={<ArrowUpRight className="size-4" aria-hidden />}
            className="w-full sm:w-auto"
          >
            {c.contactAction}
          </PortfolioButton>
        </div>
      </div>
    </PortfolioSection>
  )
}
