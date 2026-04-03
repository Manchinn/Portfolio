'use client'

import React from 'react'
import { Layout, Database, Smartphone, Code, Layers, Globe, Terminal, Users, Lightbulb, MessageCircle, Heart } from 'lucide-react'
import { skills } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'

const skillIcons: Record<string, React.ElementType> = {
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
  'bg-neo-red-light',
  'bg-neo-peach',
  'bg-neo-lemon',
  'bg-neo-mint',
  'bg-neo-cyan',
  'bg-neo-sky'
]

const softSkillsEn = [
  { name: 'Clean Code', icon: Code, color: 'bg-neo-mint', desc: 'Readable, maintainable code' },
  { name: 'Teamwork', icon: Users, color: 'bg-neo-cyan', desc: 'Collaborative and reliable' },
  { name: 'Problem Solving', icon: Lightbulb, color: 'bg-neo-red-light', desc: 'Calm under pressure' },
  { name: 'Communication', icon: MessageCircle, color: 'bg-neo-lavender', desc: 'Clear and concise' }
]

const softSkillsTh = [
  { name: 'Clean Code', icon: Code, color: 'bg-neo-mint', desc: 'โค้ดอ่านง่าย ดูแลรักษาได้' },
  { name: 'Teamwork', icon: Users, color: 'bg-neo-cyan', desc: 'ทำงานเป็นทีมได้ดี' },
  { name: 'Problem Solving', icon: Lightbulb, color: 'bg-neo-red-light', desc: 'คิดหาทางออกในสถานการณ์ยากลำบาก' },
  { name: 'Communication', icon: MessageCircle, color: 'bg-neo-lavender', desc: 'สื่อสารได้ชัดเจน' }
]

const Skills = () => {
  const { language, tl } = useTranslation()
  const skillsData = skills[language as Language]

  const getSoftSkills = () => {
    if (language === 'th') return softSkillsTh
    return softSkillsEn
  }

  const softSkills = getSoftSkills()

  return (
    <section id="skills" className="py-20 border-t-4 border-black bg-black text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-xl font-black text-neo-red-light mb-2 uppercase tracking-widest">{tl({ en: 'My Skills', th: 'ทักษะของผม' })}</h2>
            <p className="text-5xl md:text-6xl font-black uppercase text-white">
              {tl({ en: 'Weapons', th: 'เครื่องมือ' })} <br/> {tl({ en: 'of Choice', th: 'ในการทำงาน' })}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Terminal className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Technical Skills */}
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3">
          <Terminal className="w-6 h-6" /> {tl({ en: 'Technical Skills', th: 'ทักษะด้านเทคนิค' })}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillsData.map((skillGroup, index) => {
            const IconComponent = skillIcons[skillGroup.category] || Code
            const bgColor = skillColors[index % skillColors.length]

            return (
              <div key={index} className="flex flex-col bg-white border-4 border-white p-0 hover:-translate-y-2 transition-transform duration-200">
                <div className={`p-4 border-b-4 border-black flex justify-between items-center ${bgColor}`}>
                  <h3 className="text-xl font-black uppercase text-black">{skillGroup.category}</h3>
                  <IconComponent className="w-8 h-8 text-black" />
                </div>
                <div className="p-6 bg-black">
                  <p className="font-mono text-gray-300 text-sm">
                    {skillGroup.items.map(item => item.name).join(', ')}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Soft Skills */}
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3">
          <Heart className="w-6 h-6" /> {tl({ en: 'Soft Skills', th: 'ทักษะซอฟต์' })}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {softSkills.map((skill, index) => {
            const IconComponent = skill.icon
            return (
              <div key={index} className={`p-6 ${skill.color} border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] text-center hover:-translate-y-2 transition-transform duration-200`}>
                <IconComponent size={36} strokeWidth={2} className="mb-3 mx-auto text-black" />
                <h4 className="font-black text-lg text-black">{skill.name}</h4>
                <p className="font-mono text-xs mt-2 text-black">{skill.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
