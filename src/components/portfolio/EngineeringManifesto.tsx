'use client'

import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'
import { Section, SectionHeader } from './_shared'
import { copy } from './copy'

export function EngineeringManifesto() {
  const { language } = useTranslation()
  const c = copy[language as Language].manifesto

  return (
    <Section id="manifesto" className="py-24 sm:py-28">
      <SectionHeader eyebrow={c.eyebrow} index="// 07" title={c.title} subtitle={c.subtitle} />

      <div className="console-stagger mt-16 grid gap-px overflow-hidden rounded-md border border-console-line bg-console-line sm:grid-cols-2">
        {c.principles.map((p) => (
          <article
            key={p.key}
            className="group relative bg-console-panel p-8 transition hover:bg-console-panel-2 sm:p-10"
          >
            <span className="pointer-events-none absolute right-6 top-6 console-mono text-[11px] uppercase tracking-[0.22em] text-console-text-mute">
              {p.key}
            </span>
            <h3 className="max-w-[18ch] text-balance text-2xl font-medium leading-tight tracking-tight text-console-text sm:text-[26px]">
              {p.title}
            </h3>
            <div className="mt-6 h-px w-12 bg-console-accent transition-all duration-500 group-hover:w-24 group-hover:bg-console-cyan" />
            <p className="mt-6 max-w-prose text-base leading-relaxed text-console-text-2">{p.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
