'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Database,
  Gauge,
  Grid3X3,
  LayoutDashboard,
  LockKeyhole,
  MessageCircle,
  Network,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
} from 'lucide-react'
import { projects } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'

const demoCopy = {
  en: {
    eyebrow: 'Demo Control Center',
    title: 'Public-safe proof for real workflow systems.',
    intro:
      'Each demo is a sanitized operating surface: enough workflow, state, and result to evaluate the system thinking without exposing private data or infrastructure.',
    back: 'Back to system profile',
    open: 'Open demo',
    brief: 'Start a brief',
    proofLabel: 'Proof model',
    statusLabel: 'Demo status',
    scopeLabel: 'Public scope',
    footerLabel: 'Next operator action',
    footerTitle: 'Turn one of these workflows into a scoped build.',
    stats: [
      { label: 'Demo modules', value: '4' },
      { label: 'Private data', value: '0' },
      { label: 'Proof mode', value: 'Sanitized' },
    ],
    proofItems: [
      'workflow path',
      'operator surface',
      'mock outputs',
      'safety boundary',
    ],
    statusItems: [
      'Static pages only',
      'Mock records and sample notes',
      'No live private endpoints',
    ],
    controlLabels: {
      workflow: 'Workflow',
      built: 'Built',
      result: 'Result',
      status: 'Live demo',
    },
  },
  th: {
    eyebrow: 'Demo Control Center',
    title: 'Public-safe proof สำหรับ workflow systems จริง',
    intro:
      'แต่ละ demo เป็น operating surface ที่ sanitize แล้ว โชว์ workflow, state และผลลัพธ์พอให้ประเมินแนวคิดของระบบ โดยไม่เปิด private data หรือ infrastructure',
    back: 'กลับหน้า System Profile',
    open: 'เปิด Demo',
    brief: 'เริ่ม Brief',
    proofLabel: 'Proof model',
    statusLabel: 'Demo status',
    scopeLabel: 'Public scope',
    footerLabel: 'Next operator action',
    footerTitle: 'เลือก workflow แล้ว scope เป็นงาน build จริง',
    stats: [
      { label: 'Demo modules', value: '4' },
      { label: 'Private data', value: '0' },
      { label: 'Proof mode', value: 'Sanitized' },
    ],
    proofItems: [
      'workflow path',
      'operator surface',
      'mock outputs',
      'safety boundary',
    ],
    statusItems: [
      'Static pages only',
      'Mock records and sample notes',
      'No live private endpoints',
    ],
    controlLabels: {
      workflow: 'Workflow',
      built: 'Built',
      result: 'Result',
      status: 'Live demo',
    },
  },
}

const demoIcons = [MessageCircle, Terminal, Bot, LayoutDashboard]
const statIcons = [Grid3X3, LockKeyhole, ShieldCheck]
const proofIcons = [Workflow, Gauge, Database, Network]

function PanelHeader({ title, badge }: { title: string; badge?: string }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600"></span>
        <h2 className="truncate text-[11px] font-black uppercase tracking-[0.18em] text-slate-900">{title}</h2>
      </div>
      {badge && (
        <span className="rounded-sm border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-blue-700">
          {badge}
        </span>
      )}
    </div>
  )
}

export default function DemosPage() {
  const { language } = useTranslation()
  const lang = language as Language
  const copy = demoCopy[lang]
  const demoProjects = projects[lang].filter((project) => project.demo)

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <div className="mx-auto grid max-w-[1800px] gap-5 px-4 py-5 lg:px-6">
        <section className="rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="grid gap-8 xl:grid-cols-[1.35fr_0.9fr] xl:items-end">
            <div>
              <Link href="/#home" className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                {copy.back}
              </Link>
              <div className="mt-8">
                <PanelHeader title={copy.eyebrow} badge={copy.scopeLabel} />
                <h1 className="max-w-5xl text-4xl font-black leading-none tracking-tight text-slate-950 sm:text-6xl">
                  {copy.title}
                </h1>
                <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
                  {copy.intro}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              {copy.stats.map((stat, index) => {
                const Icon = statIcons[index]
                return (
                  <div key={stat.label} className="flex items-center gap-4 rounded-md border border-slate-200 bg-slate-50 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white text-blue-700">
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">{stat.label}</p>
                      <p className="mt-1 text-xl font-black text-slate-950">{stat.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[0.72fr_1.55fr]">
          <aside className="grid gap-5">
            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <PanelHeader title={copy.proofLabel} />
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {copy.proofItems.map((item, index) => {
                  const Icon = proofIcons[index]
                  return (
                    <div key={item} className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
                      <Icon className="h-5 w-5 shrink-0 text-blue-700" />
                      <span className="text-sm font-black text-slate-700">{item}</span>
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <PanelHeader title={copy.statusLabel} />
              <div className="space-y-3">
                {copy.statusItems.map((item) => (
                  <div key={item} className="flex gap-3 rounded-md border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-600">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </aside>

          <section className="grid gap-5 md:grid-cols-2">
            {demoProjects.map((project, index) => {
              const Icon = demoIcons[index] ?? Bot

              return (
                <article key={project.id} className="rounded-md border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-700">{project.category}</p>
                      <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950">{project.title}</h2>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                      <Icon size={26} />
                    </div>
                  </div>

                  <p className="mt-4 min-h-14 text-sm font-semibold leading-7 text-slate-600">{project.description}</p>

                  {project.caseStudy && (
                    <div className="mt-5 grid gap-3">
                      <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">{copy.controlLabels.workflow}</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{project.caseStudy.problem}</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-md border border-slate-200 bg-white p-4">
                          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">{copy.controlLabels.built}</p>
                          <p className="mt-2 line-clamp-3 text-xs font-semibold leading-5 text-slate-600">{project.caseStudy.built}</p>
                        </div>
                        <div className="rounded-md border border-slate-200 bg-white p-4">
                          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">{copy.controlLabels.result}</p>
                          <p className="mt-2 line-clamp-3 text-xs font-semibold leading-5 text-slate-600">{project.caseStudy.result}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-slate-600">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      {copy.controlLabels.status}
                    </span>
                    <Link href={project.demo} className="inline-flex items-center justify-center rounded-md bg-blue-700 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-blue-800">
                      {copy.open}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </section>
        </div>

        <section className="rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-blue-700" />
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">{copy.footerLabel}</p>
              </div>
              <h2 className="max-w-3xl text-2xl font-black leading-tight text-slate-950">{copy.footerTitle}</h2>
            </div>
            <Link href="/work-with-me" className="inline-flex items-center justify-center rounded-md bg-blue-700 px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-blue-800">
              {copy.brief}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
