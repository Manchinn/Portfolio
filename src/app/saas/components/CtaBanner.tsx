import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CtaBanner() {
  return (
    <section id="cta" className="py-20 bg-gradient-to-r from-indigo-600 to-violet-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
          อยากเห็น workflow แบบนี้กับงานจริงของคุณไหม?
        </h2>
        <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
          หน้านี้เป็น demo สำหรับโชว์วิธีเปลี่ยน pain point ของทีมให้กลายเป็น product page ที่เข้าใจง่าย
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/work-with-me"
            className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
          >
            คุยเรื่อง workflow
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors"
          >
            กลับไปดู Projects
          </Link>
        </div>
        <p className="mt-6 text-indigo-200 text-sm">
          Public-safe prototype. No private systems, credentials, or customer data are exposed.
        </p>
      </div>
    </section>
  )
}
