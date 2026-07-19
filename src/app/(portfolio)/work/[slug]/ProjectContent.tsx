'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, ListFilter } from 'lucide-react'
import { projects } from '@/data/portfolio'
import type { Language } from '@/data/types'
import { getSharedChrome } from '@/content/shared'
import { useTranslation } from '@/i18n/useTranslation'

const copy = {
  en: {
    back: 'Back to selected work',
    proof: 'Sanitized workflow proof',
    delivery: 'Delivery signals',
    stack: 'Implementation stack',
    demoEyebrow: 'Interactive proof demo',
    demoTitle: 'Review a fictional activity queue.',
    demoBody: 'This public-safe demo uses fictional records to show queue scanning and status filtering. It contains no live student data.',
    filterLabel: 'Filter activity records',
    all: 'All',
    records: 'records shown',
    record: 'Record',
    activity: 'Activity',
    status: 'Status',
    updated: 'Updated',
    statuses: { submitted: 'Submitted', review: 'In review', approved: 'Approved' },
    contactTitle: 'Need a similar workflow shaped into a maintainable application?',
  },
  th: {
    back: 'กลับไปผลงานที่เลือกไว้',
    proof: 'Workflow proof ที่ผ่านการ sanitize',
    delivery: 'Delivery signals',
    stack: 'Implementation stack',
    demoEyebrow: 'Interactive proof demo',
    demoTitle: 'ทดลองตรวจคิวกิจกรรมด้วยข้อมูลสมมติ',
    demoBody: 'Demo ที่เปิดสาธารณะนี้ใช้ records สมมติเพื่อแสดงการสแกนคิวและกรองสถานะ โดยไม่มีข้อมูลนักศึกษาจริง',
    filterLabel: 'กรอง records กิจกรรม',
    all: 'ทั้งหมด',
    records: 'รายการที่แสดง',
    record: 'รายการ',
    activity: 'กิจกรรม',
    status: 'สถานะ',
    updated: 'อัปเดต',
    statuses: { submitted: 'ส่งแล้ว', review: 'กำลังตรวจ', approved: 'อนุมัติแล้ว' },
    contactTitle: 'ต้องการเปลี่ยน workflow ที่คล้ายกันให้เป็น application ที่ดูแลต่อได้หรือไม่',
  },
}

type DemoStatus = 'submitted' | 'review' | 'approved'
type DemoFilter = 'all' | DemoStatus

const demoRecords: Record<Language, Array<{ id: string; activity: string; status: DemoStatus; updated: string }>> = {
  en: [
    { id: 'ST-104', activity: 'Weekly activity log submitted', status: 'submitted', updated: 'Today, 09:20' },
    { id: 'ST-117', activity: 'Advisor review requested', status: 'review', updated: 'Today, 08:45' },
    { id: 'ST-121', activity: 'Activity evidence approved', status: 'approved', updated: 'Yesterday' },
    { id: 'ST-133', activity: 'Evidence update requested', status: 'review', updated: 'Yesterday' },
  ],
  th: [
    { id: 'ST-104', activity: 'ส่งบันทึกกิจกรรมประจำสัปดาห์แล้ว', status: 'submitted', updated: 'วันนี้ 09:20' },
    { id: 'ST-117', activity: 'ขอให้อาจารย์ตรวจรายการ', status: 'review', updated: 'วันนี้ 08:45' },
    { id: 'ST-121', activity: 'อนุมัติหลักฐานกิจกรรมแล้ว', status: 'approved', updated: 'เมื่อวาน' },
    { id: 'ST-133', activity: 'ขอให้อัปเดตหลักฐาน', status: 'review', updated: 'เมื่อวาน' },
  ],
}

const statusClasses: Record<DemoStatus, string> = {
  submitted: 'border-blue-200 bg-blue-50 text-blue-800',
  review: 'border-amber-200 bg-amber-50 text-amber-800',
  approved: 'border-emerald-200 bg-emerald-50 text-emerald-800',
}

