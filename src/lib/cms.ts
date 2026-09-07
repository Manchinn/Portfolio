// Build-time CMS loader (Phase 3 adapter).
//
// Reads published content from Supabase through the publishable (anon) key.
// RLS guarantees anonymous callers only ever receive `published` rows, so no
// secret is required at build time. If Supabase is unreachable or returns no
// rows, we fall back to the local content collections and say so at build
// time — a failed database request never silently empties the site.
//
// Shape-compatibility: returns Astro CollectionEntry-like objects so the
// existing page components keep working unchanged (plan Phase 3: "keep the
// existing page components and route shape unchanged").

import { getCollection, type CollectionEntry } from 'astro:content'
import { createBuildClient } from '@/lib/supabase'
import type { ContentLocale } from '@/lib/supabase'

export type ProjectEntry = CollectionEntry<'projects'>
export type ArticleEntry = CollectionEntry<'articles'>

type Source = 'supabase' | 'local-fallback'

const db = createBuildClient()

function isoDate(value: string | null): string {
  return value ? value.slice(0, 10) : ''
}

interface ProjectTranslationRow {
  title: string
  description: string
  category: string
  tech: string[] | null
  highlights: string[] | null
  problem: string | null
  built: string | null
  result: string | null
}

async function fetchProjects(locale: ContentLocale): Promise<ProjectEntry[]> {
  const { data, error } = await db
    .from('projects')
    .select(
      `slug, status, project_date, project_translations!inner (
        title, description, category, tech, highlights, problem, built, result, locale
      )`
    )
    .eq('project_translations.locale', locale)
    .eq('status', 'published')
  if (error) throw new Error(`projects: ${error.message}`)

  return (data ?? []).map((row) => {
    // PostgREST returns nested relations as arrays even with !inner.
    const rel = row.project_translations as unknown as ProjectTranslationRow | ProjectTranslationRow[]
    const t = Array.isArray(rel) ? rel[0] : rel
    const entry = {
      id: `${locale}/${row.slug}.json`,
      slug: row.slug,
      body: undefined,
      collection: 'projects',
      data: {
        lang: locale,
        title: t.title,
        description: t.description,
        tech: t.tech ?? [],
        category: t.category,
        date: row.project_date ?? undefined,
        highlights: t.highlights ?? [],
        caseStudy:
          t.problem && t.built && t.result
            ? { problem: t.problem, built: t.built, result: t.result }
            : undefined,
      },
    }
    return entry as unknown as ProjectEntry
  })
}

interface ArticleTranslationRow {
  title: string
  description: string
  body_markdown: string
  reading_time_minutes: number | null
}

async function fetchArticles(locale: ContentLocale): Promise<ArticleEntry[]> {
  const { data, error } = await db
    .from('articles')
    .select(
      `slug, status, published_at, article_translations!inner (
        title, description, body_markdown, reading_time_minutes, locale
      )`
    )
    .eq('article_translations.locale', locale)
    .eq('status', 'published')
  if (error) throw new Error(`articles: ${error.message}`)

  return (data ?? []).map((row) => {
    // PostgREST returns nested relations as arrays even with !inner.
    const rel = row.article_translations as unknown as ArticleTranslationRow | ArticleTranslationRow[]
    const t = Array.isArray(rel) ? rel[0] : rel
    const readTime =
      t.reading_time_minutes != null && t.reading_time_minutes > 0
        ? `${t.reading_time_minutes} min`
        : '—'
    const entry = {
      id: `${locale}/${row.slug}.md`,
      slug: row.slug,
      collection: 'articles',
      data: {
        lang: locale,
        title: t.title,
        excerpt: t.description,
        category: 'notes',
        readTime,
        publishedAt: isoDate(row.published_at),
        tags: [] as string[],
        draft: false,
      },
      // Detail pages render DB markdown through this field instead of
      // astro:content's compiled body (see pages/posts/[slug].astro).
      body: t.body_markdown,
      // Minimal shim so PostCard's entry.render() keeps working.
      render: async () => ({ remarkPluginFrontmatter: {} }),
    }
    return entry as unknown as ArticleEntry
  })
}

async function load<T>(
  label: 'projects' | 'articles',
  fetchDb: () => Promise<T[]>,
  fallback: () => Promise<T[]>
): Promise<{ items: T[]; source: Source }> {
  try {
    const items = await fetchDb()
    if (items.length > 0) return { items, source: 'supabase' }
    console.warn(`[cms] ${label}: supabase returned 0 published rows — using local collections`)
  } catch (err) {
    console.warn(`[cms] ${label}: supabase unavailable (${(err as Error).message}) — using local collections`)
  }
  return { items: await fallback(), source: 'local-fallback' }
}

export async function loadProjects(lang: ContentLocale): Promise<ProjectEntry[]> {
  const { items, source } = await load(
    'projects',
    () => fetchProjects(lang),
    () => getCollection('projects', ({ id }) => id.startsWith(`${lang}/`))
  )
  console.info(`[cms] projects/${lang}: source=${source} count=${items.length}`)
  return items
}

export async function loadArticles(lang: ContentLocale): Promise<ArticleEntry[]> {
  const { items, source } = await load(
    'articles',
    () => fetchArticles(lang),
    () =>
      getCollection(
        'articles',
        ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft
      )
  )
  console.info(`[cms] articles/${lang}: source=${source} count=${items.length}`)
  return items
}
