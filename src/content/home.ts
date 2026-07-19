import type { Language, LocalizedData } from '@/data/types'
import { getSharedChrome, type SharedChromeCopy } from '@/content/shared'

/**
 * Homepage marketing sections (hero, selected work chrome, capabilities, articles, contact).
 * Entity content (projects/articles) stays in src/data/portfolio.ts.
 * Shared CTAs/labels stay in src/content/shared.ts.
 */
export type HomeSectionCopy = {
  heroEyebrow: string
  heroTitle: string
  heroBody: string
  proofItems: Array<{ label: string; value: string }>
  selectedEyebrow: string
  selectedTitle: string
  selectedSubtitle: string
  capabilitiesEyebrow: string
  capabilitiesTitle: string
  capabilitiesSubtitle: string
  capabilityCards: Array<{ title: string; statement: string }>
  proofLabel: string
  articlesEyebrow: string
  articlesTitle: string
  articlesSubtitle: string
  readArticle: string
  contactEyebrow: string
  contactTitle: string
  contactBody: string
}

export type HomeCopy = HomeSectionCopy &
  Pick<
    SharedChromeCopy,
    'problem' | 'built' | 'result' | 'contactAction' | 'contactNotice' | 'viewSelectedWork'
  >

export const homeSections: LocalizedData<HomeSectionCopy> = {
  en: {
    heroEyebrow: 'Software engineering · Full-stack systems',
    heroTitle: 'I build clear, maintainable software for real workflows.',
    heroBody:
      'I turn rough requirements into typed web applications, internal tools, and production-ready interfaces that teams can understand and maintain.',
    proofItems: [
      { label: 'Selected work on one page', value: 'Problem, build, and result in place' },
      { label: 'Bilingual interface', value: 'One shared EN/TH content contract' },
      { label: 'Static articles', value: 'Typed technical writing routes' },
    ],
    selectedEyebrow: 'Selected work',
    selectedTitle: 'Verified work, shaped like product proof.',
    selectedSubtitle:
      'A focused view of application work with the story kept clear: problem, implementation, and result.',
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: 'What I can build for you.',
    capabilitiesSubtitle: 'Four software delivery areas behind the selected work.',
    capabilityCards: [
      {
        title: 'Full-stack Applications',
        statement:
          'I build typed web applications with clear data flows, validation, and maintainable boundaries.',
      },
      {
        title: 'Internal Tools & Dashboards',
        statement: 'I build database-backed tools and admin workflows that teams can actually use.',
      },
      {
        title: 'Product Interfaces',
        statement:
          'I compose responsive interfaces with clear states, bilingual support, and accessible controls.',
      },
      {
        title: 'Delivery & Operations',
        statement:
          'I make builds, deployment checks, and operational workflows repeatable and reviewable.',
      },
    ],
    proofLabel: 'Case summary',
    articlesEyebrow: 'Blog & Insights',
    articlesTitle: 'Writing on frontend and software architecture.',
    articlesSubtitle: 'Technical notes, implementation patterns, and development stories.',
    readArticle: 'Read article',
    contactEyebrow: 'Project inquiry',
    contactTitle: 'Have a workflow that needs a clearer software path?',
    contactBody:
      'Share the context, desired result, and constraints in a public GitHub issue. This site does not collect or store a project brief.',
  },
  th: {
    heroEyebrow: 'Software engineering · Full-stack systems',
    heroTitle: 'สร้างซอฟต์แวร์ที่ชัดเจน ดูแลต่อได้ และรองรับ workflow จริง',
    heroBody:
      'เปลี่ยน requirements ที่ยังไม่ชัดให้เป็น web applications, internal tools และ interfaces ที่พร้อมใช้งานจริงและทีมดูแลต่อได้',
    proofItems: [
      { label: 'Selected work บนหน้าเดียว', value: 'ปัญหา การสร้าง และผลลัพธ์ในที่เดียว' },
      { label: 'Bilingual interface', value: 'ใช้ content contract ร่วมกันใน EN/TH' },
      { label: 'Static articles', value: 'บทความเทคนิคแบบ typed routes' },
    ],
    selectedEyebrow: 'Selected work',
    selectedTitle: 'งานที่ยืนยันได้ และอ่านเหมือน product proof',
    selectedSubtitle:
      'นำเสนองาน application แบบโฟกัส ให้เห็นเรื่องหลักชัดเจน: ปัญหา การพัฒนา และผลลัพธ์',
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: 'สิ่งที่ผมสร้างให้คุณได้',
    capabilitiesSubtitle: 'สี่ด้านของการพัฒนาซอฟต์แวร์ที่อยู่เบื้องหลัง selected work',
    capabilityCards: [
      {
        title: 'Full-stack Applications',
        statement:
          'สร้าง web applications แบบ typed มี data flow, validation และ boundaries ที่ดูแลต่อได้',
      },
      {
        title: 'Internal Tools & Dashboards',
        statement: 'ผมสร้าง tools และ admin workflows ที่มี database รองรับและทีมใช้งานได้จริง',
      },
      {
        title: 'Product Interfaces',
        statement:
          'สร้าง responsive interface ที่มี clear states, bilingual support และ controls ที่เข้าถึงได้',
      },
      {
        title: 'Delivery & Operations',
        statement: 'ทำ build, deployment checks และ operational workflows ให้เรียกซ้ำและตรวจสอบได้',
      },
    ],
    proofLabel: 'สรุปเคส',
    articlesEyebrow: 'บทความและสาระ',
    articlesTitle: 'บันทึกเรื่อง Frontend และสถาปัตยกรรมซอฟต์แวร์',
    articlesSubtitle: 'บันทึกเชิงเทคนิค แนวทาง implementation และเรื่องราวการพัฒนาซอฟต์แวร์',
    readArticle: 'อ่านบทความ',
    contactEyebrow: 'Project inquiry',
    contactTitle: 'มี workflow ที่ต้องการเส้นทางพัฒนาซอฟต์แวร์ให้ชัดขึ้นหรือไม่',
    contactBody:
      'แชร์บริบท ผลลัพธ์ที่ต้องการ และข้อจำกัดผ่าน GitHub issue แบบสาธารณะ เว็บนี้ไม่เก็บหรือบันทึก project brief',
  },
}

export function getHomeCopy(language: Language): HomeCopy {
  const shared = getSharedChrome(language)
  return {
    ...homeSections[language],
    problem: shared.problem,
    built: shared.built,
    result: shared.result,
    contactAction: shared.contactAction,
    contactNotice: shared.contactNotice,
    viewSelectedWork: shared.viewSelectedWork,
  }
}
