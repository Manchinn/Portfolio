'use client'

import { BrainCircuit, Code2, Gauge, Network, ServerCog, Workflow } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'
import { Section, SectionHeader } from './_shared'
import { copy } from './copy'

const icons = [Network, Workflow, ServerCog, BrainCircuit, Code2, Gauge]

const items = {
  en: [
    { title: 'AI assistant workflows', body: 'Messaging assistants, prompt flows, knowledge context, and operator handoff.' },
    { title: 'Internal tools', body: 'Admin dashboards, review flows, content tools, and daily operating surfaces.' },
    { title: 'DevOps automation', body: 'Health checks, alerts, reports, event logs, and deployment-ready runbooks.' },
    { title: 'Knowledge systems', body: 'Sanitized read-only exports, RAG-style patterns, and wiki retrieval flows.' },
    { title: 'Full-stack systems', body: 'Next.js apps, route handlers, storage, auth-aware pages, and deployment.' },
    { title: 'Process optimization', body: 'Map manual workflows, reduce friction, and turn repeated work into systems.' },
  ],
  th: [
    { title: 'AI assistant workflows', body: 'Assistant ผ่าน messaging, prompt flows, knowledge context และ handoff สำหรับ operator' },
    { title: 'Internal tools', body: 'Admin dashboards, review flows, content tools และหน้าจอสำหรับงานประจำ' },
    { title: 'DevOps automation', body: 'Health checks, alerts, reports, event logs และ runbooks ที่พร้อมใช้กับ deployment' },
    { title: 'Knowledge systems', body: 'Sanitized read-only exports, RAG-style patterns และ wiki retrieval flows' },
    { title: 'Full-stack systems', body: 'Next.js apps, route handlers, storage, auth-aware pages และ deployment' },
    { title: 'Process optimization', body: 'Map workflow manual, ลด friction และเปลี่ยนงานซ้ำให้เป็นระบบ' },
  ],
}

export function CapabilityGrid() {
  const { language } = useTranslation()
  const lang = language as Language
  const c = copy[lang].capability
  const data = items[lang]

  return (
    <Section id="systems" className="py-24 sm:py-28">
      <SectionHeader eyebrow={c.eyebrow} index="// 03" title={c.title} subtitle={c.subtitle} />

      <div className="console-stagger mt-16 grid gap-px overflow-hidden rounded-md border border-console-line bg-console-line sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => {
          const Icon = icons[index]
          return (
            <article
              key={item.title}
              className="group relative bg-console-panel p-7 transition hover:bg-console-panel-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-md border border-console-line-strong bg-console-panel-2 text-console-accent transition group-hover:border-console-accent group-hover:text-console-cyan">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <span className="console-mono text-[10.5px] uppercase tracking-[0.22em] text-console-text-mute">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-7 text-lg font-medium tracking-tight text-console-text">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-console-text-2">{item.body}</p>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
