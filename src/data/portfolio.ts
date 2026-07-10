import type { Article, LocalizedData, Project } from './types'

export const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'Work', href: '/#work' },
  { label: 'Stack', href: '/#stack' },
  { label: 'Articles', href: '/#articles' },
]

export const projects: LocalizedData<Project[]> = {
  en: [
    {
      id: 1,
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
    },
  ],
  th: [
    {
      id: 1,
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
    },
  ],
}

export const articles: LocalizedData<Article[]> = {
  en: [
    {
      id: 1,
      title: 'React Best Practices for Maintainable Interfaces',
      excerpt: 'Practical patterns for keeping component boundaries, state, and rendering behavior understandable.',
      category: 'Development',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Tailwind CSS Patterns for Product UI',
      excerpt: 'A compact set of layout and styling practices for consistent responsive interfaces.',
      category: 'Frontend',
      readTime: '4 min read',
    },
    {
      id: 3,
      title: 'Building a Static Portfolio with Next.js',
      excerpt: 'Notes on structuring bilingual content, static rendering, and a focused single-page route.',
      category: 'Architecture',
      readTime: '6 min read',
    },
  ],
  th: [
    {
      id: 1,
      title: 'แนวทาง React สำหรับ Interface ที่ดูแลต่อได้',
      excerpt: 'แนวทางจัด component boundaries, state และ rendering behavior ให้เข้าใจและแก้ไขได้ง่าย',
      category: 'Development',
      readTime: '5 นาที',
    },
    {
      id: 2,
      title: 'รูปแบบ Tailwind CSS สำหรับ Product UI',
      excerpt: 'แนวทางกระชับสำหรับ layout และ styling ของ responsive interface ที่สม่ำเสมอ',
      category: 'Frontend',
      readTime: '4 นาที',
    },
    {
      id: 3,
      title: 'สร้าง Static Portfolio ด้วย Next.js',
      excerpt: 'บันทึกการจัดโครงสร้างเนื้อหาสองภาษา, static rendering และ route หน้าเดียวที่โฟกัสชัดเจน',
      category: 'Architecture',
      readTime: '6 นาที',
    },
  ],
}
