import { defineCollection, z } from 'astro:content'

/**
 * Projects (JSON per locale) and articles (Markdown per locale).
 * Public articles are curated from private working notes before they enter
 * this repository; the build never reads the local Obsidian vault.
 * Slug is NOT declared in the schema (Astro reserves it for content); derive
 * it from the entry id with entrySlug().
 */

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    lang: z.enum(['en', 'th']),
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    category: z.string(),
    // Optional detail fields, used when a work-detail route exists.
    date: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    caseStudy: z
      .object({ problem: z.string(), built: z.string(), result: z.string() })
      .optional(),
  }),
})

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    lang: z.enum(['en', 'th']),
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    readTime: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
})

export const collections = { projects, articles }

/** Derive the locale-agnostic slug from a content entry id (e.g. "en/foo.json" -> "foo"). */
export function entrySlug(id: string): string {
  return id.replace(/^(en|th)\//, '').replace(/\.(md|mdx|json)$/, '')
}
