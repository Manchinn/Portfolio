'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, ChevronDown, Globe, Menu, X } from 'lucide-react'
import { navItems } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const { t, language, changeLanguage, languages } = useTranslation()
  const langRef = useRef<HTMLDivElement>(null)
  const currentLang = languages.find((item) => item.code === language)
  const primaryNavItems = navItems.filter((item) => item.label !== 'Contact')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false)
      }
    }

    if (isLangOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isLangOpen])

  return (
    <nav className="sticky top-0 z-50 border-b border-saas-line bg-saas-bg/95 font-display backdrop-blur-lg">
      <div className="mx-auto flex h-17 max-w-[1180px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/#home" className="flex min-w-0 items-center gap-3 text-saas-ink">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-saas-accent text-xs font-bold text-white">
            C/
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block text-sm font-semibold leading-none">Chinnakrit.dev</span>
            <span className="mt-1 block text-[10px] font-medium uppercase text-saas-muted">
              {t('nav.tagline')}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-5">
            {primaryNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-saas-muted transition-colors hover:text-saas-ink"
              >
                {t(`nav.${item.label.toLowerCase()}`)}
              </Link>
            ))}
          </div>

          <div className="h-5 w-px bg-saas-line" />

          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen((open) => !open)}
              className="flex items-center gap-2 rounded-[6px] px-2 py-2 text-xs font-semibold text-saas-muted transition-colors hover:bg-saas-surface-soft hover:text-saas-ink"
              aria-expanded={isLangOpen}
              aria-label="Change language"
            >
              <Globe size={15} />
              <span className="uppercase">{currentLang?.name || language}</span>
              <ChevronDown size={14} className={cn('transition-transform', isLangOpen && 'rotate-180')} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 z-50 mt-2 min-w-[148px] overflow-hidden rounded-[8px] border border-saas-line bg-saas-surface p-1 shadow-saas-md">
                {languages.map((item) => (
                  <button
                    type="button"
                    key={item.code}
                    onClick={() => {
                      changeLanguage(item.code)
                      setIsLangOpen(false)
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-[6px] px-3 py-2.5 text-left text-sm font-medium transition-colors',
                      language === item.code
                        ? 'bg-saas-accent-soft text-saas-accent-strong'
                        : 'text-saas-muted hover:bg-saas-surface-soft hover:text-saas-ink'
                    )}
                  >
                    {item.name}
                    {language === item.code && <Check size={15} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-[6px] bg-saas-accent px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-saas-accent-strong"
          >
            {t('nav.contact')}
            <ArrowRight size={15} />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="rounded-[6px] border border-saas-line bg-saas-surface p-2.5 text-saas-ink lg:hidden"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-saas-line bg-saas-surface px-4 py-4 shadow-saas-sm lg:hidden">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-1 sm:grid-cols-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'rounded-[6px] px-3 py-3 text-sm font-semibold transition-colors',
                    item.label === 'Contact'
                      ? 'bg-saas-accent text-white'
                      : 'text-saas-muted hover:bg-saas-surface-soft hover:text-saas-ink'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`nav.${item.label.toLowerCase()}`)}
                </Link>
              ))}
            </div>

            <div className="mt-4 border-t border-saas-line pt-4">
              <p className="mb-2 text-xs font-medium uppercase text-saas-muted">Select language</p>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((item) => (
                  <button
                    type="button"
                    key={item.code}
                    onClick={() => changeLanguage(item.code)}
                    className={cn(
                      'rounded-[6px] border px-3 py-2.5 text-sm font-semibold transition-colors',
                      language === item.code
                        ? 'border-saas-accent bg-saas-accent-soft text-saas-accent-strong'
                        : 'border-saas-line text-saas-muted hover:bg-saas-surface-soft'
                    )}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
