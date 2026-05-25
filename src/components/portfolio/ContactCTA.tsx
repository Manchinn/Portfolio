'use client'

import { ArrowUpRight, Github, Linkedin, Mail, Phone, ShieldCheck } from 'lucide-react'
import { profile, profileCommon, socials } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'
import { Section, SectionHeader } from './_shared'
import { copy } from './copy'

export function ContactCTA() {
  const { language } = useTranslation()
  const lang = language as Language
  const c = copy[lang].contact
  const data = { ...profile[lang], ...profileCommon }
  const github = socials.find((s) => s.name === 'GitHub')?.url ?? '#'
  const linkedin = socials.find((s) => s.name === 'LinkedIn')?.url ?? '#'

  const channels = [
    { icon: Github, label: 'GitHub', value: 'Manchinn', href: github, external: true },
    { icon: Linkedin, label: 'LinkedIn', value: 'chinnakrit-sripan', href: linkedin, external: true },
    { icon: Phone, label: 'Phone', value: data.phone, href: `tel:${data.phone.replace(/\s/g, '')}` },
  ]

  return (
    <Section id="contact" className="py-28 sm:py-32">
      <SectionHeader eyebrow={c.eyebrow} index="// 10" title={c.title} subtitle={c.subtitle} />

      <div className="mt-16 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <a
          href={`mailto:${data.email}`}
          className="console-reveal group relative flex flex-col justify-between gap-12 overflow-hidden rounded-md border border-console-accent/50 bg-gradient-to-br from-console-accent/15 via-console-panel to-console-panel p-8 transition hover:border-console-accent sm:p-12"
        >
          <div className="console-contact-glow pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative">
            <p className="console-mono text-[11px] uppercase tracking-[0.22em] text-console-cyan">
              {c.primary}
            </p>
            <p className="mt-6 text-balance text-3xl font-medium leading-tight tracking-tight text-console-text sm:text-4xl">
              {data.email}
            </p>
          </div>
          <div className="relative flex items-end justify-between gap-6">
            <p className="console-mono text-[11px] uppercase tracking-[0.22em] text-console-text-mute">
              {c.response}
            </p>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-console-accent/60 bg-console-bg/60 text-console-text transition group-hover:border-console-cyan group-hover:text-console-cyan">
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </a>

        <div className="console-reveal" style={{ animationDelay: '120ms' }}>
          <div className="mb-4 flex items-center gap-2">
            <Mail className="h-4 w-4 text-console-accent" />
            <p className="console-mono text-[11px] uppercase tracking-[0.22em] text-console-text-mute">
              {c.channels}
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-md border border-console-line bg-console-line">
            {channels.map((ch) => {
              const Icon = ch.icon
              return (
                <li key={ch.label}>
                  <a
                    href={ch.href}
                    {...(ch.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="group flex items-center justify-between gap-4 bg-console-panel px-6 py-5 transition hover:bg-console-panel-2"
                  >
                    <div className="flex items-center gap-4">
                      <Icon className="h-4 w-4 text-console-text-mute transition group-hover:text-console-accent" />
                      <div>
                        <p className="console-mono text-[10.5px] uppercase tracking-[0.22em] text-console-text-mute">
                          {ch.label}
                        </p>
                        <p className="mt-1 text-sm font-medium text-console-text">{ch.value}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-console-text-mute transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-console-text" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="console-reveal mt-16 flex flex-col gap-3 border-t border-console-line pt-8 text-xs leading-relaxed text-console-text-mute sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-console-accent" />
          {c.legal}
        </p>
        <p className="console-mono uppercase tracking-[0.22em]">© {new Date().getFullYear()} · Chinnakrit Sripan</p>
      </div>
    </Section>
  )
}
