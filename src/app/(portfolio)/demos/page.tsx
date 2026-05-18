'use client'

import Link from 'next/link'
import { ArrowRight, Bot, LayoutDashboard, MessageCircle, ShieldCheck, Terminal, Workflow } from 'lucide-react'
import { projects } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'

const demoCopy = {
  en: {
    eyebrow: 'Public Demo Hub',
    title: 'Small, safe demos for real system workflows.',
    intro:
      'These pages show the product surface and operating model behind the portfolio work without exposing private data, credentials, or infrastructure details.',
    back: 'Back home',
    open: 'Open demo',
    proofLabel: 'What to look for',
    proofItems: ['workflow clarity', 'operator experience', 'safe public proof'],
  },
  th: {
    eyebrow: 'Public Demo Hub',
    title: 'เดโมสั้นๆ ที่โชว์ workflow ของระบบจริงแบบปลอดภัย',
    intro:
      'หน้านี้รวม demo ที่โชว์ product surface และ operating model ของงานใน portfolio โดยไม่เปิดเผย private data, credentials หรือรายละเอียด infrastructure',
    back: 'กลับหน้าหลัก',
    open: 'เปิด Demo',
    proofLabel: 'สิ่งที่ควรดู',
    proofItems: ['workflow ชัด', 'operator experience', 'public proof ที่ปลอดภัย'],
  },
}

const demoIcons = [MessageCircle, Terminal, Bot, LayoutDashboard]

export default function DemosPage() {
  const { language } = useTranslation()
  const lang = language as Language
  const copy = demoCopy[lang]
  const demoProjects = projects[lang].filter((project) => project.demo)

  return (
    <main className="min-h-screen bg-neo-cream text-black">
      <section className="border-b-4 border-black bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link href="/#home" className="inline-flex items-center border-2 border-white px-4 py-2 text-sm font-black uppercase hover:bg-white hover:text-black">
            {copy.back}
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 border-2 border-white bg-neo-cyan px-4 py-2 font-black uppercase text-black shadow-neo">
                <Workflow size={20} />
                {copy.eyebrow}
              </div>
              <h1 className="max-w-4xl text-4xl font-black uppercase leading-tight sm:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-bold leading-8 text-gray-200 sm:text-xl">
                {copy.intro}
              </p>
            </div>

            <div className="border-4 border-white bg-neo-lemon p-5 text-black shadow-neo-lg">
              <div className="mb-4 flex items-center gap-3">
                <ShieldCheck size={28} />
                <p className="font-black uppercase">{copy.proofLabel}</p>
              </div>
              <div className="grid gap-3">
                {copy.proofItems.map((item) => (
                  <div key={item} className="border-2 border-black bg-white px-4 py-3 font-black">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {demoProjects.map((project, index) => {
            const Icon = demoIcons[index] ?? Bot

            return (
              <article key={project.id} className="border-4 border-black bg-white shadow-neo-lg">
                <div className="flex items-start justify-between gap-4 border-b-4 border-black bg-neo-mint p-5">
                  <div>
                    <p className="font-mono text-xs font-black uppercase text-gray-600">{project.category}</p>
                    <h2 className="mt-2 text-2xl font-black uppercase leading-tight">{project.title}</h2>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black bg-white shadow-neo-sm">
                    <Icon size={26} />
                  </div>
                </div>

                <div className="space-y-5 p-5">
                  <p className="font-bold leading-7 text-gray-800">{project.description}</p>

                  {project.caseStudy && (
                    <div className="grid gap-3">
                      <div className="border-2 border-black bg-neo-cream p-4">
                        <p className="font-mono text-xs font-black uppercase text-gray-600">Built</p>
                        <p className="mt-2 text-sm font-bold leading-6">{project.caseStudy.built}</p>
                      </div>
                      <div className="border-2 border-black bg-neo-pink p-4">
                        <p className="font-mono text-xs font-black uppercase text-gray-600">Result</p>
                        <p className="mt-2 text-sm font-bold leading-6">{project.caseStudy.result}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="border-2 border-black bg-neo-lemon px-3 py-1 text-xs font-black uppercase">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link href={project.demo} className="inline-flex items-center border-2 border-black bg-black px-5 py-3 text-sm font-black uppercase text-white shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                    {copy.open}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
