import { useState, useEffect, createContext, useContext } from 'react'
import { translations, languages } from './index'

// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext()

// Get saved language or default to 'en'
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio-language')
    if (saved && translations[saved]) {
      return saved
    }
  }
  return 'en'
}

// Provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
    // Update html lang attribute for SEO
    document.documentElement.lang = language
  }, [language])

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        // Fallback to English if key not found
        value = translations['en']
        for (const k2 of keys) {
          if (value && typeof value === 'object') {
            value = value[k2]
          } else {
            return key // Return key if not found
          }
        }
        break
      }
    }

    return value || key
  }

  // Helper for inline translations: tl({ en: 'English', th: 'ไทย', zh: '中文' })
  const tl = (translationsObj) => {
    return translationsObj[language] || translationsObj['en'] || Object.values(translationsObj)[0]
  }

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang)
    }
  }

  return (
    <LanguageContext.Provider value={{ t, tl, language, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook to use translation
export const useTranslation = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}
