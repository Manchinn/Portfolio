import { Zap, Brain, Bell, BarChart3, Users, Shield } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI จัดลำดับงานให้',
    description: 'AI วิเคราะห์งานทั้งหมดและจัดลำดับความสำคัญให้อัตโนมัติตาม deadline และทรัพยากรที่มี',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Users,
    title: 'มอบหมายงานอัตโนมัติ',
    description: 'ระบบตรวจสอบ workload ของแต่ละคนและมอบหมายงานให้คนที่เหมาะสมที่สุดโดยอัตโนมัติ',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Bell,
    title: 'แจ้งเตือนก่อน Deadline',
    description: 'ส่ง notification ล่วงหน้าผ่าน Line, Email หรือ Slack ก่อนถึงกำหนดส่งงาน',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: BarChart3,
    title: 'Dashboard แบบ Real-time',
    description: 'เห็นภาพรวม progress ของทีมทั้งหมดในหน้าเดียว อัปเดตทันทีแบบ real-time',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Zap,
    title: 'Automation สุดยืดหยุ่น',
    description: 'สร้าง workflow อัตโนมัติด้วย drag & drop ไม่ต้องเขียนโค้ด ตั้งค่าได้ในไม่กี่นาที',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Shield,
    title: 'ปลอดภัย ระดับองค์กร',
    description: 'ข้อมูลเข้ารหัส AES-256 รองรับ SSO, 2FA และ audit log ครบถ้วนตามมาตรฐาน ISO 27001',
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
            FlowSync รวมทุก tool ที่จำเป็นไว้ในที่เดียว ไม่ต้องสลับแอปอีกต่อไป
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
