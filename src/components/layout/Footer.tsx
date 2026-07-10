'use client'

import type { ComponentType } from 'react'
import { Github, Linkedin, Mail, Phone, Twitter } from 'lucide-react'
import { socials } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
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
    <footer className="border-t border-saas-line bg-saas-surface py-10 font-display">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-start">
          <div className="min-w-0">
            <p className="text-base font-semibold text-saas-ink">Chinnakrit.dev</p>
            <p className="mt-2 max-w-md break-words text-sm leading-6 text-saas-muted">
              {tl({
                en: 'Building AI automation and production-ready systems.',
                th: 'สร้างระบบ AI automation และ full-stack systems ที่ใช้ได้จริงในระดับโปรดักชัน',
              })}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {socials.map((social) => {
              const IconComponent = iconMap[social.icon]
              if (!IconComponent) return null

              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-[6px] text-saas-muted transition-colors hover:bg-saas-surface-soft hover:text-saas-accent-strong"
                  aria-label={social.name}
                >
                  <IconComponent className="size-4" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-8 border-t border-saas-line pt-6 text-xs text-saas-muted">
          © {currentYear} Chinnakrit.dev. {tl({ en: 'All rights reserved.', th: 'สงวนลิขสิทธิ์ทั้งหมด' })}
        </div>
      </div>
    </footer>
  )
}

export default Footer
