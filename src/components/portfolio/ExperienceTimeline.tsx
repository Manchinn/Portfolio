'use client'

import { experiences } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'
import { Section, SectionHeader } from './_shared'
import { copy } from './copy'

export function ExperienceTimeline() {
  const { language } = useTranslation()
  const lang = language as Language
  const c = copy[lang].timeline
  const data = experiences[lang]

  return (
    <Section id="timeline" className="py-24 sm:py-28">
      <SectionHeader eyebrow={c.eyebrow} index="// 08" title={c.title} subtitle={c.subtitle} />

      <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-console-line bg-console-line">
        {data.map((item, index) => (
          <article
            key={item.id}
            className="grid gap-6 bg-console-panel p-7 transition hover:bg-console-panel-2 sm:p-9 lg:grid-cols-[220px_1fr]"
          >
            <div className="flex items-start gap-4">
              <div className="console-mono flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-console-line-strong bg-console-bg text-[11px] uppercase tracking-[0.18em] text-console-accent">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="space-y-1">
                <p className="console-mono text-[11px] uppercase tracking-[0.22em] text-console-text-mute">
                  {item.year}
                </p>
                <p className="text-sm text-console-text-2">{item.company}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium tracking-tight text-console-text sm:text-2xl">
                {item.position}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-console-text-2 sm:text-base">
                {item.description}
              </p>
              {item.achievements && item.achievements.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {item.achievements.map((a) => (
                    <li
                      key={a}
                      className="flex gap-3 text-sm leading-relaxed text-console-text-2"
                    >
                      <span className="mt-2 h-px w-3 shrink-0 bg-console-accent" aria-hidden />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
