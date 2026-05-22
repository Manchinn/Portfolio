'use client'

import Link from 'next/link'
import {
  Activity,
  Bot,
  Boxes,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Gauge,
  Github,
  Globe2,
  Grid3X3,
  Layers3,
  Linkedin,
  Mail,
  MessageCircle,
  Network,
  Phone,
  Rocket,
  ServerCog,
  Settings2,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react'
import { experiences, profile, profileCommon, projects, skills, socials } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'

const dashboardCopy = {
  en: {
    operatorId: 'Operator ID',
    systemStatus: 'System Status',
    active: 'Active',
    location: 'Location',
    commandMode: 'Command Mode',
    commandModes: ['Build', 'Automate', 'Optimize'],
    summaryTitle: 'Operator Summary',
    timelineTitle: 'Experience Timeline',
    systemsTitle: 'Workflow Systems | Design & Build',
    projectsTitle: 'Automation Projects',
    stackTitle: 'AI & Automation Stack',
    skillsTitle: 'Technical & Operational Skills',
    contactTitle: 'Contact & Digital Presence',
    coreTools: 'Core Tools',
    coreSkills: 'Core Skills',
    systemFooter: 'System profile',
    version: 'Version 2.0',
    updated: 'Updated May 2026',
    metrics: [
      { label: 'Systems built', value: '12+' },
      { label: 'Automation workflows', value: '20+' },
      { label: 'Workflow impact', value: 'High Efficiency' },
    ],
    traits: [
      'AI-native thinker',
      'Automation architect',
      'Systems builder',
      'Data connector',
      'Workflow strategist',
      'Process optimizer',
    ],
    workflowSystems: [
      {
        title: 'AI assistant workflows',
        body: 'Messaging assistants, prompt flows, knowledge context, and operator handoff.',
      },
      {
        title: 'Internal tools',
        body: 'Admin dashboards, review flows, content tools, and daily operating surfaces.',
      },
      {
        title: 'DevOps automation',
        body: 'Health checks, alerts, reports, event logs, and deployment-ready runbooks.',
      },
      {
        title: 'Knowledge systems',
        body: 'Sanitized read-only exports, RAG-style patterns, and wiki retrieval flows.',
      },
      {
        title: 'Full-stack systems',
        body: 'Next.js apps, route handlers, storage, auth-aware pages, and deployment.',
      },
      {
        title: 'Process optimization',
        body: 'Map manual workflows, reduce friction, and turn repeated work into systems.',
      },
    ],
    stack: [
      'ChatGPT',
      'OpenAI API',
      'Claude',
      'OpenRouter',
      'Next.js',
      'React',
      'TypeScript',
      'Vercel',
      'LINE API',
      'Vercel Blob',
      'PowerShell',
      'Docker',
    ],
  },
  th: {
    operatorId: 'Operator ID',
    systemStatus: 'สถานะระบบ',
    active: 'Active',
    location: 'ตำแหน่ง',
    commandMode: 'โหมดทำงาน',
    commandModes: ['Build', 'Automate', 'Optimize'],
    summaryTitle: 'Operator Summary',
    timelineTitle: 'Experience Timeline',
    systemsTitle: 'Workflow Systems | Design & Build',
    projectsTitle: 'Automation Projects',
    stackTitle: 'AI & Automation Stack',
    skillsTitle: 'Technical & Operational Skills',
    contactTitle: 'Contact & Digital Presence',
    coreTools: 'Core Tools',
    coreSkills: 'Core Skills',
    systemFooter: 'System profile',
    version: 'Version 2.0',
    updated: 'Updated May 2026',
    metrics: [
      { label: 'Systems built', value: '12+' },
      { label: 'Automation workflows', value: '20+' },
      { label: 'Workflow impact', value: 'High Efficiency' },
    ],
    traits: [
      'AI-native thinker',
      'Automation architect',
      'Systems builder',
      'Data connector',
      'Workflow strategist',
      'Process optimizer',
    ],
    workflowSystems: [
      {
        title: 'AI assistant workflows',
        body: 'Assistant ผ่าน messaging, prompt flows, knowledge context และ handoff สำหรับ operator',
      },
      {
        title: 'Internal tools',
        body: 'Admin dashboards, review flows, content tools และหน้าจอสำหรับงานประจำ',
      },
      {
        title: 'DevOps automation',
        body: 'Health checks, alerts, reports, event logs และ runbooks ที่พร้อมใช้กับ deployment',
      },
      {
        title: 'Knowledge systems',
        body: 'Sanitized read-only exports, RAG-style patterns และ wiki retrieval flows',
      },
      {
        title: 'Full-stack systems',
        body: 'Next.js apps, route handlers, storage, auth-aware pages และ deployment',
      },
      {
        title: 'Process optimization',
        body: 'Map workflow manual, ลด friction และเปลี่ยนงานซ้ำให้เป็นระบบ',
      },
    ],
    stack: [
      'ChatGPT',
      'OpenAI API',
      'Claude',
      'OpenRouter',
      'Next.js',
      'React',
      'TypeScript',
      'Vercel',
      'LINE API',
      'Vercel Blob',
      'PowerShell',
      'Docker',
    ],
  },
}

const railItems = [
  { href: '#home', icon: Grid3X3, label: 'Home' },
  { href: '#timeline', icon: Workflow, label: 'Timeline' },
  { href: '#systems', icon: Boxes, label: 'Systems' },
  { href: '#projects', icon: Rocket, label: 'Projects' },
  { href: '#stack', icon: Database, label: 'Stack' },
  { href: '#contact', icon: Mail, label: 'Contact' },
]

const workflowIcons = [Network, Workflow, ServerCog, BrainCircuit, Code2, Gauge]
const projectIcons = [MessageCircle, Terminal, BrainCircuit, BriefcaseBusiness]
const metricIcons = [Bot, Zap, Activity]

function CardHeader({ title, badge }: { title: string; badge?: string }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600"></span>
        <h2 className="truncate text-[11px] font-black uppercase tracking-[0.18em] text-slate-900">{title}</h2>
      </div>
      {badge && (
        <span className="shrink-0 rounded-sm border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-blue-700">
          {badge}
        </span>
      )}
    </div>
  )
}

