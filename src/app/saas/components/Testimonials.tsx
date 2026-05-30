import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Persona A',
    role: 'Engineering Lead',
    company: 'Workflow-heavy team',
    avatar: 'https://placehold.co/64x64/6366f1/ffffff?text=A',
    content:
      'ตัวอย่าง testimonial นี้ช่วยสื่อ pain point ของทีมที่ต้องการเห็นงาน, blocker และ owner ในที่เดียวก่อนประชุม',
    rating: 5,
  },
  {
    name: 'Persona B',
    role: 'Product Manager',
    company: 'Growing product team',
    avatar: 'https://placehold.co/64x64/8b5cf6/ffffff?text=B',
    content:
      'ใช้เป็นตัวอย่าง copy สำหรับ buyer ที่ต้องจัดลำดับ backlog และมอบหมายงานโดยไม่เพิ่มขั้นตอน manual',
    rating: 5,
  },
  {
    name: 'Persona C',
    role: 'Operations Owner',
    company: 'Service business',
    avatar: 'https://placehold.co/64x64/06b6d4/ffffff?text=C',
    content:
      'เหมาะสำหรับแสดงมุมมอง operations: ต้องการ report, ownership และ audit trail concept ที่อธิบายง่ายให้ทีมเข้าใจ',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">Persona proof</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            ตัวอย่างเสียงจากกลุ่มผู้ใช้เป้าหมาย
          </h2>
          <p className="text-xl text-gray-500">ใช้ persona cards เพื่อเล่า buyer pain points โดยไม่อ้างอิงลูกค้าจริง</p>
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
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">&ldquo;{item.content}&rdquo;</p>

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
