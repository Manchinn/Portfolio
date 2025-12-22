# 📡 API Integration Guide

## โครงสร้าง API-Ready Architecture

Portfolio นี้ทำงานโหมด API เป็นหลัก (มี fallback เป็น static data อัตโนมัติหาก API ล้มเหลว)

### 📁 โครงสร้างไฟล์

```
src/
├── services/
│   ├── api.js              # API call functions
│   └── portfolioService.js # Service layer (switch static/API)
├── hooks/
│   └── usePortfolioData.js # Custom hooks สำหรับดึงข้อมูล
├── components/
│   └── Loading.jsx         # Loading & Error components
└── data/
    └── portfolio.js        # Static data (fallback)
```

---

## 🔧 การตั้งค่า

### 1. Environment Variables

สร้างไฟล์ `.env` จาก `.env.example`:

```bash
cp .env.example .env
```

แก้ไขค่าใน `.env` ให้ใช้ API:

```env
VITE_API_URL=https://your-backend.com/api
```

### 2. ใช้งานใน Components

#### วิธีที่ 1: ใช้ Custom Hooks (แนะนำ)

```jsx
import { useProjects } from '../hooks/usePortfolioData'
import Loading, { ErrorDisplay } from '../components/Loading'

const Projects = () => {
  const { data: projects, loading, error, refetch } = useProjects()

  if (loading) return <Loading text="Loading projects..." />
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />

  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  )
}
```

#### วิธีที่ 2: ใช้ Service โดยตรง

```jsx
import { useEffect, useState } from 'react'
import * as PortfolioService from '../services/portfolioService'

const Skills = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSkills = async () => {
      const data = await PortfolioService.getSkills()
      setSkills(data)
      setLoading(false)
    }
    loadSkills()
  }, [])

  if (loading) return <Loading />

  return <SkillsDisplay skills={skills} />
}
```

---

## 📚 Available Hooks

### useProfile()
ดึงข้อมูล profile

```jsx
const { data: profile, loading, error } = useProfile()
```

### useSkills()
ดึงข้อมูล skills

```jsx
const { data: skills, loading, error } = useSkills()
```

### useExperiences()
ดึงข้อมูล experiences

```jsx
const { data: experiences, loading, error } = useExperiences()
```

### useProjects()
ดึงข้อมูล projects

```jsx
const { data: projects, loading, error } = useProjects()
```

### useSocials()
ดึงข้อมูล socials

```jsx
const { data: socials, loading, error } = useSocials()
```

### useAllPortfolioData()
ดึงข้อมูลทั้งหมดพร้อมกัน

```jsx
const { data, loading, error } = useAllPortfolioData()
// data = { profile, skills, experiences, projects, socials }
```

---

## 🎯 Backend API Endpoints

ระบบจะเรียก API endpoints ดังนี้ (โหมด API เป็นค่าเริ่มต้น):

```
GET  /api/profile      - Profile data
GET  /api/skills       - Skills array
GET  /api/experiences  - Experiences array
GET  /api/projects     - Projects array
GET  /api/socials      - Socials array
POST /api/contact      - Submit contact form
```

### ตัวอย่าง API Response

#### GET /api/profile
```json
{
  "name": "ชินกฤต",
  "title": "Frontend Developer",
  "email": "email@example.com",
  ...
}
```

#### GET /api/projects
```json
[
  {
    "id": 1,
    "title": "Project Name",
    "description": "...",
    "tech": ["React", "Node.js"],
    ...
  }
]
```

#### POST /api/contact
Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

Response:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

---

## 🔄 Fallback Behavior

ระบบมี **automatic fallback** ไป static data เมื่อ API ล้มเหลว (แม้เปิดโหมด API เสมอ)

```javascript
// ใน portfolioService.js
if (USE_API) {
  const response = await API.fetchProjects()
  if (response.success) {
    return response.data
  }
  // Auto fallback
  console.warn('API failed, using static data')
}
return StaticData.projects
```

---

## 🚀 สร้าง Backend API (Optional)

### Express.js Example

```javascript
// server.js
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Profile endpoint
app.get('/api/profile', (req, res) => {
  res.json({
    name: "ชินกฤต",
    title: "Frontend Developer",
    // ... ข้อมูลอื่นๆ
  })
})

// Projects endpoint
app.get('/api/projects', (req, res) => {
  res.json([
    { id: 1, title: "Project 1", ... },
    { id: 2, title: "Project 2", ... }
  ])
})

// Contact form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body
  // ส่ง email หรือบันทึกใน database
  res.json({ success: true, message: 'Sent!' })
})

app.listen(3000, () => {
  console.log('API running on http://localhost:3000')
})
```

### สำหรับ CMS (Strapi, Contentful, etc.)

เปลี่ยน endpoint URLs ใน `src/services/api.js`:

```javascript
const API_BASE_URL = 'https://your-strapi.com/api'
```

---

## 🎨 Loading States

### Loading Component
```jsx
<Loading size="large" text="Loading data..." />
```

### Loading Skeleton
```jsx
<LoadingSkeleton type="card" />
<LoadingSkeleton type="text" />
```

### Error Display
```jsx
<ErrorDisplay 
  error="Failed to load data" 
  onRetry={() => refetch()} 
/>
```

---

## 📋 Checklist สำหรับใช้ API

- [ ] ตั้งค่า `.env` file (VITE_API_URL)
- [ ] สร้าง Backend API
- [ ] ทดสอบ API endpoints
- [ ] อัปเดต components ให้ใช้ hooks
- [ ] เพิ่ม loading & error states
- [ ] ทดสอบ fallback behavior
- [ ] Deploy backend & frontend

---

## 🐛 Troubleshooting

### API ไม่ทำงาน
1. เช็ค `.env` file ว่าตั้งค่าถูกต้อง
2. เช็ค console สำหรับ error messages
3. ตรวจสอบ CORS settings ที่ backend
4. ดู Network tab ใน DevTools

### CORS Error
เพิ่มใน backend:
```javascript
app.use(cors({
  origin: 'http://localhost:5173'
}))
```

### Timeout Error
เพิ่ม timeout ใน `api.js`:
```javascript
const API_TIMEOUT = 30000 // 30 seconds
```

---

## 📖 Best Practices

1. **พึ่ง API เป็นค่าเริ่มต้น** - ตรวจ VITE_API_URL ให้ถูกต้อง
2. **เพิ่ม loading states เสมอ** - UX ที่ดี
3. **Handle errors gracefully** - แสดงข้อความที่เข้าใจง่าย
4. **ใช้ fallback data** - แอปไม่พัง ถ้า API ล่ม
5. **Cache data ถ้าจำเป็น** - ลด API calls

---

**🎉 ตอนนี้ portfolio ของคุณพร้อมสำหรับ API integration แล้ว!**
