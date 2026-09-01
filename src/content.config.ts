import { defineCollection, z } from 'astro:content'

/**
 * Projects: structured bilingual fact records (JSON per locale).
 * Articles: long-form bilingual prose (Markdown per locale).
 * Slug is NOT declared in the schema — Astro reserves that frontmatter key
 * for content collections. The slug is derived from the entry id (filename).
 */

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    lang: z.enum(['en', 'th']),
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    date: z.string(),
    category: z.string(),
    caseStudy: z.object({
      problem: z.string(),
      built: z.string(),
      result: z.string(),
    }),
    highlights: z.array(z.string()),
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
  }),
})

export const collections = { projects, articles }

/** Derive the locale-agnostic slug from a content entry id (e.g. "en/foo.md" -> "foo"). */
export function entrySlug(id: string): string {
  return id.replace(/^(en|th)\//, '').replace(/\.(md|mdx|json)$/, '')
}
