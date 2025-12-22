# 🎨 Portfolio Website - Neo-Brutalism Style

Portfolio website สำหรับการแสดงผลงาน ประสบการณ์ และทักษะ เหมาะสำหรับการยื่นสมัครงาน หรือแสดงตัวตนในโลก Web Development

## ✨ Features

- 🎯 **Single Page Application** - ใช้ React Router สำหรับการ navigate
- 🎨 **Neo-Brutalism Design** - สไตล์ modern & bold
- 📱 **Responsive Design** - ใช้ได้ดีบนทุก device
- ⚡ **Fast & Optimized** - ใช้ Vite build tool
- 🎬 **Smooth Animations** - transition & animation effects
- 📊 **SEO Optimized** - meta tags & structured data
- 🎯 **Contact Form** - สำหรับติดต่อ
- 📥 **CV Download** - ดาวน์โหลด resume

## 🚀 Tech Stack

- **Frontend**: React 19
- **Styling**: Tailwind CSS 3.4
- **Build Tool**: Vite 5.4
- **Routing**: React Router 7.9
- **Code Quality**: ESLint 9.39

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar/          # Navigation bar
│   ├── Button/          # Reusable button
│   ├── Card/            # Project card
│   ├── SkillTag/        # Skill tag component
│   ├── ExperienceCard/  # Experience card
│   └── Sections/
│       ├── About.jsx    # About me section
│       ├── Skills.jsx   # Skills section
│       ├── Experience.jsx # Experience timeline
│       ├── Projects.jsx # Projects showcase
│       ├── Contact.jsx  # Contact form
│       └── Footer.jsx   # Footer
├── pages/
│   └── Home.jsx         # Main page (รวม sections)
├── data/
│   └── portfolio.js     # All portfolio data
├── utils/
│   └── SEOHelper.jsx    # SEO helper component
├── App.jsx
└── main.jsx
```

## ⚙️ การตั้งค่า

### 1. Install Dependencies

```bash
npm install
```

### 2. อัปเดตข้อมูลส่วนตัว

แก้ไข `src/data/portfolio.js`:

```javascript
export const profileData = {
  name: "ชินณภา",
  title: "Frontend Developer",
  bio: "คำอธิบายเกี่ยวกับตัวเอง...",
  email: "your.email@example.com",
  // ... อื่นๆ
}
```

### 3. เพิ่มรูปภาพและ CV

- ใส่รูปภาพ profile: `public/profile.jpg`
- ใส่ resume PDF: `public/resume.pdf`

### 4. อัปเดต SEO Tags

แก้ไข `index.html`:

```html
<title>ชื่อของคุณ - Frontend Developer Portfolio</title>
<meta name="description" content="คำอธิบาย..." />
<meta property="og:image" content="https://your-url.com/og-image.jpg" />
<!-- ... -->
```

## 🎯 Components Guide

### Home Page (Hero)
- Profile image
- Name & title
- CTA buttons (View Work, Download CV, Contact)

### About Section
- Brief bio
- Key highlights (projects, experience, passion)
- Contact links

### Skills Section
- Grouped by category (Frontend, Backend, Tools, Languages)
- Shows level (Advanced, Intermediate, Beginner)
- Using SkillTag component

### Experience Section
- Timeline view
- Position, company, year
- Achievements list
- Using ExperienceCard component

### Projects Section
- Grid layout (responsive)
- Project cards with image
- Modal view for details
- Tech stack, highlights
- GitHub & Demo links

### Contact Section
- Contact form
- Contact info (email, phone, location)
- Resume download
- Social links
- Using SEO data from portfolio.js

### Footer
- Quick links
- Social media icons
- Copyright info

## 📝 Data Structure

### Portfolio Data (`src/data/portfolio.js`)

```javascript
// Profile
profileData = {
  name, title, bio, email, phone, location, 
  image, resume, ...
}

// Skills grouped by category
skills = [
  { category: "Frontend", items: [...] },
  { category: "Backend", items: [...] },
  ...
]

// Work experiences
experiences = [
  { year, position, company, description, achievements },
  ...
]

// Projects
projects = [
  { 
    id, title, description, tech, 
    image, github, demo, highlights 
  },
  ...
]

// Social links
socials = [
  { name, url, icon, color },
  ...
]
```

## 🎨 Styling & Colors

Neo-Brutalism colors (ตรวจสอบ `tailwind.config.js`):
- `bg-neo-blue` - Primary blue
- `bg-neo-pink` - Accent pink
- `bg-neo-yellow` - Accent yellow
- `bg-neo-green` - Accent green

## 🔄 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### สามารถ Deploy ได้ที่:

1. **Vercel** (ง่ายที่สุด)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Connect GitHub repo
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **GitHub Pages**
   ```bash
   npm run build
   # Push dist folder to gh-pages branch
   ```

## 🔍 SEO Optimization

- ✅ Meta description
- ✅ OG tags (Facebook, LinkedIn)
- ✅ Twitter Card
- ✅ Structured Data (JSON-LD)
- ✅ Canonical URL
- ✅ Mobile friendly
- ✅ Fast load time (Vite)

## 🐛 Troubleshooting

### Images not showing
- ตรวจสอบให้แน่ใจว่ารูปภาพอยู่ใน `public/` folder
- ใช้ path แบบ `/filename.jpg`

### Smooth scrolling not working
- HTML ต้องมี `scroll-behavior: smooth;` (อยู่ใน `index.css`)

### SEO tags not updating
- ใช้ SEOHelper component
- หรือแก้ไข `index.html` โดยตรง

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [Neo-Brutalism Design](https://www.behance.net)

## 📄 License

This project is open source and available for personal use.

---

**Made with ❤️ by ชินณภา**

สำหรับคำถามหรือข้อเสนอแนะ ติดต่อผมได้ที่ email หรือ social media ของผม
