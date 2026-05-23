import { Upload, Settings, TrendingUp } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: Upload,
    title: 'นำเข้างานของคุณ',
    description: 'เริ่มจากตัวอย่างงานใน Jira, Trello, Asana หรือ spreadsheet เพื่อแสดง workflow หลักของทีม',
  },
  {
    step: '02',
    icon: Settings,
    title: 'ตั้งค่า AI ให้รู้จักทีม',
    description: 'กำหนด role, ความเชี่ยวชาญ และ capacity เพื่อจำลอง logic สำหรับจัดลำดับและแนะนำงาน',
  },
  {
    step: '03',
    icon: TrendingUp,
    title: 'เห็นภาพรวมและจุดติดขัดเร็วขึ้น',
    description: 'ดู dashboard, progress และ weekly report concept เพื่อช่วยทีมตัดสินใจจากข้อมูลชุดเดียวกัน',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">วิธีใช้งาน</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            เริ่มต้นได้ใน 3 ขั้นตอน
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            หน้า demo นี้เน้นอธิบาย onboarding flow ของ product concept โดยไม่เชื่อมต่อระบบจริง
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-indigo-100" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.step} className="relative text-center">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-6 shadow-lg shadow-indigo-200">
                    <Icon className="w-8 h-8 text-white" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-violet-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
