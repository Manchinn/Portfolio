'use client'

import { useState, useEffect } from 'react'
import { translations, languages } from './index'
import { LanguageContext } from './LanguageContext'

const getInitialLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio-language')
    if (saved && translations[saved]) return saved
  }
  return 'en'
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: unknown = translations[language]
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[k]
      } else {
        let fallback: unknown = translations['en']
        for (const k2 of keys) {
          if (fallback && typeof fallback === 'object') {
            fallback = (fallback as Record<string, unknown>)[k2]
          } else return key
        }
        return (typeof fallback === 'string' ? fallback : key)
      }
    }
    return (typeof value === 'string' ? value : key)
  }

  const tl = (translationsObj: Record<string, string>): string => {
    return translationsObj[language] || translationsObj['en'] || Object.values(translationsObj)[0]
  }

  const changeLanguage = (lang: string) => {
    if (translations[lang]) setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ t, tl, language, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}
