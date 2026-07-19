'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Check, ChevronDown, Code2, Globe, Menu, X } from 'lucide-react'
import { navItems } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const { t, language, changeLanguage, languages } = useTranslation()
  const langRef = useRef<HTMLDivElement>(null)
  const currentLang = languages.find((item) => item.code === language)

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
    <nav className="sticky top-0 z-50 border-b border-portfolio-line bg-portfolio-bg/95 font-display backdrop-blur-lg">
      <div className="mx-auto flex h-17 max-w-[1180px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/#home" className="flex min-w-0 items-center gap-3 text-portfolio-ink" aria-label="Portfolio home">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-portfolio-accent text-xs font-bold text-white">
            <Code2 size={17} />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block text-sm font-semibold leading-none">Software Portfolio</span>
            <span className="mt-1 block text-[10px] font-medium uppercase text-portfolio-muted">
              {t('nav.tagline')}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-portfolio-muted transition-colors hover:text-portfolio-ink"
              >
                {t(`nav.${item.label.toLowerCase()}`)}
              </Link>
            ))}
          </div>

          <div className="h-5 w-px bg-portfolio-line" />

          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen((open) => !open)}
              className="flex items-center gap-2 rounded-[6px] px-2 py-2 text-xs font-semibold text-portfolio-muted transition-colors hover:bg-portfolio-surface-soft hover:text-portfolio-ink"
              aria-expanded={isLangOpen}
              aria-label="Change language"
            >
              <Globe size={15} />
              <span className="uppercase">{currentLang?.name || language}</span>
              <ChevronDown size={14} className={cn('transition-transform', isLangOpen && 'rotate-180')} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 z-50 mt-2 min-w-[148px] overflow-hidden rounded-[8px] border border-portfolio-line bg-portfolio-surface p-1 shadow-portfolio-md">
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
                        ? 'bg-portfolio-accent-soft text-portfolio-accent-strong'
                        : 'text-portfolio-muted hover:bg-portfolio-surface-soft hover:text-portfolio-ink'
                    )}
                  >
                    {item.name}
                    {language === item.code && <Check size={15} />}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="rounded-[6px] border border-portfolio-line bg-portfolio-surface p-2.5 text-portfolio-ink lg:hidden"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-portfolio-line bg-portfolio-surface px-4 py-4 shadow-portfolio-sm lg:hidden">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-1 sm:grid-cols-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'rounded-[6px] px-3 py-3 text-sm font-semibold transition-colors',
                    'text-portfolio-muted hover:bg-portfolio-surface-soft hover:text-portfolio-ink'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`nav.${item.label.toLowerCase()}`)}
                </Link>
              ))}
            </div>

            <div className="mt-4 border-t border-portfolio-line pt-4">
              <p className="mb-2 text-xs font-medium uppercase text-portfolio-muted">Select language</p>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((item) => (
                  <button
                    type="button"
                    key={item.code}
                    onClick={() => changeLanguage(item.code)}
                    className={cn(
                      'rounded-[6px] border px-3 py-2.5 text-sm font-semibold transition-colors',
                      language === item.code
                        ? 'border-portfolio-accent bg-portfolio-accent-soft text-portfolio-accent-strong'
                        : 'border-portfolio-line text-portfolio-muted hover:bg-portfolio-surface-soft'
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
