import React, { useState } from 'react'
import { useProjects } from '../../hooks/usePortfolioData'
import Loading, { ErrorDisplay } from '../Loading'
import Card from '../Card/Card'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const { data: projects, loading, error, refetch } = useProjects()

  if (loading) return <Loading text="Loading projects..." />
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />
  if (!projects || !Array.isArray(projects)) return <div className="text-center p-10">No projects data available</div>

  return (
    <section id="projects" className="min-h-screen bg-white p-10 border-b-4 border-black flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <h2 className="text-5xl font-black mb-4 border-b-4 border-neo-green inline-block pb-2">MY WORK</h2>
        <p className="font-mono text-lg mb-12 text-gray-600">
          โปรเจคที่ผมทำงานมาแล้ว ที่แสดงให้เห็นถึงความสามารถและประสบการณ์ของผม
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <Card
                title={project.title}
                desc={project.description}
                imgUrl={project.image}
              />
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white border-4 border-black shadow-neo max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <div className="flex justify-between items-center border-b-4 border-black p-6 sticky top-0 bg-white">
                <h3 className="text-3xl font-black uppercase">{selectedProject.title}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-3xl font-black cursor-pointer hover:text-neo-pink transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Image */}
                <div className="border-4 border-black overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-black text-lg uppercase mb-2 text-neo-blue">Description</h4>
                  <p className="font-mono text-gray-700">{selectedProject.longDescription}</p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-black text-lg uppercase mb-3 text-neo-pink">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-neo-blue border-2 border-black px-4 py-2 font-bold text-sm text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                {selectedProject.highlights && (
                  <div>
                    <h4 className="font-black text-lg uppercase mb-3 text-neo-yellow">Highlights</h4>
                    <ul className="space-y-2">
                      {selectedProject.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex gap-3 font-mono text-sm">
                          <span className="text-neo-pink font-black">▶</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Links */}
                <div className="border-t-4 border-black pt-6 flex gap-4">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-black border-2 border-black text-white py-3 font-black text-center hover:bg-white hover:text-black transition-all duration-200 uppercase"
                  >
                    🐙 GitHub
                  </a>
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-neo-pink border-2 border-black py-3 font-black text-center hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 shadow-neo uppercase"
                  >
                    👁️ Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
