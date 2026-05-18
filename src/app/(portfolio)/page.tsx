'use client'

import { ArrowRight, Bot, Check, Github, Linkedin, Mail, Network, ServerCog, Workflow } from 'lucide-react'
import Image from 'next/image'
import { profile, profileCommon } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'

// Import all sections
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Articles from '@/components/sections/Articles'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

const landingCopy = {
  en: {
    eyebrow: 'AI Automation Studio',
    headline: 'Systems that connect AI, web apps, and real operations.',
    subcopy:
      'I design and build practical AI assistant workflows, internal tools, and full-stack systems that can be deployed, monitored, and maintained.',
    primaryCta: 'View systems',
    secondaryCta: 'Start a project',
    status: 'Available for focused freelance and contract builds',
    visualTitle: 'Production workflow',
    visualItems: ['AI assistant', 'Internal API', 'VPS deployment', 'LINE alerts'],
    servicesLabel: 'Services',
    servicesTitle: 'Build the workflow, not just the page.',
    servicesIntro:
      'Phase 1 reframes the portfolio like a compact software studio: clearer offer, sharper proof, and scannable systems capability.',
    techLabel: 'Working stack',
    services: [
      {
        title: 'AI Assistant Workflows',
        description: 'LINE-connected assistants, prompt flows, knowledge retrieval patterns, and operational handoffs.',
      },
      {
        title: 'Internal Tools',
        description: 'Admin screens, dashboards, content tools, and repeatable workflows for daily operations.',
      },
      {
        title: 'Full-stack Web Systems',
        description: 'Next.js apps, API routes, auth-aware pages, storage integration, and production deployment.',
      },
      {
        title: 'DevOps Automation',
        description: 'Health checks, alerts, command wrappers, server hardening, and practical runbooks.',
      },
    ],
  },
  th: {
    eyebrow: 'AI Automation Studio',
    headline: 'สร้างระบบที่เชื่อม AI, เว็บแอป และงานปฏิบัติการจริง',
    subcopy:
      'ผมออกแบบและสร้าง AI assistant workflows, internal tools และ full-stack systems ที่ deploy, monitor และดูแลต่อได้จริง',
    primaryCta: 'ดูระบบที่สร้าง',
    secondaryCta: 'เริ่มคุยโปรเจกต์',
    status: 'พร้อมรับงาน freelance และ contract แบบมี scope ชัด',
    visualTitle: 'Production workflow',
    visualItems: ['AI assistant', 'Internal API', 'VPS deployment', 'LINE alerts'],
    servicesLabel: 'บริการ',
    servicesTitle: 'สร้าง workflow ไม่ใช่แค่หน้าเว็บ',
    servicesIntro:
      'Phase 1 ปรับหน้า portfolio ให้เหมือน software studio ขนาดเล็ก: offer ชัดขึ้น proof ชัดขึ้น และอ่าน capability ของระบบได้เร็วขึ้น',
    techLabel: 'Stack ที่ใช้งาน',
    services: [
      {
        title: 'AI Assistant Workflows',
        description: 'Assistant ผ่าน LINE, prompt flows, knowledge retrieval patterns และ handoff สำหรับงานจริง',
      },
      {
        title: 'Internal Tools',
        description: 'Admin screens, dashboards, content tools และ workflow ที่ใช้ซ้ำได้ในงานประจำ',
      },
      {
        title: 'Full-stack Web Systems',
        description: 'Next.js apps, API routes, auth-aware pages, storage integration และ production deployment',
      },
      {
        title: 'DevOps Automation',
        description: 'Health checks, alerts, command wrappers, server hardening และ runbooks ที่ใช้งานได้จริง',
      },
    ],
  },
}

const serviceIcons = [Bot, Workflow, Network, ServerCog]
const techStack = ['Next.js', 'React', 'TypeScript', 'Vercel', 'OpenAI', 'LINE API', 'Secure Ops', 'Docker']

