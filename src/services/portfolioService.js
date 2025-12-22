// ============================================
// Portfolio Service - Data Management Layer
// ============================================

import * as API from "./api";
import * as StaticData from "../data/portfolio";

/**
 * Get Profile Data
 * @returns {Promise<Object>} Profile data
 */
export const getProfileData = async () => {
  const response = await API.fetchProfile();
  if (response.success) {
    return response.data;
  }
  // Fallback to static data if API fails
  console.warn("API failed, using static data for profile");

  return StaticData.profileData;
};

/**
 * Get Skills Data
 * @returns {Promise<Array>} Skills array
 */
export const getSkills = async () => {
    const response = await API.fetchSkills();
    if (response.success) {
      return response.data;
    }
    console.warn("API failed, using static data for skills");

  return StaticData.skills;
};

/**
 * Get Experiences Data
 * @returns {Promise<Array>} Experiences array
 */
export const getExperiences = async () => {
    const response = await API.fetchExperiences();
    if (response.success) {
      return response.data;
    }
    console.warn("API failed, using static data for experiences");

  return StaticData.experiences;
};

/**
 * Get Projects Data
 * @returns {Promise<Array>} Projects array
 */
export const getProjects = async () => {
    const response = await API.fetchProjects();
    if (response.success) {
      return response.data;
    }
    console.warn("API failed, using static data for projects");

  return StaticData.projects;
};

/**
 * Get Socials Data
 * @returns {Promise<Array>} Socials array
 */
export const getSocials = async () => {
    const response = await API.fetchSocials();
    if (response.success) {
      return response.data;
    }
    console.warn("API failed, using static data for socials");

  return StaticData.socials;
};

/**
 * Get Navigation Items
 * @returns {Array} Navigation items
 */
export const getNavItems = () => {
  return StaticData.navItems;
};

/**
 * Submit Contact Form
 * @param {Object} formData - Form data to submit
 * @returns {Promise<Object>} Response from API or mock success
 */
export const submitContact = async (formData) => {
  
  // Mock response for static mode
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Contact form submitted (mock):", formData);
      resolve({ success: true, message: "Message sent successfully!" });
    }, 1000);
  });
};

/**
 * Get All Portfolio Data at Once
 * @returns {Promise<Object>} All portfolio data
 */
export const getAllPortfolioData = async () => {
    const response = await API.fetchAllPortfolioData();
    if (response.success) {
      return response.data;
    }
    console.warn("API failed, using static data");

  // Return all static data
  return {
    profile: StaticData.profileData,
    skills: StaticData.skills,
    experiences: StaticData.experiences,
    projects: StaticData.projects,
    socials: StaticData.socials,
  };
};
