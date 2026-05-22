'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  ArrowRight,
  BriefcaseBusiness,
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

const workCopy = {
  en: {
    eyebrow: 'Intake Console',
    title: 'Start with the problem, then scope the system.',
    intro:
      'Use this short brief to describe the workflow you want to improve. It opens a prepared email draft, so no project details are stored on this site.',
    back: 'Back to system profile',
    send: 'Create email draft',
    preview: 'Email preview',
    ready: 'Brief ready',
    incomplete: 'Add a little more detail before creating the draft',
    briefTitle: 'Project Brief',
    safetyTitle: 'Safety Rules',
    intakeTitle: 'Intake Status',
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
    notes: ['No secrets in the form', 'No backend storage', 'Email draft opens locally'],
    validation: {
      name: 'Add your name.',
      email: 'Use a valid email address.',
      problem: 'Describe the current problem in at least 30 characters.',
      goal: 'Describe the desired result in at least 30 characters.',
    },
    steps: ['Describe current friction', 'Select scope and timing', 'Send prepared email draft'],
  },
  th: {
    eyebrow: 'Intake Console',
    title: 'เริ่มจากปัญหา แล้วค่อย scope ระบบให้ชัด',
    intro:
      'กรอก brief สั้นๆ เพื่อบอก workflow ที่อยากปรับปรุง หน้านี้จะเปิด email draft ให้ส่งเอง จึงไม่มีการเก็บรายละเอียดโปรเจกต์บนเว็บ',
    back: 'กลับหน้า System Profile',
    send: 'สร้าง Email Draft',
    preview: 'ตัวอย่าง Email',
    ready: 'Brief พร้อมส่ง',
    incomplete: 'เพิ่มรายละเอียดอีกนิดก่อนสร้าง draft',
    briefTitle: 'Project Brief',
    safetyTitle: 'Safety Rules',
    intakeTitle: 'Intake Status',
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
    notes: ['ไม่ใส่ secret ในฟอร์ม', 'ไม่มี backend storage', 'เปิด email draft ในเครื่องคุณ'],
    validation: {
      name: 'กรอกชื่อก่อน',
      email: 'ใช้อีเมลที่ถูกต้อง',
      problem: 'อธิบายปัญหาปัจจุบันอย่างน้อย 30 ตัวอักษร',
      goal: 'อธิบายผลลัพธ์ที่ต้องการอย่างน้อย 30 ตัวอักษร',
    },
    steps: ['อธิบาย friction ปัจจุบัน', 'เลือก scope และ timing', 'ส่ง email draft ที่เตรียมไว้'],
  },
}

