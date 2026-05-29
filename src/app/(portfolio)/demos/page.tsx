'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Database,
  Eye,
  Gauge,
  Grid3X3,
  LayoutDashboard,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Terminal,
  Workflow,
} from 'lucide-react'
import { SaasButton, SaasCard, SaasHeader, SaasSection } from '@/components/portfolio-saas/_shared'
import { projects } from '@/data/portfolio'
import type { Language } from '@/data/types'
import { useTranslation } from '@/i18n/useTranslation'

const demoCopy = {
  en: {
    eyebrow: 'Demo Gallery',
    title: 'Public-safe demos that prove the workflow, not just the screen.',
    intro:
      'Compare sanitized product surfaces that show how messy operations become scoped prompts, working UI, validation paths, and handoff-ready systems.',
    back: 'Back to portfolio',
    open: 'Open demo',
    brief: 'Start a workflow brief',
    browseLabel: 'Proof hub',
    browseTitle: 'Choose the proof surface that matches the problem you care about.',
    browseIntro:
      'Each card uses existing portfolio project data and keeps private records, real customer details, and internal infrastructure out of the public surface.',
    proofLabel: 'Proof signals',
    statusLabel: 'Public-safe boundary',
    cardLabels: {
      problem: 'Problem',
      built: 'Build',
      result: 'Result',
      scope: 'Scope',
      proof: 'Workflow proof',
      status: 'Public demo',
    },
    stats: [
      { label: 'Demo surfaces', value: '6' },
      { label: 'Private data', value: '0' },
      { label: 'Proof mode', value: 'Sanitized' },
    ],
    proofItems: [
      'Problem-to-build framing',
      'Responsive product surfaces',
      'Mock records and sample states',
      'Safe handoff-friendly evidence',
    ],
    statusItems: [
      'Static or frontend-only public demos',
      'Fictional, sanitized, or sample records only',
      'No credentials, private URLs, or internal route behavior',
    ],
    footerLabel: 'Next step',
    footerTitle: 'Have a workflow that should become a public-safe demo or production tool?',
    footerIntro:
      'Send the problem, constraints, and expected outcome. I will turn it into a scoped build plan with a safe first surface.',
  },
  th: {
    eyebrow: 'Demo Gallery',
    title: 'Public-safe demos ที่พิสูจน์ workflow ไม่ใช่แค่หน้าจอ',
    intro:
      'ดูตัวอย่าง product surface ที่ sanitize แล้ว โชว์การเปลี่ยนงานที่ยุ่งให้เป็น scoped prompt, working UI, validation path และระบบที่ส่งต่อได้',
    back: 'กลับหน้า Portfolio',
    open: 'เปิด Demo',
    brief: 'เริ่ม Workflow Brief',
    browseLabel: 'Proof hub',
    browseTitle: 'เลือก proof surface ที่ตรงกับปัญหาที่อยากดู',
    browseIntro:
      'แต่ละ card ใช้ project data เดิมใน portfolio และไม่เปิด private records, ข้อมูลลูกค้าจริง หรือ internal infrastructure บน public surface',
    proofLabel: 'Proof signals',
    statusLabel: 'Public-safe boundary',
    cardLabels: {
      problem: 'Problem',
      built: 'Build',
      result: 'Result',
      scope: 'Scope',
      proof: 'Workflow proof',
      status: 'Public demo',
    },
    stats: [
      { label: 'Demo surfaces', value: '6' },
      { label: 'Private data', value: '0' },
      { label: 'Proof mode', value: 'Sanitized' },
    ],
    proofItems: [
      'Frame จาก problem ไป build',
      'Product surface ที่ responsive',
      'Mock records และ sample states',
      'หลักฐานที่ safe และส่งต่องานได้',
    ],
    statusItems: [
      'Static หรือ frontend-only public demos',
      'ใช้ข้อมูล fictional, sanitized หรือ sample records เท่านั้น',
      'ไม่มี credentials, private URLs หรือ internal route behavior',
    ],
    footerLabel: 'Next step',
    footerTitle: 'มี workflow ที่ควรทำเป็น public-safe demo หรือ production tool ไหม?',
    footerIntro:
      'ส่ง problem, constraints และ outcome ที่ต้องการ แล้วผมจะช่วย scope เป็น build plan พร้อม safe first surface',
  },
}

const demoIcons = [MessageCircle, Terminal, Bot, LayoutDashboard, ShoppingBag, Sparkles]
const statIcons = [Grid3X3, LockKeyhole, ShieldCheck]
const proofIcons = [Workflow, Gauge, Database, Eye]
const cardTones = ['mint', 'cream', 'lilac', 'coral', 'default', 'mint'] as const

