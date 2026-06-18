'use client'

import React from 'react'
import { Github, Linkedin, Mail, Phone, Twitter } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import { socials } from '@/data/portfolio'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  phone: Phone,
  twitter: Twitter,
}

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { tl } = useTranslation()

  return (
    <footer className="border-t border-saas-line/80 bg-saas-bg py-12 font-display">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left min-w-0">
          <h3 className="text-xl font-black text-saas-ink">Chinnakrit.dev</h3>
          <p className="text-sm text-saas-muted mt-1 max-w-md break-words text-pretty">
            {tl({
              en: 'Building AI automation and production-ready systems.',
              th: 'สร้างระบบ AI automation และ full-stack systems ที่ใช้ได้จริงในระดับโปรดักชัน',
            })}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {socials.map((social) => {
            const IconComponent = iconMap[social.icon]
            if (!IconComponent) return null

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-[12px] border border-saas-line bg-saas-surface text-saas-muted hover:border-saas-ink hover:text-saas-ink hover:bg-saas-surface-soft transition shadow-saas-sm"
                aria-label={social.name}
              >
                <IconComponent className="size-5" />
              </a>
            )
          })}
        </div>
      </div>
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-saas-line/50 text-xs font-mono text-saas-muted flex flex-col sm:flex-row justify-between items-center gap-4">
        <span>© {currentYear} Chinnakrit.dev. {tl({ en: 'All rights reserved.', th: 'สงวนลิขสิทธิ์ทั้งหมด' })}</span>
        <span className="text-[10px] tracking-wider uppercase text-saas-muted/60">
          {tl({ en: 'Crafted with passion', th: 'พัฒนาด้วยใจ' })}
        </span>
      </div>
    </footer>
  )
}

export default Footer