export default function Home() {
  const { language } = useTranslation()
  const profileData = { ...profile[language as Language], ...profileCommon }
  const copy = landingCopy[language as Language]

  return (
    <div className="font-sans text-black bg-[#f7f3e8] min-h-screen selection:bg-black selection:text-white">

      {/* --- Section 1: Hero --- */}
      <header id="home" className="relative overflow-hidden scroll-mt-20 bg-[#f7f3e8]">
        <div className="absolute inset-x-0 top-0 h-28 bg-white/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid min-h-[calc(100vh-5rem)] grid-cols-1 items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            {/* Hero copy */}
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-3 border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase shadow-neo-sm">
                <span className="h-2.5 w-2.5 bg-neo-green ring-2 ring-black"></span>
                <span>{copy.eyebrow}</span>
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.03] text-black sm:text-6xl lg:text-7xl">
                {copy.headline}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-bold leading-8 text-gray-700 lg:mx-0 lg:text-xl">
                {copy.subcopy}
              </p>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <a href="#projects" className="flex items-center justify-center border-2 border-black bg-black px-7 py-4 text-base font-black uppercase text-white shadow-neo transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                  {copy.primaryCta} <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a href="#contact" className="flex items-center justify-center border-2 border-black bg-neo-orange px-7 py-4 text-base font-black uppercase text-black shadow-neo transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                  {copy.secondaryCta}
                </a>
              </div>

              <div className="mt-8 flex flex-col items-center gap-5 lg:items-start">
                <div className="inline-flex max-w-xl items-center gap-3 border-2 border-black bg-white px-4 py-3 text-sm font-bold shadow-neo-sm">
                  <Check className="h-5 w-5 shrink-0" strokeWidth={3} />
                  <span>{copy.status}</span>
                </div>
                <div className="flex items-center justify-center gap-4 lg:justify-start">
                  {[
                    { Icon: Github, href: "https://github.com/Manchinn" },
                    { Icon: Linkedin, href: "https://www.linkedin.com/in/chinnakrit-sripan-4674a436a/" },
                    { Icon: Mail, href: `mailto:${profileData.email}` },
                  ].map((item, i) => (
                    <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center border-2 border-black bg-white shadow-neo-sm transition-transform hover:-translate-y-1">
                      <item.Icon size={24} strokeWidth={2} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="border-2 border-black bg-white p-4 shadow-neo-lg">
                <div className="relative aspect-[4/3] overflow-hidden border-2 border-black bg-[#dbeafe]">
                  <Image
                    src={profileData.image}
                    alt={profileData.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-4 bottom-4 border-2 border-black bg-white/95 p-4 shadow-neo-sm">
                    <p className="text-xs font-black uppercase text-gray-500">{profileData.title}</p>
                    <p className="mt-1 text-lg font-black">{profileData.name}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 border-2 border-black bg-black p-5 text-white shadow-neo">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="font-black uppercase">{copy.visualTitle}</p>
                  <span className="border border-white px-2 py-1 text-xs font-black">LIVE</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {copy.visualItems.map((item) => (
                    <div key={item} className="border-2 border-white bg-white px-3 py-3 text-sm font-black text-black">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-y-2 border-black bg-white py-4">
            <div className="mb-3 px-4 text-center text-xs font-black uppercase tracking-widest text-gray-500">{copy.techLabel}</div>
            <div className="flex flex-wrap justify-center gap-3 px-4">
              {techStack.map((tech) => (
                <span key={tech} className="border-2 border-black bg-[#f7f3e8] px-4 py-2 text-sm font-black shadow-neo-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* --- Section 2: Services --- */}
      <section className="border-t-4 border-black bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="mb-3 inline-block border-2 border-black bg-neo-cyan px-3 py-1 text-sm font-black uppercase shadow-neo-sm">
                {copy.servicesLabel}
              </p>
              <h2 className="text-3xl font-black leading-tight sm:text-5xl">{copy.servicesTitle}</h2>
            </div>
            <p className="max-w-3xl text-lg font-bold leading-8 text-gray-700 lg:justify-self-end">
              {copy.servicesIntro}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {copy.services.map((service, index) => {
              const Icon = serviceIcons[index]
              return (
                <article key={service.title} className="border-2 border-black bg-[#f7f3e8] p-5 shadow-neo transition-transform hover:-translate-y-1">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center border-2 border-black bg-white shadow-neo-sm">
                    <Icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-black">{service.title}</h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-gray-700">{service.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- Section 3: About --- */}
      <About />

      {/* --- Section 4: Skills --- */}
      <Skills />

      {/* --- Section 5: Experience --- */}
      <Experience />

      {/* --- Section 6: Projects --- */}
      <Projects />

      {/* --- Section 7: Articles --- */}
      <Articles />

      {/* --- Section 8: Contact --- */}
      <Contact />

      {/* --- Section 9: Footer --- */}
      <Footer />

    </div>
  )
}
