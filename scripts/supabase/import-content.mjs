import { readFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import process from 'node:process'

import { createClient } from '@supabase/supabase-js'
import { parse as parseYaml } from 'yaml'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const locales = ['en', 'th']

for (const envFile of ['.env.local', '.env']) {
  const envPath = path.join(repoRoot, envFile)
  if (typeof process.loadEnvFile === 'function') {
    try {
      process.loadEnvFile(envPath)
    } catch {
      // Optional env files are loaded when present.
    }
  }
}

const supabaseUrl = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const dryRun = process.argv.includes('--dry-run')

if (!dryRun && (!supabaseUrl || !serviceRoleKey)) {
  throw new Error(
    'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required. They are server-only values; never use PUBLIC_* variables here.',
  )
}

const supabase = dryRun
  ? null
  : createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

function parseDate(value, label) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${label} must use YYYY-MM-DD`)
  }
  return `${value}T00:00:00.000Z`
}

function parseReadingTime(value) {
  if (typeof value !== 'string') return null
  const match = value.match(/\d+/)
  return match ? Number(match[0]) : null
}

function assertString(value, label) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${label} is required`)
  }
  return value.trim()
}

async function readArticle(locale, filename) {
  const source = await readFile(path.join(repoRoot, 'src/content/articles', locale, filename), 'utf8')
  if (!source.startsWith('---')) throw new Error(`${filename} is missing frontmatter`)

  const end = source.indexOf('\n---', 3)
  if (end < 0) throw new Error(`${filename} has an unterminated frontmatter block`)

  const data = parseYaml(source.slice(3, end))
  if (data.lang !== locale) throw new Error(`${filename}: lang must be ${locale}`)

  return {
    slug: filename.replace(/\.md$/, ''),
    locale,
    title: assertString(data.title, `${filename}: title`),
    description: assertString(data.excerpt, `${filename}: excerpt`),
    bodyMarkdown: assertString(source.slice(end + 4), `${filename}: body`),
    seoTitle: typeof data.seoTitle === 'string' ? data.seoTitle.trim() : null,
    seoDescription: typeof data.seoDescription === 'string' ? data.seoDescription.trim() : null,
    readingTimeMinutes: parseReadingTime(data.readTime),
    publishedAt: parseDate(data.publishedAt, `${filename}: publishedAt`),
    draft: data.draft === true,
  }
}

async function readProject(locale, filename) {
  const source = JSON.parse(
    await readFile(path.join(repoRoot, 'src/content/projects', locale, filename), 'utf8'),
  )
  if (source.lang !== locale) throw new Error(`${filename}: lang must be ${locale}`)

  return {
    slug: filename.replace(/\.json$/, ''),
    locale,
    title: assertString(source.title, `${filename}: title`),
    description: assertString(source.description, `${filename}: description`),
    category: assertString(source.category, `${filename}: category`),
    tech: Array.isArray(source.tech) ? source.tech.filter((item) => typeof item === 'string') : [],
    highlights: Array.isArray(source.highlights)
      ? source.highlights.filter((item) => typeof item === 'string')
      : [],
    caseStudy: source.caseStudy ?? null,
    date: typeof source.date === 'string' ? source.date.trim() : null,
  }
}

async function readLocaleFiles(kind, locale) {
  const directory = path.join(repoRoot, 'src/content', kind, locale)
  const extension = kind === 'articles' ? '.md' : '.json'
  const files = (await readdir(directory)).filter((file) => file.endsWith(extension)).sort()
  return Promise.all(
    files.map((file) => (kind === 'articles' ? readArticle(locale, file) : readProject(locale, file))),
  )
}

function pairLocales(records, kind) {
  const byLocale = Object.fromEntries(locales.map((locale) => [locale, new Map()]))
  for (const record of records) byLocale[record.locale].set(record.slug, record)

  const slugs = new Set([...byLocale.en.keys(), ...byLocale.th.keys()])
  for (const slug of slugs) {
    for (const locale of locales) {
      if (!byLocale[locale].has(slug)) {
        throw new Error(`${kind} slug ${slug} is missing its ${locale} translation`)
      }
    }
  }

  return [...slugs].sort().map((slug) => ({ en: byLocale.en.get(slug), th: byLocale.th.get(slug) }))
}

async function upsertBase(table, row) {
  const { data, error } = await supabase
    .from(table)
    .upsert(row, { onConflict: 'slug' })
    .select('id, slug')
    .single()
  if (error) throw new Error(`${table} ${row.slug}: ${error.message}`)
  return data
}

async function updateStatus(table, id, status) {
  const { error } = await supabase.from(table).update({ status }).eq('id', id)
  if (error) throw new Error(`${table} ${id}: ${error.message}`)
}

async function importArticles(pairs) {
  for (const pair of pairs) {
    const base = await upsertBase('articles', {
      slug: pair.en.slug,
      published_at: pair.en.publishedAt,
    })

    const translations = [pair.en, pair.th].map((record) => ({
      article_id: base.id,
      locale: record.locale,
      title: record.title,
      description: record.description,
      body_markdown: record.bodyMarkdown,
      seo_title: record.seoTitle,
      seo_description: record.seoDescription,
      reading_time_minutes: record.readingTimeMinutes,
    }))
    const { error } = await supabase
      .from('article_translations')
      .upsert(translations, { onConflict: 'article_id,locale' })
    if (error) throw new Error(`article_translations ${pair.en.slug}: ${error.message}`)

    await updateStatus('articles', base.id, pair.en.draft || pair.th.draft ? 'draft' : 'published')
  }
}

async function importProjects(pairs) {
  for (const pair of pairs) {
    if (pair.en.date !== pair.th.date) {
      throw new Error(`projects ${pair.en.slug}: EN/TH dates must match`)
    }

    const base = await upsertBase('projects', {
      slug: pair.en.slug,
      project_date: pair.en.date,
    })

    const translations = [pair.en, pair.th].map((record) => ({
      project_id: base.id,
      locale: record.locale,
      title: record.title,
      description: record.description,
      category: record.category,
      tech: record.tech,
      highlights: record.highlights,
      problem: record.caseStudy?.problem ?? null,
      built: record.caseStudy?.built ?? null,
      result: record.caseStudy?.result ?? null,
    }))
    const { error } = await supabase
      .from('project_translations')
      .upsert(translations, { onConflict: 'project_id,locale' })
    if (error) throw new Error(`project_translations ${pair.en.slug}: ${error.message}`)

    await updateStatus('projects', base.id, 'published')
  }
}

const articles = pairLocales(
  (await Promise.all(locales.map((locale) => readLocaleFiles('articles', locale)))).flat(),
  'articles',
)
const projects = pairLocales(
  (await Promise.all(locales.map((locale) => readLocaleFiles('projects', locale)))).flat(),
  'projects',
)

if (dryRun) {
  console.log(`Validated ${articles.length} articles and ${projects.length} projects for en/th.`)
  process.exit(0)
}

await importArticles(articles)
await importProjects(projects)

console.log(`Imported ${articles.length} articles and ${projects.length} projects for en/th.`)
