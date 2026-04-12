import type { Profile, ProfileCommon, SkillGroup, Experience, Project, Social, Article, Language, LocalizedData } from './types'

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "Prompts", href: "/prompts" },
  { label: "Contact", href: "#contact" },
]

export const profile: LocalizedData<Profile> = {
  en: {
    name: "Chinnakrit Sripan",
    title: "Frontend Developer / Full-stack Developer",
    bio: "I'm a passionate React & Web Developer who loves building beautiful and functional web applications.",
    shortBio: "My Portfolio Website to showcase my projects and skills",
    location: "Thailand",
  },
  th: {
    name: "ชินกฤต (Chinnakrit Sripan)",
    title: "Frontend Developer / Full-stack Developer",
    bio: "นักพัฒนา React & Web Developer ที่มีความหลงใหลในการสร้างเว็บไซต์ที่สวยงามและใช้งานได้ดี",
    shortBio: "เว็บ Portfolio แสดงผลงานและทักษะของผม",
    location: "ประเทศไทย",
  },
}

export const profileCommon: ProfileCommon = {
  image: "/profile/profile2.jpeg",
  email: "chinnakrit.srp@gmail.com",
  phone: "+66 94 665 0259",
  resume: "/Chinnakrit-Sripan_CV.pdf",
}

export const skills: LocalizedData<SkillGroup[]> = {
  en: [
    {
      category: "Frontend",
      items: [
        { name: "React", level: "Advanced" },
        { name: "JavaScript", level: "Advanced" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "HTML/CSS", level: "Advanced" },
        { name: "Responsive Design", level: "Advanced" },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", level: "Intermediate" },
        { name: "Express.js", level: "Intermediate" },
        { name: "MongoDB", level: "Intermediate" },
        { name: "RESTful API", level: "Intermediate" },
      ],
    },
    {
      category: "Tools & Others",
      items: [
        { name: "Git/GitHub", level: "Advanced" },
        { name: "Vite", level: "Advanced" },
        { name: "VS Code", level: "Advanced" },
        { name: "Figma", level: "Intermediate" },
        { name: "Docker", level: "Beginner" },
      ],
    },
    {
      category: "Languages",
      items: [
        { name: "Thai", level: "Native" },
        { name: "English", level: "Intermediate" },
      ],
    },
  ],
  th: [
    {
      category: "ส่วนหน้าเว็บ (Frontend)",
      items: [
        { name: "React", level: "Advanced" },
        { name: "JavaScript", level: "Advanced" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "HTML/CSS", level: "Advanced" },
        { name: "Responsive Design", level: "Advanced" },
      ],
    },
    {
      category: "ส่วนหลัง (Backend)",
      items: [
        { name: "Node.js", level: "Intermediate" },
        { name: "Express.js", level: "Intermediate" },
        { name: "MongoDB", level: "Intermediate" },
        { name: "RESTful API", level: "Intermediate" },
      ],
    },
    {
      category: "เครื่องมืออื่นๆ",
      items: [
        { name: "Git/GitHub", level: "Advanced" },
        { name: "Vite", level: "Advanced" },
        { name: "VS Code", level: "Advanced" },
        { name: "Figma", level: "Intermediate" },
        { name: "Docker", level: "Beginner" },
      ],
    },
    {
      category: "ภาษา",
      items: [
        { name: "ไทย", level: "Native" },
        { name: "อังกฤษ", level: "Intermediate" },
      ],
    },
  ],
}

