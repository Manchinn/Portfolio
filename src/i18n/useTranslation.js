import { createContext, useContext } from 'react'

export const LanguageContext = createContext()

// Hook to use translation
export const useTranslation = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}
