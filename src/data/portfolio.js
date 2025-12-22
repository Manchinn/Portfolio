// ============================================
// Portfolio Data - แก้ไขข้อมูลตรงนี้
// ============================================

export const profileData = {
  name: "ชินกฤต (Chinnakrit)",
  title: "Frontend Developer / Full-stack Developer",
  bio: "นักพัฒนา React & Web Developer ที่มีความหลงใหลในการสร้างเว็บไซต์ที่สวยงามและใช้งานได้ดี",
  shortBio: "Creating beautiful and functional web experiences",
  image: "https://placehold.co/400x400/000000/FFF?text=Profile", // ใส่รูปของคุณใน public folder
  email: "your.email@example.com",
  phone: "+66 XXX-XXX-XXXX",
  location: "Thailand",
  resume: "/Chinnakrit-Sripan_CV.pdf", // ใส่ resume ใน public folder
  ctaText: "ดูผลงาน"
}

// ============================================
// Skills
// ============================================
export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: "Advanced" },
      { name: "JavaScript", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "HTML/CSS", level: "Advanced" },
      { name: "Responsive Design", level: "Advanced" }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: "Intermediate" },
      { name: "Express.js", level: "Intermediate" },
      { name: "MongoDB", level: "Intermediate" },
      { name: "RESTful API", level: "Intermediate" }
    ]
  },
  {
    category: "Tools & Others",
    items: [
      { name: "Git/GitHub", level: "Advanced" },
      { name: "Vite", level: "Advanced" },
      { name: "VS Code", level: "Advanced" },
      { name: "Figma", level: "Intermediate" },
      { name: "Docker", level: "Beginner" }
    ]
  },
  {
    category: "Languages",
    items: [
      { name: "Thai", level: "Native" },
      { name: "English", level: "Intermediate" }
    ]
  }
]

// ============================================
// Work Experience
// ============================================
export const experiences = [
  {
    id: 1,
    year: "2024 - Present",
    position: "Frontend Developer",
    company: "Company Name",
    description: "พัฒนา React applications และ web interfaces สำหรับ...",
    achievements: [
      "สร้าง responsive web application ที่ใช้ 50,000+ users",
      "ปรับปรุง performance ลด load time 40%",
      "ทำงานร่วม design team เพื่อ implement UI/UX designs"
    ]
  },
  {
    id: 2,
    year: "2023 - 2024",
    position: "Junior Web Developer",
    company: "Previous Company",
    description: "ปฏิบัติงานเป็น junior developer ทำ...",
    achievements: [
      "พัฒนา features ใหม่ ๆ เพื่อ web application",
      "ทำ unit testing และ integration testing",
      "ช่วย debug และ fix bugs ในโปรแกรม"
    ]
  },
  {
    id: 3,
    year: "2022 - 2023",
    position: "Internship",
    company: "Internship Company",
    description: "ได้เรียนรู้ web development fundamentals",
    achievements: [
      "จบ internship program successfully",
      "ทำโปรเจคจบปริญญา",
      "ได้รับ certificate"
    ]
  }
]