export const experiences: LocalizedData<Experience[]> = {
  en: [
    {
      id: 1,
      year: "2024 - Present",
      position: "Frontend Developer",
      company: "Company Name",
      description: "Developed React applications and web interfaces for...",
      achievements: [
        "Built responsive web application with 50,000+ users",
        "Improved performance reducing load time by 40%",
        "Worked with design team to implement UI/UX designs",
      ],
    },
    {
      id: 2,
      year: "2023 - 2024",
      position: "Junior Web Developer",
      company: "Previous Company",
      description: "Worked as a junior developer...",
      achievements: [
        "Developed new features for web application",
        "Performed unit testing and integration testing",
        "Helped debug and fix bugs in the system",
      ],
    },
    {
      id: 3,
      year: "2022 - 2023",
      position: "Internship",
      company: "Internship Company",
      description: "Learned web development fundamentals",
      achievements: [
        "Completed internship program successfully",
        "Built graduation project",
        "Received certificate",
      ],
    },
  ],
  th: [
    {
      id: 1,
      year: "2024 - ปัจจุบัน",
      position: "Frontend Developer",
      company: "ชื่อบริษัท",
      description: "พัฒนา React applications และ web interfaces สำหรับ...",
      achievements: [
        "สร้าง responsive web application ที่ใช้ 50,000+ users",
        "ปรับปรุง performance ลด load time 40%",
        "ทำงานร่วม design team เพื่อ implement UI/UX designs",
      ],
    },
    {
      id: 2,
      year: "2023 - 2024",
      position: "Junior Web Developer",
      company: "บริษัทเดิม",
      description: "ปฏิบัติงานเป็น junior developer ทำ...",
      achievements: [
        "พัฒนา features ใหม่ๆ เพื่อ web application",
        "ทำ unit testing และ integration testing",
        "ช่วย debug และ fix bugs ในโปรแกรม",
      ],
    },
    {
      id: 3,
      year: "2022 - 2023",
      position: "Internship",
      company: "บริษัทฝึกงาน",
      description: "ได้เรียนรู้ web development fundamentals",
      achievements: [
        "จบ internship program successfully",
        "ทำโปรเจคจบปริญญา",
        "ได้รับ certificate",
      ],
    },
  ],
}

export const projects: LocalizedData<Project[]> = {
  en: [
    {
      id: 1,
      title: "CS Logbook System",
      description: "Logbook system for university students",
      longDescription: "A logbook system designed for university students to track their work and progress.",
      tech: ["React", "MongoDB", "Node.js", "Express", "Tailwind CSS"],
      image: "https://placehold.co/600x400/3b82f6/ffffff?text=CS+Logbook",
      github: "https://github.com/yourusername/cs-logbook",
      demo: "https://cs-logbook-demo.vercel.app",
      date: "2024",
      category: "Web App",
      highlights: [
        "Designed database schema",
        "Created authentication system",
        "Built dashboard for statistics",
      ],
    },
    {
      id: 2,
      title: "Shoe Store E-commerce",
      description: "Online shoe store",
      longDescription: "E-commerce website for selling shoes with payment integration.",
      tech: ["React", "Stripe API", "MongoDB", "Node.js", "Tailwind CSS"],
      image: "https://placehold.co/600x400/f59e0b/000000?text=Shoe+Store",
      github: "https://github.com/yourusername/shoe-store",
      demo: "https://shoe-store-demo.vercel.app",
      date: "2024",
      category: "E-commerce",
      highlights: [
        "Stripe payment integration",
        "Cart and checkout system",
        "Inventory management",
      ],
    },
    {
      id: 3,
      title: "Personal Portfolio Website",
      description: "Neo-Brutalism style portfolio",
      longDescription: "Personal portfolio website designed with Neo-Brutalism style.",
      tech: ["React", "Tailwind CSS", "Vite", "React Router"],
      image: "https://placehold.co/600x400/ec4899/ffffff?text=Portfolio",
      github: "https://github.com/yourusername/portfolio",
      demo: "https://your-portfolio.vercel.app",
      date: "2024",
      category: "Portfolio",
      highlights: [
        "Responsive design",
        "Smooth scrolling",
        "Contact form",
        "SEO optimized",
      ],
    },
    {
      id: 4,
      title: "SaaS Landing Page",
      description: "A complete SaaS landing page demo showcasing modern design patterns",
      longDescription: "A complete SaaS landing page demo (FlowSync) built with Next.js and Tailwind CSS, showcasing all standard SaaS sections: Hero, Features, Pricing, Testimonials, FAQ, and more.",
      tech: ["Next.js", "Tailwind CSS", "TypeScript"],
      image: "https://placehold.co/600x400/6366f1/ffffff?text=FlowSync",
      demo: "/saas",
      date: "2025",
      category: "Landing Page",
      highlights: [
        "Standalone layout without portfolio Navbar",
        "9 complete SaaS sections",
        "Thai language content",
        "Mobile-first responsive design",
      ],
    },
  ],
  th: [
    {
      id: 1,
      title: "CS Logbook System",
      description: "ระบบบันทึกงานภาควิชาสำหรับนักศึกษา",
      longDescription: "ระบบการบันทึกงาน (Logbook) ที่ออกแบบมาสำหรับนักศึกษาภาควิชา",
      tech: ["React", "MongoDB", "Node.js", "Express", "Tailwind CSS"],
      image: "https://placehold.co/600x400/3b82f6/ffffff?text=CS+Logbook",
      github: "https://github.com/yourusername/cs-logbook",
      demo: "https://cs-logbook-demo.vercel.app",
      date: "2024",
      category: "Web App",
      highlights: [
        "ออกแบบ database schema",
        "สร้าง authentication system",
        "ทำ dashboard สำหรับแสดงผลสถิติ",
      ],
    },
    {
      id: 2,
      title: "Shoe Store E-commerce",
      description: "เว็บร้านขายรองเท้าออนไลน์",
      longDescription: "โปรเจคเว็บ e-commerce สำหรับขายรองเท้า",
      tech: ["React", "Stripe API", "MongoDB", "Node.js", "Tailwind CSS"],
      image: "https://placehold.co/600x400/f59e0b/000000?text=Shoe+Store",
      github: "https://github.com/yourusername/shoe-store",
      demo: "https://shoe-store-demo.vercel.app",
      date: "2024",
      category: "E-commerce",
      highlights: [
        "ชำระเงินผ่าน Stripe",
        "ระบบ cart และ checkout",
        "ระบบจัดการ inventory",
      ],
    },
    {
      id: 3,
      title: "Personal Portfolio Website",
      description: "เว็บแนะนำตัวสไตล์ Neo-Brutalism",
      longDescription: "โปรเจค Portfolio ส่วนตัวที่ออกแบบด้วย Neo-Brutalism style",
      tech: ["React", "Tailwind CSS", "Vite", "React Router"],
      image: "https://placehold.co/600x400/ec4899/ffffff?text=Portfolio",
      github: "https://github.com/yourusername/portfolio",
      demo: "https://your-portfolio.vercel.app",
      date: "2024",
      category: "Portfolio",
      highlights: [
        "Responsive design",
        "Smooth scrolling",
        "Contact form",
        "SEO optimized",
      ],
    },
    {
      id: 4,
      title: "SaaS Landing Page",
      description: "ตัวอย่าง SaaS landing page ครบทุก section ที่ใช้ในผลิตภัณฑ์จริง",
      longDescription: "ตัวอย่าง SaaS landing page (FlowSync) สร้างด้วย Next.js และ Tailwind CSS แสดงให้เห็น section มาตรฐานของ SaaS: Hero, Features, Pricing, Testimonials, FAQ และอื่นๆ",
      tech: ["Next.js", "Tailwind CSS", "TypeScript"],
      image: "https://placehold.co/600x400/6366f1/ffffff?text=FlowSync",
      demo: "/saas",
      date: "2025",
      category: "Landing Page",
      highlights: [
        "Layout แยกจาก portfolio Navbar",
        "9 section ครบครัน",
        "เนื้อหาภาษาไทย",
        "Responsive design แบบ mobile-first",
      ],
    },
  ],
}

