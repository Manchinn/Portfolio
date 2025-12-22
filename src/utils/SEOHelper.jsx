import React, { useEffect } from 'react'

/**
 * Simple SEO Helper Component
 * ใช้สำหรับอัปเดต meta tags ต่างๆ
 */
const SEOHelper = ({ 
  title = "ชินณภา - Frontend Developer Portfolio",
  description = "Frontend Developer & Full-stack Developer Portfolio สร้างสรรค์เว็บไซต์ที่สวยงาม",
  image = "/og-image.jpg",
  url = "https://your-portfolio-url.com",
  type = "website"
}) => {
  useEffect(() => {
    // Update Title
    document.title = title
    
    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }
    
    // Update OG Tags
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)
    
    let ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.setAttribute('content', description)
    
    let ogImage = document.querySelector('meta[property="og:image"]')
    if (ogImage) ogImage.setAttribute('content', image)
    
    let ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', url)
    
    // Update Twitter Tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) twitterTitle.setAttribute('content', title)
    
    let twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) twitterDescription.setAttribute('content', description)
    
    let twitterImage = document.querySelector('meta[name="twitter:image"]')
    if (twitterImage) twitterImage.setAttribute('content', image)
    
  }, [title, description, image, url, type])

  return null // ไม่ต้อง render ไรเลย
}

export default SEOHelper
