export interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  date: string
  category: string
  caseStudy: {
    problem: string
    built: string
    result: string
  }
}

export interface Article {
  id: number
  title: string
  excerpt: string
  category: string
  readTime: string
}

export type Language = 'en' | 'th'

export interface LocalizedData<T> {
  en: T
  th: T
}
