export interface Profile {
  name: string
  title: string
  bio: string
  shortBio: string
  location: string
}

export interface ProfileCommon {
  image: string
  email: string
  phone: string
  resume: string
}

export interface SkillItem {
  name: string
  level: string
}

export interface SkillGroup {
  category: string
  items: SkillItem[]
}

export interface Experience {
  id: number
  year: string
  position: string
  company: string
  description: string
  achievements: string[]
}

export interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  tech: string[]
  image: string
  github: string
  demo: string
  date: string
  category: string
  highlights: string[]
}

export interface Social {
  name: string
  url: string
  icon: string
  color: string
}

export interface Article {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  tags: string[]
  category: string
  readTime: string
  date: string
  featured: boolean
}

export type Language = 'en' | 'th'

export interface LocalizedData<T> {
  en: T
  th: T
}
