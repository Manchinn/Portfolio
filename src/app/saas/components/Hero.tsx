import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            Prototype demo — AI workflow landing page
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            จัดการงานด้วย{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              AI อัตโนมัติ
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            FlowSync เป็นตัวอย่าง product concept สำหรับทีมที่ต้องการลดงานซ้ำซ้อน
            จัดลำดับงาน มอบหมายงาน และเห็นภาพรวม workflow ในที่เดียว
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#cta"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              ดู prototype flow
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              <Play className="w-5 h-5 fill-current" />
              ดูวิธีทำงาน
            </a>
          </div>

          {/* Social Proof */}
          <p className="mt-8 text-sm text-gray-500">
            ✓ Public-safe demo &nbsp;·&nbsp; ✓ Responsive sections &nbsp;·&nbsp; ✓ No private systems exposed
          </p>

          {/* Product Mockup */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-indigo-100 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-4 text-xs text-gray-400">app.flowsync.th</span>
              </div>
              <div className="p-8 bg-gradient-to-br from-indigo-50 to-violet-50 min-h-[280px] flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                  {['งานด่วน', 'กำลังดำเนินการ', 'เสร็จแล้ว'].map((col, i) => (
                    <div key={i} className="space-y-3">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{col}</div>
                      {[...Array(i === 1 ? 3 : 2)].map((_, j) => (
                        <div key={j} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                          <div className={`h-2 rounded ${['bg-red-300', 'bg-indigo-300', 'bg-green-300'][i]} mb-2`} style={{ width: `${60 + j * 20}%` }} />
                          <div className="h-2 bg-gray-100 rounded w-3/4" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
