import type { Language } from './ui'

export const defaultLocale: Language = 'en'
export const locales: Language[] = ['en', 'th']

/** Accepted at build-time; falls back to default for unknown paths. */
export function localeFromString(value: string | undefined): Language {
  if (value === 'en' || value === 'th') return value
  return defaultLocale
}

/** True when a route lives under a non-default locale prefix (e.g. /th/*). */
export function isNonDefault(locale: Language): boolean {
  return locale !== defaultLocale
}
