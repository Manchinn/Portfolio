import type { Article, LocalizedData, Project } from './types'

export const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'Work', href: '/#work' },
  { label: 'Stack', href: '/#stack' },
  { label: 'Contact', href: '/#contact' },
]

/** Public GitHub Issues URL for project inquiries (opens outside this app). */
export const publicContactUrl = 'https://github.com/Manchinn/Portfolio/issues/new'

export const projects: LocalizedData<Project[]> = {
  en: [
    {
      id: 1,
      slug: 'student-logbook-system',
      title: 'Student Logbook System',
      description: 'Full-stack logbook system for student activity tracking and administration workflows.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
      date: '2024',
      category: 'Full-stack Application',
      caseStudy: {
        problem: 'Student activity tracking and administrator follow-up needed a structured workflow instead of scattered records.',
        built: 'A full-stack logbook system with database-backed records, authentication workflows, dashboard views, and deployment operations.',
        result: 'A maintainable application foundation that supports student records and administration workflows.',
      },
      highlights: [
        'Database-backed student records',
        'Authentication workflows with explicit boundaries',
        'Dashboard views for administration review and follow-up',
      ],
    },
  ],
  th: [
    {
      id: 1,
      slug: 'student-logbook-system',
      title: 'ระบบบันทึกกิจกรรมนักศึกษา',
      description: 'ระบบ full-stack สำหรับติดตามกิจกรรมนักศึกษาและ workflow ฝั่งผู้ดูแลระบบ',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
      date: '2024',
      category: 'Full-stack Application',
      caseStudy: {
        problem: 'การติดตามกิจกรรมนักศึกษาและงาน follow-up ฝั่งผู้ดูแลต้องการ workflow ที่เป็นระบบกว่า records ที่กระจัดกระจาย',
        built: 'สร้างระบบ logbook แบบ full-stack พร้อมข้อมูลใน database, authentication workflows, dashboard views และ deployment operations',
        result: 'ได้ foundation ของแอปที่ดูแลต่อได้ รองรับ records ของนักศึกษาและ workflow ฝั่งผู้ดูแลระบบ',
      },
      highlights: [
        'เก็บ records ของนักศึกษาใน database',
        'จัด authentication workflows ด้วยขอบเขตที่ชัดเจน',
        'สร้าง dashboard views สำหรับงานตรวจและ follow-up ฝั่งผู้ดูแล',
      ],
    },
  ],
}

