export type Language = 'en' | 'th'

/**
 * All user-facing chrome/marketing copy in one module so the Astro i18n
 * routing can pull the right locale. Entity content (projects, articles)
 * lives in content collections, not here.
 */
export const UI = {
  en: {
    // Navigation
    nav: { home: 'Home', work: 'Work', stack: 'Stack', contact: 'Contact' },
    brand: 'Chinnakrit',
    // Hero
    heroEyebrow: 'Junior full-stack engineer',
    heroTitle: 'I build clear, maintainable software for real workflows.',
    heroBody:
      'I turn rough requirements into typed web applications, internal tools, and production-ready interfaces that teams can understand and maintain.',
    heroPrimaryCta: 'View selected work',
    heroSecondaryCta: 'Project inquiry',
    proofItems: [
      { label: 'Selected work on one page', value: 'Problem, build, and result in place' },
      { label: 'Bilingual interface', value: 'One shared EN/TH content contract' },
      { label: 'Static articles', value: 'Typed technical writing routes' },
    ],
    // Selected work
    selectedEyebrow: 'Selected work',
    selectedTitle: 'Verified work, shaped like product proof.',
    selectedSubtitle:
      'A focused view of application work with the story kept clear: problem, implementation, and result.',
    problem: 'Problem',
    built: 'Built',
    result: 'Result',
    proofLabel: 'Case summary',
    // Capabilities
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: 'What I can build for you.',
    capabilitiesSubtitle: 'Four software delivery areas behind the selected work.',
    capabilityCards: [
      { title: 'Full-stack Applications', statement: 'I build typed web applications with clear data flows, validation, and maintainable boundaries.' },
      { title: 'Internal Tools & Dashboards', statement: 'I build database-backed tools and admin workflows that teams can actually use.' },
      { title: 'Product Interfaces', statement: 'I compose responsive interfaces with clear states, bilingual support, and accessible controls.' },
      { title: 'Delivery & Operations', statement: 'I make builds, deployment checks, and operational workflows repeatable and reviewable.' },
    ],
    // Articles
    articlesEyebrow: 'Blog & Insights',
    articlesTitle: 'Writing on frontend and software architecture.',
    articlesSubtitle: 'Technical notes, implementation patterns, and development stories.',
    readArticle: 'Read article',
    back: 'Back to articles',
    related: 'Continue reading',
    // Contact
    contactEyebrow: 'Project inquiry',
    contactTitle: 'Have a workflow that needs a clearer software path?',
    contactBody:
      'Share the context, desired result, and constraints in a public GitHub issue. This site does not collect or store a project brief.',
    contactAction: 'Open GitHub inquiry',
    contactNotice:
      'Opens a public GitHub issue. Do not include private credentials or personal data you would not post publicly.',
    // Footer
    portfolioLabel: 'Junior full-stack engineering portfolio',
  },
  th: {
    // Navigation
    nav: { home: 'หน้าแรก', work: 'ผลงาน', stack: 'ความสามารถ', contact: 'ติดต่อ' },
    brand: 'ชินกฤต',
    // Hero (pixel eyebrows stay Latin — Silkscreen lacks Thai glyphs)
    heroEyebrow: 'Junior full-stack engineer',
    heroTitle: 'สร้างซอฟต์แวร์ที่ชัดเจน ดูแลต่อได้ และรองรับ workflow จริง',
    heroBody:
      'เปลี่ยน requirements ที่ยังไม่ชัดให้เป็นเว็บแอป เครื่องมือภายใน และอินเทอร์เฟซที่พร้อมใช้งานจริงและทีมดูแลต่อได้',
    heroPrimaryCta: 'ดูผลงานที่เลือก',
    heroSecondaryCta: 'สอบถามโปรเจกต์',
    proofItems: [
      { label: 'ผลงานบนหน้าเดียว', value: 'ปัญหา การสร้าง และผลลัพธ์ในที่เดียว' },
      { label: 'อินเทอร์เฟซสองภาษา', value: 'ใช้ content contract ร่วมกัน EN/TH' },
      { label: 'บทความแบบ static', value: 'เส้นทางบทความเทคนิคแบบ typed' },
    ],
    // Selected work
    selectedEyebrow: 'Selected work',
    selectedTitle: 'งานที่ยืนยันได้ อ่านง่ายเหมือน product proof',
    selectedSubtitle: 'โฟกัสงานแอป ให้เห็นเรื่องหลักชัด: ปัญหา การพัฒนา และผลลัพธ์',
    problem: 'ปัญหา',
    built: 'สิ่งที่สร้าง',
    result: 'ผลลัพธ์',
    proofLabel: 'สรุปเคส',
    // Capabilities
    capabilitiesEyebrow: 'Capabilities',
    capabilitiesTitle: 'สิ่งที่ผมสร้างให้คุณได้',
    capabilitiesSubtitle: 'สี่ด้านของการส่งมอบซอฟต์แวร์ที่อยู่เบื้องหลังผลงานที่เลือก',
    capabilityCards: [
      { title: 'แอป Full-stack', statement: 'สร้างเว็บแอปแบบ typed มี data flow, validation และขอบเขตที่ดูแลต่อได้' },
      { title: 'เครื่องมือภายในและแดชบอร์ด', statement: 'สร้าง tools และ admin workflow ที่มี database รองรับและทีมใช้ได้จริง' },
      { title: 'อินเทอร์เฟซผลิตภัณฑ์', statement: 'จัดอินเทอร์เฟซ responsive ที่มีสถานะชัด รองรับสองภาษา และควบคุมได้ด้วยคีย์บอร์ด' },
      { title: 'ส่งมอบและปฏิบัติการ', statement: 'ทำ build, ตรวจ deployment และ workflow ปฏิบัติการให้เรียกซ้ำและตรวจทานได้' },
    ],
    // Articles
    articlesEyebrow: 'บทความและสาระ',
    articlesTitle: 'บันทึกเรื่อง Frontend และสถาปัตยกรรมซอฟต์แวร์',
    articlesSubtitle: 'บันทึกเชิงเทคนิค แนวทาง implementation และเรื่องราวการพัฒนา',
    readArticle: 'อ่านบทความ',
    back: 'กลับไปบทความ',
    related: 'อ่านต่อ',
    // Contact
    contactEyebrow: 'Project inquiry',
    contactTitle: 'มี workflow ที่ต้องการเส้นทางพัฒนาซอฟต์แวร์ให้ชัดขึ้นหรือไม่',
    contactBody:
      'แชร์บริบท ผลลัพธ์ที่ต้องการ และข้อจำกัดผ่าน GitHub issue แบบสาธารณะ เว็บนี้ไม่เก็บหรือบันทึก project brief',
    contactAction: 'เปิด issue บน GitHub',
    contactNotice:
      'จะเปิด GitHub issue แบบสาธารณะ อย่าใส่รหัสผ่าน โทเคน หรือข้อมูลส่วนตัวที่ไม่ควรโพสต์สาธารณะ',
    // Footer
    portfolioLabel: 'พอร์ตโฟลิโอวิศวกรรม full-stack ระดับ junior',
  },
} as const

export function getUI(language: Language) {
  return UI[language]
}
