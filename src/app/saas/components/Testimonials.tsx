import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'สมชาย วงศ์วิลาส',
    role: 'Head of Engineering',
    company: 'TechCorp Thailand',
    avatar: 'https://placehold.co/64x64/6366f1/ffffff?text=สช',
    content:
      'FlowSync เปลี่ยนวิธีทำงานของทีมเราไปเลย จากที่เคยประชุม standup นาน 45 นาที ตอนนี้เหลือแค่ 10 นาที เพราะทุกคนรู้งานของตัวเองแล้วจาก AI',
    rating: 5,
  },
  {
    name: 'ณัฐธิดา สุขสวัสดิ์',
    role: 'Product Manager',
    company: 'StartupX',
    avatar: 'https://placehold.co/64x64/8b5cf6/ffffff?text=ณธ',
    content:
      'ชอบมากที่ AI มอบหมายงานให้อัตโนมัติ ไม่ต้องมานั่งแบ่งงานให้เสียเวลา ทีม 12 คนทำงานได้เต็มศักยภาพทุกคน ROI คุ้มมากในเดือนแรก',
    rating: 5,
  },
  {
    name: 'วิชัย ธนาพร',
    role: 'CEO',
    company: 'Digital Agency BKK',
    avatar: 'https://placehold.co/64x64/06b6d4/ffffff?text=วช',
    content:
      'ทดลองใช้ 3 เดือน ตัดสินใจ upgrade เป็น Enterprise เลย เพราะ audit log และ SSO ตอบโจทย์ลูกค้า enterprise ที่ต้องการ compliance ทีมขายก็ helpful มากครับ',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">รีวิว</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            ทีมชั้นนำไว้วางใจ FlowSync
          </h2>
          <p className="text-xl text-gray-500">จากทีมนักพัฒนา, ผู้จัดการ และ CEO ทั่วประเทศไทย</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.name} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">"{item.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.role} · {item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
