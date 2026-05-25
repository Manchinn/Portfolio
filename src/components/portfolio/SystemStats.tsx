'use client'

import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'
import { Section, Eyebrow } from './_shared'
import { copy } from './copy'

export function SystemStats() {
  const { language } = useTranslation()
  const c = copy[language as Language].stats

  return (
    <Section id="stats" className="py-24 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="console-reveal max-w-md">
          <Eyebrow label={c.eyebrow} index="// 02" />
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight text-console-text sm:text-4xl">
            {c.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-console-text-2">{c.subtitle}</p>
        </div>

        <div className="console-stagger grid gap-px overflow-hidden rounded-md border border-console-line bg-console-line sm:grid-cols-3">
          {c.items.map((item) => (
            <div
              key={item.label}
              className="group bg-console-panel p-7 transition hover:bg-console-panel-2"
            >
              <p className="console-mono text-[10.5px] uppercase tracking-[0.22em] text-console-text-mute">
                {item.label}
              </p>
              <p className="mt-6 text-5xl font-medium tracking-tight text-console-text sm:text-6xl">
                {item.value}
              </p>
              <div className="mt-5 h-px bg-gradient-to-r from-console-accent/60 to-transparent transition-all duration-500 group-hover:from-console-cyan" />
              <p className="mt-5 text-sm leading-relaxed text-console-text-2">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
