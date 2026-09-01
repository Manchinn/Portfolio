---
lang: th
title: สร้าง Static Portfolio ด้วย Next.js
excerpt: บันทึกการจัดโครงสร้างเนื้อหาสองภาษา, static rendering และ route หน้าเดียวที่โฟกัสชัดเจน
category: สถาปัตยกรรม
readTime: 6 นาที
---

## เก็บ portfolio content เป็น typed local data

Portfolio ขนาดเล็กไม่จำเป็นต้องมี runtime content service ข้อมูล TypeScript ที่มี type ทำให้ contracts ของ project, article และ navigation ชัดต่อ components ที่นำไป render และ build จะช่วยตรวจ localized fields ที่ขาดได้

## แยก static routes ออกจาก client preferences

Next.js สามารถ pre-render route และ article slugs ขณะที่ client provider ขนาดเล็กจดจำภาษาของผู้เข้าชม Content ยังเป็น static และ cache ได้ มีเพียงภาษาที่แสดงผลซึ่งเปลี่ยนหลัง hydration

## ใช้ production build เป็น contract

Build ควรตรวจทุก generated slug, client boundary และ localized data shape จากนั้นใช้ browser ตรวจ navigation, language switching, article links และ contact workflow

- สร้าง route params จาก shared slugs ของภาษาอังกฤษและไทย
- รักษา user-facing copy ให้ตรงกันในทั้งสองภาษา
- ตรวจว่าทุก action ที่มองเห็นพาไปยังปลายทางจริง
