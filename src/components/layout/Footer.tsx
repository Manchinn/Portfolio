'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/useTranslation'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { tl } = useTranslation()

  return (
    <footer className="border-t border-saas-line bg-saas-surface py-9 font-display">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-4 text-sm text-saas-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p>{tl({ en: 'Software engineering portfolio', th: 'พอร์ตโฟลิโอวิศวกรรมซอฟต์แวร์' })}</p>
          <p className="mt-1 text-xs">© {currentYear}</p>
        </div>
        <Link href="/work-with-me" className="font-semibold text-saas-accent-strong hover:text-saas-accent">
          {tl({ en: 'Create a project brief', th: 'สร้าง Project Brief' })}
        </Link>
      </div>
    </footer>
  )
}

export default Footer