export const socials: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/Manchinn",
    icon: "github",
    color: "hover:text-gray-800",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/chinnakrit-sripan-4674a436a",
    icon: "linkedin",
    color: "hover:text-blue-600",
  },
  {
    name: "Email",
    url: "mailto:chinnakrit.srp@gmail.com",
    icon: "mail",
    color: "hover:text-red-600",
  },
  {
    name: "Phone",
    url: "tel:+66946650259",
    icon: "phone",
    color: "hover:text-green-600",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/Manchinn",
    icon: "twitter",
    color: "hover:text-blue-400",
  },
]

export const articles: LocalizedData<Article[]> = {
  en: [
    {
      id: 1,
      slug: "portfolio-techniques-overview",
      title: "Portfolio Website Techniques Overview",
      excerpt: "A comprehensive guide to the techniques used in building this portfolio website - React, Tailwind CSS, i18n, and more.",
      content: `## Introduction

This portfolio website is built using modern web development techniques. Here's a detailed breakdown of each technology and approach used.

## 1. React + Vite

The frontend is built with React, a popular JavaScript library for building user interfaces. We use Vite as the build tool because it's extremely fast and provides instant server start.

### Key Benefits:
- Fast HMR (Hot Module Replacement)
- Optimized production builds
- Simple configuration

## 2. Tailwind CSS

We use Tailwind CSS for styling - a utility-first CSS framework that allows rapid UI development.

### Why Tailwind?
- No need to write custom CSS files
- Consistent design system
- Easy responsive design
- Small bundle size (purges unused styles)

## 3. Custom Hooks

We created a custom hook called \`usePortfolioData\` to handle data fetching across the application.

\`\`\`javascript
export const usePortfolioData = (fetchFunction) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // ... fetch logic
}
\`\`\`

This pattern allows reusable data fetching logic across all components.

## 4. Internationalization (i18n)

The website supports 3 languages: English, Thai, and Chinese. We implemented a custom i18n solution using context and localStorage.

### Features:
- Language switcher in navbar
- Persists language preference
- All text translatable

## 5. Service Layer Pattern

We separated API calls from components using a service layer:

- \`api.js\` - Low-level API functions
- \`portfolioService.js\` - Business logic layer

This makes the code more maintainable and testable.

## 6. Neo-Brutalism Design

The UI follows Neo-Brutalism style with:
- Bold black borders (4px)
- Hard shadows (no blur)
- Vibrant colors
- Comic/sans-serif fonts

## 7. Component Architecture

We organized components into:
- \`components/Sections\` - Page sections (About, Skills, Projects, etc.)
- \`components/ui\` - Reusable UI components
- \`components/layout\` - Layout components (Navbar, Footer)
- \`hooks\` - Custom React hooks
- \`services\` - API and business logic
- \`i18n\` - Internationalization

## Conclusion

These techniques combine to create a fast, maintainable, and visually distinctive portfolio website.`,
      coverImage: "https://placehold.co/800x400/FF6B6B/ffffff?text=Portfolio+Techniques",
      tags: ["React", "Vite", "Tailwind CSS", "i18n", "Tutorial"],
      category: "Development",
      readTime: "8 min read",
      date: "2026-03-02",
      featured: true,
    },
    {
      id: 3,
      slug: "react-best-practices-2024",
      title: "React Best Practices for 2024",
      excerpt: "Essential React best practices that every developer should know in 2024.",
      content: "Full article content here...",
      coverImage: "https://placehold.co/800x400/3b82f6/ffffff?text=React+Best+Practices",
      tags: ["React", "JavaScript", "Best Practices"],
      category: "Development",
      readTime: "5 min read",
      date: "2024-12-15",
      featured: true,
    },
    {
      id: 4,
      slug: "tailwind-css-tips",
      title: "Tailwind CSS Tips & Tricks",
      excerpt: "Learn how to use Tailwind CSS more effectively with these tips.",
      content: "Full article content here...",
      coverImage: "https://placehold.co/800x400/10b981/ffffff?text=Tailwind+CSS+Tips",
      tags: ["Tailwind", "CSS", "Frontend"],
      category: "Tutorial",
      readTime: "3 min read",
      date: "2024-11-20",
      featured: false,
    },
    {
      id: 5,
      slug: "portfolio-development-journey",
      title: "My Portfolio Development Journey",
      excerpt: "How I built this portfolio website from scratch.",
      content: "Full article content here...",
      coverImage: "https://placehold.co/800x400/8b5cf6/ffffff?text=Portfolio+Journey",
      tags: ["Portfolio", "React", "Vite"],
      category: "Story",
      readTime: "7 min read",
      date: "2024-10-10",
      featured: true,
    },
  ],
  th: [
    {
      id: 1,
      slug: "portfolio-techniques-overview",
      title: "ภาพรวมเทคนิคการสร้างเว็บ Portfolio",
      excerpt: "คู่มือที่ครอบคลุมเกี่ยวกับเทคนิคที่ใช้ในการสร้างเว็บ Portfolio นี้ - React, Tailwind CSS, i18n และอื่นๆ",
      content: `## บทนำ

เว็บ Portfolio นี้สร้างขึ้นโดยใช้เทคนิคการพัฒนาเว็บสมัยใหม่ ต่อไปนี้คือรายละเอียดของแต่ละเทคโนโลยีและวิธีการที่ใช้

## 1. React + Vite

Frontend สร้างด้วย React ซึ่งเป็นไลบรารี JavaScript ยอดนิยมสำหรับสร้างส่วนติดต่อผู้ใช้ เราใช้ Vite เป็นเครื่องมือ build เพราะมันเร็วมากและให้การเริ่มต้น server ทันที

### ข้อดีหลัก:
- HMR (Hot Module Replacement) ที่รวดเร็ว
- Build production ที่ได้รับการ optimize
- การตั้งค่าที่ง่าย

## 2. Tailwind CSS

เราใช้ Tailwind CSS สำหรับ styling - framework CSS ที่เน้น utility-first ช่วยให้พัฒนา UI ได้รวดเร็ว

### ทำไมต้อง Tailwind?
- ไม่ต้องเขียนไฟล์ CSS เอง
- ระบบ design ที่สม่ำเสมอ
- ทำ responsive design ได้ง่าย
- ขนาด bundle เล็ก (ลบ styles ที่ไม่ได้ใช้ออก)

## 3. Custom Hooks

เราสร้าง custom hook ชื่อ \`usePortfolioData\` สำหรับจัดการดึงข้อมูลทั่วทั้งแอป

\`\`\`javascript
export const usePortfolioData = (fetchFunction) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // ... fetch logic
}
\`\`\`

รูปแบบนี้ทำให้ logic การดึงข้อมูลสามารถ reuse ได้ในทุก components

## 4. Internationalization (i18n)

เว็บรองรับ 3 ภาษา: อังกฤษ, ไทย และจีน เราใช้ i18n แบบกำหนดเองโดยใช้ context และ localStorage

### คุณสมบัติ:
- ปุ่มเปลี่ยนภาษาใน navbar
- บันทึกการตั้งค่าภาษา
- แปลได้ทุกข้อความ

## 5. Service Layer Pattern

เราแยก API calls ออกจาก components โดยใช้ service layer:

- \`api.js\` - ฟังก์ชัน API ระดับต่ำ
- \`portfolioService.js\` - layer สำหรับ business logic

ทำให้โค้ดมีความสามารถในการดูแลรักษาและทดสอบได้ดีขึ้น

## 6. Neo-Brutalism Design

UI ใช้สไตล์ Neo-Brutalism มี:
- ขอบดำหนา (4px)
- เงาแข็ง (ไม่มี blur)
- สีสดใส
- ฟอนต์ sans-serif

## 7. สถาปัตยกรรม Component

เราจัดระเบียบ components เป็น:
- \`components/Sections\` - ส่วนต่างๆ ของหน้า (About, Skills, Projects และอื่นๆ)
- \`components/ui\` - UI components ที่ใช้ซ้ำได้
- \`components/layout\` - components สำหรับ layout (Navbar, Footer)
- \`hooks\` - React hooks ที่กำหนดเอง
- \`services\` - API และ business logic
- \`i18n\` - การแปลภาษา

## สรุป

เทคนิคเหล่านี้รวมกันเพื่อสร้างเว็บ Portfolio ที่เร็ว ดูแลรักษาได้ และมีดีไซน์ที่โดดเด่น`,
      coverImage: "https://placehold.co/800x400/FF6B6B/ffffff?text=Portfolio+Techniques",
      tags: ["React", "Vite", "Tailwind CSS", "i18n", "Tutorial"],
      category: "Development",
      readTime: "8 นาที",
      date: "2026-03-02",
      featured: true,
    },
    {
      id: 3,
      slug: "react-best-practices-2024",
      title: "แนวปฏิบัติที่ดีที่สุดของ React ในปี 2024",
      excerpt: "แนวปฏิบัติที่ดีที่สุดของ React ที่ทุกคนควรรู้ในปี 2024",
      content: "Full article content here...",
      coverImage: "https://placehold.co/800x400/3b82f6/ffffff?text=React+Best+Practices",
      tags: ["React", "JavaScript", "Best Practices"],
      category: "Development",
      readTime: "5 นาที",
      date: "2024-12-15",
      featured: true,
    },
    {
      id: 4,
      slug: "tailwind-css-tips",
      title: "เทคนิค Tailwind CSS ที่ควรรู้",
      excerpt: "เรียนรู้วิธีใช้ Tailwind CSS ให้มีประสิทธิภาพมากขึ้น",
      content: "Full article content here...",
      coverImage: "https://placehold.co/800x400/10b981/ffffff?text=Tailwind+CSS+Tips",
      tags: ["Tailwind", "CSS", "Frontend"],
      category: "Tutorial",
      readTime: "3 นาที",
      date: "2024-11-20",
      featured: false,
    },
    {
      id: 5,
      slug: "portfolio-development-journey",
      title: "การพัฒนาเว็บ Portfolio ของผม",
      excerpt: "วิธีที่ผมสร้างเว็บ Portfolio นี้ตั้งแต่เริ่มต้น",
      content: "Full article content here...",
      coverImage: "https://placehold.co/800x400/8b5cf6/ffffff?text=Portfolio+Journey",
      tags: ["Portfolio", "React", "Vite"],
      category: "Story",
      readTime: "7 นาที",
      date: "2024-10-10",
      featured: true,
    },
  ],
}

export const getData = (lang: Language) => ({
  profile: { ...profile[lang], ...profileCommon },
  skills: skills[lang],
  experiences: experiences[lang],
  projects: projects[lang],
  articles: articles[lang],
  socials,
})
