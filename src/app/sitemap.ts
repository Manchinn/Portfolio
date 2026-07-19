import type { MetadataRoute } from 'next'
import { articles } from '@/data/portfolio'

const baseUrl = 'https://www.chinnakrit.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const articleRoutes = articles.en.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    priority: 0.6,
  }))

  return [
    { url: baseUrl, priority: 1 },
    ...articleRoutes,
  ]
}
