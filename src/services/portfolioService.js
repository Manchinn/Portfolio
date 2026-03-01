// ============================================
// Portfolio Service - Data Management Layer
// ============================================

import * as API from "./api";

/**
 * Get Profile Data
 * @returns {Promise<Object>} Profile data
 */
export const getProfileData = async () => {
  const response = await API.fetchProfile();
  if (response.success) return response.data;
  throw new Error(response.error || "Failed to fetch profile");
};

/**
 * Get Skills Data
 * @returns {Promise<Array>} Skills array
 */
export const getSkills = async () => {
  const response = await API.fetchSkills();
  if (response.success) return response.data;
  throw new Error(response.error || "Failed to fetch skills");
};

/**
 * Get Experiences Data
 * @returns {Promise<Array>} Experiences array
 */
export const getExperiences = async () => {
  const response = await API.fetchExperiences();
  if (response.success) return response.data;
  throw new Error(response.error || "Failed to fetch experiences");
};

/**
 * Get Projects Data
 * @returns {Promise<Array>} Projects array
 */
export const getProjects = async () => {
  const response = await API.fetchProjects();
  if (response.success) return response.data;
  throw new Error(response.error || "Failed to fetch projects");
};

/**
 * Get Socials Data
 * @returns {Promise<Array>} Socials array
 */
export const getSocials = async () => {
  const response = await API.fetchSocials();
  if (response.success) return response.data;
  throw new Error(response.error || "Failed to fetch socials");
};

/**
 * Submit Contact Form
 * @param {Object} formData - Form data to submit
 * @returns {Promise<Object>} Response from API or mock success
 */
export const submitContact = async (formData) => {
  const response = await API.submitContactForm(formData);
  if (response.success) return response.data;
  throw new Error(response.error || "Failed to submit contact form");
};

/**
 * Get All Portfolio Data at Once
 * @returns {Promise<Object>} All portfolio data
 */
export const getAllPortfolioData = async () => {
  const response = await API.fetchAllPortfolioData();
  if (response.success) return response.data;
  throw new Error(response.error || "Failed to fetch portfolio data");
};

/**
 * Get Articles
 * @returns {Promise<Array>} Articles array
 */
export const getArticles = async () => {
  const response = await API.fetchArticles();
  if (response.success) return response.data;
  throw new Error(response.error || "Failed to fetch articles");
};

/**
 * Get Featured Articles
 * @returns {Promise<Array>} Featured articles array
 */
export const getFeaturedArticles = async () => {
  const response = await API.fetchFeaturedArticles();
  if (response.success) return response.data;
  throw new Error(response.error || "Failed to fetch featured articles");
};

/**
 * Get Single Article by Slug
 * @param {string} slug - Article slug
 * @returns {Promise<Object>} Article data
 */
export const getArticle = async (slug) => {
  const response = await API.fetchArticleBySlug(slug);
  if (response.success) return response.data;
  throw new Error(response.error || "Failed to fetch article");
};
