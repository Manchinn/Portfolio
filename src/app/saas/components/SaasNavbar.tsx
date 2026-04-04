import Link from 'next/link'
import { Zap, ArrowLeft } from 'lucide-react'

export default function SaasNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-indigo-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FlowSync</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">ฟีเจอร์</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">วิธีใช้งาน</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">ราคา</a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">คำถามที่พบบ่อย</a>
          </div>

          {/* CTA + Back */}
          <div className="flex items-center gap-3">
            <Link
              href="/#projects"
              className="hidden sm:flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              กลับ Portfolio
            </Link>
            <a
              href="#cta"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              เริ่มใช้งานฟรี
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
