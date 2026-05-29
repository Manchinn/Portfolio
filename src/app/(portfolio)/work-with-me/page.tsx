'use client'

import { FormEvent, ReactNode, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  LockKeyhole,
  Mail,
  MessageSquareText,
  ShieldCheck,
  WalletCards,
  Workflow,
} from 'lucide-react'
import { profileCommon } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'
import { SaasCard, SaasHeader, SaasSection } from '@/components/portfolio-saas/_shared'

const workCopy = {
  en: {
    eyebrow: 'Workflow intake',
    title: 'Scope one messy workflow into a clear build path.',
    intro:
      'Use this short brief to describe the workflow you want to improve. It opens a prepared email draft, so no project details are stored on this site.',
    back: 'Back to portfolio',
    send: 'Create email draft',
    preview: 'Email draft preview',
    ready: 'Brief ready',
    incomplete: 'Add a little more detail before creating the draft',
    briefTitle: 'Project brief',
    safetyTitle: 'Safe intake model',
    processTitle: 'How the scoping flow works',
    intakeTitle: 'Brief status',
    name: 'Name',
    email: 'Email',
    projectType: 'Project type',
    budget: 'Budget range',
    timeline: 'Timeline',
    problem: 'Problem or workflow',
    goal: 'What should be true after this works?',
    placeholders: {
      name: 'Your name',
      email: 'your.email@example.com',
      problem: 'What is slow, manual, risky, or hard to track right now?',
      goal: 'Example: operators can check status, trigger actions, and get reports from one place.',
    },
    projectTypes: ['AI Assistant', 'Internal Tool', 'Full-stack App', 'DevOps Automation'],
    budgets: ['Under $500', '$500 - $1,500', '$1,500 - $3,000', '$3,000+'],
    timelines: ['This week', '2-4 weeks', '1-2 months', 'Exploring'],
    notes: [
      'Do not submit secrets, credentials, private URLs, or internal operational details.',
      'No backend storage is used for this brief.',
      'A prepared email draft opens locally on your device.',
    ],
    validation: {
      name: 'Add your name.',
      email: 'Use a valid email address.',
      problem: 'Describe the current problem in at least 30 characters.',
      goal: 'Describe the desired result in at least 30 characters.',
    },
    steps: [
      {
        title: 'Describe current friction',
        body: 'Share the repeated task, bottleneck, or handoff that should become easier to run.',
      },
      {
        title: 'Choose scope and timing',
        body: 'Pick a rough project shape so the first reply can focus on an achievable slice.',
      },
      {
        title: 'Send a prepared draft',
        body: 'The browser opens your local mail client with a readable brief. Nothing is stored here.',
      },
    ],
  },
  th: {
    eyebrow: 'Workflow intake',
    title: 'เปลี่ยน workflow ที่ยุ่งให้เป็น scope งานที่ชัด',
    intro:
      'กรอก brief สั้นๆ เพื่อบอก workflow ที่อยากปรับปรุง หน้านี้จะเปิด email draft ให้ส่งเอง จึงไม่มีการเก็บรายละเอียดโปรเจกต์บนเว็บ',
    back: 'กลับหน้า portfolio',
    send: 'สร้าง Email Draft',
    preview: 'ตัวอย่าง Email Draft',
    ready: 'Brief พร้อมส่ง',
    incomplete: 'เพิ่มรายละเอียดอีกนิดก่อนสร้าง draft',
    briefTitle: 'Project brief',
    safetyTitle: 'Safe intake model',
    processTitle: 'ขั้นตอนการ scope งาน',
    intakeTitle: 'สถานะ brief',
    name: 'ชื่อ',
    email: 'อีเมล',
    projectType: 'ประเภทงาน',
    budget: 'งบประมาณ',
    timeline: 'ระยะเวลา',
    problem: 'ปัญหาหรือ workflow',
    goal: 'ถ้าระบบนี้สำเร็จ ควรเกิดอะไรขึ้น?',
    placeholders: {
      name: 'ชื่อของคุณ',
      email: 'your.email@example.com',
      problem: 'ตอนนี้งานส่วนไหนช้า manual เสี่ยง หรือ track ยาก?',
      goal: 'เช่น operator เช็ก status, trigger action และดู report ได้จากที่เดียว',
    },
    projectTypes: ['AI Assistant', 'Internal Tool', 'Full-stack App', 'DevOps Automation'],
    budgets: ['ต่ำกว่า $500', '$500 - $1,500', '$1,500 - $3,000', '$3,000+'],
    timelines: ['ภายในสัปดาห์นี้', '2-4 สัปดาห์', '1-2 เดือน', 'กำลังสำรวจ'],
    notes: [
      'ไม่ใส่ secret, credential, private URL หรือรายละเอียด operation ภายใน',
      'หน้านี้ไม่มี backend storage สำหรับเก็บ brief',
      'ระบบจะเปิด email draft ในเครื่องคุณเพื่อให้ตรวจแล้วส่งเอง',
    ],
    validation: {
      name: 'กรอกชื่อก่อน',
      email: 'ใช้อีเมลที่ถูกต้อง',
      problem: 'อธิบายปัญหาปัจจุบันอย่างน้อย 30 ตัวอักษร',
      goal: 'อธิบายผลลัพธ์ที่ต้องการอย่างน้อย 30 ตัวอักษร',
    },
    steps: [
      {
        title: 'เล่า friction ปัจจุบัน',
        body: 'บอกงานซ้ำ bottleneck หรือ handoff ที่ควรทำให้ง่ายขึ้น',
      },
      {
        title: 'เลือก scope และ timing',
        body: 'เลือกประเภทงานคร่าวๆ เพื่อให้คำตอบแรกโฟกัส slice ที่ทำได้จริง',
      },
      {
        title: 'ส่ง draft ที่เตรียมไว้',
        body: 'Browser จะเปิด mail client พร้อม brief ที่อ่านง่าย และเว็บนี้ไม่เก็บข้อมูลไว้',
      },
    ],
  },
}

