'use client'

import Link from 'next/link'
import type { Language } from '@/data/types'
import { getSharedChrome } from '@/content/shared'
import { useTranslation } from '@/i18n/useTranslation'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { language } = useTranslation()
  const shared = getSharedChrome(language as Language)

  return (
    <footer className="border-t border-portfolio-line bg-portfolio-surface py-9 font-display">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-4 text-sm text-portfolio-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p>{shared.portfolioLabel}</p>
          <p className="mt-1 text-xs">© {currentYear}</p>
        </div>
        <Link href="/work-with-me" className="font-semibold text-portfolio-accent-strong hover:text-portfolio-accent">
          {shared.createBrief}
        </Link>
      </div>
    </footer>
  )
}

export default Footer
