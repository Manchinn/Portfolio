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
  Send,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'
import { profileCommon } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'
import { SaasCard, SaasHeader, SaasSection } from '@/components/portfolio-saas/_shared'

const workCopy = {
  en: {
    eyebrow: 'Project inquiry',
    title: 'Tell me what you want to build next.',
    intro:
      'Use this short contact brief to share the project, prototype, or technical help you are considering. It opens a prepared email draft, so no project details are stored on this site.',
    back: 'Back to portfolio',
    send: 'Create email draft',
    preview: 'Email draft preview',
    ready: 'Inquiry ready',
    incomplete: 'Add a little more detail before creating the draft',
    briefTitle: 'Project inquiry',
    safetyTitle: 'Private by default',
    safetyHeadline: 'No storage, local draft first.',
    processTitle: 'How this contact path works',
    intakeTitle: 'Inquiry status',
    name: 'Name',
    email: 'Email',
    projectType: 'Project type',
    budget: 'Budget range',
    timeline: 'Timeline',
    problem: 'Project context',
    goal: 'What should be true after this works?',
    placeholders: {
      name: 'Your name',
      email: 'your.email@example.com',
      problem: 'What are you trying to build, improve, or clarify?',
      goal: 'Example: a cleaner portfolio page, a demo prototype, an internal tool, or a small automation.',
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
        title: 'Share the project shape',
        body: 'Describe the page, product idea, internal tool, automation, or technical question you want help with.',
      },
      {
        title: 'Choose rough scope',
        body: 'Pick a project type, budget range, and timing so the first reply can focus on a realistic next step.',
      },
      {
        title: 'Send from your email',
        body: 'The browser opens your local mail client with a readable draft. You can review everything before sending.',
      },
    ],
    emailLabels: {
      subject: 'Project inquiry',
      type: 'Project type',
      budget: 'Budget',
      timeline: 'Timeline',
      context: 'Project context',
      result: 'Desired result',
    },
  },
  th: {
    eyebrow: 'Project inquiry',
    title: 'เล่าโปรเจกต์ที่อยากสร้างหรือปรับปรุง',
    intro:
      'กรอก contact brief สั้นๆ เพื่อบอกโปรเจกต์ prototype หรืองานเทคนิคที่อยากให้ช่วย หน้านี้จะเปิด email draft ให้ส่งเอง จึงไม่มีการเก็บรายละเอียดโปรเจกต์บนเว็บ',
    back: 'กลับหน้า portfolio',
    send: 'สร้าง Email Draft',
    preview: 'ตัวอย่าง Email Draft',
    ready: 'Inquiry พร้อมส่ง',
    incomplete: 'เพิ่มรายละเอียดอีกนิดก่อนสร้าง draft',
    briefTitle: 'Project inquiry',
    safetyTitle: 'Private by default',
    safetyHeadline: 'ไม่เก็บข้อมูลบนเว็บ เปิด draft ในเครื่องก่อน',
    processTitle: 'ขั้นตอนการติดต่อ',
    intakeTitle: 'สถานะ inquiry',
    name: 'ชื่อ',
    email: 'อีเมล',
    projectType: 'ประเภทงาน',
    budget: 'งบประมาณ',
    timeline: 'ระยะเวลา',
    problem: 'บริบทโปรเจกต์',
    goal: 'ถ้าระบบนี้สำเร็จ ควรเกิดอะไรขึ้น?',
    placeholders: {
      name: 'ชื่อของคุณ',
      email: 'your.email@example.com',
      problem: 'อยากสร้าง ปรับปรุง หรือเคลียร์เรื่องเทคนิคอะไร?',
      goal: 'เช่น หน้า portfolio ที่ชัดขึ้น, demo prototype, internal tool หรือ automation เล็กๆ',
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
        title: 'เล่ารูปทรงของโปรเจกต์',
        body: 'บอกหน้าเว็บ product idea, internal tool, automation หรือคำถามเทคนิคที่อยากให้ช่วย',
      },
      {
        title: 'เลือก scope คร่าวๆ',
        body: 'เลือกประเภทงาน งบประมาณ และเวลา เพื่อให้คำตอบแรกโฟกัส next step ที่ทำได้จริง',
      },
      {
        title: 'ส่งจากอีเมลของคุณ',
        body: 'Browser จะเปิด mail client พร้อม draft ที่อ่านง่าย คุณตรวจรายละเอียดก่อนส่งได้',
      },
    ],
    emailLabels: {
      subject: 'Project inquiry',
      type: 'ประเภทงาน',
      budget: 'งบประมาณ',
      timeline: 'ระยะเวลา',
      context: 'บริบทโปรเจกต์',
      result: 'ผลลัพธ์ที่ต้องการ',
    },
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
  'w-full rounded-[14px] border border-saas-line bg-saas-surface-soft p-3.5 text-sm font-bold text-saas-ink outline-none transition placeholder:text-saas-muted/65 focus:border-white focus:bg-saas-surface focus:shadow-saas-focus'

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
      `${copy.emailLabels.type}: ${form.projectType}`,
      `${copy.emailLabels.budget}: ${form.budget}`,
      `${copy.emailLabels.timeline}: ${form.timeline}`,
      '',
      `${copy.emailLabels.context}:`,
      form.problem || '-',
      '',
      `${copy.emailLabels.result}:`,
      form.goal || '-',
    ].join('\n')
  }, [copy.emailLabels.budget, copy.emailLabels.context, copy.emailLabels.result, copy.emailLabels.timeline, copy.emailLabels.type, form])

  const mailtoHref = `mailto:${profileCommon.email}?subject=${encodeURIComponent(`${copy.emailLabels.subject}: ${form.projectType}`)}&body=${encodeURIComponent(emailBody)}`

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
    <main className="min-h-screen overflow-x-hidden bg-transparent text-saas-ink">
      <section className="relative overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-saas-line/10 to-transparent" aria-hidden />
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:px-8 lg:py-20">
          <div className="relative min-w-0">
            <Link
              href="/#home"
              className="inline-flex items-center gap-2 rounded-full border border-saas-line bg-saas-surface-soft px-4 py-2 text-sm font-black text-saas-ink shadow-saas-sm transition hover:border-white hover:text-white"
            >
              {copy.back}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-9 text-xs font-black uppercase tracking-[0.16em] text-saas-muted">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-full text-balance break-words text-5xl font-black leading-[0.96] text-saas-ink sm:max-w-5xl sm:text-6xl lg:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-full break-words text-lg leading-8 text-saas-muted sm:max-w-2xl">{copy.intro}</p>
          </div>

          <SaasCard tone="dark" className="relative self-end rounded-[24px] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-muted">{copy.safetyTitle}</p>
                <h2 className="mt-4 text-3xl font-black leading-tight text-white">{copy.safetyHeadline}</h2>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-white/5 text-saas-muted">
                <ShieldCheck className="h-7 w-7" />
              </div>
            </div>
            <div className="mt-7 grid gap-3">
              {copy.notes.map((note, index) => {
                const Icon = index === 0 ? LockKeyhole : index === 1 ? ShieldCheck : Mail
                return (
                  <div key={note} className="flex min-w-0 gap-3 rounded-[14px] border border-saas-line bg-saas-surface p-4 text-sm font-bold leading-6 text-white/80">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-saas-muted" />
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
              <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-saas-surface text-saas-ink border border-saas-line shadow-saas-sm">
                {index === 0 ? <MessageSquareText className="h-5 w-5" /> : index === 1 ? <WalletCards className="h-5 w-5" /> : <Send className="h-5 w-5" />}
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-saas-muted">0{index + 1}</p>
              <h2 className="mt-2 text-xl font-black text-saas-ink">{step.title}</h2>
              <p className="mt-3 text-sm leading-7 text-saas-muted">{step.body}</p>
            </SaasCard>
          ))}
        </div>
      </SaasSection>

      <SaasSection className="pt-0">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(330px,0.92fr)]">
          <form onSubmit={handleSubmit} className="rounded-[24px] border border-saas-line bg-saas-surface-soft p-5 shadow-saas-md sm:p-8">
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
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-black shadow-saas-sm transition hover:bg-neutral-200 focus-visible:shadow-saas-focus disabled:cursor-not-allowed disabled:bg-saas-line disabled:text-saas-muted sm:col-span-2"
              >
                <Mail className="h-5 w-5" />
                {copy.send}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>

          <div className="grid gap-5 content-start">
            <SaasCard tone={isReady ? 'mint' : 'cream'} className="rounded-[24px]">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-muted">{copy.intakeTitle}</p>
              <div className="mt-5 flex items-start gap-3">
                {isReady ? <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-white" /> : <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-amber-500" />}
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

            <aside className="rounded-[24px] border border-saas-line bg-saas-surface-soft p-5 text-white shadow-saas-md sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-muted">{copy.preview}</p>
                  <p className="mt-2 text-sm font-bold text-white/70">mailto:{profileCommon.email}</p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-white/5 text-saas-muted">
                  <ClipboardList className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-5 rounded-[14px] border border-saas-line bg-saas-surface p-3 text-sm font-bold text-white/80">
                {form.projectType} · {form.timeline}
              </div>
              <pre className="mt-4 max-h-[580px] overflow-auto whitespace-pre-wrap rounded-[14px] border border-saas-line bg-black/40 p-4 font-mono text-sm leading-7 text-white/80">
                {emailBody}
              </pre>
            </aside>
          </div>
        </div>
      </SaasSection>
    </main>
  )
}
