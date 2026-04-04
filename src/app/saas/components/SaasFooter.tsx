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
              {['ฟีเจอร์', 'ราคา', 'Changelog', 'Roadmap'].map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">บริษัท</h4>
            <ul className="space-y-2 text-sm">
              {['เกี่ยวกับเรา', 'Blog', 'ร่วมงานกับเรา', 'ติดต่อ'].map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">กฎหมาย</h4>
            <ul className="space-y-2 text-sm">
              {['นโยบายความเป็นส่วนตัว', 'ข้อกำหนดการใช้งาน', 'นโยบาย Cookie'].map((item) => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
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
