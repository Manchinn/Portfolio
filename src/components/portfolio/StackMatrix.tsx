'use client'

import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'
import { Section, SectionHeader } from './_shared'
import { copy } from './copy'

export function StackMatrix() {
  const { language } = useTranslation()
  const c = copy[language as Language].stack

  return (
    <Section id="stack" className="py-24 sm:py-28">
      <SectionHeader eyebrow={c.eyebrow} index="// 06" title={c.title} subtitle={c.subtitle} />

      <div className="console-stagger mt-16 grid gap-px overflow-hidden rounded-md border border-console-line bg-console-line lg:grid-cols-3">
        {c.groups.map((group, gi) => (
          <div key={group.heading} className="bg-console-panel p-7">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-console-text">
                {group.heading}
              </h3>
              <span className="console-mono text-[10.5px] uppercase tracking-[0.22em] text-console-text-mute">
                //{String(gi + 1).padStart(2, '0')}
              </span>
            </div>
            <ul className="mt-6 space-y-px">
              {group.items.map((item, idx) => (
                <li
                  key={item}
                  className="group flex items-center justify-between gap-4 border-t border-console-line py-3 first:border-t-0 transition hover:text-console-text"
                >
                  <span className="text-sm text-console-text-2 transition group-hover:text-console-text">
                    {item}
                  </span>
                  <span className="console-mono text-[10px] uppercase tracking-[0.22em] text-console-text-mute opacity-0 transition group-hover:opacity-100">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
