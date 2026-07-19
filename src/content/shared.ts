import type { Language, LocalizedData } from '@/data/types'

/**
 * Shared user-facing chrome used across home, proof routes, and shell.
 * Entity content (projects/articles) stays in src/data/portfolio.ts.
 * Page-specific marketing copy still lives next to those surfaces until later phases.
 */
export type SharedChromeCopy = {
  problem: string
  built: string
  result: string
  createBrief: string
  openProof: string
  portfolioLabel: string
}

export const sharedChrome: LocalizedData<SharedChromeCopy> = {
  en: {
    problem: 'Problem',
    built: 'Built',
    result: 'Result',
    createBrief: 'Create a project brief',
    openProof: 'Open proof demo',
    portfolioLabel: 'Software engineering portfolio',
  },
  th: {
    problem: 'ปัญหา',
    built: 'สิ่งที่สร้าง',
    result: 'ผลลัพธ์',
    createBrief: 'สร้าง Project Brief',
    openProof: 'เปิด Proof Demo',
    portfolioLabel: 'พอร์ตโฟลิโอวิศวกรรมซอฟต์แวร์',
  },
}

export function getSharedChrome(language: Language): SharedChromeCopy {
  return sharedChrome[language]
}
