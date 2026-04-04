import { Check } from 'lucide-react'

const plans = [
  {
    name: 'ฟรี',
    price: '0',
    period: 'ตลอดไป',
    description: 'สำหรับทีมขนาดเล็กที่เพิ่งเริ่มต้น',
    features: [
      'สมาชิกได้ถึง 3 คน',
      'งานสูงสุด 100 งาน',
      'AI จัดลำดับงานพื้นฐาน',
      'Dashboard มาตรฐาน',
      'Storage 1 GB',
    ],
    cta: 'เริ่มใช้ฟรี',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '299',
    period: 'ต่อคน/เดือน',
    description: 'สำหรับทีมที่ต้องการ AI เต็มรูปแบบ',
    features: [
      'สมาชิกไม่จำกัด',
      'งานไม่จำกัด',
      'AI เต็มรูปแบบ + Auto-assign',
      'Automation workflow',
      'Integration 50+ แอป',
      'Storage 100 GB',
      'Priority support',
    ],
    cta: 'ทดลอง 14 วันฟรี',
    highlighted: true,
    badge: 'ยอดนิยม',
  },
  {
    name: 'Enterprise',
    price: 'ติดต่อ',
    period: 'ราคาพิเศษ',
    description: 'สำหรับองค์กรขนาดใหญ่ที่ต้องการ custom',
    features: [
      'ทุกอย่างใน Pro',
      'SSO / SAML',
      'Audit log ละเอียด',
      'SLA 99.99% uptime',
      'Dedicated account manager',
      'Custom integration',
      'On-premise option',
    ],
    cta: 'ติดต่อทีมขาย',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">ราคา</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            ราคาที่โปร่งใส ไม่มีค่าใช้จ่ายแอบแฝง
          </h2>
          <p className="text-xl text-gray-500">ยกเลิกได้ทุกเมื่อ ไม่มีสัญญาผูกมัด</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border-2 ${
                plan.highlighted
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-2xl shadow-indigo-200 lg:-mt-4 lg:mb-4'
                  : 'border-gray-100 bg-white'
              }`}
            >
              {plan.badge && (
                <span className="inline-block bg-violet-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {plan.badge}
                </span>
              )}
              <h3 className={`text-2xl font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-indigo-200' : 'text-gray-500'}`}>
                {plan.description}
              </p>
              <div className="mb-8">
                <span className={`text-5xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price === 'ติดต่อ' ? '' : '฿'}{plan.price}
                </span>
                <span className={`ml-2 text-sm ${plan.highlighted ? 'text-indigo-200' : 'text-gray-500'}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-violet-300' : 'text-indigo-500'}`} />
                    <span className={`text-sm ${plan.highlighted ? 'text-indigo-100' : 'text-gray-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`block text-center py-3 px-6 rounded-xl font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
