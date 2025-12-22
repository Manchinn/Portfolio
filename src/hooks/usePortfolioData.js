// ============================================
// Custom Hook for Portfolio Data
// ============================================

import { useState, useEffect } from 'react'
import * as PortfolioService from '../services/portfolioService'

/**
 * Hook สำหรับดึงข้อมูล Portfolio
 * @param {Function} fetchFunction - Service function ที่ใช้ดึงข้อมูล
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
  }, [])

  const refetch = () => {
    fetchData()
  }

  return { data, loading, error, refetch }
}

/**
 * Hook สำหรับดึงข้อมูล Profile
 */
export const useProfile = () => {
  return usePortfolioData(PortfolioService.getProfileData)
}

/**
 * Hook สำหรับดึงข้อมูล Skills
 */
export const useSkills = () => {
  return usePortfolioData(PortfolioService.getSkills)
}

/**
 * Hook สำหรับดึงข้อมูล Experiences
 */
export const useExperiences = () => {
  return usePortfolioData(PortfolioService.getExperiences)
}

/**
 * Hook สำหรับดึงข้อมูล Projects
 */
export const useProjects = () => {
  return usePortfolioData(PortfolioService.getProjects)
}

/**
 * Hook สำหรับดึงข้อมูล Socials
 */
export const useSocials = () => {
  return usePortfolioData(PortfolioService.getSocials)
}

/**
 * Hook สำหรับดึงข้อมูลทั้งหมดพร้อมกัน
 */
export const useAllPortfolioData = () => {
  return usePortfolioData(PortfolioService.getAllPortfolioData)
}
