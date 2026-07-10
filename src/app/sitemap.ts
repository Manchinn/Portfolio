import type { MetadataRoute } from 'next'
import { articles, projects } from '@/data/portfolio'

const baseUrl = 'https://www.chinnakrit.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const articleRoutes = articles.en.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    priority: 0.6,
  }))
  const workRoutes = projects.en.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    priority: 0.8,
  }))

  return [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/work-with-me`, priority: 0.9 },
    ...workRoutes,
    ...articleRoutes,
  ]
}
