'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'
import { Section, SectionHeader, MonoTag } from './_shared'
import { copy } from './copy'

export function FeaturedSystems() {
  const { language } = useTranslation()
  const lang = language as Language
  const c = copy[lang].featured
  const data = projects[lang]

  return (
    <Section id="projects" className="py-24 sm:py-28">
      <SectionHeader eyebrow={c.eyebrow} index="// 04" title={c.title} subtitle={c.subtitle} align="split" />

      <div className="console-stagger mt-16 grid gap-6 md:grid-cols-2">
        {data.map((project, index) => {
          const idx = String(index + 1).padStart(2, '0')
          return (
            <Link
              key={project.id}
              href={project.demo}
              className="group relative overflow-hidden rounded-md border border-console-line bg-console-panel transition hover:border-console-line-strong"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-console-panel-3">
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-console-panel via-console-panel/30 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="console-mono rounded-sm border border-console-line-strong bg-console-bg/80 px-2 py-1 text-[10.5px] uppercase tracking-[0.22em] text-console-text-2 backdrop-blur">
                    SYS · {idx}
                  </span>
                  <MonoTag>{project.category}</MonoTag>
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <h3 className="max-w-[78%] text-balance text-xl font-medium leading-snug text-console-text sm:text-2xl">
                    {project.title}
                  </h3>
                  <span className="console-mono shrink-0 text-[10.5px] uppercase tracking-[0.22em] text-console-text-mute">
                    {project.date}
                  </span>
                </div>
              </div>

              <div className="space-y-5 p-6 sm:p-7">
                <p className="text-sm leading-relaxed text-console-text-2">{project.description}</p>

                {project.caseStudy && (
                  <dl className="space-y-3 border-t border-console-line pt-5">
                    <CaseRow label={c.problem} text={project.caseStudy.problem} />
                    <CaseRow label={c.built} text={project.caseStudy.built} />
                    <CaseRow label={c.result} text={project.caseStudy.result} accent />
                  </dl>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="console-mono text-[10.5px] uppercase tracking-[0.18em] text-console-text-mute"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-console-text transition group-hover:text-console-cyan">
                    {c.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </Section>
  )
}

function CaseRow({ label, text, accent }: { label: string; text: string; accent?: boolean }) {
  return (
    <div className="grid grid-cols-[68px_1fr] items-start gap-4">
      <dt className="console-mono pt-0.5 text-[10px] uppercase tracking-[0.22em] text-console-text-mute">
        {label}
      </dt>
      <dd
        className={`text-sm leading-relaxed ${accent ? 'text-console-text' : 'text-console-text-2'}`}
      >
        {text}
      </dd>
    </div>
  )
}
