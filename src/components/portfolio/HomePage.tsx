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
import { getHomeCopy, type HomeCopy } from '@/content/home'
import { useTranslation } from '@/i18n/useTranslation'
import { MotionCard, StaggerContainer } from '@/components/motion/MotionPrimitives'
import { PortfolioButton, PortfolioHeader, PortfolioSection } from './primitives'
import { cn } from '@/lib/utils'

/**
 * Homepage — Split Studio fingerprint (soft-pixel skin).
 * Hallmark · macrostructure: Split Studio · design-system: DESIGN.md
 * Proof panels carry hard borders; secondary lists stay line-only.
 */
export function HomePage() {
  const { language } = useTranslation()
  const lang = language as Language
  const c = getHomeCopy(lang)
  const selectedProjects = projects[lang]

  return (
    <main className="min-h-dvh overflow-x-clip bg-portfolio-bg text-portfolio-ink">
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
    <section id="home" className="relative border-b-2 border-portfolio-ink/15">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 pt-16 pb-16 sm:px-6 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-14 lg:px-8 lg:pt-24 lg:pb-24">
        <StaggerContainer delayChildren={0.04} staggerChildren={0.06} className="min-w-0">
          <MotionCard>
            <h1 className="max-w-[18ch] text-balance break-words text-4xl font-semibold leading-[1.06] text-portfolio-ink sm:text-6xl lg:text-[4.25rem]">
              {c.heroTitle}
            </h1>
          </MotionCard>
          <MotionCard>
            <p className="mt-6 max-w-xl break-words text-lg leading-8 text-portfolio-muted text-pretty">
              {c.heroBody}
            </p>
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
          </MotionCard>
        </StaggerContainer>

        {/* Proof panel — hard soft-pixel frame (workbench side) */}
        <aside
          aria-label={c.heroEyebrow}
          className="min-w-0 rounded-portfolio-md border-2 border-portfolio-ink bg-portfolio-surface p-5 shadow-portfolio-md sm:p-6"
        >
          <p className="font-[family-name:var(--font-pixel)] text-[10px] font-normal uppercase tracking-wide text-portfolio-accent sm:text-[11px]">
            {c.heroEyebrow}
          </p>
          <dl className="mt-5 divide-y-2 divide-portfolio-ink/10 border-t-2 border-portfolio-ink/15">
            {c.proofItems.map((item) => (
              <div key={item.label} className="min-w-0 py-4 first:pt-4">
                <dt className="text-sm font-semibold text-portfolio-ink">{item.label}</dt>
                <dd className="mt-1.5 text-sm leading-6 text-portfolio-muted text-pretty">{item.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  )
}

function SelectedWork({ c, projects: selectedProjects }: { c: HomeCopy; projects: Project[] }) {
  const [featuredProject, ...supportingProjects] = selectedProjects

  return (
    <PortfolioSection id="work" wide>
      <PortfolioHeader title={c.selectedTitle} subtitle={c.selectedSubtitle} align="split" />

      {featuredProject && (
        <div className="mt-12">
          <ProjectWorkbench project={featuredProject} c={c} />
        </div>
      )}

      {supportingProjects.length > 0 && (
        <ul className="mt-8 grid gap-4 border-t-2 border-portfolio-ink/15 pt-8 sm:grid-cols-2">
          {supportingProjects.map((project) => (
            <li key={project.id} className="min-w-0">
              <ProjectSupportCard project={project} c={c} />
            </li>
          ))}
        </ul>
      )}
    </PortfolioSection>
  )
}

function ProjectWorkbench({ project, c }: { project: Project; c: HomeCopy }) {
  const caseStudyRows = project.caseStudy
    ? [
        { label: c.problem, value: project.caseStudy.problem },
        { label: c.built, value: project.caseStudy.built },
        { label: c.result, value: project.caseStudy.result },
      ]
    : []

  return (
    <article className="overflow-hidden rounded-portfolio-md border-2 border-portfolio-ink bg-portfolio-surface shadow-portfolio-md">
      <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="min-w-0 border-b-2 border-portfolio-ink/15 p-6 sm:p-8 lg:border-r-2 lg:border-b-0">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-mono text-xs font-medium text-portfolio-muted">{project.date}</p>
            <p className="font-[family-name:var(--font-pixel)] text-[10px] font-normal uppercase tracking-wide text-portfolio-accent">
              {project.category}
            </p>
          </div>
          <h3 className="mt-4 break-words text-3xl font-semibold leading-tight text-portfolio-ink sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-xl text-base leading-7 text-portfolio-muted text-pretty sm:text-lg sm:leading-8">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-portfolio-sm border-2 border-portfolio-ink/15 bg-portfolio-surface-soft px-2.5 py-1 font-mono text-[11px] font-medium text-portfolio-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-8 font-[family-name:var(--font-pixel)] text-[10px] font-normal uppercase tracking-wide text-portfolio-muted">
            {c.proofLabel}
          </p>
        </div>

        <div className="min-w-0 bg-portfolio-bg/40 p-6 sm:p-8">
          {caseStudyRows.length > 0 ? (
            <ol className="grid gap-0">
              {caseStudyRows.map((row, index) => (
                <li
                  key={row.label}
                  className={cn(
                    'grid min-w-0 gap-2 border-portfolio-ink/10 py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-5',
                    index > 0 && 'border-t-2',
                  )}
                >
                  <span className="font-mono text-xs font-semibold tabular-nums text-portfolio-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-portfolio-ink">{row.label}</p>
                    <p className="mt-1.5 break-words text-sm leading-6 text-portfolio-muted text-pretty">
                      {row.value}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-portfolio-muted">{project.description}</p>
          )}
        </div>
      </div>
    </article>
  )
}

function ProjectSupportCard({ project, c }: { project: Project; c: HomeCopy }) {
  return (
    <article className="flex h-full min-w-0 flex-col border-2 border-portfolio-ink/15 bg-portfolio-surface p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-[family-name:var(--font-pixel)] text-[10px] font-normal uppercase tracking-wide text-portfolio-accent">
          {project.category}
        </p>
        <span className="font-mono text-xs text-portfolio-muted">{project.date}</span>
      </div>
      <h3 className="mt-3 break-words text-xl font-semibold leading-tight text-portfolio-ink">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-portfolio-muted text-pretty">{project.description}</p>
      {project.caseStudy?.result && (
        <p className="mt-4 border-t-2 border-portfolio-ink/10 pt-4 text-sm leading-6 text-portfolio-ink text-pretty">
          <span className="font-semibold">{c.result}: </span>
          {project.caseStudy.result}
        </p>
      )}
    </article>
  )
}

function CapabilitiesSection({ c }: { c: HomeCopy }) {
  return (
    <PortfolioSection id="stack" className="border-y-2 border-portfolio-ink/15 bg-portfolio-surface-soft/40">
      <PortfolioHeader title={c.capabilitiesTitle} subtitle={c.capabilitiesSubtitle} align="split" />
      <ol className="mt-12 divide-y-2 divide-portfolio-ink/10 border-y-2 border-portfolio-ink/15">
        {c.capabilityCards.map((card, index) => (
          <li
            key={card.title}
            className="grid min-w-0 gap-3 py-6 sm:grid-cols-[3.5rem_minmax(0,12rem)_minmax(0,1fr)] sm:items-baseline sm:gap-6 lg:grid-cols-[3.5rem_minmax(0,16rem)_minmax(0,1fr)]"
          >
            <span className="font-mono text-xs font-semibold tabular-nums text-portfolio-accent">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-lg font-semibold leading-snug text-portfolio-ink sm:text-xl">{card.title}</h3>
            <p className="max-w-2xl text-base leading-7 text-portfolio-muted text-pretty">{card.statement}</p>
          </li>
        ))}
      </ol>
    </PortfolioSection>
  )
}

function ArticlesSection({ c }: { c: HomeCopy }) {
  const { language } = useTranslation()
  const lang = language as Language
  const langArticles = articles[lang] ?? []

  if (langArticles.length === 0) return null

  return (
    <PortfolioSection id="articles" compact>
      <PortfolioHeader title={c.articlesTitle} subtitle={c.articlesSubtitle} align="split" />
      <div className="mt-10 divide-y-2 divide-portfolio-ink/10 border-y-2 border-portfolio-ink/15">
        {langArticles.map((article, index) => (
          <article
            key={article.id}
            className="grid gap-4 py-6 lg:grid-cols-[3rem_minmax(0,1fr)_auto] lg:items-center lg:gap-6"
          >
            <span className="hidden font-mono text-xs font-semibold tabular-nums text-portfolio-line-strong lg:block">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-xs text-portfolio-muted">{article.readTime}</span>
                <span className="text-xs font-medium text-portfolio-accent">{article.category}</span>
              </div>
              <h3 className="mt-2 break-words text-2xl font-semibold leading-tight text-portfolio-ink">
                {article.title}
              </h3>
              <p className="mt-2 max-w-2xl text-base leading-7 text-portfolio-muted text-pretty">{article.excerpt}</p>
            </div>
            <Link
              href={`/article/${article.slug}`}
              className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-portfolio-sm text-sm font-semibold text-portfolio-accent-strong hover:text-portfolio-accent"
            >
              {c.readArticle}
              <ArrowRight className="size-4 shrink-0" aria-hidden />
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
      <div className="grid gap-8 border-2 border-portfolio-ink bg-portfolio-surface px-5 py-10 shadow-portfolio-md sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12 lg:px-10">
        <div className="min-w-0">
          <h2 className="max-w-3xl break-words text-3xl font-semibold leading-tight text-portfolio-ink sm:text-4xl">
            {c.contactTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-portfolio-muted text-pretty">{c.contactBody}</p>
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
    </PortfolioSection>
  )
}
