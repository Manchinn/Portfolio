'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowRight, BriefcaseBusiness, CalendarClock, CheckCircle2, Mail, MessageSquareText, WalletCards } from 'lucide-react'
import { profileCommon } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'

const workCopy = {
  en: {
    eyebrow: 'Work With Me',
    title: 'Start with the problem, then scope the system.',
    intro:
      'Use this short brief to describe the workflow you want to improve. It opens a prepared email draft, so no project details are stored on this site.',
    back: 'Back home',
    send: 'Create email draft',
    preview: 'Email preview',
    ready: 'Brief ready',
    incomplete: 'Add a little more detail before creating the draft',
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
  },
  th: {
    eyebrow: 'Work With Me',
    title: 'เริ่มจากปัญหา แล้วค่อย scope ระบบให้ชัด',
    intro:
      'กรอก brief สั้นๆ เพื่อบอก workflow ที่อยากปรับปรุง หน้านี้จะเปิด email draft ให้ส่งเอง จึงไม่มีการเก็บรายละเอียดโปรเจกต์บนเว็บ',
    back: 'กลับหน้าหลัก',
    send: 'สร้าง Email Draft',
    preview: 'ตัวอย่าง Email',
    ready: 'Brief พร้อมส่ง',
    incomplete: 'เพิ่มรายละเอียดอีกนิดก่อนสร้าง draft',
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
  },
}

const minDetailLength = 30

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
    <main className="min-h-screen bg-neo-cream text-black">
      <section className="border-b-4 border-black bg-neo-mint">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link href="/#home" className="inline-flex items-center border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px]">
            {copy.back}
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 border-2 border-black bg-black px-4 py-2 font-black uppercase text-white shadow-neo">
                <BriefcaseBusiness size={20} />
                {copy.eyebrow}
              </div>
              <h1 className="max-w-4xl text-4xl font-black uppercase leading-tight sm:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-bold leading-8 sm:text-xl">
                {copy.intro}
              </p>
            </div>

            <div className="border-4 border-black bg-white p-5 shadow-neo-lg">
              <div className="grid gap-3">
                {copy.notes.map((note) => (
                  <div key={note} className="border-2 border-black bg-neo-lemon px-4 py-3 font-black">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
        <form onSubmit={handleSubmit} className="border-4 border-black bg-white shadow-neo-lg">
          <div className="border-b-4 border-black bg-neo-sky px-5 py-4">
            <h2 className="text-2xl font-black uppercase">Project Brief</h2>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2">
            <div className={`sm:col-span-2 border-2 border-black p-4 font-black ${isReady ? 'bg-neo-mint' : 'bg-neo-lemon'}`}>
              <div className="flex items-center gap-3">
                {isReady ? <CheckCircle2 className="text-green-700" size={22} /> : <AlertCircle className="text-amber-700" size={22} />}
                <p className="uppercase">{isReady ? copy.ready : copy.incomplete}</p>
              </div>
              {submitted && !isReady && (
                <ul className="mt-3 grid gap-2 font-mono text-sm normal-case text-gray-800 sm:grid-cols-2">
                  {validationErrors.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              )}
            </div>

            <label className="block font-black uppercase">
              {copy.name}
              <input
                required
                value={form.name}
                onChange={(event) => updateForm('name', event.target.value)}
                placeholder={copy.placeholders.name}
                className="mt-2 w-full border-2 border-black p-3 font-mono text-sm normal-case outline-none focus:shadow-neo-sm"
              />
            </label>

            <label className="block font-black uppercase">
              {copy.email}
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => updateForm('email', event.target.value)}
                placeholder={copy.placeholders.email}
                className="mt-2 w-full border-2 border-black p-3 font-mono text-sm normal-case outline-none focus:shadow-neo-sm"
              />
            </label>

            <label className="block font-black uppercase">
              <span className="inline-flex items-center gap-2"><MessageSquareText size={18} /> {copy.projectType}</span>
              <select
                value={form.projectType}
                onChange={(event) => updateForm('projectType', event.target.value)}
                className="mt-2 w-full border-2 border-black bg-white p-3 font-mono text-sm normal-case outline-none focus:shadow-neo-sm"
              >
                {copy.projectTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="block font-black uppercase">
              <span className="inline-flex items-center gap-2"><WalletCards size={18} /> {copy.budget}</span>
              <select
                value={form.budget}
                onChange={(event) => updateForm('budget', event.target.value)}
                className="mt-2 w-full border-2 border-black bg-white p-3 font-mono text-sm normal-case outline-none focus:shadow-neo-sm"
              >
                {copy.budgets.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="block font-black uppercase sm:col-span-2">
              <span className="inline-flex items-center gap-2"><CalendarClock size={18} /> {copy.timeline}</span>
              <select
                value={form.timeline}
                onChange={(event) => updateForm('timeline', event.target.value)}
                className="mt-2 w-full border-2 border-black bg-white p-3 font-mono text-sm normal-case outline-none focus:shadow-neo-sm"
              >
                {copy.timelines.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="block font-black uppercase sm:col-span-2">
              {copy.problem}
              <textarea
                required
                minLength={minDetailLength}
                value={form.problem}
                onChange={(event) => updateForm('problem', event.target.value)}
                placeholder={copy.placeholders.problem}
                rows={5}
                className="mt-2 w-full resize-none border-2 border-black p-3 font-mono text-sm normal-case outline-none focus:shadow-neo-sm"
              />
              <span className="mt-2 block font-mono text-xs normal-case text-gray-600">
                {form.problem.trim().length}/{minDetailLength}
              </span>
            </label>

            <label className="block font-black uppercase sm:col-span-2">
              {copy.goal}
              <textarea
                required
                minLength={minDetailLength}
                value={form.goal}
                onChange={(event) => updateForm('goal', event.target.value)}
                placeholder={copy.placeholders.goal}
                rows={4}
                className="mt-2 w-full resize-none border-2 border-black p-3 font-mono text-sm normal-case outline-none focus:shadow-neo-sm"
              />
              <span className="mt-2 block font-mono text-xs normal-case text-gray-600">
                {form.goal.trim().length}/{minDetailLength}
              </span>
            </label>

            <button
              type="submit"
              disabled={!isReady}
              className="inline-flex items-center justify-center border-2 border-black bg-black px-6 py-4 text-base font-black uppercase text-white shadow-neo transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-200 disabled:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0 sm:col-span-2"
            >
              <Mail className="mr-2 h-5 w-5" />
              {copy.send}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>

        <aside className="border-4 border-black bg-[#111827] text-white shadow-neo-lg">
          <div className="border-b-4 border-black bg-black px-5 py-4">
            <h2 className="text-2xl font-black uppercase">{copy.preview}</h2>
          </div>
          <pre className="whitespace-pre-wrap p-5 font-mono text-sm leading-7 text-gray-200">
            {emailBody}
          </pre>
        </aside>
      </section>
    </main>
  )
}
