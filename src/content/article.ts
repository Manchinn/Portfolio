import type { Language, LocalizedData } from '@/data/types'

/**
 * Article route chrome (back link, related reading).
 * Entity body stays in src/data/portfolio.ts; shared inquiry CTAs in shared.ts.
 */
export type ArticleChromeCopy = {
  back: string
  related: string
  read: string
}

export const articleChrome: LocalizedData<ArticleChromeCopy> = {
  en: {
    back: 'Back to articles',
    related: 'Continue reading',
    read: 'Read article',
  },
  th: {
    back: 'กลับไปบทความ',
    related: 'อ่านต่อ',
    read: 'อ่านบทความ',
  },
}

export function getArticleChrome(language: Language): ArticleChromeCopy {
  return articleChrome[language]
}
