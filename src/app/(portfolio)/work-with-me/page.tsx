'use client'

import type { FormEvent, ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Clipboard, ExternalLink, ShieldCheck } from 'lucide-react'
import { publicContactUrl } from '@/data/portfolio'
import type { Language } from '@/data/types'
import { useTranslation } from '@/i18n/useTranslation'

const workCopy = {
  en: {
    eyebrow: 'Workflow intake',
    title: 'Turn the rough idea into a reviewable project brief.',
    intro: 'Describe the workflow, desired result, and constraints. Everything stays in this browser until you choose to open a public GitHub inquiry.',
    back: 'Back to portfolio',
    privacyTitle: 'Local-first brief',
    privacyBody: 'This page has no submission API and stores nothing. Review the generated text before opening the public contact channel.',
    formTitle: 'Project shape',
    projectType: 'Project type',
    timeline: 'Timeline',
    context: 'Current workflow or problem',
    outcome: 'Desired result',
    contextPlaceholder: 'What is slow, unclear, repetitive, or difficult to maintain today?',
    outcomePlaceholder: 'What should the team be able to do when the work is complete?',
    preview: 'Brief preview',
    copy: 'Copy brief',
    copied: 'Brief copied',
    copyFailed: 'Copy failed. Select the preview text and copy it manually.',
    open: 'Open public inquiry',
    incomplete: 'Add at least 30 characters to both detail fields.',
    publicNote: 'GitHub issues are public. Remove secrets, private URLs, personal data, and internal operational details before submitting.',
    issuePrompt: 'Paste the reviewed project brief from your clipboard here. Do not include secrets, private URLs, personal data, or internal operational details.',
    types: {
      application: 'Full-stack application',
      internalTool: 'Internal tool or dashboard',
      interface: 'Product interface',
      delivery: 'Delivery or operations workflow',
    },
    timelines: {
      soon: 'Within 2-4 weeks',
      planned: 'Within 1-2 months',
      exploring: 'Exploring options',
    },
    labels: {
      type: 'Project type',
      timeline: 'Timeline',
      context: 'Current context',
      outcome: 'Desired result',
    },
  },
  th: {
    eyebrow: 'Workflow intake',
    title: 'เปลี่ยนไอเดียคร่าวๆ ให้เป็น project brief ที่ตรวจสอบได้',
    intro: 'อธิบาย workflow, ผลลัพธ์ที่ต้องการ และข้อจำกัด ข้อมูลทั้งหมดอยู่ใน browser จนกว่าคุณจะเลือกเปิด public GitHub inquiry',
    back: 'กลับหน้า Portfolio',
    privacyTitle: 'Local-first brief',
    privacyBody: 'หน้านี้ไม่มี submission API และไม่เก็บข้อมูล ตรวจข้อความที่สร้างขึ้นก่อนเปิด public contact channel',
    formTitle: 'รูปแบบโปรเจกต์',
    projectType: 'ประเภทโปรเจกต์',
    timeline: 'ระยะเวลา',
    context: 'Workflow หรือปัญหาปัจจุบัน',
    outcome: 'ผลลัพธ์ที่ต้องการ',
    contextPlaceholder: 'ตอนนี้ขั้นตอนไหนช้า ไม่ชัด ทำซ้ำ หรือดูแลต่อยาก?',
    outcomePlaceholder: 'เมื่อพัฒนาเสร็จ ทีมควรทำอะไรได้ดีขึ้น?',
    preview: 'ตัวอย่าง Brief',
    copy: 'คัดลอก Brief',
    copied: 'คัดลอก Brief แล้ว',
    copyFailed: 'คัดลอกไม่สำเร็จ เลือกข้อความใน preview แล้วคัดลอกด้วยตนเอง',
    open: 'เปิด Public Inquiry',
    incomplete: 'เพิ่มรายละเอียดอย่างน้อย 30 ตัวอักษรในทั้งสองช่อง',
    publicNote: 'GitHub issues เป็นข้อมูลสาธารณะ ลบ secrets, private URLs, ข้อมูลส่วนบุคคล และรายละเอียด operation ภายในก่อนส่ง',
    issuePrompt: 'วาง project brief ที่ตรวจแล้วจาก clipboard ที่นี่ และอย่าใส่ secrets, private URLs, ข้อมูลส่วนบุคคล หรือรายละเอียด operation ภายใน',
    types: {
      application: 'Full-stack application',
      internalTool: 'Internal tool หรือ dashboard',
      interface: 'Product interface',
      delivery: 'Delivery หรือ operations workflow',
    },
    timelines: {
      soon: 'ภายใน 2-4 สัปดาห์',
      planned: 'ภายใน 1-2 เดือน',
      exploring: 'กำลังสำรวจทางเลือก',
    },
    labels: {
      type: 'ประเภทโปรเจกต์',
      timeline: 'ระยะเวลา',
      context: 'บริบทปัจจุบัน',
      outcome: 'ผลลัพธ์ที่ต้องการ',
    },
  },
}

type ProjectType = keyof typeof workCopy.en.types
type Timeline = keyof typeof workCopy.en.timelines

const minimumDetailLength = 30
const maximumDetailLength = 1200
const inputClass = 'w-full rounded-[6px] border border-saas-line bg-saas-surface px-3 py-3 text-base text-saas-ink transition-colors placeholder:text-saas-muted/70 focus:border-saas-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saas-accent'

function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="mb-2 block text-sm font-semibold text-saas-ink">{children}</span>
}

