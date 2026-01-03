// ============================================
// API Configuration & Base Functions
// ============================================

// Set API base URL (replace with your backend URL)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Timeout for API calls
const API_TIMEOUT = 10000 // 10 seconds

/**
 * Fetch wrapper with timeout & error handling
 */
const fetchWithTimeout = async (url, options = {}, timeout = API_TIMEOUT) => {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      }
    })

    clearTimeout(id)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    clearTimeout(id)

    if (error.name === 'AbortError') {
      throw new Error('Request timeout')
    }

    throw error
  }
}

// ============================================
// API Endpoints
// ============================================

/**
 * Fetch profile data
 */
export const fetchProfile = async () => {
  try {
    return await fetchWithTimeout(`${API_BASE_URL}/profile`)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Fetch skills data
 */
export const fetchSkills = async () => {
  try {
    return await fetchWithTimeout(`${API_BASE_URL}/skills`)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Fetch experiences data
 */
export const fetchExperiences = async () => {
  try {
    return await fetchWithTimeout(`${API_BASE_URL}/experiences`)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Fetch projects data
 */
export const fetchProjects = async () => {
  try {
    return await fetchWithTimeout(`${API_BASE_URL}/projects`)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Fetch socials data
 */
export const fetchSocials = async () => {
  try {
    return await fetchWithTimeout(`${API_BASE_URL}/socials`)
  } catch (error) {
    console.error('Error fetching socials:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Submit contact form
 */
export const submitContactForm = async (formData) => {
  try {
    return await fetchWithTimeout(`${API_BASE_URL}/contact`, {
      method: 'POST',
      body: JSON.stringify(formData)
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Fetch all portfolio data at once
 */
export const fetchAllPortfolioData = async () => {
  try {
    const [profile, skills, experiences, projects, socials] = await Promise.all([
      fetchProfile(),
      fetchSkills(),
      fetchExperiences(),
      fetchProjects(),
      fetchSocials()
    ])

    return {
      success: true,
      data: {
        profile: profile.success ? profile.data : null,
        skills: skills.success ? skills.data : null,
        experiences: experiences.success ? experiences.data : null,
        projects: projects.success ? projects.data : null,
        socials: socials.success ? socials.data : null
      }
    }
  } catch (error) {
    console.error('Error fetching all portfolio data:', error)
    return { success: false, error: error.message }
  }
}
