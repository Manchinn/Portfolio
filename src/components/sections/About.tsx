'use client'

import React from 'react'
import { GraduationCap } from 'lucide-react'
import { profile, profileCommon } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'

const About = () => {
  const { t, tl, language } = useTranslation()
  const profileData = { ...profile[language as Language], ...profileCommon }
  const profileImage = profileData.image?.trim() || ''

  const getEducationPath = () => {
    return [
      { level: tl({ en: 'High School', th: 'มัธยมศึกษา' }), name: tl({ en: 'Bangsaphan Witthaya School', th: 'โรงเรียนบางสะพานวิทยา' }), period: '2015 - 2020 (Grade 7 - 12)' },
      { level: tl({ en: 'University', th: 'มหาวิทยาลัย' }), name: tl({ en: "King Mongkut's University of Technology North Bangkok", th: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง' }), period: "2021 - 2025 (Bachelor's Degree)" }
    ]
  }

  const educationPath = getEducationPath()

  return (
    <section id="about" className="py-20 border-t-4 border-black bg-[#FFFFFC] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full md:w-5/12 relative">
            <div className="aspect-square bg-neo-peach border-4 border-black shadow-neo-lg flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={profileData.name ? `${profileData.name} portrait` : 'Profile portrait'}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            {/* ป้ายประสบการณ์ — constrain ภายใน parent บน mobile */}
            <div className="absolute -bottom-4 right-0 md:-bottom-6 md:-right-6 bg-white border-4 border-black p-3 md:p-4 shadow-neo max-w-[200px] md:max-w-xs">
              <p className="font-black text-2xl md:text-4xl">2+ {tl({ en: 'YEARS', th: 'ปี' })}</p>
              <p className="font-bold text-sm bg-black text-white inline-block px-2">{tl({ en: 'EXPERIENCE', th: 'ประสบการณ์' })}</p>
            </div>
          </div>

          {/* Personal Info */}
          <div className="w-full md:w-7/12">
            <h2 className="text-xl font-black bg-neo-lavender inline-block px-3 py-1 border-2 border-black mb-4 shadow-neo">{t('about.title').toUpperCase()}</h2>
            <h3 className="text-4xl md:text-5xl font-black text-black mb-6 uppercase leading-tight">
              {profileData.name || tl({ en: 'FULL STACK DEVELOPER', th: 'นักพัฒนาเว็บ' })}
            </h3>
            <p className="text-xl font-medium text-black leading-relaxed">
              {profileData.bio || t('about.description')}
            </p>

            <h4 className="text-lg font-black bg-neo-peach inline-block px-3 py-1 border-2 border-black mt-8 mb-4 shadow-neo-sm">{tl({ en: 'EDUCATION PATH', th: 'การศึกษา' })}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {educationPath.map((edu, idx) => (
                <div key={idx} className="p-5 bg-white border-4 border-black shadow-neo flex gap-3 items-start">
                  <div className="p-2 bg-neo-mint border-2 border-black shadow-neo-sm">
                    <GraduationCap className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase tracking-wide">{edu.level}</p>
                    <p className="font-bold text-lg text-black leading-snug">{edu.name}</p>
                    <p className="font-mono text-xs text-gray-700 mt-1">{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