function DashboardCard({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`rounded-md border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${className}`}>
      {children}
    </section>
  )
}

export default function Home() {
  const { language } = useTranslation()
  const lang = language as Language
  const copy = dashboardCopy[lang]
  const profileData = { ...profile[lang], ...profileCommon }
  const experienceData = experiences[lang]
  const projectData = projects[lang]
  const skillData = skills[lang]
  const coreSkills = skillData.flatMap((group) => group.items.map((item) => item.name)).slice(0, 20)
  const github = socials.find((social) => social.name === 'GitHub')?.url
  const linkedin = socials.find((social) => social.name === 'LinkedIn')?.url
  const roleSegments = profileData.title.split(/ & | \/ /)

  return (
    <main id="home" className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <div className="mx-auto grid max-w-[1800px] gap-5 px-4 py-5 lg:grid-cols-[64px_1fr]">
        <aside className="hidden rounded-md border border-slate-200 bg-white py-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:flex lg:min-h-[calc(100vh-112px)] lg:flex-col lg:items-center lg:justify-between lg:sticky lg:top-24">
          <div className="flex flex-col items-center gap-7">
            <Link href="#home" className="text-2xl font-black tracking-tighter text-blue-700">
              C/
            </Link>
            <nav className="flex flex-col gap-3">
              {railItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label={item.label}
                    className={`flex h-10 w-10 items-center justify-center rounded-md border text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 ${
                      index === 0 ? 'border-blue-100 bg-blue-50 text-blue-700' : 'border-transparent'
                    }`}
                  >
                    <Icon size={20} />
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex flex-col gap-3 text-slate-500">
            <Link href="/demos" aria-label="Demos" className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-50 hover:text-blue-700">
              <Sparkles size={19} />
            </Link>
            <Link href="/work-with-me" aria-label="Work with me" className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-50 hover:text-blue-700">
              <Terminal size={19} />
            </Link>
          </div>
        </aside>

        <div className="grid gap-5">
          <div className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
            <DashboardCard className="p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.85fr] lg:items-start">
                <div>
                  <CardHeader title={copy.operatorId} />
                  <h1 className="max-w-4xl text-5xl font-black leading-none tracking-tight text-slate-950 sm:text-7xl">
                    {profileData.name}
                  </h1>
                  <p className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-base font-semibold text-slate-700">
                    {roleSegments.map((part, index) => (
                      <span key={part} className="inline-flex items-center gap-3">
                        {part}
                        {index < roleSegments.length - 1 && <span className="h-1 w-1 rounded-full bg-blue-500"></span>}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="grid gap-5 border-t border-slate-200 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">{copy.systemStatus}</p>
                    <p className="mt-2 inline-flex items-center gap-2 text-sm font-black uppercase text-slate-800">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      {copy.active}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">{copy.location}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">{profileData.location}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">{copy.commandMode}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {copy.commandModes.map((mode) => (
                        <span key={mode} className="rounded-sm bg-blue-50 px-2 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-blue-700">
                          {mode}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 grid border-t border-slate-200 pt-5 sm:grid-cols-3">
                {copy.metrics.map((metric, index) => {
                  const Icon = metricIcons[index]
                  return (
                    <div key={metric.label} className="flex items-center gap-4 border-slate-100 py-4 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-600">
                        <Icon size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">{metric.label}</p>
                        <p className="mt-1 text-xl font-black text-slate-950">{metric.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </DashboardCard>

            <DashboardCard className="p-6">
              <CardHeader title={copy.summaryTitle} />
              <p className="text-sm font-semibold leading-7 text-slate-700">{profileData.bio}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {copy.traits.map((trait) => (
                  <div key={trait} className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-xs font-semibold text-slate-700">
                    <Settings2 className="h-4 w-4 shrink-0 text-blue-600" />
                    {trait}
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1fr_1.1fr_1fr]">
            <DashboardCard id="timeline" className="p-6 xl:row-span-2">
              <CardHeader title={copy.timelineTitle} />
              <div className="space-y-7">
                {experienceData.map((item) => (
                  <article key={item.id} className="grid grid-cols-[92px_1fr] gap-4">
                    <div className="text-xs font-black leading-5 text-blue-700">{item.year}</div>
                    <div className="relative border-l border-blue-100 pl-5">
                      <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-blue-500 bg-white"></span>
                      <h3 className="text-base font-black text-slate-950">{item.position}</h3>
                      <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-slate-400">{item.company}</p>
                      <p className="mt-3 text-xs font-semibold leading-6 text-slate-600">{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard id="systems" className="p-6">
              <CardHeader title={copy.systemsTitle} />
              <div className="grid gap-4 sm:grid-cols-2">
                {copy.workflowSystems.map((system, index) => {
                  const Icon = workflowIcons[index]
                  return (
                    <article key={system.title} className="rounded-md border border-slate-200 bg-white p-4 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                        <Icon size={25} />
                      </div>
                      <h3 className="mt-4 text-sm font-black text-slate-950">{system.title}</h3>
                      <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{system.body}</p>
                    </article>
                  )
                })}
              </div>
            </DashboardCard>

            <DashboardCard id="stack" className="p-6">
              <CardHeader title={copy.stackTitle} badge={copy.coreTools} />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
                {copy.stack.map((tool, index) => (
                  <div key={tool} className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-50 text-blue-700">
                      {index % 3 === 0 ? <Bot size={18} /> : index % 3 === 1 ? <Layers3 size={18} /> : <Zap size={18} />}
                    </div>
                    <span className="text-xs font-black text-slate-700">{tool}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 py-3 text-center text-xs font-black text-slate-500">
                Automation Systems · Integrations · API Orchestration
              </div>
            </DashboardCard>

            <DashboardCard id="projects" className="p-6">
              <CardHeader title={copy.projectsTitle} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                {projectData.map((project, index) => {
                  const Icon = projectIcons[index] ?? Rocket
                  return (
                    <Link
                      key={project.id}
                      href={project.demo}
                      className="rounded-md border border-slate-200 bg-white p-4 text-center transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-slate-50 text-slate-700">
                        <Icon size={24} />
                      </div>
                      <h3 className="mt-4 min-h-10 text-sm font-black leading-5 text-slate-950">{project.title}</h3>
                      <p className="mt-2 line-clamp-3 text-xs font-semibold leading-5 text-slate-500">{project.description}</p>
                      <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        Live
                      </span>
                    </Link>
                  )
                })}
              </div>
            </DashboardCard>

            <DashboardCard className="p-6">
              <CardHeader title={copy.skillsTitle} badge={copy.coreSkills} />
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {coreSkills.map((skill) => (
                  <div key={skill} className="border-b border-slate-100 pb-2 text-xs font-semibold text-slate-600">
                    {skill}
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 py-3 text-center text-xs font-black text-slate-500">
                I transform complex processes into intelligent, automated systems
              </div>
            </DashboardCard>
          </div>

          <DashboardCard id="contact" className="p-6">
            <CardHeader title={copy.contactTitle} />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <a href={`mailto:${profileData.email}`} className="flex items-center gap-4 rounded-md border border-slate-200 bg-slate-50 p-4 hover:border-blue-200 hover:bg-blue-50">
                <Mail className="h-5 w-5 text-slate-500" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Email</p>
                  <p className="mt-1 text-sm font-black text-slate-800">{profileData.email}</p>
                </div>
              </a>
              <a href={`tel:${profileData.phone.replaceAll(' ', '')}`} className="flex items-center gap-4 rounded-md border border-slate-200 bg-slate-50 p-4 hover:border-blue-200 hover:bg-blue-50">
                <Phone className="h-5 w-5 text-slate-500" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Phone</p>
                  <p className="mt-1 text-sm font-black text-slate-800">{profileData.phone}</p>
                </div>
              </a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-md border border-slate-200 bg-slate-50 p-4 hover:border-blue-200 hover:bg-blue-50">
                <Linkedin className="h-5 w-5 text-slate-500" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">LinkedIn</p>
                  <p className="mt-1 text-sm font-black text-slate-800">Chinnakrit Sripan</p>
                </div>
              </a>
              <a href={github} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-md border border-slate-200 bg-slate-50 p-4 hover:border-blue-200 hover:bg-blue-50">
                <Github className="h-5 w-5 text-slate-500" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">GitHub</p>
                  <p className="mt-1 text-sm font-black text-slate-800">Manchinn</p>
                </div>
              </a>
            </div>
          </DashboardCard>

          <footer className="grid gap-3 rounded-md border border-slate-200 bg-white px-5 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-blue-600" />
              {copy.systemFooter}
            </div>
            <div className="text-center">{copy.version}</div>
            <div className="flex items-center gap-2 sm:justify-end">
              <Globe2 size={15} className="text-blue-600" />
              {copy.updated}
            </div>
          </footer>
        </div>
      </div>
    </main>
  )
}
