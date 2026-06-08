'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/useTranslation'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-transparent text-saas-ink">
      <div className="text-center max-w-md">
        <div className="inline-block border border-saas-line bg-saas-surface-soft px-8 py-4 shadow-saas-md mb-8 rounded-[20px]">
          <h1 className="text-7xl sm:text-8xl font-bold text-white tracking-tight leading-none">404</h1>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
          {t('notFound.title')}
        </h2>
        <p className="text-base text-saas-muted mb-10 border-l-2 border-saas-line pl-4 text-left leading-7">
          {t('notFound.description')}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-black shadow-saas-sm transition hover:bg-neutral-200"
        >
          {t('notFound.backToHome')}
        </Link>
      </div>
    </div>
  )
}
