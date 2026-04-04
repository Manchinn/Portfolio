import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FlowSync — จัดการงานด้วย AI อัตโนมัติ',
  description: 'FlowSync ช่วยให้ทีมของคุณทำงานได้อัตโนมัติด้วย AI ประหยัดเวลา เพิ่มประสิทธิภาพ',
}

export default function SaasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
