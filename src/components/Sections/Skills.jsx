import React from 'react'
import { skills } from '../../data/portfolio'
import SkillTag from '../SkillTag'

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen bg-neo-blue border-b-4 border-black p-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <h2 className="text-5xl font-black mb-12 border-b-4 border-black inline-block pb-2 text-white">SKILLS & EXPERTISE</h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skills.map((skillGroup, idx) => (
            <div key={idx} className="bg-white border-4 border-black p-8 shadow-neo">
              {/* Category Title */}
              <h3 className="text-2xl font-black mb-6 text-neo-blue uppercase">{skillGroup.category}</h3>

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
        <div className="mt-12 bg-neo-yellow border-4 border-black p-8 shadow-neo">
          <p className="font-mono text-lg text-gray-800">
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
