'use client'

import Link from 'next/link'
import { ArrowUpRight, FlaskConical, Sparkles } from 'lucide-react'
import { articles, projects } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'
import { Section, SectionHeader } from './_shared'
import { copy } from './copy'

export function LabShowcase() {
  const { language } = useTranslation()
  const lang = language as Language
  const c = copy[lang].lab
  const notes = articles[lang].filter((a) => a.featured).slice(0, 3)
  const demos = projects[lang].slice(0, 4)

  return (
    <Section id="lab" className="py-24 sm:py-28">
      <SectionHeader eyebrow={c.eyebrow} index="// 09" title={c.title} subtitle={c.subtitle} align="split" />

      <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="console-reveal">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-console-accent" />
              <p className="console-mono text-[11px] uppercase tracking-[0.22em] text-console-text-mute">
                {c.notesLabel}
              </p>
            </div>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-md border border-console-line bg-console-line">
            {notes.map((article, i) => (
              <li key={article.id}>
                <Link
                  href={`/article/${article.slug}`}
                  className="group flex items-center justify-between gap-6 bg-console-panel px-6 py-6 transition hover:bg-console-panel-2 sm:px-7"
                >
                  <div className="min-w-0 flex-1">
                    <p className="console-mono text-[10.5px] uppercase tracking-[0.22em] text-console-text-mute">
                      LOG · {String(i + 1).padStart(2, '0')} · {article.date}
                    </p>
                    <h3 className="mt-3 truncate text-base font-medium text-console-text transition group-hover:text-console-cyan sm:text-lg">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-console-text-2">
                      {article.excerpt}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-console-text-mute transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-console-text" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="console-reveal" style={{ animationDelay: '120ms' }}>
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-console-accent" />
            <p className="console-mono text-[11px] uppercase tracking-[0.22em] text-console-text-mute">
              {c.demoLabel}
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-md border border-console-line bg-console-line sm:grid-cols-2">
            {demos.map((d, i) => (
              <li key={d.id}>
                <Link
                  href={d.demo}
                  className="group flex h-full flex-col justify-between gap-6 bg-console-panel p-6 transition hover:bg-console-panel-2"
                >
                  <div>
                    <p className="console-mono text-[10.5px] uppercase tracking-[0.22em] text-console-text-mute">
                      DEMO · {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-3 text-base font-medium text-console-text transition group-hover:text-console-cyan">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-console-text-2">{d.category}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-console-text-2 transition group-hover:text-console-text">
                    {c.viewAll}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
