import React from 'react'
import { Layout, Database, Smartphone, Code, Layers, Globe, Terminal } from 'lucide-react'
import { useSkills } from '../../hooks/usePortfolioData'
import Loading, { ErrorDisplay } from '../../components/ui/Loading'

const skillIcons = {
  'Frontend': Layout,
  'Backend': Database,
  'Mobile': Smartphone,
  'DevOps': Code,
  'Database': Layers,
  'Performance': Globe
}

const skillColors = [
  'bg-[#FFADAD]',
  'bg-[#FFD6A5]',
  'bg-[#FDFFB6]',
  'bg-[#CAFFBF]',
  'bg-[#9BF6FF]',
  'bg-[#A0C4FF]'
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </section>
  )
}

export default Skills
