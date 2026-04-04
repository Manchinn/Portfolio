'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'ทดลองใช้ฟรี 14 วัน ต้องใส่บัตรเครดิตไหม?',
    answer: 'ไม่ต้องครับ ทดลองใช้ฟรีได้เลยโดยไม่ต้องใส่ข้อมูลการชำระเงินใดๆ เมื่อครบ 14 วัน ระบบจะแจ้งให้คุณเลือกแพ็กเกจ ถ้าไม่ต่อก็จะ downgrade เป็น Free plan อัตโนมัติ',
  },
  {
    question: 'FlowSync รองรับกี่คนต่อทีม?',
    answer: 'Free plan รองรับสูงสุด 3 คน, Pro plan ไม่จำกัดจำนวนสมาชิก, Enterprise plan รองรับทีมขนาดใหญ่หลายพันคนพร้อม custom pricing',
  },
  {
    question: 'ข้อมูลของเราปลอดภัยไหม?',
    answer: 'ปลอดภัยมากครับ ข้อมูลทั้งหมดเข้ารหัสด้วย AES-256 ทั้ง in-transit และ at-rest เซิร์ฟเวอร์อยู่ใน data center ที่ได้รับการรับรอง ISO 27001 และ SOC 2 Type II',
  },
  {
    question: 'เชื่อมต่อกับ tools ที่ใช้อยู่ได้ไหม?',
    answer: 'ได้เลยครับ FlowSync รองรับ integration กับ Jira, Trello, Asana, Slack, Microsoft Teams, Google Workspace, GitHub, GitLab และอีกกว่า 50 แอป ผ่าน native integration และ Zapier',
  },
  {
    question: 'ยกเลิก subscription แล้วข้อมูลหายไหม?',
    answer: 'ไม่หายครับ หลังยกเลิก คุณยังเข้าถึงข้อมูลได้ 30 วัน และสามารถ export ข้อมูลทั้งหมดได้ในรูปแบบ CSV หรือ JSON ก่อนที่ account จะถูก deactivate',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            คำถามที่พบบ่อย
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-200 transition-colors"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
