export type Language = 'en' | 'th'

/**
 * All user-facing chrome/marketing copy in one module so the Astro i18n
 * routing can pull the right locale. Entity content (projects, articles)
 * will live in content collections — currently empty, to be filled.
 */
export const UI = {
  en: {
    brand: 'Chinnakrit',
    // Navigation
    nav: { home: 'Home', work: 'Work', capabilities: 'Capabilities', contact: 'Contact' },
    // Hero
    heroEyebrow: 'Full-stack software engineer',
    heroTitle: 'I build full-stack software that ships.',
    heroBody:
      'From typed APIs to polished interfaces — I take rough requirements to production-ready software that teams understand and can maintain.',
    heroPrimaryCta: 'View selected work',
    heroSecondaryCta: 'Start a project',
    heroMeta: [
      { label: 'Bilingual', value: 'EN / TH content' },
      { label: 'Static & fast', value: 'Astro SSG' },
      { label: 'Privacy-first', value: 'No form, no tracking' },
    ],
    // Work (empty until projects are added)
    workEyebrow: 'Selected work',
    workTitle: 'A focused view of the software I build.',
    workSubtitle:
      'Each project is told as product proof: the problem, what I built, and the result.',
    workEmptyTitle: 'Selected work coming soon',
    workEmptyBody:
      'This section is where I present real projects with a clear problem → build → result story. It will be filled out next.',
    // Capabilities
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: 'What I can build for you.',
    capabilitiesSubtitle: 'Four delivery areas behind the work.',
    capabilityCards: [
      {
        title: 'Full-stack Applications',
        statement:
          'Typed web applications with clear data flows, validation, and maintainable boundaries — from database to UI.',
      },
      {
        title: 'Backend & APIs',
        statement:
          'Express/Node services, REST APIs, auth, multi-tenant scoping, realtime, and integrations.',
      },
      {
        title: 'Frontend & Product UI',
        statement:
          'Responsive interfaces with clear states, bilingual support, and accessible controls.',
      },
      {
        title: 'Delivery & Operations',
        statement:
          'Repeatable builds, CI, deployment checks, and operational workflows a team can review.',
      },
    ],
    // Contact
    contactEyebrow: 'Project inquiry',
    contactTitle: 'Have a workflow that needs a clearer software path?',
    contactBody:
      'Share the context, desired result, and constraints in a public GitHub issue. This site does not collect or store a project brief.',
    contactAction: 'Open GitHub inquiry',
    contactNotice:
      'Opens a public GitHub issue. Do not include private credentials or personal data you would not post publicly.',
    // Footer
    footer: 'Full-stack software engineer',
  },
  th: {
    brand: 'ชินกฤต',
    // Navigation
    nav: { home: 'หน้าแรก', work: 'ผลงาน', capabilities: 'ความสามารถ', contact: 'ติดต่อ' },
    // Hero
    heroEyebrow: 'Full-stack software engineer',
    heroTitle: 'สร้างซอฟต์แวร์ full-stack ที่ใช้งานได้จริง',
    heroBody:
      'ตั้งแต่ API ที่มี type ชัดไปจนถึงอินเทอร์เฟซที่เสร็จสมบูรณ์ — ปรับ requirements ที่คลุมเครือให้กลายเป็นซอฟต์แวร์พร้อมใช้งานที่ทีมดูแลต่อได้',
    heroPrimaryCta: 'ดูผลงาน',
    heroSecondaryCta: 'เริ่มโปรเจกต์',
    heroMeta: [
      { label: 'สองภาษา', value: 'เนื้อหา EN / TH' },
      { label: 'Static และเร็ว', value: 'Astro SSG' },
      { label: 'ความเป็นส่วนตัว', value: 'ไม่มีฟอร์ม ไม่มี tracking' },
    ],
    // Work (empty until projects are added)
    workEyebrow: 'Selected work',
    workTitle: 'โฟกัสซอฟต์แวร์ที่ผมสร้าง',
    workSubtitle: 'แต่ละโปรเจกต์นำเสนอแบบ product proof: ปัญหา สิ่งที่สร้าง และผลลัพธ์',
    workEmptyTitle: 'ผลงานจะถูกเพิ่มเร็วๆ นี้',
    workEmptyBody:
      'ส่วนนี้จะเป็นที่โชว์โปรเจกต์จริงพร้อมเรื่องราวปัญหา → การสร้าง → ผลลัพธ์ที่ชัดเจน จะเติมในขั้นถัดไป',
    // Capabilities
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: 'สิ่งที่ผมสร้างให้คุณได้',
    capabilitiesSubtitle: 'สี่ด้านของการส่งมอบที่อยู่เบื้องหลังงาน',
    capabilityCards: [
      {
        title: 'แอป Full-stack',
        statement:
          'เว็บแอปแบบ typed มี data flow, validation และขอบเขตที่ดูแลต่อได้ — ตั้งแต่ database ถึง UI',
      },
      {
        title: 'Backend และ API',
        statement:
          'บริการ Node/Express, REST API, auth, multi-tenant scoping, realtime และ integrations',
      },
      {
        title: 'Frontend และ Product UI',
        statement: 'อินเทอร์เฟซ responsive ที่มีสถานะชัด รองรับสองภาษา และควบคุมได้ด้วยคีย์บอร์ด',
      },
      {
        title: 'ส่งมอบและปฏิบัติการ',
        statement: 'build, CI, ตรวจ deployment และ workflow ปฏิบัติการที่ทีมตรวจทานได้',
      },
    ],
    // Contact
    contactEyebrow: 'Project inquiry',
    contactTitle: 'มี workflow ที่ต้องการเส้นทางพัฒนาซอฟต์แวร์ให้ชัดขึ้นหรือไม่',
    contactBody:
      'แชร์บริบท ผลลัพธ์ที่ต้องการ และข้อจำกัดผ่าน GitHub issue แบบสาธารณะ เว็บนี้ไม่เก็บหรือบันทึก project brief',
    contactAction: 'เปิด issue บน GitHub',
    contactNotice:
      'จะเปิด GitHub issue แบบสาธารณะ อย่าใส่รหัสผ่าน โทเคน หรือข้อมูลส่วนตัวที่ไม่ควรโพสต์สาธารณะ',
    // Footer
    footer: 'วิศวกรซอฟต์แวร์ full-stack',
  },
} as const

export function getUI(language: Language) {
  return UI[language]
}
