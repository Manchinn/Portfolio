import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.chinnakrit.dev', lastModified: new Date(), priority: 1 },
    { url: 'https://www.chinnakrit.dev/#about', lastModified: new Date(), priority: 0.8 },
    { url: 'https://www.chinnakrit.dev/#projects', lastModified: new Date(), priority: 0.8 },
    { url: 'https://www.chinnakrit.dev/#contact', lastModified: new Date(), priority: 0.5 },
    { url: 'https://www.chinnakrit.dev/demos', lastModified: new Date(), priority: 0.8 },
    { url: 'https://www.chinnakrit.dev/demos/hermes-line-assistant', lastModified: new Date(), priority: 0.7 },
    { url: 'https://www.chinnakrit.dev/demos/codex-devops', lastModified: new Date(), priority: 0.7 },
    { url: 'https://www.chinnakrit.dev/demos/vault-assistant', lastModified: new Date(), priority: 0.7 },
    { url: 'https://www.chinnakrit.dev/demos/internal-tools-dashboard', lastModified: new Date(), priority: 0.7 },
    { url: 'https://www.chinnakrit.dev/prompts', lastModified: new Date(), priority: 0.7 },
  ]
}