export default function WorkWithMePage() {
  const { language } = useTranslation()
  const lang = language as Language
  const c = workCopy[lang]
  const [form, setForm] = useState({
    projectType: 'application' as ProjectType,
    timeline: 'planned' as Timeline,
    context: '',
    outcome: '',
  })
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')

  useEffect(() => {
    setCopyState('idle')
  }, [language])

  const isReady = form.context.trim().length >= minimumDetailLength
    && form.outcome.trim().length >= minimumDetailLength

  const brief = useMemo(() => [
    `${c.labels.type}: ${c.types[form.projectType]}`,
    `${c.labels.timeline}: ${c.timelines[form.timeline]}`,
    '',
    `${c.labels.context}:`,
    form.context.trim() || '-',
    '',
    `${c.labels.outcome}:`,
    form.outcome.trim() || '-',
  ].join('\n'), [c, form])

  const issueHref = `${publicContactUrl}?${new URLSearchParams({
    title: `Project inquiry: ${c.types[form.projectType]}`,
    body: c.issuePrompt,
  }).toString()}`

  const updateForm = <K extends keyof typeof form>(field: K, value: typeof form[K]) => {
    setForm((current) => ({ ...current, [field]: value }))
    setCopyState('idle')
  }

  const copyBrief = async () => {
    if (!isReady) return
    try {
      await navigator.clipboard.writeText(brief)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await copyBrief()
  }

  return (
    <main className="min-h-dvh bg-saas-bg text-saas-ink">
      <header className="border-b border-saas-line">
        <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Link
            href="/#home"
            className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-saas-accent-strong hover:text-saas-accent"
          >
            <ArrowLeft className="size-4" />
            {c.back}
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase text-saas-accent">{c.eyebrow}</p>
          <h1 className="mt-5 max-w-[20ch] break-words text-4xl font-semibold leading-tight sm:text-5xl">{c.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-saas-muted">{c.intro}</p>
          <div className="mt-8 flex max-w-3xl gap-3 border-l-2 border-saas-accent pl-4">
            <ShieldCheck className="mt-1 size-5 shrink-0 text-saas-accent" />
            <div>
              <p className="font-semibold text-saas-ink">{c.privacyTitle}</p>
              <p className="mt-1 text-sm leading-6 text-saas-muted">{c.privacyBody}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1100px] gap-8 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)] lg:px-8">
        <form onSubmit={handleSubmit} className="rounded-[8px] border border-saas-line bg-saas-surface p-5 shadow-saas-sm sm:p-7">
          <h2 className="text-2xl font-semibold">{c.formTitle}</h2>
          <div className="mt-7 grid gap-6">
            <label>
              <FieldLabel>{c.projectType}</FieldLabel>
              <select
                value={form.projectType}
                onChange={(event) => updateForm('projectType', event.target.value as ProjectType)}
                className={inputClass}
              >
                {(Object.entries(c.types) as Array<[ProjectType, string]>).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>

            <label>
              <FieldLabel>{c.timeline}</FieldLabel>
              <select
                value={form.timeline}
                onChange={(event) => updateForm('timeline', event.target.value as Timeline)}
                className={inputClass}
              >
                {(Object.entries(c.timelines) as Array<[Timeline, string]>).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>

            <label>
              <FieldLabel>{c.context}</FieldLabel>
              <textarea
                value={form.context}
                onChange={(event) => updateForm('context', event.target.value)}
                placeholder={c.contextPlaceholder}
                rows={6}
                maxLength={maximumDetailLength}
                className={`${inputClass} resize-y leading-7`}
              />
              <span className="mt-2 block text-xs text-saas-muted">{form.context.trim().length}/{maximumDetailLength}</span>
            </label>

            <label>
              <FieldLabel>{c.outcome}</FieldLabel>
              <textarea
                value={form.outcome}
                onChange={(event) => updateForm('outcome', event.target.value)}
                placeholder={c.outcomePlaceholder}
                rows={5}
                maxLength={maximumDetailLength}
                className={`${inputClass} resize-y leading-7`}
              />
              <span className="mt-2 block text-xs text-saas-muted">{form.outcome.trim().length}/{maximumDetailLength}</span>
            </label>

            {!isReady && <p className="text-sm leading-6 text-saas-muted">{c.incomplete}</p>}

            <button
              type="submit"
              disabled={!isReady}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] bg-saas-accent px-5 py-3 text-sm font-semibold text-white hover:bg-saas-accent-strong disabled:cursor-not-allowed disabled:bg-saas-line disabled:text-saas-muted"
            >
              {copyState === 'copied' ? <Check className="size-4" /> : <Clipboard className="size-4" />}
              {copyState === 'copied' ? c.copied : c.copy}
            </button>
            {copyState === 'failed' && <p role="alert" className="text-sm leading-6 text-red-700">{c.copyFailed}</p>}
          </div>
        </form>

        <aside className="min-w-0 rounded-[8px] border border-saas-line bg-saas-surface-soft p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase text-saas-accent">{c.preview}</p>
          <pre className="mt-5 max-h-[520px] overflow-auto whitespace-pre-wrap break-words font-mono text-sm leading-7 text-saas-muted">{brief}</pre>
          <div className="mt-7 border-t border-saas-line pt-6">
            <p className="text-sm leading-6 text-saas-muted">{c.publicNote}</p>
            <a
              href={isReady ? issueHref : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!isReady}
              className={`mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[6px] px-5 py-3 text-sm font-semibold ${
                isReady
                  ? 'border border-saas-accent bg-saas-surface text-saas-accent-strong hover:bg-saas-accent-soft'
                  : 'cursor-not-allowed border border-saas-line text-saas-muted'
              }`}
            >
              {c.open}
              {isReady ? <ExternalLink className="size-4" /> : <ArrowRight className="size-4" />}
            </a>
          </div>
        </aside>
      </section>
    </main>
  )
}
