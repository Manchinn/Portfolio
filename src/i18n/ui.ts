export type Language = 'en' | 'th'

/**
 * All user-facing chrome/marketing copy in one module so the Astro i18n
 * routing can pull the right locale. Entity content (projects, articles)
 * lives in content collections; this module owns the surrounding chrome.
 */
export const UI = {
  en: {
    brand: 'Chinnakrit',
    // Navigation
    nav: { home: 'Home', work: 'Work', notes: 'Posts', about: 'About', archive: 'Archive', capabilities: 'Capabilities' },
    // Hero
    heroEyebrow: 'Notes & runbooks',
    heroTitle: 'A public record of what I am learning.',
    heroBody:
      'Practical notes on tools, workflows, and experiments, added as they are reviewed.',
    heroPrimaryCta: 'Read notes',
    heroMeta: [
      { label: 'Bilingual', value: 'EN / TH content' },
      { label: 'Static & fast', value: 'Astro SSG' },
    ],
    heroSystemLabel: 'System',
    // Work (with a fallback for an empty collection)
    workEyebrow: 'Projects',
    workTitle: 'A record of projects and experiments.',
    workSubtitle:
      'Each entry captures the context, implementation, and outcome as it is documented.',
    workEmptyTitle: 'Projects coming soon',
    workEmptyBody:
      'This section will collect projects and experiments with notes on what I learned.',
    workCaseStudy: {
      problem: 'Problem',
      built: 'Built',
      result: 'Result',
    },
    workFigPlaceholder: 'Fig. — image placeholder · swap in a real figure',
    // Notes / runbooks
    notesEyebrow: 'Notes & runbooks',
    notesTitle: 'Field notes from tools, workflows, and experiments.',
    notesSubtitle:
      'Practical records of tools, workflows, and decisions. Each note is curated from working material before it is published.',
    notesEmptyTitle: 'Notes are being prepared',
    notesEmptyBody: 'Public runbooks and technical notes will appear here as they are reviewed and edited.',
    notesBack: 'Back to notes',
    notesPublished: 'Published',
    notesUpdated: 'Updated',
    notesReadTime: 'Read',
    notesContents: 'Contents',
    // Capabilities
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: 'Areas I am exploring.',
    capabilitiesSubtitle: 'Tools and patterns documented in the notes.',
    capabilityCards: [
      {
        title: 'Web application patterns',
        statement:
          'Notes on typed web applications, clear data flows, validation, and maintainable boundaries.',
      },
      {
        title: 'Backend and API patterns',
        statement:
          'Notes on Express/Node services, REST APIs, auth, and integrations.',
      },
      {
        title: 'Frontend and UI patterns',
        statement:
          'Notes on responsive interfaces, bilingual support, and accessible controls.',
      },
      {
        title: 'Delivery and operations',
        statement:
          'Notes on repeatable builds, CI, deployment checks, and operational workflows.',
      },
    ],
    // Footer
    footer: 'Notes & runbooks',
  },
  th: {
    brand: 'ชินกฤต',
    // Navigation
    nav: { home: 'หน้าแรก', work: 'ผลงาน', notes: 'โพสต์', about: 'เกี่ยวกับ', archive: 'คลัง', capabilities: 'ความสามารถ' },
    // Hero
    heroEyebrow: 'บันทึกและ runbook',
    heroTitle: 'บันทึกสิ่งที่กำลังเรียนรู้',
    heroBody:
      'บันทึกการใช้งานเครื่องมือ workflow และการทดลอง โดยจะทยอยเผยแพร่เมื่อผ่านการตรวจทาน',
    heroPrimaryCta: 'อ่านบันทึก',
    heroMeta: [
      { label: 'สองภาษา', value: 'เนื้อหา EN / TH' },
      { label: 'Static และเร็ว', value: 'Astro SSG' },
    ],
    heroSystemLabel: 'ระบบ',
    // Work (with a fallback for an empty collection)
    workEyebrow: 'โปรเจกต์',
    workTitle: 'บันทึกโปรเจกต์และการทดลอง',
    workSubtitle: 'แต่ละรายการบันทึกบริบท วิธีทำ และผลลัพธ์เท่าที่พร้อมเผยแพร่',
    workEmptyTitle: 'ผลงานจะถูกเพิ่มเร็วๆ นี้',
    workEmptyBody:
      'ส่วนนี้จะรวบรวมโปรเจกต์และการทดลองพร้อมบทเรียนที่บันทึกไว้',
    workCaseStudy: {
      problem: 'ปัญหา',
      built: 'สิ่งที่สร้าง',
      result: 'ผลลัพธ์',
    },
    workFigPlaceholder: 'รูปตัวอย่าง — ใส่รูปจริงภายหลัง',
    // Notes / runbooks
    notesEyebrow: 'บันทึกและ runbook',
    notesTitle: 'บันทึกจากเครื่องมือ workflow และการทดลอง',
    notesSubtitle:
      'บันทึกการใช้งานเครื่องมือ workflow และการตัดสินใจ โดยคัดกรองจากโน้ตทำงานก่อนเผยแพร่',
    notesEmptyTitle: 'กำลังเตรียมบันทึก',
    notesEmptyBody: 'runbook และบันทึกเทคนิคที่ผ่านการตรวจทานจะทยอยเผยแพร่ที่นี่',
    notesBack: 'กลับไปหน้าบันทึก',
    notesPublished: 'เผยแพร่',
    notesUpdated: 'อัปเดต',
    notesReadTime: 'อ่าน',
    notesContents: 'เนื้อหา',
    // Capabilities
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: 'หัวข้อที่กำลังศึกษา',
    capabilitiesSubtitle: 'เครื่องมือและแนวคิดที่กำลังบันทึกไว้ใน notes',
    capabilityCards: [
      {
        title: 'รูปแบบเว็บแอป',
        statement:
          'บันทึกเรื่องเว็บแอปแบบ typed, data flow, validation และขอบเขตของโค้ด',
      },
      {
        title: 'รูปแบบ Backend และ API',
        statement:
          'บันทึกเรื่องบริการ Node/Express, REST API, auth และ integrations',
      },
      {
        title: 'รูปแบบ Frontend และ UI',
        statement: 'บันทึกเรื่องอินเทอร์เฟซ responsive การรองรับสองภาษา และการเข้าถึง',
      },
      {
        title: 'การส่งมอบและปฏิบัติการ',
        statement: 'บันทึกเรื่อง build, CI, การตรวจ deployment และ workflow ปฏิบัติการ',
      },
    ],
    // Footer
    footer: 'บันทึกและ runbook',
  },
} as const

export function getUI(language: Language) {
  return UI[language]
}

/** Fallback <meta name="description"> per locale (used by BaseLayout). */
export const META_DESCRIPTION: Record<Language, string> = {
  en: 'Notes, runbooks, and experiments by Chinnakrit.',
  th: 'บันทึก runbook และการทดลองของชินกฤต',
}
