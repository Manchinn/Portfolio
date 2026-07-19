import type { Language, LocalizedData } from '@/data/types'

/**
 * Shared user-facing chrome used across home, articles, and shell.
 * Entity content (projects/articles) stays in src/data/portfolio.ts.
 */
export type SharedChromeCopy = {
  problem: string
  built: string
  result: string
  contactAction: string
  viewSelectedWork: string
  portfolioLabel: string
}

export const sharedChrome: LocalizedData<SharedChromeCopy> = {
  en: {
    problem: 'Problem',
    built: 'Built',
    result: 'Result',
    contactAction: 'Open public GitHub inquiry',
    viewSelectedWork: 'View selected work',
    portfolioLabel: 'Software engineering portfolio',
  },
  th: {
    problem: 'ปัญหา',
    built: 'สิ่งที่สร้าง',
    result: 'ผลลัพธ์',
    contactAction: 'เปิด GitHub inquiry สาธารณะ',
    viewSelectedWork: 'ดู selected work',
    portfolioLabel: 'พอร์ตโฟลิโอวิศวกรรมซอฟต์แวร์',
  },
}

export function getSharedChrome(language: Language): SharedChromeCopy {
  return sharedChrome[language]
}