const minDetailLength = 30

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-saas-muted">{children}</span>
}

const inputClass =
  'w-full rounded-[14px] border border-saas-line bg-saas-surface-soft p-3.5 text-sm font-bold text-saas-ink outline-none transition placeholder:text-saas-muted/65 focus:border-saas-green focus:bg-white focus:shadow-saas-focus'

export default function WorkWithMePage() {
  const { language } = useTranslation()
  const lang = language as Language
  const copy = workCopy[lang]
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: copy.projectTypes[0],
    budget: copy.budgets[1],
    timeline: copy.timelines[1],
    problem: '',
    goal: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const validationErrors = useMemo(() => {
    const errors: string[] = []

    if (!form.name.trim()) errors.push(copy.validation.name)
    if (!isValidEmail(form.email.trim())) errors.push(copy.validation.email)
    if (form.problem.trim().length < minDetailLength) errors.push(copy.validation.problem)
    if (form.goal.trim().length < minDetailLength) errors.push(copy.validation.goal)

    return errors
  }, [copy.validation.email, copy.validation.goal, copy.validation.name, copy.validation.problem, form])

  const isReady = validationErrors.length === 0

  const emailBody = useMemo(() => {
    return [
      `Name: ${form.name || '-'}`,
      `Email: ${form.email || '-'}`,
      `Project type: ${form.projectType}`,
      `Budget: ${form.budget}`,
      `Timeline: ${form.timeline}`,
      '',
      'Problem / workflow:',
      form.problem || '-',
      '',
      'Desired result:',
      form.goal || '-',
    ].join('\n')
  }, [form])

  const mailtoHref = `mailto:${profileCommon.email}?subject=${encodeURIComponent(`Project brief: ${form.projectType}`)}&body=${encodeURIComponent(emailBody)}`

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    if (!isReady) return

    window.location.href = mailtoHref
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-saas-bg text-saas-ink">
      <section className="relative overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-saas-mint/70 to-transparent" aria-hidden />
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:px-8 lg:py-20">
          <div className="relative min-w-0">
            <Link
              href="/#home"
              className="inline-flex items-center gap-2 rounded-full border border-saas-line bg-white px-4 py-2 text-sm font-black text-saas-ink shadow-saas-sm transition hover:border-saas-green hover:text-saas-green"
            >
              {copy.back}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-9 text-xs font-black uppercase tracking-[0.16em] text-saas-green">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-full text-balance break-words text-5xl font-black leading-[0.96] text-saas-ink sm:max-w-5xl sm:text-6xl lg:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-full break-words text-lg leading-8 text-saas-muted sm:max-w-2xl">{copy.intro}</p>
          </div>

          <SaasCard tone="dark" className="relative self-end rounded-[24px] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-mint">{copy.safetyTitle}</p>
                <h2 className="mt-4 text-3xl font-black leading-tight text-white">No storage, local draft first.</h2>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-white/10 text-saas-mint">
                <ShieldCheck className="h-7 w-7" />
              </div>
            </div>
            <div className="mt-7 grid gap-3">
              {copy.notes.map((note, index) => {
                const Icon = index === 0 ? LockKeyhole : index === 1 ? ShieldCheck : Mail
                return (
                  <div key={note} className="flex min-w-0 gap-3 rounded-[14px] border border-white/12 bg-white/7 p-4 text-sm font-bold leading-6 text-white/82">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-saas-mint" />
                    <span className="min-w-0 break-words">{note}</span>
                  </div>
                )
              })}
            </div>
          </SaasCard>
        </div>
      </section>

      <SaasSection className="pt-0" wide>
        <div className="grid gap-5 lg:grid-cols-3">
          {copy.steps.map((step, index) => (
            <SaasCard key={step.title} tone={index === 1 ? 'cream' : index === 2 ? 'lilac' : 'mint'}>
              <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-white text-saas-green shadow-saas-sm">
                {index === 0 ? <Workflow className="h-5 w-5" /> : index === 1 ? <WalletCards className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-saas-green">0{index + 1}</p>
              <h2 className="mt-2 text-xl font-black text-saas-ink">{step.title}</h2>
              <p className="mt-3 text-sm leading-7 text-saas-muted">{step.body}</p>
            </SaasCard>
          ))}
        </div>
      </SaasSection>

      <SaasSection className="pt-0">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(330px,0.92fr)]">
          <form onSubmit={handleSubmit} className="rounded-[24px] border border-saas-line bg-white p-5 shadow-saas-md sm:p-8">
            <SaasHeader eyebrow={copy.eyebrow} title={copy.briefTitle} subtitle={copy.intro} />

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <FieldLabel>{copy.name}</FieldLabel>
                <input
                  required
                  value={form.name}
                  onChange={(event) => updateForm('name', event.target.value)}
                  placeholder={copy.placeholders.name}
                  className={inputClass}
                />
              </label>

              <label className="block">
                <FieldLabel>{copy.email}</FieldLabel>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => updateForm('email', event.target.value)}
                  placeholder={copy.placeholders.email}
                  className={inputClass}
                />
              </label>

              <label className="block">
                <FieldLabel>
                  <MessageSquareText className="h-4 w-4" />
                  {copy.projectType}
                </FieldLabel>
                <select value={form.projectType} onChange={(event) => updateForm('projectType', event.target.value)} className={inputClass}>
                  {copy.projectTypes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <FieldLabel>
                  <WalletCards className="h-4 w-4" />
                  {copy.budget}
                </FieldLabel>
                <select value={form.budget} onChange={(event) => updateForm('budget', event.target.value)} className={inputClass}>
                  {copy.budgets.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-2">
                <FieldLabel>
                  <CalendarClock className="h-4 w-4" />
                  {copy.timeline}
                </FieldLabel>
                <select value={form.timeline} onChange={(event) => updateForm('timeline', event.target.value)} className={inputClass}>
                  {copy.timelines.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-2">
                <FieldLabel>{copy.problem}</FieldLabel>
                <textarea
                  required
                  minLength={minDetailLength}
                  value={form.problem}
                  onChange={(event) => updateForm('problem', event.target.value)}
                  placeholder={copy.placeholders.problem}
                  rows={5}
                  className={`${inputClass} resize-none leading-7`}
                />
                <span className="mt-2 block text-xs font-bold text-saas-muted">
                  {form.problem.trim().length}/{minDetailLength}
                </span>
              </label>

              <label className="block sm:col-span-2">
                <FieldLabel>{copy.goal}</FieldLabel>
                <textarea
                  required
                  minLength={minDetailLength}
                  value={form.goal}
                  onChange={(event) => updateForm('goal', event.target.value)}
                  placeholder={copy.placeholders.goal}
                  rows={4}
                  className={`${inputClass} resize-none leading-7`}
                />
                <span className="mt-2 block text-xs font-bold text-saas-muted">
                  {form.goal.trim().length}/{minDetailLength}
                </span>
              </label>

              <button
                type="submit"
                disabled={!isReady}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-saas-green px-6 py-4 text-sm font-black text-white shadow-saas-sm transition hover:bg-saas-green-strong focus-visible:shadow-saas-focus disabled:cursor-not-allowed disabled:bg-saas-line disabled:text-saas-muted sm:col-span-2"
              >
                <Mail className="h-5 w-5" />
                {copy.send}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>

          <div className="grid gap-5 content-start">
            <SaasCard tone={isReady ? 'mint' : 'cream'} className="rounded-[24px] p-6">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-green">{copy.intakeTitle}</p>
              <div className="mt-5 flex items-start gap-3">
                {isReady ? <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-saas-green" /> : <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-amber-700" />}
                <div>
                  <p className="text-xl font-black leading-tight text-saas-ink">{isReady ? copy.ready : copy.incomplete}</p>
                  {submitted && !isReady && (
                    <ul className="mt-4 grid gap-2 text-sm font-bold leading-6 text-saas-muted">
                      {validationErrors.map((error) => (
                        <li key={error}>- {error}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </SaasCard>

            <aside className="rounded-[24px] border border-saas-ink bg-saas-ink p-5 text-white shadow-saas-md sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-mint">{copy.preview}</p>
                  <p className="mt-2 text-sm font-bold text-white/70">mailto:{profileCommon.email}</p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-white/10 text-saas-mint">
                  <ClipboardList className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-5 rounded-[14px] border border-white/12 bg-white/7 p-3 text-sm font-bold text-white/78">
                {form.projectType} · {form.timeline}
              </div>
              <pre className="mt-4 max-h-[580px] overflow-auto whitespace-pre-wrap rounded-[14px] border border-white/12 bg-black/20 p-4 font-mono text-sm leading-7 text-white/82">
                {emailBody}
              </pre>
            </aside>
          </div>
        </div>
      </SaasSection>
    </main>
  )
}
