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

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
