// ============================================
// Custom Hook for Portfolio Data
// ============================================

import { useState, useEffect, useCallback, useContext } from 'react'
import { LanguageContext } from '../i18n/useTranslation'
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

  // Get language from context so data refetches when language changes
  const { language } = useContext(LanguageContext)

  const fetchData = useCallback(async () => {
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
  }, [fetchFunction])

  // Refetch when language changes
  useEffect(() => {
    fetchData()
  }, [language, fetchData])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

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
  const fetchArticle = useCallback(() => PortfolioService.getArticle(slug), [slug])
  return usePortfolioData(fetchArticle)
}

/** Fetch notifications with markAsRead action */
export const useNotifications = () => {
  const base = usePortfolioData(PortfolioService.getNotifications)
  const { refetch } = base

  const markAsRead = useCallback(async (ids) => {
    try {
      await PortfolioService.markAsRead(ids)
      refetch()
    } catch (err) {
      console.error('Error marking notifications as read:', err)
    }
  }, [refetch])

  return { ...base, markAsRead }
}
