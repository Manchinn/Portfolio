'use client'

import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'
import { Section, SectionHeader } from './_shared'
import { copy } from './copy'

export function BuildWorkflow() {
  const { language } = useTranslation()
  const c = copy[language as Language].workflow

  return (
    <Section id="workflow" className="py-24 sm:py-28">
      <SectionHeader eyebrow={c.eyebrow} index="// 05" title={c.title} subtitle={c.subtitle} />

      <div className="relative mt-16">
        <div className="pointer-events-none absolute left-[27px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-transparent via-console-line-strong to-transparent lg:block" aria-hidden />

        <ol className="console-stagger space-y-px overflow-hidden rounded-md border border-console-line bg-console-line">
          {c.steps.map((step, index) => (
            <li key={step.phase} className="relative bg-console-panel transition hover:bg-console-panel-2">
              <div className="grid gap-6 px-6 py-7 sm:px-8 sm:py-8 lg:grid-cols-[200px_1fr_auto] lg:items-start lg:gap-10">
                <div className="flex items-center gap-4">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-console-line-strong bg-console-bg">
                    <span className="console-mono text-sm font-medium text-console-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="pointer-events-none absolute inset-0 rounded-md border border-console-accent/30" />
                  </div>
                  <span className="console-mono text-[10.5px] uppercase tracking-[0.22em] text-console-text-mute">
                    {step.phase.split('·')[1]?.trim() ?? step.phase}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium tracking-tight text-console-text sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-console-text-2">{step.body}</p>
                </div>
                <div className="hidden items-center lg:flex">
                  <span className="console-mono text-[10.5px] uppercase tracking-[0.22em] text-console-text-mute">
                    {index < c.steps.length - 1 ? '↓ next' : '◆ loop'}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
