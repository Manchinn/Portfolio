export interface Project {
  id: number
  slug: string
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
  highlights: string[]
}

export interface ArticleSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export interface Article {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  sections: ArticleSection[]
}

export type Language = 'en' | 'th'

export interface LocalizedData<T> {
  en: T
  th: T
}
