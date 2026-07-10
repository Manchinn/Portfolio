import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects } from '@/data/portfolio'
import ProjectContent from './ProjectContent'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.en.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = projects.en.find((item) => item.slug === slug)

  return project
    ? { title: `${project.title} | Selected Work`, description: project.description }
    : {}
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.en.find((item) => item.slug === slug)
  if (!project) notFound()

  return <ProjectContent slug={slug} />
}
