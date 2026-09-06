import type { Language } from '@/i18n/ui'

function localeBase(lang: Language = 'en') {
  return lang === 'th' ? '/th' : ''
}

function joinUrl(...parts: string[]): string {
  return parts.join('/').replace(/\/+/g, '/')
}

export function pathsEqual(path1: string, path2: string) {
  return path1.replace(/^\/+|\/+$/g, '').toLowerCase() === path2.replace(/^\/+|\/+$/g, '').toLowerCase()
}

export function url(path: string) {
  return joinUrl('', import.meta.env.BASE_URL, path)
}

export function getPostUrlBySlug(slug: string, lang: Language = 'en') {
  return url(`${localeBase(lang)}/posts/${slug}/`)
}

export function getTagUrl(tag: string, lang: Language = 'en') {
  return url(`${localeBase(lang)}/posts/tag/${filterSlug(tag)}/`)
}

export function getCategoryUrl(category: string | null, lang: Language = 'en') {
  if (!category || category.trim() === '') return url(`${localeBase(lang)}/posts/`)
  return url(`${localeBase(lang)}/posts/category/${filterSlug(category)}/`)
}

export function filterSlug(value: string): string {
  return value.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '')
}

export function getDir(path: string): string {
  const lastSlashIndex = path.lastIndexOf('/')
  return lastSlashIndex < 0 ? '/' : path.substring(0, lastSlashIndex + 1)
}
