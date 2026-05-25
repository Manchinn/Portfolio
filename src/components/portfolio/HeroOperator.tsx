'use client'

import Link from 'next/link'
import { ArrowUpRight, Cpu } from 'lucide-react'
import { profile, profileCommon } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'
import { copy } from './copy'

export function HeroOperator() {
  const { language } = useTranslation()
  const lang = language as Language
  const c = copy[lang].hero
  const data = { ...profile[lang], ...profileCommon }

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-24 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-32"
    >
      <div className="console-grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-console-accent/60 to-transparent" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1320px] px-6 sm:px-8 lg:px-12">
        <div className="console-reveal flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="console-status-dot" />
            <span className="console-mono text-[11px] uppercase tracking-[0.22em] text-console-text-2">
              {c.eyebrow}
            </span>
          </div>
          <div className="hidden items-center gap-3 console-mono text-[11px] uppercase tracking-[0.22em] text-console-text-mute sm:flex">
            <span>node/01</span>
            <span className="h-px w-6 bg-console-line-strong" />
            <span>{c.location}</span>
          </div>
        </div>

        <h1
          className="console-reveal mt-12 max-w-[16ch] text-balance text-[clamp(2.75rem,7.5vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em] text-console-text"
          style={{ animationDelay: '120ms' }}
        >
          {data.name}
        </h1>

        <p
          className="console-reveal mt-8 max-w-2xl text-lg leading-relaxed text-console-text-2 sm:text-xl"
          style={{ animationDelay: '220ms' }}
        >
          {data.title}
        </p>
        <p
          className="console-reveal mt-6 max-w-2xl text-base leading-relaxed text-console-text-mute sm:text-[17px]"
          style={{ animationDelay: '300ms' }}
        >
          {data.bio}
        </p>

        <div
          className="console-reveal mt-12 flex flex-wrap items-center gap-4"
          style={{ animationDelay: '400ms' }}
        >
          <a
            href={`mailto:${data.email}`}
            className="group inline-flex items-center gap-3 rounded-md border border-console-accent/50 bg-console-accent/10 px-5 py-3 text-sm font-medium text-console-text transition hover:border-console-accent hover:bg-console-accent/20"
          >
            <span>{c.primaryCta}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <Link
            href="#systems"
            className="group inline-flex items-center gap-3 rounded-md border border-console-line bg-console-panel/60 px-5 py-3 text-sm font-medium text-console-text-2 transition hover:border-console-line-strong hover:text-console-text"
          >
            <Cpu className="h-4 w-4 text-console-accent" />
            <span>{c.secondaryCta}</span>
          </Link>
        </div>

        <div
          className="console-reveal mt-20 grid gap-px overflow-hidden rounded-md border border-console-line bg-console-line sm:grid-cols-3"
          style={{ animationDelay: '520ms' }}
        >
          <StatusCell label={c.statusLabel} value={c.status} mono>
            <span className="console-status-dot" />
          </StatusCell>
          <StatusCell label={c.locationLabel} value={data.location} />
          <StatusCell label={c.modeLabel}>
            <div className="flex flex-wrap gap-1.5">
              {c.commandModes.map((mode) => (
                <span
                  key={mode}
                  className="console-mono rounded-sm border border-console-line-strong bg-console-panel-3 px-2 py-0.5 text-[10.5px] uppercase tracking-[0.16em] text-console-text-2"
                >
                  {mode}
                </span>
              ))}
            </div>
          </StatusCell>
        </div>
      </div>
    </section>
  )
}

function StatusCell({
  label,
  value,
  mono,
  children,
}: {
  label: string
  value?: string
  mono?: boolean
  children?: React.ReactNode
}) {
  return (
    <div className="bg-console-panel p-6 sm:p-7">
      <p className="console-mono text-[10.5px] uppercase tracking-[0.22em] text-console-text-mute">{label}</p>
      <div className="mt-3 flex items-center gap-3">
        {children}
        {value && (
          <p className={`text-sm font-medium text-console-text ${mono ? 'console-mono text-[13px]' : ''}`}>
            {value}
          </p>
        )}
      </div>
    </div>
  )
}
