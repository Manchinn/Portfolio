'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Activity,
  ArrowRight,
  Bell,
  Bot,
  CheckCircle2,
  Database,
  FileText,
  Gauge,
  LayoutDashboard,
  LockKeyhole,
  MessageCircle,
  Network,
  Search,
  ShieldCheck,
  Terminal,
  Workflow,
} from 'lucide-react'

type Metric = {
  label: string
  value: string
  note: string
}

type Step = {
  label: string
  detail: string
}

type TableRow = {
  cells: string[]
}

type ConsoleLine = {
  command: string
  response: string
}

type AssistantQuestion = {
  question: string
  answer: string
}

type DemoDetailShellProps = {
  eyebrow: string
  title: string
  description: string
  accent: 'blue' | 'emerald' | 'violet' | 'amber'
  icon: 'message' | 'terminal' | 'vault' | 'dashboard'
  status: string
  safetyNote: string
  metrics: Metric[]
  workflow: Step[]
  proof: Step[]
  safeguards: string[]
  consoleLines?: ConsoleLine[]
  assistantQuestions?: AssistantQuestion[]
  table?: {
    columns: string[]
    rows: TableRow[]
  }
  cta: {
    label: string
    href: string
  }
}

const accentStyles = {
  blue: {
    bg: 'bg-blue-700',
    soft: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    glow: 'shadow-[0_18px_50px_rgba(37,99,235,0.12)]',
  },
  emerald: {
    bg: 'bg-emerald-700',
    soft: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    glow: 'shadow-[0_18px_50px_rgba(5,150,105,0.12)]',
  },
  violet: {
    bg: 'bg-violet-700',
    soft: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'border-violet-200',
    glow: 'shadow-[0_18px_50px_rgba(109,40,217,0.12)]',
  },
  amber: {
    bg: 'bg-amber-500',
    soft: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    glow: 'shadow-[0_18px_50px_rgba(245,158,11,0.16)]',
  },
}

const iconMap = {
  message: MessageCircle,
  terminal: Terminal,
  vault: Database,
  dashboard: LayoutDashboard,
}

function PanelHeader({ title, badge }: { title: string; badge?: string }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-slate-950"></span>
        <h2 className="truncate text-[11px] font-black uppercase tracking-[0.18em] text-slate-800">{title}</h2>
      </div>
      {badge && (
        <span className="border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
          {badge}
        </span>
      )}
    </div>
  )
}

