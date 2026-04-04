import { ArrowRight } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section id="cta" className="py-20 bg-gradient-to-r from-indigo-600 to-violet-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
          พร้อมให้ทีมทำงานได้เร็วขึ้น 3 เท่าแล้วหรือยัง?
        </h2>
        <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
          เริ่มทดลองใช้ฟรี 14 วัน ไม่ต้องใส่บัตรเครดิต ยกเลิกได้ทุกเมื่อ
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
          >
            เริ่มใช้งานฟรีเลย
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors"
          >
            นัดดู Demo
          </a>
        </div>
        <p className="mt-6 text-indigo-200 text-sm">
          มากกว่า 2,000 ทีมในประเทศไทยไว้วางใจแล้ว
        </p>
      </div>
    </section>
  )
}
