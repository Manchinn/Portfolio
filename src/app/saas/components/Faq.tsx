'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'หน้านี้เป็น product จริงหรือ demo?',
    answer: 'เป็น public-safe prototype demo สำหรับโชว์ landing page, product messaging และ responsive UI composition ยังไม่เชื่อมต่อระบบสมัครสมาชิกหรือ payment จริง',
  },
  {
    question: 'FlowSync ใช้ข้อมูลจริงหรือไม่?',
    answer: 'ไม่ใช้ข้อมูลจริงครับ เนื้อหาทั้งหมดเป็น mock content เพื่อสาธิต product concept และไม่เปิดเผย private system, credentials หรือข้อมูลลูกค้า',
  },
  {
    question: 'ถ้าจะทำเป็น product จริงต้องเพิ่มอะไร?',
    answer: 'ต้องเพิ่ม auth, database, workspace model, role permissions, audit trail, integration layer, input validation และ security review ตามขอบเขตการใช้งานจริง',
  },
  {
    question: 'เชื่อมต่อกับ tools ที่ใช้อยู่ได้ไหม?',
    answer: 'ใน demo นี้เป็น placeholder สำหรับ integration story เท่านั้น ถ้าทำจริงสามารถเลือกเชื่อม Jira, Trello, Slack, GitHub หรือเครื่องมืออื่นตาม workflow ที่ต้องการ',
  },
  {
    question: 'ทำไมมี pricing section ถ้ายังเป็น demo?',
    answer: 'pricing section ใช้แสดงว่า landing page ครบโครงสร้างแบบ SaaS และช่วยอธิบาย packaging ของ offer ได้ ตัวเลขเป็นตัวอย่าง ไม่ใช่ข้อเสนอขายจริง',
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
