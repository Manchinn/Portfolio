import { Zap, Brain, Bell, BarChart3, Users, Shield } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI จัดลำดับงานให้',
    description: 'แนวคิด AI ช่วยแนะนำลำดับความสำคัญจาก deadline, workload และ context ของทีม',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Users,
    title: 'มอบหมายงานอัตโนมัติ',
    description: 'ตัวอย่าง workflow สำหรับดู capacity ของทีมก่อนเสนอคนที่เหมาะกับงานแต่ละชิ้น',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Bell,
    title: 'แจ้งเตือนก่อน Deadline',
    description: 'ออกแบบ notification flow สำหรับเตือนงานสำคัญผ่านช่องทางที่ทีมใช้อยู่แล้ว',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: BarChart3,
    title: 'Dashboard แบบ Real-time',
    description: 'mockup dashboard สำหรับเห็น progress, blockers และงานที่ต้องตัดสินใจในหน้าเดียว',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Zap,
    title: 'Automation สุดยืดหยุ่น',
    description: 'แสดงแนวทางตั้ง workflow ซ้ำ ๆ ให้เป็น automation โดยไม่ผูกกับระบบจริงใน demo',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Shield,
    title: 'ออกแบบโดยคิดเรื่องความปลอดภัย',
    description: 'copy และ UI ใน demo เลี่ยงข้อมูลจริง พร้อมวางตำแหน่งสำหรับ auth, role และ audit ในระบบจริง',
    color: 'bg-rose-50 text-rose-600',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">ฟีเจอร์</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            ทุกสิ่งที่ทีมคุณต้องการ
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            FlowSync เป็นตัวอย่างการเล่า product idea ให้เข้าใจง่าย ตั้งแต่ problem ถึง conversion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="p-8 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
