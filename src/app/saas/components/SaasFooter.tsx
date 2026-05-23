import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function SaasFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">FlowSync</span>
            </div>
            <p className="text-sm leading-relaxed">
              จัดการงานด้วย AI อัตโนมัติ ช่วยให้ทีมทำงานได้เร็วและมีประสิทธิภาพมากขึ้น
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">ผลิตภัณฑ์</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">ฟีเจอร์</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">วิธีใช้งาน</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">ราคา</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">บริษัท</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#about" className="hover:text-white transition-colors">เกี่ยวกับ Chinnakrit</Link></li>
              <li><Link href="/prompts" className="hover:text-white transition-colors">Prompts</Link></li>
              <li><Link href="/work-with-me" className="hover:text-white transition-colors">Work with me</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">ติดต่อ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">กฎหมาย</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-500">Prototype demo</span></li>
              <li><span className="text-gray-500">No payment flow</span></li>
              <li><span className="text-gray-500">No customer data</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2025 FlowSync. สงวนลิขสิทธิ์</p>
          <Link
            href="/#projects"
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            ← ดู Portfolio ของ Chinnakrit
          </Link>
        </div>
      </div>
    </footer>
  )
}