export default function DemoDetailShell({
  eyebrow,
  title,
  description,
  accent,
  icon,
  status,
  safetyNote,
  metrics,
  workflow,
  proof,
  safeguards,
  consoleLines,
  assistantQuestions,
  table,
  cta,
}: DemoDetailShellProps) {
  const styles = accentStyles[accent]
  const Icon = iconMap[icon]
  const [question, setQuestion] = useState(assistantQuestions?.[0]?.question ?? '')
  const answer = useMemo(() => {
    if (!assistantQuestions?.length) return ''
    return assistantQuestions.find((item) => item.question === question)?.answer ?? assistantQuestions[0].answer
  }, [assistantQuestions, question])

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <div className="mx-auto grid max-w-[1800px] gap-5 px-4 py-5 lg:px-6">
        <section className={`motion-enter border border-slate-200 bg-white p-6 ${styles.glow} sm:p-8`}>
          <div className="grid gap-8 xl:grid-cols-[1.28fr_0.82fr] xl:items-end">
            <div>
              <Link href="/demos" className="motion-card inline-flex items-center border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-slate-600 transition hover:border-slate-300 hover:bg-white">
                Back to demos
              </Link>
              <div className="mt-8">
                <PanelHeader title={eyebrow} badge="Public-safe detail" />
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
                  <div className={`flex h-16 w-16 shrink-0 items-center justify-center ${styles.bg} text-white`}>
                    <Icon size={34} />
                  </div>
                  <h1 className="max-w-5xl text-4xl font-black leading-none tracking-tight text-slate-950 sm:text-6xl">
                    {title}
                  </h1>
                </div>
                <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
                  {description}
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              <div className={`border ${styles.border} ${styles.soft} p-5`}>
                <div className="flex items-center gap-3">
                  <ShieldCheck className={styles.text} size={28} />
                  <p className="font-black uppercase text-slate-950">{status}</p>
                </div>
                <p className="mt-3 font-mono text-sm leading-6 text-slate-600">{safetyNote}</p>
              </div>
              <div className="motion-stagger grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                {metrics.map((metric) => (
                  <div key={metric.label} className="motion-card border border-slate-200 bg-white p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">{metric.label}</p>
                    <p className="mt-1 text-2xl font-black text-slate-950">{metric.value}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">{metric.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.72fr_1.55fr]">
          <aside className="grid gap-5">
            <div className="border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <PanelHeader title="Workflow Map" badge="steps" />
              <div className="motion-stagger space-y-3">
                {workflow.map((step, index) => (
                  <article key={step.label} className="motion-card border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center ${styles.bg} text-xs font-black text-white`}>
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-black uppercase text-slate-950">{step.label}</h3>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{step.detail}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <PanelHeader title="Safety Boundary" badge="sanitized" />
              <div className="motion-stagger grid gap-3">
                {safeguards.map((item) => (
                  <div key={item} className="motion-card flex gap-3 border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-600">
                    <LockKeyhole className={`h-5 w-5 shrink-0 ${styles.text}`} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="grid gap-5">
            <section className="motion-enter border border-slate-200 bg-[#111827] p-5 text-white shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
              <PanelHeader title="Live-Looking Operator Surface" badge="mock mode" />

              {consoleLines && (
                <div className="motion-stagger space-y-5 font-mono text-sm">
                  {consoleLines.map((line) => (
                    <div key={line.command} className="border-l-2 border-cyan-300 pl-4">
                      <p><span className="text-emerald-300">$</span> {line.command}</p>
                      <p className="mt-2 text-slate-300">{line.response}</p>
                    </div>
                  ))}
                </div>
              )}

              {assistantQuestions && (
                <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
                  <div className="motion-stagger space-y-3">
                    {assistantQuestions.map((item) => (
                      <button
                        key={item.question}
                        type="button"
                        onClick={() => setQuestion(item.question)}
                        className={`motion-card w-full border px-4 py-3 text-left text-sm font-black transition ${
                          question === item.question
                            ? 'border-white bg-white text-slate-950'
                            : 'border-slate-600 bg-slate-900 text-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {item.question}
                      </button>
                    ))}
                  </div>
                  <div className="border border-slate-700 bg-slate-950 p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <Search className="h-5 w-5 text-cyan-300" />
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-300">Assistant answer</p>
                    </div>
                    <p className="font-mono text-sm leading-7 text-slate-200">{answer}</p>
                  </div>
                </div>
              )}

              {table && (
                <div className="overflow-hidden border border-slate-700 bg-slate-950">
                  <div className="grid bg-slate-900 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-slate-300" style={{ gridTemplateColumns: `repeat(${table.columns.length}, minmax(0, 1fr))` }}>
                    {table.columns.map((column) => <span key={column}>{column}</span>)}
                  </div>
                  {table.rows.map((row, index) => (
                    <div key={index} className="motion-card grid border-t border-slate-700 px-4 py-3 font-mono text-sm text-slate-200" style={{ gridTemplateColumns: `repeat(${table.columns.length}, minmax(0, 1fr))` }}>
                      {row.cells.map((cell) => <span key={cell}>{cell}</span>)}
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <PanelHeader title="Proof Points" />
                <div className="motion-stagger grid gap-3 md:grid-cols-3">
                  {proof.map((item) => (
                    <article key={item.label} className="motion-card border border-slate-200 bg-slate-50 p-4">
                      <Gauge className={`mb-3 h-5 w-5 ${styles.text}`} />
                      <h3 className="text-sm font-black uppercase text-slate-950">{item.label}</h3>
                      <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{item.detail}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className={`border ${styles.border} ${styles.soft} p-6`}>
                <PanelHeader title="Next Action" badge="brief" />
                <div className="motion-stagger grid gap-3">
                  {[Workflow, Activity, Bell, FileText, Network, Bot].map((ActionIcon, index) => (
                    <div key={index} className="motion-card flex items-center gap-3 border border-white/70 bg-white p-3 text-sm font-bold text-slate-700">
                      <ActionIcon className={`h-5 w-5 ${styles.text}`} />
                      {['Map workflow', 'Define state', 'Set alerts', 'Shape report', 'Plan integration', 'Build assistant'][index]}
                    </div>
                  ))}
                </div>
                <Link href={cta.href} className={`motion-card mt-5 inline-flex w-full items-center justify-center ${styles.bg} px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:opacity-90`}>
                  {cta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}
