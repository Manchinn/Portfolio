import React from 'react'
import { Layout, Database, Smartphone, Code, Layers, Globe, Terminal, Users, Lightbulb, MessageCircle, Heart } from 'lucide-react'
import { useSkills } from '../../hooks/usePortfolioData'
import Loading, { ErrorDisplay } from '../../components/ui/Loading'

const skillIcons = {
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
  'bg-[#FFADAD]',
  'bg-[#FFD6A5]',
  'bg-[#FDFFB6]',
  'bg-[#CAFFBF]',
  'bg-[#9BF6FF]',
  'bg-[#A0C4FF]'
]

const softSkills = [
  { name: 'Clean Code', icon: Code, color: 'bg-[#CAFFBF]', desc: 'โค้ดอ่านง่าย' },
  { name: 'Teamwork', icon: Users, color: 'bg-[#9BF6FF]', desc: 'ทำงานเป็นทีม' },
  { name: 'Problem Solving', icon: Lightbulb, color: 'bg-[#FFADAD]', desc: 'แก้ปัญหาเก่ง' },
  { name: 'Communication', icon: MessageCircle, color: 'bg-[#BDB2FF]', desc: 'สื่อสารชัดเจน' }
]

const Skills = () => {
  const { data: skills, loading, error, refetch } = useSkills()

  if (loading) return <Loading text="Loading skills..." />
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />
  if (!skills || !Array.isArray(skills)) return <div className="text-center p-10">No skills data available</div>

  return (
    <section id="skills" className="py-20 border-t-4 border-black bg-black text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-xl font-black text-[#FFADAD] mb-2 uppercase tracking-widest">My Skills</h2>
            <p className="text-5xl md:text-6xl font-black uppercase text-white">
              Weapons <br/> of Choice
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Terminal className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Technical Skills */}
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3">
          <Terminal className="w-6 h-6" /> Technical Skills
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skills.map((skillGroup, index) => {
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
          <Heart className="w-6 h-6" /> Soft Skills
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