// ============================================
// Projects
// ============================================
export const projects = [
  {
    id: 1,
    title: "CS Logbook System",
    description: "ระบบบันทึกงานภาควิชาสำหรับนักศึกษา ช่วยให้จัดการ work logs และ achievements ได้อย่างเป็นระบบ",
    longDescription: "ระบบการบันทึกงาน (Logbook) ที่ออกแบบมาสำหรับนักศึกษาภาควิชา มีความสามารถในการ บันทึก กิจกรรมประจำวัน ติดตามความก้าวหน้า และทำรายงาน สำหรับแสดงผล",
    tech: ["React", "MongoDB", "Node.js", "Express", "Tailwind CSS"],
    image: "https://placehold.co/600x400/3b82f6/ffffff?text=CS+Logbook",
    github: "https://github.com/yourusername/cs-logbook",
    demo: "https://cs-logbook-demo.vercel.app",
    date: "2024",
    highlights: [
      "ออกแบบ database schema สำหรับการจัดเก็บ logs",
      "สร้าง authentication system",
      "ทำ dashboard เพื่อแสดงผลสถิติ"
    ]
  },
  {
    id: 2,
    title: "Shoe Store E-commerce",
    description: "เว็บร้านขายรองเท้าออนไลน์ที่มี shopping cart, payment, และ order management system",
    longDescription: "โปรเจคเว็บ e-commerce สำหรับขายรองเท้า ที่มีฟีเจอร์ครบครัน จากการหาสินค้า ใส่ตะกร้า จ่ายเงิน ไปจนถึงการจัดการ order",
    tech: ["React", "Stripe API", "MongoDB", "Node.js", "Tailwind CSS"],
    image: "https://placehold.co/600x400/f59e0b/000000?text=Shoe+Store",
    github: "https://github.com/yourusername/shoe-store",
    demo: "https://shoe-store-demo.vercel.app",
    date: "2024",
    highlights: [
      "ชำระเงินผ่าน Stripe",
      "ระบบ cart และ checkout",
      "ระบบจัดการ inventory"
    ]
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    description: "เว็บแนะนำตัวที่ใช้ Neo-Brutalism design style ส่วนตัวเองที่กำลังทำอยู่",
    longDescription: "โปรเจค Portfolio ส่วนตัวที่ออกแบบด้วย Neo-Brutalism style ใช้ React + Tailwind CSS ทำให้เหมาะสำหรับการยื่นสมัครงาน",
    tech: ["React", "Tailwind CSS", "Vite", "React Router"],
    image: "https://placehold.co/600x400/ec4899/ffffff?text=Portfolio",
    github: "https://github.com/yourusername/portfolio",
    demo: "https://your-portfolio.vercel.app",
    date: "2024",
    highlights: [
      "Responsive design",
      "Smooth scrolling",
      "Contact form",
      "SEO optimized"
    ]
  },
  {
    id: 4,
    title: "Todo App with Local Storage",
    description: "แอพพลิเคชันจดบันทึก TODO ที่สามารถบันทึกข้อมูลใน Local Storage",
    longDescription: "โปรเจค Todo App ที่ใช้ React Hooks และ Local Storage API เพื่อจัดเก็บข้อมูล ทำให้สามารถเซฟ todos ได้แม้ปิดหน้าเว็บ",
    tech: ["React", "JavaScript", "CSS", "Local Storage"],
    image: "https://placehold.co/600x400/10b981/000000?text=Todo+App",
    github: "https://github.com/yourusername/todo-app",
    demo: "https://todo-app-demo.vercel.app",
    date: "2023",
    highlights: [
      "CRUD operations",
      "Local storage persistence",
      "Dark mode support"
    ]
  },
  {
    id: 5,
    title: "Weather App API",
    description: "แอปฟ้อร์ดูสภาพอากาศแบบเรียลไทม์โดยใช้ Weather API",
    longDescription: "โปรเจค Weather Application ที่ดึงข้อมูลสภาพอากาศจาก OpenWeather API และแสดงผล ด้วยการออกแบบ UI ที่สวยงาม",
    tech: ["React", "OpenWeather API", "Tailwind CSS", "Fetch API"],
    image: "https://placehold.co/600x400/06b6d4/ffffff?text=Weather+App",
    github: "https://github.com/yourusername/weather-app",
    demo: "https://weather-app-demo.vercel.app",
    date: "2023",
    highlights: [
      "Real-time weather data",
      "Location-based search",
      "7-day forecast"
    ]
  },
  {
    id: 6,
    title: "Chat Application",
    description: "แอปพลิเคชัน Real-time Chat ที่ใช้ Socket.io สำหรับการส่งข้อความแบบ Live",
    longDescription: "โปรเจค Chat App ที่ให้ผู้ใช้สามารถแชตแบบ real-time โดยใช้ Socket.io technology สำหรับ WebSocket connection",
    tech: ["React", "Socket.io", "Node.js", "Express", "MongoDB"],
    image: "https://placehold.co/600x400/8b5cf6/ffffff?text=Chat+App",
    github: "https://github.com/yourusername/chat-app",
    demo: "https://chat-app-demo.vercel.app",
    date: "2023",
    highlights: [
      "Real-time messaging",
      "User authentication",
      "Message history",
      "Online status"
    ]
  }
]

// ============================================
// Social Links
// ============================================
export const socials = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: "github",
    color: "hover:text-gray-800"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: "linkedin",
    color: "hover:text-blue-600"
  },
  {
    name: "Email",
    url: "mailto:your.email@example.com",
    icon: "mail",
    color: "hover:text-red-600"
  },
  {
    name: "Phone",
    url: "tel:+66XXXXXXXXX",
    icon: "phone",
    color: "hover:text-green-600"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: "twitter",
    color: "hover:text-blue-400"
  }
]

// ============================================
// Contact Messages (สำหรับเก็บข้อมูลจาก form)
// ============================================
export const contactDefaults = {
  name: "",
  email: "",
  message: "",
  subject: "Contact from Portfolio"
}

// ============================================
// Navigation
// ============================================
export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
]
