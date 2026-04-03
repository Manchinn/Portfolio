'use client'

import { createContext, useContext } from 'react'

export interface TranslationContext {
  t: (key: string) => string
  tl: (translations: Record<string, string>) => string
  language: string
  changeLanguage: (lang: string) => void
  languages: { code: string; name: string; nativeName: string }[]
}

export const LanguageContext = createContext<TranslationContext | null>(null)

export const useTranslation = (): TranslationContext => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}
