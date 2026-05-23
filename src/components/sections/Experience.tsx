'use client'

import React from 'react'
import { Calendar } from 'lucide-react'
import { experiences } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'

const expColors = ['bg-neo-red-light', 'bg-neo-lemon', 'bg-neo-mint', 'bg-neo-cyan', 'bg-neo-sky', 'bg-neo-lavender']

const Experience = () => {
  const { t, tl, language } = useTranslation()
  const experiencesData = experiences[language as Language]

  return (
    <section id="experience" className="py-20 border-t-4 border-black bg-neo-cream scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="motion-enter text-center mb-16">
          <h2 className="text-xl font-black bg-black text-white inline-block px-4 py-2 transform -rotate-2 shadow-[4px_4px_0px_0px_var(--color-neo-coral)]">{t('experience.title').toUpperCase()}</h2>
          <p className="mt-6 text-5xl md:text-6xl font-black text-black uppercase">
            {tl({ en: 'Career Journey', th: 'เส้นทางอาชีพ' })}
          </p>
        </div>

        {/* タイムライン — mobile: left-border, desktop: center timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Desktop Timeline Line (center) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-black hidden md:block"></div>
          {/* Mobile Timeline Line (left border) — แสดงเฉพาะ mobile */}
          <div className="absolute left-4 top-0 w-1 h-full bg-black md:hidden"></div>

          <div className="motion-stagger space-y-12">
            {experiencesData.map((exp, index) => (
              <div key={exp.id || index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center justify-between relative`}>
                {/* Mobile Timeline Dot */}
                <div className="absolute left-2.5 top-6 w-4 h-4 bg-black border-2 border-white z-10 md:hidden"></div>

                {/* Content */}
                <div className={`w-full pl-10 md:pl-0 md:w-5/12 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className={`motion-card ${expColors[index % expColors.length]} border-4 border-black p-6 shadow-neo-lg hover:-translate-y-1 transition-transform`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={18} strokeWidth={3} />
                      <span className="font-mono text-sm font-bold">{exp.year}</span>
                    </div>
                    <h3 className="text-xl font-black uppercase mb-1">{exp.position}</h3>
                    <p className="font-bold text-gray-700 mb-3">{exp.company}</p>
                    <p className="font-mono text-sm text-gray-600">{exp.description}</p>
                  </div>
                </div>

                {/* Desktop Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-black border-4 border-white items-center justify-center z-10"></div>

                {/* Spacer */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
