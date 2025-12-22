import React from 'react'
import { useSkills } from '../../hooks/usePortfolioData'
import Loading, { ErrorDisplay } from '../Loading'
import SkillTag from '../SkillTag'

const Skills = () => {
  const { data: skills, loading, error, refetch } = useSkills()

  if (loading) return <Loading text="Loading skills..." />
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />
  if (!skills || !Array.isArray(skills)) return <div className="text-center p-10">No skills data available</div>

  return (
    <section id="skills" className="min-h-screen bg-neo-blue border-b-4 border-black p-4 sm:p-6 md:p-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 sm:mb-10 md:mb-12 border-b-4 border-black inline-block pb-2">SKILLS & EXPERTISE</h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {skills.map((skillGroup, idx) => (
            <div key={idx} className="bg-white border-4 border-black p-4 sm:p-6 md:p-8 shadow-neo">
              {/* Category Title */}
              <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 text-neo-blue uppercase">{skillGroup.category}</h3>

              {/* Skills */}
              <div className="space-y-3 flex flex-wrap gap-3">
                {skillGroup.items.map((skill, skillIdx) => (
                  <SkillTag
                    key={skillIdx}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 sm:mt-10 md:mt-12 bg-neo-yellow border-4 border-black p-4 sm:p-6 md:p-8 shadow-neo">
          <p className="font-mono text-sm sm:text-base md:text-lg text-gray-800">
            ✓ ความสามารถด้าน Frontend development ที่แข็งแกร่ง ✓ มีประสบการณ์ทำงาน Full-stack projects
            ✓ เข้าใจ modern web development tools & frameworks
            ✓ สามารถทำงานเป็นทีมและ self-driven ได้ดี
          </p>
        </div>
      </div>
    </section>
  )
}

export default Skills
