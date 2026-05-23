'use client'

import React from 'react'
import { CheckCircle2, GraduationCap, ShieldCheck, Wrench } from 'lucide-react'
import { profile, profileCommon } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'

const focusAreas = {
  en: [
    'AI workflows connected to real channels like LINE and internal APIs',
    'Full-stack web apps with admin, content, and workflow surfaces',
    'Deployment-minded systems with health checks, alerts, and safe defaults',
  ],
  th: [
    'AI workflows ที่เชื่อมช่องทางจริง เช่น LINE และ internal APIs',
    'Full-stack web apps พร้อม admin, content และ workflow surfaces',
    'ระบบที่คิดเรื่อง deployment, health checks, alerts และ safe defaults',
  ],
}

const workingModel = {
  en: [
    { title: 'Scope first', desc: 'Define the workflow, data, access, and operational path before UI polish.' },
    { title: 'Build usable slices', desc: 'Ship small but complete systems that can be tested and improved quickly.' },
    { title: 'Operate after launch', desc: 'Add checks, alerts, docs, and handoff notes so the system survives real use.' },
  ],
  th: [
    { title: 'Scope first', desc: 'กำหนด workflow, data, access และ operation path ก่อน polish UI' },
    { title: 'Build usable slices', desc: 'ส่งมอบระบบชิ้นเล็กแต่ครบ flow ทดสอบและปรับต่อได้เร็ว' },
    { title: 'Operate after launch', desc: 'เพิ่ม checks, alerts, docs และ handoff notes ให้ระบบอยู่ได้หลัง launch' },
  ],
}

const About = () => {
  const { t, tl, language } = useTranslation()
  const profileData = { ...profile[language as Language], ...profileCommon }
  const profileImage = profileData.image?.trim() || ''
  const areas = focusAreas[language as Language]
  const model = workingModel[language as Language]

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
        <div className="motion-stagger grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Image */}
          <div className="relative">
            <div className="motion-card aspect-[4/5] bg-neo-peach border-4 border-black shadow-neo-lg flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={profileData.name ? `${profileData.name} portrait` : 'Profile portrait'}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div className="absolute -bottom-4 right-0 md:-bottom-6 md:-right-6 bg-white border-4 border-black p-3 md:p-4 shadow-neo max-w-[240px] md:max-w-xs">
              <p className="font-black text-2xl md:text-4xl">{tl({ en: 'SYSTEMS', th: 'ระบบจริง' })}</p>
              <p className="font-bold text-sm bg-black text-white inline-block px-2">{tl({ en: 'AI / WEB / OPS', th: 'AI / WEB / OPS' })}</p>
            </div>
          </div>

          {/* Personal Info */}
          <div>
            <h2 className="text-xl font-black bg-neo-lavender inline-block px-3 py-1 border-2 border-black mb-4 shadow-neo">{t('about.title').toUpperCase()}</h2>
            <h3 className="text-4xl md:text-5xl font-black text-black mb-6 uppercase leading-tight">
              {tl({ en: 'I build practical systems for AI-enabled work.', th: 'ผมสร้างระบบใช้งานจริงสำหรับงานที่ใช้ AI' })}
            </h3>
            <p className="text-xl font-medium text-black leading-relaxed">
              {profileData.bio || t('about.description')}
            </p>

            <div className="mt-8 grid gap-3">
              {areas.map((area) => (
                <div key={area} className="motion-card flex gap-3 border-2 border-black bg-white p-4 shadow-neo-sm">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-black" strokeWidth={3} />
                  <p className="font-bold leading-7">{area}</p>
                </div>
              ))}
            </div>

            <h4 className="text-lg font-black bg-neo-peach inline-block px-3 py-1 border-2 border-black mt-8 mb-4 shadow-neo-sm">{tl({ en: 'WORKING MODEL', th: 'วิธีทำงาน' })}</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {model.map((item, idx) => {
                const Icon = idx === 0 ? ShieldCheck : idx === 1 ? Wrench : GraduationCap
                return (
                  <div key={item.title} className="motion-card p-4 bg-white border-4 border-black shadow-neo">
                    <div className="mb-3 inline-flex p-2 bg-neo-mint border-2 border-black shadow-neo-sm">
                      <Icon className="w-5 h-5 text-black" />
                    </div>
                    <p className="font-black text-sm uppercase tracking-wide">{item.title}</p>
                    <p className="mt-2 text-sm font-bold leading-6 text-gray-700">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
