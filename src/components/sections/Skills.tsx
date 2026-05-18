'use client'

import React from 'react'
import { Bot, Code, Database, Globe, Layout, Layers, MessageCircle, ServerCog, Smartphone, Terminal, Workflow } from 'lucide-react'
import { skills } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'

const skillIcons: Record<string, React.ElementType> = {
  'AI Automation': Bot,
  'Full-stack Systems': Layout,
  'ระบบ Full-stack': Layout,
  'DevOps & Infrastructure': ServerCog,
  'DevOps และ Infrastructure': ServerCog,
  'Frontend & Tools': Workflow,
  'Frontend และเครื่องมือ': Workflow,
  'Frontend': Layout,
  'Backend': Database,
  'Mobile': Smartphone,
  'DevOps': Code,
  'Database': Layers,
  'Performance': Globe,
  'Tools & Others': Terminal,
  'Languages': Globe
}

const skillColors = [
  'bg-neo-cyan',
  'bg-neo-mint',
  'bg-neo-lemon',
  'bg-neo-peach',
  'bg-neo-lavender',
  'bg-white'
]

const capabilityCopy = {
  en: [
    { label: 'Discovery', text: 'Map the workflow, users, data, risks, and launch path.' },
    { label: 'Build', text: 'Implement UI, API routes, integrations, auth-aware flows, and storage.' },
    { label: 'Operate', text: 'Prepare health checks, alerts, deployment notes, and maintenance habits.' },
  ],
  th: [
    { label: 'Discovery', text: 'ไล่ workflow, users, data, risks และ path สำหรับ launch' },
    { label: 'Build', text: 'ทำ UI, API routes, integrations, auth-aware flows และ storage' },
    { label: 'Operate', text: 'เตรียม health checks, alerts, deployment notes และวิธีดูแลต่อ' },
  ],
}

const Skills = () => {
  const { language, tl } = useTranslation()
  const skillsData = skills[language as Language]
  const capabilities = capabilityCopy[language as Language]

  return (
    <section id="skills" className="py-20 border-t-4 border-black bg-black text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end mb-14">
          <div>
            <h2 className="text-xl font-black text-neo-cyan mb-2 uppercase tracking-widest">{tl({ en: 'Capability Map', th: 'แผนที่ความสามารถ' })}</h2>
            <p className="text-4xl md:text-6xl font-black uppercase text-white leading-tight">
              {tl({ en: 'Tools for shipped systems', th: 'เครื่องมือสำหรับระบบที่ส่งมอบได้จริง' })}
            </p>
          </div>
          <div className="border-2 border-white bg-white p-5 text-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.25)]">
            <MessageCircle className="mb-4 h-8 w-8" />
            <p className="text-sm font-black uppercase text-gray-500">{tl({ en: 'How I package work', th: 'รูปแบบการทำงาน' })}</p>
            <p className="mt-2 text-lg font-black leading-7">
              {tl({
                en: 'Automation, internal tools, and web systems with deployment thinking included.',
                th: 'Automation, internal tools และ web systems ที่คิดเรื่อง deployment ตั้งแต่แรก',
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillsData.map((skillGroup, index) => {
            const IconComponent = skillIcons[skillGroup.category] || Code
            const bgColor = skillColors[index % skillColors.length]

            return (
              <div key={index} className="flex flex-col bg-white border-4 border-white p-0 hover:-translate-y-2 transition-transform duration-200">
                <div className={`p-4 border-b-4 border-black flex justify-between items-start gap-4 ${bgColor}`}>
                  <h3 className="text-xl font-black uppercase text-black">{skillGroup.category}</h3>
                  <IconComponent className="w-8 h-8 shrink-0 text-black" />
                </div>
                <div className="grid gap-3 p-5 bg-black">
                  {skillGroup.items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-3 border border-white/20 bg-white/5 px-3 py-2">
                      <span className="text-sm font-bold text-gray-100">{item.name}</span>
                      <span className="shrink-0 text-xs font-black uppercase text-neo-cyan">{item.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {capabilities.map((item) => (
            <div key={item.label} className="border-2 border-white bg-white p-5 text-black">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border-2 border-black bg-neo-orange shadow-neo-sm">
                <Terminal className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black uppercase">{item.label}</h3>
              <p className="mt-2 text-sm font-bold leading-6 text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
