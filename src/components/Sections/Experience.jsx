import React from 'react'
import { useExperiences } from '../../hooks/usePortfolioData'
import Loading, { ErrorDisplay } from '../Loading'
import ExperienceCard from '../ExperienceCard'

const Experience = () => {
  const { data: experiences, loading, error, refetch } = useExperiences()

  if (loading) return <Loading text="Loading experiences..." />
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />
  if (!experiences || !Array.isArray(experiences)) return <div className="text-center p-10">No experience data available</div>

  return (
    <section id="experience" className="min-h-screen bg-neo-green border-b-4 border-black p-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <h2 className="text-5xl font-black mb-12 border-b-4 border-black inline-block pb-2 text-white">EXPERIENCE</h2>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1 bg-black ml-8"></div>

          {/* Experience Cards */}
          <div className="space-y-6 md:ml-20">
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                year={exp.year}
                position={exp.position}
                company={exp.company}
                description={exp.description}
                achievements={exp.achievements}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="font-mono text-lg mb-6">ต้องการดูรายละเอียดเพิ่มเติม?</p>
          <a 
            href="#contact" 
            className="inline-block bg-neo-pink border-4 border-black px-8 py-4 font-black text-lg hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 shadow-neo uppercase"
          >
            ติดต่อผม →
          </a>
        </div>
      </div>
    </section>
  )
}

export default Experience
