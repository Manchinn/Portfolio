# 🎨 Portfolio Website (Neo‑Brutalism)

Portfolio สำหรับแสดงตัวตน ใช้สมัครงาน และโชว์ผลงาน สร้างด้วย React + Vite + Tailwind และออกแบบสไตล์ Neo‑Brutalism

## ✨ Features
- SPA ด้วย React Router
- Neo‑Brutalism UI: โทนเข้ม ขอบหนา ชัดเจน
- Responsive ครอบคลุมมือถือ–เดสก์ท็อป
- Animations ลื่นไหล พร้อม utility classes
- SEO Ready: meta, OG, Twitter, JSON‑LD
- API‑Ready: สลับ static ↔ API ได้ด้วย env

## 🚀 Tech Stack
- React 19, Vite 5
- Tailwind CSS 3
- React Router 7
- ESLint 9

## 📁 Structure
```
src/
├── components/
│   ├── Navbar/
│   ├── Button/
│   ├── Card/
│   ├── Loading.jsx
│   └── Sections/
│       ├── About.jsx
│       ├── Skills.jsx
│       ├── Experience.jsx
│       ├── Projects.jsx
│       ├── Contact.jsx
│       └── Footer.jsx
├── data/
│   └── portfolio.js
├── hooks/
│   └── usePortfolioData.js
├── services/
│   ├── api.js
│   └── portfolioService.js
├── pages/
│   └── Home.jsx
├── utils/
│   └── SEOHelper.jsx
└── App.jsx, main.jsx
```

## ⚙️ Setup
```bash
npm install
npm run dev
```

เพิ่มไฟล์ใน `public/`:
- profile.jpg
- resume.pdf

อัปเดตข้อมูลใน src/data/portfolio.js

## 🔍 SEO & Meta
ปรับแต่ง meta/OG/Twitter/JSON‑LD ใน index.html
หรือใช้ src/utils/SEOHelper.jsx

## 📡 API Integration (สรุป)
โหมดเดียว: ใช้ API (มี fallback static กรณี API ล้มเหลว)
```env
VITE_API_URL=http://localhost:3000/api
```
Hooks ตัวอย่าง:
```jsx
import { useProjects } from '../hooks/usePortfolioData'
import Loading, { ErrorDisplay } from '../components/Loading'

const Projects = () => {
  const { data: projects, loading, error, refetch } = useProjects()
  if (loading) return <Loading text="Loading projects..." />
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />
  return /* render projects */
}
```
ดูคู่มือเต็มใน API_INTEGRATION.md

## 🧪 Scripts
```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## 🚀 Deploy
- Vercel / Netlify / GitHub Pages (publish dist/)

## 🐛 Troubleshooting
- Import path: Sections → ../../data/portfolio
- Smooth scroll: ดู src/index.css
- CORS: ตั้งค่า backend origin http://localhost:5173

## 📄 License
สำหรับใช้งานส่วนตัวและพอร์ตงาน — ทำด้วย ❤ โดย ชินกฤต