export const articles: LocalizedData<Article[]> = {
  en: [
    {
      id: 1,
      slug: 'react-best-practices-for-maintainable-interfaces',
      title: 'React Best Practices for Maintainable Interfaces',
      excerpt: 'Practical patterns for keeping component boundaries, state, and rendering behavior understandable.',
      category: 'Development',
      readTime: '5 min read',
      sections: [
        {
          heading: 'Build components around responsibilities',
          paragraphs: [
            'A maintainable component has one clear reason to change. Keep data selection close to the route or feature that owns it, then pass small, explicit props into presentational components.',
            'When a component starts coordinating unrelated requests, layout rules, and form state, split it at those responsibility boundaries rather than by arbitrary file size.',
          ],
        },
        {
          heading: 'Give state one clear owner',
          paragraphs: [
            'Store the smallest state that represents user intent. Derive labels, filtered collections, and readiness flags during render instead of synchronizing duplicate values with effects.',
            'Use effects for real external synchronization such as browser storage, document metadata, or subscriptions. This keeps render behavior easier to predict and review.',
          ],
        },
        {
          heading: 'Verify complete interface states',
          paragraphs: [
            'Review the workflow through loading, empty, success, validation, and failure states. Keyboard navigation and reduced-motion behavior belong in the same verification pass as the happy path.',
          ],
          bullets: [
            'Prefer stable keys and explicit state transitions.',
            'Keep accessible names on icon-only controls.',
            'Test the user flow at mobile and desktop widths.',
          ],
        },
      ],
    },
    {
      id: 2,
      slug: 'tailwind-css-patterns-for-product-ui',
      title: 'Tailwind CSS Patterns for Product UI',
      excerpt: 'A compact set of layout and styling practices for consistent responsive interfaces.',
      category: 'Frontend',
      readTime: '4 min read',
      sections: [
        {
          heading: 'Start with a small token vocabulary',
          paragraphs: [
            'Define a restrained set of surface, text, border, action, spacing, and shadow tokens. Components should consume those roles instead of introducing one-off colors for every section.',
          ],
        },
        {
          heading: 'Make layout constraints explicit',
          paragraphs: [
            'Use stable max widths, grid tracks, aspect ratios, and minimum control sizes so content changes do not shift the interface unexpectedly. Let responsive breakpoints change composition, not the meaning of the page.',
          ],
          bullets: [
            'Constrain long text with readable line lengths.',
            'Reserve space for dynamic labels and validation messages.',
            'Use the same spacing rhythm across related sections.',
          ],
        },
        {
          heading: 'Treat interaction states as part of the design',
          paragraphs: [
            'Hover is only one state. Product UI also needs visible keyboard focus, disabled styling, clear validation, and touch targets that remain usable without pointer precision.',
          ],
        },
      ],
    },
    {
      id: 3,
      slug: 'building-a-static-portfolio-with-nextjs',
      title: 'Building a Static Portfolio with Next.js',
      excerpt: 'Notes on structuring bilingual content, static rendering, and a focused single-page route.',
      category: 'Architecture',
      readTime: '6 min read',
      sections: [
        {
          heading: 'Keep portfolio content typed and local',
          paragraphs: [
            'A small portfolio does not need a runtime content service. Typed TypeScript data makes project, article, and navigation contracts visible to the components that render them and catches missing localized fields during the build.',
          ],
        },
        {
          heading: 'Separate static routes from client preferences',
          paragraphs: [
            'Next.js can pre-render the route and article slugs while a small client provider remembers the visitor language. The content stays static and cacheable; only the presentation language changes after hydration.',
          ],
        },
        {
          heading: 'Use the production build as the contract',
          paragraphs: [
            'The build should validate every generated slug, client boundary, and localized data shape. Follow it with browser checks for navigation, language switching, article links, and the contact workflow.',
          ],
          bullets: [
            'Generate route params from the English and Thai shared slugs.',
            'Keep user-facing copy synchronized across both locales.',
            'Verify that every visible action reaches a real destination.',
          ],
        },
      ],
    },
  ],
  th: [
    {
      id: 1,
      slug: 'react-best-practices-for-maintainable-interfaces',
      title: 'แนวทาง React สำหรับ Interface ที่ดูแลต่อได้',
      excerpt: 'แนวทางจัด component boundaries, state และ rendering behavior ให้เข้าใจและแก้ไขได้ง่าย',
      category: 'Development',
      readTime: '5 นาที',
      sections: [
        {
          heading: 'ออกแบบ component ตามหน้าที่',
          paragraphs: [
            'Component ที่ดูแลต่อได้ควรมีเหตุผลหลักเพียงอย่างเดียวที่ทำให้ต้องเปลี่ยน เก็บการเลือกข้อมูลไว้ใกล้ route หรือ feature ที่เป็นเจ้าของ แล้วส่ง props ที่เล็กและชัดเจนให้ presentational components',
            'เมื่อ component เดียวเริ่มดูแลทั้ง requests, layout rules และ form state ที่ไม่เกี่ยวกัน ควรแยกตามขอบเขตความรับผิดชอบ ไม่ใช่แยกเพียงเพราะไฟล์ยาว',
          ],
        },
        {
          heading: 'ให้ state มีเจ้าของที่ชัดเจน',
          paragraphs: [
            'เก็บ state เท่าที่จำเป็นต่อ user intent ส่วน labels, filtered collections และ readiness flags ควรคำนวณระหว่าง render แทนการ sync ค่าซ้ำด้วย effects',
            'ใช้ effects เมื่อต้องเชื่อมกับสิ่งภายนอกจริง เช่น browser storage, document metadata หรือ subscriptions เพื่อให้ rendering behavior คาดเดาและตรวจสอบได้ง่าย',
          ],
        },
        {
          heading: 'ตรวจทุกสถานะของ interface',
          paragraphs: [
            'ตรวจ workflow ตั้งแต่ loading, empty, success, validation ไปจนถึง failure พร้อม keyboard navigation และ reduced-motion ในรอบเดียวกับ happy path',
          ],
          bullets: [
            'ใช้ stable keys และ state transitions ที่ชัดเจน',
            'กำหนด accessible name ให้ icon-only controls',
            'ทดสอบ user flow ทั้ง mobile และ desktop',
          ],
        },
      ],
    },
    {
      id: 2,
      slug: 'tailwind-css-patterns-for-product-ui',
      title: 'รูปแบบ Tailwind CSS สำหรับ Product UI',
      excerpt: 'แนวทางกระชับสำหรับ layout และ styling ของ responsive interface ที่สม่ำเสมอ',
      category: 'Frontend',
      readTime: '4 นาที',
      sections: [
        {
          heading: 'เริ่มจาก token vocabulary ขนาดเล็ก',
          paragraphs: [
            'กำหนด tokens สำหรับ surface, text, border, action, spacing และ shadow เท่าที่จำเป็น แล้วให้ components ใช้บทบาทเหล่านี้แทนการเพิ่มสีเฉพาะกิจในทุก section',
          ],
        },
        {
          heading: 'กำหนด layout constraints ให้ชัด',
          paragraphs: [
            'ใช้ max width, grid tracks, aspect ratio และขนาดขั้นต่ำของ controls ที่คงที่ เพื่อให้การเปลี่ยน content ไม่ทำให้ interface กระโดดโดยไม่คาดคิด ส่วน responsive breakpoints ควรเปลี่ยน composition โดยไม่เปลี่ยนความหมายของหน้า',
          ],
          bullets: [
            'จำกัดความยาวบรรทัดให้อ่านง่าย',
            'กันพื้นที่สำหรับ dynamic labels และ validation messages',
            'ใช้ spacing rhythm เดียวกันใน sections ที่เกี่ยวข้อง',
          ],
        },
        {
          heading: 'มอง interaction states เป็นส่วนหนึ่งของ design',
          paragraphs: [
            'Product UI ไม่ได้มีเพียง hover แต่ต้องมี keyboard focus ที่เห็นชัด, disabled state, validation ที่เข้าใจง่าย และ touch targets ที่กดได้โดยไม่ต้องใช้ pointer ที่แม่นยำ',
          ],
        },
      ],
    },
    {
      id: 3,
      slug: 'building-a-static-portfolio-with-nextjs',
      title: 'สร้าง Static Portfolio ด้วย Next.js',
      excerpt: 'บันทึกการจัดโครงสร้างเนื้อหาสองภาษา, static rendering และ route หน้าเดียวที่โฟกัสชัดเจน',
      category: 'Architecture',
      readTime: '6 นาที',
      sections: [
        {
          heading: 'เก็บ portfolio content เป็น typed local data',
          paragraphs: [
            'Portfolio ขนาดเล็กไม่จำเป็นต้องมี runtime content service ข้อมูล TypeScript ที่มี type ทำให้ contracts ของ project, article และ navigation ชัดต่อ components ที่นำไป render และ build จะช่วยตรวจ localized fields ที่ขาดได้',
          ],
        },
        {
          heading: 'แยก static routes ออกจาก client preferences',
          paragraphs: [
            'Next.js สามารถ pre-render route และ article slugs ขณะที่ client provider ขนาดเล็กจดจำภาษาของผู้เข้าชม Content ยังเป็น static และ cache ได้ มีเพียงภาษาที่แสดงผลซึ่งเปลี่ยนหลัง hydration',
          ],
        },
        {
          heading: 'ใช้ production build เป็น contract',
          paragraphs: [
            'Build ควรตรวจทุก generated slug, client boundary และ localized data shape จากนั้นใช้ browser ตรวจ navigation, language switching, article links และ contact workflow',
          ],
          bullets: [
            'สร้าง route params จาก shared slugs ของภาษาอังกฤษและไทย',
            'รักษา user-facing copy ให้ตรงกันในทั้งสองภาษา',
            'ตรวจว่าทุก action ที่มองเห็นพาไปยังปลายทางจริง',
          ],
        },
      ],
    },
  ],
}
