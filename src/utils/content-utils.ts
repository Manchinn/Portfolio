import { type CollectionEntry, getCollection } from 'astro:content'
import { entrySlug } from '@/content.config'
import type { Language } from '@/i18n/ui'
import { i18n } from '@/i18n/translation'
import I18nKey from '@/i18n/i18nKey'
import { getCategoryUrl } from '@utils/url-utils'

export type ArticleEntry = CollectionEntry<'articles'>

async function getRawSortedPosts(lang: Language = 'en'): Promise<ArticleEntry[]> {
  const entries = await getCollection('articles', ({ id, data }) => {
    return id.startsWith(`${lang}/`) && (import.meta.env.PROD ? data.draft !== true : true)
  })

  return entries.sort((a, b) => {
    const dateA = new Date(a.data.publishedAt).getTime()
    const dateB = new Date(b.data.publishedAt).getTime()
    return dateB - dateA
  })
}

export async function getSortedPosts(lang: Language = 'en') {
  return getRawSortedPosts(lang)
}

export async function getSortedPostsList(lang: Language = 'en') {
  const sorted = await getRawSortedPosts(lang)
  return sorted.map((entry) => ({ slug: entrySlug(entry.id), data: entry.data }))
}

export type Tag = { name: string; count: number }

export async function getTagList(lang: Language = 'en'): Promise<Tag[]> {
  const posts = await getRawSortedPosts(lang)
  const countMap: Record<string, number> = {}
  for (const post of posts) {
    for (const tag of post.data.tags) countMap[tag] = (countMap[tag] ?? 0) + 1
  }
  return Object.keys(countMap)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map((name) => ({ name, count: countMap[name] }))
}

export type Category = { name: string; count: number; url: string }

export async function getCategoryList(lang: Language = 'en'): Promise<Category[]> {
  const posts = await getRawSortedPosts(lang)
  const countMap: Record<string, number> = {}
  for (const post of posts) {
    const name = post.data.category.trim() || i18n(I18nKey.uncategorized, lang)
    countMap[name] = (countMap[name] ?? 0) + 1
  }
  return Object.keys(countMap)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map((name) => ({ name, count: countMap[name], url: getCategoryUrl(name, lang) }))
}
