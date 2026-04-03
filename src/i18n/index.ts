import en from './locales/en.json'
import th from './locales/th.json'

export const translations: Record<string, Record<string, unknown>> = { en, th }

export const languages = [
  { code: 'en' as const, name: 'EN', nativeName: 'English' },
  { code: 'th' as const, name: 'TH', nativeName: 'ไทย' },
]
