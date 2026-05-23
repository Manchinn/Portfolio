'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Bot, ExternalLink, Github, Layout, Network, ServerCog, Workflow } from 'lucide-react'
import { projects } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language, Project } from '@/data/types'

const projectIcons: Record<number, React.ElementType> = {
  0: Bot,
  1: Workflow,
  2: Network,
  3: ServerCog,
}

const projectColors = [
  'bg-[#111827] text-white',
  'bg-[#2563eb] text-white',
  'bg-[#16a34a] text-white',
  'bg-[#f59e0b] text-black',
  'bg-neo-cyan text-black',
  'bg-neo-mint text-black',
]

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { t, tl, language } = useTranslation()
  const projectsData = projects[language as Language]

  // Refs for focus management
  const modalRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const closeModal = useCallback(() => {
    setSelectedProject(null)
  }, [])

  const openModal = useCallback((project: Project, e: React.MouseEvent<HTMLDivElement>) => {
    triggerRef.current = e.currentTarget
    setSelectedProject(project)
  }, [])

  // Focus the modal when it opens, return focus to trigger on close
  useEffect(() => {
    if (selectedProject && modalRef.current) {
      modalRef.current.focus()
    }
    if (!selectedProject && triggerRef.current) {
      triggerRef.current.focus()
      triggerRef.current = null
    }
  }, [selectedProject])

  // Escape key handler
  useEffect(() => {
    if (!selectedProject) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedProject, closeModal])

  // Focus trap
  useEffect(() => {
    if (!selectedProject || !modalRef.current) return

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const focusableSelectors = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      const focusableElements = modalRef.current!.querySelectorAll<HTMLElement>(focusableSelectors)
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [selectedProject])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [selectedProject])

  return (
    <section id="projects" className="py-20 border-t-4 border-black bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="motion-enter text-center mb-14">
          <h2 className="text-xl font-black text-black uppercase tracking-widest border-b-4 border-black inline-block pb-1">{t('projects.title')}</h2>
          <p className="mt-4 text-4xl md:text-6xl font-black text-black uppercase">
            {tl({ en: 'Systems as case studies', th: 'ผลงานแบบ Case Study' })}
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-bold leading-8 text-gray-700">
            {tl({
              en: 'Each project is framed by the problem, the system built, and the operational result it supports.',
              th: 'แต่ละโปรเจกต์เล่าเป็นปัญหา ระบบที่สร้าง และผลลัพธ์เชิงการใช้งานที่รองรับ',
            })}
          </p>
        </div>

        <div className="motion-stagger grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {projectsData.map((project, index) => {
            const IconComponent = projectIcons[index % 4] || Layout
            const bgColor = projectColors[index % projectColors.length]
            const caseStudy = project.caseStudy

            return (
              <div
                key={project.id}
                className="motion-card border-4 border-black bg-white shadow-neo-lg hover:-translate-y-1 transition-all flex flex-col h-full group cursor-pointer"
                onClick={(e) => openModal(project, e)}
              >
                <div className={`${bgColor} border-b-4 border-black p-5`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="motion-icon flex h-14 w-14 shrink-0 items-center justify-center border-2 border-black bg-white text-black shadow-neo-sm">
                      <IconComponent className="h-7 w-7 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                    </div>
                    <div className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase text-black">
                      {project.category || 'System'}
                    </div>
                  </div>
                  <p className="mt-8 text-sm font-black uppercase opacity-80">{project.date}</p>
                  <h3 className="mt-2 text-2xl font-black uppercase leading-tight">{project.title}</h3>
                </div>

                <div className="p-6 flex flex-col flex-grow gap-5">
                  <p className="text-base font-bold leading-7 text-gray-700">{project.description}</p>
                  {caseStudy && (
                    <div className="grid gap-3">
                      <div className="border-2 border-black bg-[#f7f3e8] p-4">
                        <p className="text-xs font-black uppercase text-gray-500">{tl({ en: 'Problem', th: 'ปัญหา' })}</p>
                        <p className="mt-2 text-sm font-bold leading-6">{caseStudy.problem}</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="border-2 border-black bg-white p-4">
                          <p className="text-xs font-black uppercase text-gray-500">{tl({ en: 'Built', th: 'ระบบที่สร้าง' })}</p>
                          <p className="mt-2 text-sm font-bold leading-6">{caseStudy.built}</p>
                        </div>
                        <div className="border-2 border-black bg-white p-4">
                          <p className="text-xs font-black uppercase text-gray-500">{tl({ en: 'Result', th: 'ผลลัพธ์' })}</p>
                          <p className="mt-2 text-sm font-bold leading-6">{caseStudy.result}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech && project.tech.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="bg-black text-white px-3 py-1.5 text-xs font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button className="mt-1 inline-flex items-center justify-center border-2 border-black bg-neo-orange px-4 py-3 text-sm font-black uppercase shadow-neo-sm transition-all group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none">
                    {tl({ en: 'Open case study', th: 'ดู Case Study' })}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="motion-enter fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          ref={modalRef}
          tabIndex={-1}
          onClick={closeModal}
        >
          <div
            className="motion-scale bg-white border-4 border-black shadow-neo-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="flex justify-between items-center border-b-4 border-black p-6 sticky top-0 bg-white">
              <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-black uppercase">{selectedProject.title}</h3>
              <button
                onClick={closeModal}
                aria-label="Close"
                className="w-10 h-10 border-2 border-black bg-neo-red-light flex items-center justify-center font-black text-xl hover:bg-neo-coral transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {selectedProject.caseStudy && (
                <div className="grid gap-4">
                  <div className="border-2 border-black bg-[#f7f3e8] p-4">
                    <h4 className="font-black text-sm uppercase mb-2 text-gray-500">{tl({ en: 'Problem', th: 'ปัญหา' })}</h4>
                    <p className="text-base font-bold leading-7 text-gray-700">{selectedProject.caseStudy.problem}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="border-2 border-black p-4">
                      <h4 className="font-black text-sm uppercase mb-2 text-gray-500">{tl({ en: 'Built', th: 'ระบบที่สร้าง' })}</h4>
                      <p className="text-base font-bold leading-7 text-gray-700">{selectedProject.caseStudy.built}</p>
                    </div>
                    <div className="border-2 border-black p-4">
                      <h4 className="font-black text-sm uppercase mb-2 text-gray-500">{tl({ en: 'Result', th: 'ผลลัพธ์' })}</h4>
                      <p className="text-base font-bold leading-7 text-gray-700">{selectedProject.caseStudy.result}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="font-black text-lg uppercase mb-2 text-neo-blue">{tl({ en: 'System notes', th: 'รายละเอียดระบบ' })}</h4>
                <p className="text-base font-bold leading-7 text-gray-700">{selectedProject.longDescription || selectedProject.description}</p>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-black text-lg uppercase mb-3 text-neo-coral">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech && selectedProject.tech.map((tech, idx) => (
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
              {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                <div>
                  <h4 className="font-black text-lg uppercase mb-3 text-[#FFD700]">Highlights</h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex gap-3 font-mono text-sm">
                        <span className="text-neo-coral font-black">▶</span>
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
                    <Github size={20} /> {t('projects.viewCode')}
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-neo-pink border-2 border-black py-3 font-black text-center hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 shadow-neo uppercase flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={20} /> {t('projects.viewDemo')}
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