const minDetailLength = 30

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

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
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <div className="mx-auto grid max-w-[1800px] gap-5 px-4 py-5 lg:px-6">
        <section className="rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="grid gap-8 xl:grid-cols-[1.35fr_0.85fr] xl:items-end">
            <div>
              <Link href="/#home" className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                {copy.back}
              </Link>
              <div className="mt-8">
                <PanelHeader title={copy.eyebrow} badge={copy.projectType} />
                <h1 className="max-w-5xl text-4xl font-black leading-none tracking-tight text-slate-950 sm:text-6xl">
                  {copy.title}
                </h1>
                <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
                  {copy.intro}
                </p>
              </div>
            </div>

            <aside className="rounded-md border border-slate-200 bg-slate-50 p-5">
              <PanelHeader title={copy.safetyTitle} />
              <div className="grid gap-3">
                {copy.notes.map((note, index) => (
                  <div key={note} className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700">
                    {index === 0 ? <LockKeyhole className="h-5 w-5 text-blue-700" /> : index === 1 ? <ShieldCheck className="h-5 w-5 text-blue-700" /> : <Mail className="h-5 w-5 text-blue-700" />}
                    {note}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.72fr_1.15fr_0.82fr]">
          <aside className="grid gap-5">
            <div className="rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <PanelHeader title={copy.intakeTitle} />
              <div className={`rounded-md border p-4 ${isReady ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}>
                <div className="flex items-center gap-3">
                  {isReady ? <CheckCircle2 className="text-emerald-700" size={22} /> : <AlertCircle className="text-amber-700" size={22} />}
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-slate-800">{isReady ? copy.ready : copy.incomplete}</p>
                </div>
                {submitted && !isReady && (
                  <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
                    {validationErrors.map((error) => (
                      <li key={error}>- {error}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-5 grid gap-3">
                {copy.steps.map((step, index) => (
                  <div key={step} className="flex gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-600">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-[10px] font-black text-white">
                      {index + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <PanelHeader title={copy.briefTitle} badge={isReady ? copy.ready : undefined} />

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                {copy.name}
                <input
                  required
                  value={form.name}
                  onChange={(event) => updateForm('name', event.target.value)}
                  placeholder={copy.placeholders.name}
                  className="mt-2 w-full rounded-md border border-slate-200 bg-slate-50 p-3 font-mono text-sm font-semibold normal-case text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
                />
              </label>

              <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                {copy.email}
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => updateForm('email', event.target.value)}
                  placeholder={copy.placeholders.email}
                  className="mt-2 w-full rounded-md border border-slate-200 bg-slate-50 p-3 font-mono text-sm font-semibold normal-case text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
                />
              </label>

              <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                <span className="inline-flex items-center gap-2"><MessageSquareText size={16} /> {copy.projectType}</span>
                <select
                  value={form.projectType}
                  onChange={(event) => updateForm('projectType', event.target.value)}
                  className="mt-2 w-full rounded-md border border-slate-200 bg-slate-50 p-3 font-mono text-sm font-semibold normal-case text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
                >
                  {copy.projectTypes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                <span className="inline-flex items-center gap-2"><WalletCards size={16} /> {copy.budget}</span>
                <select
                  value={form.budget}
                  onChange={(event) => updateForm('budget', event.target.value)}
                  className="mt-2 w-full rounded-md border border-slate-200 bg-slate-50 p-3 font-mono text-sm font-semibold normal-case text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
                >
                  {copy.budgets.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500 sm:col-span-2">
                <span className="inline-flex items-center gap-2"><CalendarClock size={16} /> {copy.timeline}</span>
                <select
                  value={form.timeline}
                  onChange={(event) => updateForm('timeline', event.target.value)}
                  className="mt-2 w-full rounded-md border border-slate-200 bg-slate-50 p-3 font-mono text-sm font-semibold normal-case text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
                >
                  {copy.timelines.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500 sm:col-span-2">
                {copy.problem}
                <textarea
                  required
                  minLength={minDetailLength}
                  value={form.problem}
                  onChange={(event) => updateForm('problem', event.target.value)}
                  placeholder={copy.placeholders.problem}
                  rows={5}
                  className="mt-2 w-full resize-none rounded-md border border-slate-200 bg-slate-50 p-3 font-mono text-sm font-semibold normal-case text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
                />
                <span className="mt-2 block font-mono text-xs normal-case text-slate-500">
                  {form.problem.trim().length}/{minDetailLength}
                </span>
              </label>

              <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500 sm:col-span-2">
                {copy.goal}
                <textarea
                  required
                  minLength={minDetailLength}
                  value={form.goal}
                  onChange={(event) => updateForm('goal', event.target.value)}
                  placeholder={copy.placeholders.goal}
                  rows={4}
                  className="mt-2 w-full resize-none rounded-md border border-slate-200 bg-slate-50 p-3 font-mono text-sm font-semibold normal-case text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
                />
                <span className="mt-2 block font-mono text-xs normal-case text-slate-500">
                  {form.goal.trim().length}/{minDetailLength}
                </span>
              </label>

              <button
                type="submit"
                disabled={!isReady}
                className="inline-flex items-center justify-center rounded-md bg-blue-700 px-6 py-4 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-slate-100 sm:col-span-2"
              >
                <Mail className="mr-2 h-5 w-5" />
                {copy.send}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </form>

          <aside className="rounded-md border border-slate-200 bg-[#0f172a] p-6 text-white shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
            <PanelHeader title={copy.preview} badge="mailto" />
            <div className="mb-4 flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-3 text-sm font-semibold text-slate-200">
              <ClipboardList className="h-5 w-5 text-blue-300" />
              <span>{form.projectType}</span>
            </div>
            <pre className="max-h-[720px] overflow-auto whitespace-pre-wrap rounded-md border border-white/10 bg-black/20 p-4 font-mono text-sm leading-7 text-slate-200">
              {emailBody}
            </pre>
          </aside>
        </section>
      </div>
    </main>
  )
}