export default function ProjectContent({ slug }: { slug: string }) {
  const { language } = useTranslation()
  const lang = language as Language
  const project = projects[lang].find((item) => item.slug === slug)
  const [filter, setFilter] = useState<DemoFilter>('all')

  if (!project) return null

  const page = copy[lang]
  const shared = getSharedChrome(lang)
  const c = {
    ...page,
    problem: shared.problem,
    built: shared.built,
    result: shared.result,
    createBrief: shared.createBrief,
  }
  const records = demoRecords[lang]
  const visibleRecords = filter === 'all' ? records : records.filter((record) => record.status === filter)
  const filters: Array<{ value: DemoFilter; label: string }> = [
    { value: 'all', label: c.all },
    { value: 'submitted', label: c.statuses.submitted },
    { value: 'review', label: c.statuses.review },
    { value: 'approved', label: c.statuses.approved },
  ]
  const caseStudyRows = [
    { label: c.problem, value: project.caseStudy.problem },
    { label: c.built, value: project.caseStudy.built },
    { label: c.result, value: project.caseStudy.result },
  ]

  return (
    <main className="min-h-dvh bg-portfolio-bg text-portfolio-ink">
      <header className="border-b border-portfolio-line">
        <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Link
            href="/#work"
            className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-portfolio-accent-strong hover:text-portfolio-accent"
          >
            <ArrowLeft className="size-4" />
            {c.back}
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase text-portfolio-accent">{c.proof}</p>
          <div className="mt-4 flex flex-wrap items-baseline gap-4">
            <span className="text-sm font-semibold text-portfolio-muted">{project.category}</span>
            <span className="text-sm text-portfolio-muted">{project.date}</span>
          </div>
          <h1 className="mt-4 max-w-[20ch] break-words text-4xl font-semibold leading-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-portfolio-muted">{project.description}</p>
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <dl className="grid gap-8 lg:grid-cols-3">
          {caseStudyRows.map((row) => (
            <div key={row.label} className="border-t border-portfolio-line pt-6">
              <dt className="text-xs font-semibold uppercase text-portfolio-accent">{row.label}</dt>
              <dd className="mt-3 text-base leading-7 text-portfolio-muted">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-12 border-t border-portfolio-line pt-10 lg:grid-cols-2">
          <section>
            <h2 className="text-2xl font-semibold">{c.delivery}</h2>
            <ul className="mt-6 grid gap-4">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-base leading-7 text-portfolio-muted">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-portfolio-accent" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">{c.stack}</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.tech.map((item) => (
                <span key={item} className="rounded-[6px] border border-portfolio-line bg-portfolio-surface px-3 py-2 text-sm font-medium text-portfolio-muted">
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>

        <section id="demo" className="mt-14 scroll-mt-24 border-y border-portfolio-line py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase text-portfolio-accent">{c.demoEyebrow}</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight">{c.demoTitle}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-portfolio-muted">{c.demoBody}</p>
            </div>
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-portfolio-muted">
                <ListFilter className="size-4" />
                {c.filterLabel}
              </p>
              <div className="inline-flex max-w-full flex-wrap rounded-[6px] border border-portfolio-line bg-portfolio-surface p-1" role="group" aria-label={c.filterLabel}>
                {filters.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    aria-pressed={filter === item.value}
                    onClick={() => setFilter(item.value)}
                    className={`min-h-10 rounded-[4px] px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent ${
                      filter === item.value
                        ? 'bg-portfolio-accent text-white'
                        : 'text-portfolio-muted hover:bg-portfolio-surface-soft hover:text-portfolio-ink'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-8 text-sm font-medium text-portfolio-muted" aria-live="polite">
            {visibleRecords.length} {c.records}
          </p>
          <table className="mt-3 w-full border-y border-portfolio-line text-left">
            <thead className="hidden sm:table-header-group">
              <tr className="border-b border-portfolio-line text-xs font-semibold uppercase text-portfolio-muted">
                <th scope="col" className="w-[90px] py-3 pr-4">{c.record}</th>
                <th scope="col" className="py-3 pr-4">{c.activity}</th>
                <th scope="col" className="w-[130px] py-3 pr-4">{c.status}</th>
                <th scope="col" className="w-[110px] py-3">{c.updated}</th>
              </tr>
            </thead>
            <tbody>
              {visibleRecords.map((record) => (
                <tr key={record.id} className="block border-b border-portfolio-line py-5 last:border-b-0 sm:table-row sm:py-0">
                  <th scope="row" className="block py-1 font-mono text-sm font-semibold text-portfolio-ink sm:table-cell sm:w-[90px] sm:py-5 sm:pr-4">
                    <span className="text-xs font-semibold uppercase text-portfolio-muted sm:hidden">{c.record}: </span>
                    {record.id}
                  </th>
                  <td className="block min-w-0 py-1 sm:table-cell sm:py-5 sm:pr-4">
                    <span className="text-xs font-semibold uppercase text-portfolio-muted sm:hidden">{c.activity}</span>
                    <p className="break-words text-sm font-medium text-portfolio-ink">{record.activity}</p>
                  </td>
                  <td className="block py-1 sm:table-cell sm:w-[130px] sm:py-5 sm:pr-4">
                    <span className="text-xs font-semibold uppercase text-portfolio-muted sm:hidden">{c.status}</span>
                    <span className={`inline-flex rounded-[6px] border px-2.5 py-1 text-xs font-semibold ${statusClasses[record.status]}`}>
                      {c.statuses[record.status]}
                    </span>
                  </td>
                  <td className="block py-1 text-sm text-portfolio-muted sm:table-cell sm:w-[110px] sm:py-5">
                    <span className="text-xs font-semibold uppercase sm:hidden">{c.updated}: </span>
                    {record.updated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="mt-14 grid gap-6 border-y border-portfolio-line py-9 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <h2 className="max-w-2xl text-2xl font-semibold leading-tight">{c.contactTitle}</h2>
          <Link
            href="/work-with-me"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] bg-portfolio-accent px-5 py-3 text-sm font-semibold text-white hover:bg-portfolio-accent-strong"
          >
            {c.createBrief}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