export default function DemosPage() {
  const { language } = useTranslation()
  const lang = language as Language
  const copy = demoCopy[lang]
  const demoProjects = projects[lang].filter((project) => Boolean(project.demo))

  return (
    <main className="min-h-screen overflow-x-hidden bg-saas-bg text-saas-ink">
      <SaasSection className="overflow-hidden pb-14 pt-14 sm:pb-18 sm:pt-18 lg:pb-20 lg:pt-20" wide>
        <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_20%_15%,rgba(223,247,232,0.95),transparent_32%),radial-gradient(circle_at_78%_12%,rgba(255,244,214,0.88),transparent_30%)]" />
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.65fr)] lg:items-end">
          <div className="min-w-0">
            <SaasButton href="/#home" variant="secondary" className="mb-10">
              {copy.back}
            </SaasButton>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-green">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-full text-balance break-words text-4xl font-black leading-[0.98] text-saas-ink sm:max-w-5xl sm:text-6xl lg:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-full break-words text-base leading-8 text-saas-muted sm:max-w-3xl sm:text-lg">{copy.intro}</p>
          </div>

          <SaasCard className="grid gap-3 p-4" tone="default">
            {copy.stats.map((stat, index) => {
              const Icon = statIcons[index]
              return (
                <div key={stat.label} className="flex items-center gap-4 rounded-[12px] border border-saas-line bg-saas-surface-soft p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-saas-green shadow-saas-sm">
                    <Icon size={21} />
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-saas-muted">{stat.label}</p>
                    <p className="mt-1 text-2xl font-black text-saas-ink">{stat.value}</p>
                  </div>
                </div>
              )
            })}
          </SaasCard>
        </div>
      </SaasSection>

      <SaasSection className="pt-8" wide>
        <SaasHeader eyebrow={copy.browseLabel} title={copy.browseTitle} subtitle={copy.browseIntro} align="split" />

        <div className="mt-12 grid min-w-0 gap-5 lg:grid-cols-[minmax(280px,0.45fr)_minmax(0,1fr)]">
          <aside className="grid min-w-0 content-start gap-5">
            <SaasCard tone="mint">
              <h2 className="text-sm font-black uppercase tracking-[0.14em] text-saas-green">{copy.proofLabel}</h2>
              <div className="mt-5 grid gap-3">
                {copy.proofItems.map((item, index) => {
                  const Icon = proofIcons[index]
                  return (
                    <div key={item} className="flex items-start gap-3 rounded-[12px] bg-white/70 p-3 text-sm font-bold leading-6 text-saas-ink">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-saas-green" />
                      <span>{item}</span>
                    </div>
                  )
                })}
              </div>
            </SaasCard>

            <SaasCard>
              <h2 className="text-sm font-black uppercase tracking-[0.14em] text-saas-muted">{copy.statusLabel}</h2>
              <div className="mt-5 grid gap-3">
                {copy.statusItems.map((item) => (
                  <div key={item} className="flex gap-3 text-sm font-semibold leading-6 text-saas-muted">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-saas-green" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </SaasCard>
          </aside>

          <section className="grid min-w-0 gap-5 md:grid-cols-2">
            {demoProjects.map((project, index) => {
              const Icon = demoIcons[index] ?? Bot
              const tone = cardTones[index % cardTones.length]

              return (
                <SaasCard key={project.id} tone={tone} hover className="flex min-h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-saas-green">{project.category}</p>
                      <h2 className="mt-3 text-2xl font-black leading-tight text-saas-ink">{project.title}</h2>
                    </div>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/80 text-saas-green shadow-saas-sm">
                      <Icon size={24} />
                    </span>
                  </div>

                  <p className="mt-4 text-sm font-semibold leading-7 text-saas-muted">{project.description}</p>

                  {project.caseStudy && (
                    <div className="mt-6 grid gap-3">
                      <ProofBlock label={copy.cardLabels.problem} value={project.caseStudy.problem} featured />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <ProofBlock label={copy.cardLabels.built} value={project.caseStudy.built} />
                        <ProofBlock label={copy.cardLabels.result} value={project.caseStudy.result} />
                      </div>
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-black text-saas-muted">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[12px] border border-white/70 bg-white/65 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-saas-muted">{copy.cardLabels.proof}</p>
                    <div className="mt-3 grid gap-2">
                      {project.highlights.slice(0, 2).map((highlight) => (
                        <div key={highlight} className="flex gap-2 text-sm font-semibold leading-6 text-saas-muted">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-saas-green" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-saas-green">
                      <span className="h-2 w-2 rounded-full bg-saas-green" />
                      {copy.cardLabels.status}
                    </span>
                    <Link
                      href={project.demo}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-saas-green px-5 py-3 text-sm font-black text-white shadow-saas-sm transition hover:bg-saas-green-strong focus-visible:shadow-saas-focus"
                    >
                      {copy.open}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </SaasCard>
              )
            })}
          </section>
        </div>
      </SaasSection>

      <SaasSection className="pt-4" wide>
        <SaasCard tone="dark" className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-coral">{copy.footerLabel}</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-white">{copy.footerTitle}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">{copy.footerIntro}</p>
          </div>
          <SaasButton href="/work-with-me" variant="primary" icon={<ArrowRight className="h-4 w-4" />} className="bg-white text-saas-ink hover:bg-saas-cream">
            {copy.brief}
          </SaasButton>
        </SaasCard>
      </SaasSection>
    </main>
  )
}

function ProofBlock({ label, value, featured = false }: { label: string; value: string; featured?: boolean }) {
  return (
    <div className={`rounded-[12px] border border-white/70 bg-white/70 p-4 ${featured ? '' : 'min-h-[132px]'}`}>
      <p className="text-xs font-black uppercase tracking-[0.14em] text-saas-muted">{label}</p>
      <p className={`mt-2 font-semibold leading-6 text-saas-ink ${featured ? 'text-sm' : 'line-clamp-4 text-xs'}`}>{value}</p>
    </div>
  )
}
