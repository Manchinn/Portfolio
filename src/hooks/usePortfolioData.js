// ============================================
// Custom Hook for Portfolio Data
// ============================================

import { useState, useEffect } from 'react'
import * as PortfolioService from '../services/portfolioService'

/**
 * Generic hook for fetching portfolio data
 * @param {Function} fetchFunction - Service function used to fetch data
 * @returns {Object} { data, loading, error, refetch }
 */
export const usePortfolioData = (fetchFunction) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Get language key to trigger refetch on language change
  const [languageKey, setLanguageKey] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-language') || 'en'
    }
    return 'en'
  })

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFunction()
      setData(result)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Listen for language changes
  useEffect(() => {
    const handleStorageChange = () => {
      const newLang = localStorage.getItem('portfolio-language') || 'en'
      setLanguageKey(newLang)
    }

    // Listen for storage events (language changes in other tabs)
    window.addEventListener('storage', handleStorageChange)

    // Also check periodically for changes in the same tab
    const interval = setInterval(() => {
      const currentLang = localStorage.getItem('portfolio-language') || 'en'
      if (currentLang !== languageKey) {
        setLanguageKey(currentLang)
      }
    }, 500)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [languageKey])

  // Refetch when language changes
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageKey])

  const refetch = () => {
    fetchData()
  }

  return { data, loading, error, refetch }
}

/** Fetch profile data */
export const useProfile = () => {
  return usePortfolioData(PortfolioService.getProfileData)
}

/** Fetch skills data */
export const useSkills = () => {
  return usePortfolioData(PortfolioService.getSkills)
}

/** Fetch experience data */
export const useExperiences = () => {
  return usePortfolioData(PortfolioService.getExperiences)
}

/** Fetch projects data */
export const useProjects = () => {
  return usePortfolioData(PortfolioService.getProjects)
}

/** Fetch social links data */
export const useSocials = () => {
  return usePortfolioData(PortfolioService.getSocials)
}

/** Fetch all portfolio data */
export const useAllPortfolioData = () => {
  return usePortfolioData(PortfolioService.getAllPortfolioData)
}

/** Fetch articles */
export const useArticles = () => {
  return usePortfolioData(PortfolioService.getArticles)
}

/** Fetch featured articles */
export const useFeaturedArticles = () => {
  return usePortfolioData(PortfolioService.getFeaturedArticles)
}

/** Fetch single article by slug */
export const useArticle = (slug) => {
  return usePortfolioData(() => PortfolioService.getArticle(slug))
}
