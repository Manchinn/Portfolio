import React from 'react'
import { Calendar } from 'lucide-react'
import { useExperiences } from '../../hooks/usePortfolioData'
import Loading, { ErrorDisplay } from '../../components/ui/Loading'

const expColors = ['bg-[#FFADAD]', 'bg-[#FDFFB6]', 'bg-[#CAFFBF]', 'bg-[#9BF6FF]', 'bg-[#A0C4FF]', 'bg-[#BDB2FF]']

const Experience = () => {
  const { data: experiences, loading, error, refetch } = useExperiences()

  if (loading) return <Loading text="Loading experiences..." />
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />
  if (!experiences || !Array.isArray(experiences)) return <div className="text-center p-10">No experience data available</div>

  return (
    <section id="experience" className="py-20 border-t-4 border-black bg-[#FFFAEB] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xl font-black bg-black text-white inline-block px-4 py-2 transform -rotate-2 shadow-[4px_4px_0px_0px_#FF6B6B]">EXPERIENCE</h2>
          <p className="mt-6 text-5xl font-black text-black uppercase">
            Career Journey
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-black hidden md:block"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id || index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center justify-between relative`}>
                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className={`${expColors[index % expColors.length]} border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={18} strokeWidth={3} />
                      <span className="font-mono text-sm font-bold">{exp.year}</span>
                    </div>
                    <h3 className="text-xl font-black uppercase mb-1">{exp.position}</h3>
                    <p className="font-bold text-gray-700 mb-3">{exp.company}</p>
                    <p className="font-mono text-sm text-gray-600">{exp.description}</p>
                  </div>
                </div>
                
                {/* Timeline Dot */}
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
