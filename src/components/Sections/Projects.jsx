import React, { useState } from 'react'
import { ShoppingCart, Layers, Layout, ExternalLink, Github } from 'lucide-react'
import { useProjects } from '../../hooks/usePortfolioData'
import Loading, { ErrorDisplay } from '../../components/ui/Loading'

const projectIcons = {
  0: ShoppingCart,
  1: Layers,
  2: Layout
}

const projectColors = [
  'bg-[#FFD6FF]',
  'bg-[#C8B6FF]',
  'bg-[#B8C0FF]',
  'bg-[#9BF6FF]',
  'bg-[#CAFFBF]',
  'bg-[#FDFFB6]'
]

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const { data: projects, loading, error, refetch } = useProjects()

  if (loading) return <Loading text="Loading projects..." />
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />
  if (!projects || !Array.isArray(projects)) return <div className="text-center p-10">No projects data available</div>

  return (
    <section id="projects" className="py-20 border-t-4 border-black bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xl font-black text-black uppercase tracking-widest border-b-4 border-black inline-block pb-1">Projects</h2>
          <p className="mt-4 text-5xl font-black text-black uppercase">
            ผลงานที่โคตรภูมิใจ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => {
            const IconComponent = projectIcons[index % 3] || Layout
            const bgColor = projectColors[index % projectColors.length]
            
            return (
              <div 
                key={project.id} 
                className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all flex flex-col h-full group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Icon Header */}
                <div className={`h-48 ${bgColor} border-b-4 border-black flex items-center justify-center relative overflow-hidden`}>
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <IconComponent className="w-16 h-16 text-black opacity-50 group-hover:scale-110 transition-transform" />
                  )}
                  <div className="absolute top-4 right-4 bg-white border-2 border-black px-3 py-1 font-bold text-xs uppercase">
                    {project.category || 'Web App'}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-black uppercase mb-2">{project.title}</h3>
                  <p className="font-mono text-sm text-gray-600 mb-4 flex-grow">{project.description}</p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech && project.tech.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="bg-black text-white px-2 py-1 text-xs font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <div className="flex justify-between items-center border-b-4 border-black p-6 sticky top-0 bg-white">
              <h3 className="text-2xl sm:text-3xl font-black uppercase">{selectedProject.title}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 border-2 border-black bg-[#FFADAD] flex items-center justify-center font-black text-xl hover:bg-[#FF6B6B] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Image */}
              {selectedProject.image && (
                <div className="border-4 border-black overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="font-black text-lg uppercase mb-2 text-[#5471FF]">Description</h4>
                <p className="font-mono text-base text-gray-700">{selectedProject.longDescription || selectedProject.description}</p>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-black text-lg uppercase mb-3 text-[#FF6B6B]">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech && selectedProject.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-[#5471FF] border-2 border-black px-4 py-2 font-bold text-sm text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                <div>
                  <h4 className="font-black text-lg uppercase mb-3 text-[#FFD700]">Highlights</h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex gap-3 font-mono text-sm">
                        <span className="text-[#FF6B6B] font-black">▶</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Links */}
              <div className="border-t-4 border-black pt-6 flex flex-col sm:flex-row gap-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-black border-2 border-black text-white py-3 font-black text-center hover:bg-white hover:text-black transition-all duration-200 uppercase flex items-center justify-center gap-2"
                  >
                    <Github size={20} /> GitHub
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#FF90E8] border-2 border-black py-3 font-black text-center hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={20} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
