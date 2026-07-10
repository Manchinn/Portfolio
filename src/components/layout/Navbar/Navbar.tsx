'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Globe, ChevronDown, ArrowRight } from 'lucide-react'
import { navItems } from '../../../data/portfolio'
import { useTranslation } from '../../../i18n/useTranslation'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const { t, language, changeLanguage, languages } = useTranslation()
  const langRef = useRef<HTMLDivElement>(null)

  const currentLang = languages.find(l => l.code === language)

  // Click-outside handler สำหรับ language dropdown — ปิด dropdown เมื่อคลิกนอก
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false)
      }
    }
    if (isLangOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isLangOpen])

  const primaryNavItems = navItems.filter(item => item.label !== 'Contact')

  return (
    <nav className="sticky top-0 z-50 border-b border-saas-line/80 bg-saas-bg/90 font-display backdrop-blur-xl">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/#home" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-saas-line bg-saas-surface shadow-saas-sm">
              <span className="text-sm font-black text-saas-ink">C/</span>
            </div>
            <div className="hidden min-w-0 sm:block">
              <p className="text-sm font-black leading-none text-saas-ink">Chinnakrit.dev</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-saas-muted">
                {t('nav.tagline')}
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-2 lg:flex">
            <div className="flex items-center gap-1 rounded-full border border-saas-line bg-saas-surface/80 p-1 shadow-saas-sm">
              {primaryNavItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="rounded-full px-3 py-2 text-xs font-black text-saas-muted transition hover:bg-saas-line hover:text-saas-ink"
                >
                  {t(`nav.${item.label.toLowerCase()}`)}
                </Link>
              ))}
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-black text-black shadow-saas-sm transition hover:bg-neutral-200"
            >
              {t('nav.contact')}
              <ArrowRight size={15} strokeWidth={3} />
            </Link>

            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 rounded-full border border-saas-line bg-saas-surface px-3 py-2.5 text-xs font-black text-saas-muted shadow-saas-sm transition hover:border-saas-ink hover:text-saas-ink focus-visible:shadow-saas-focus"
                aria-expanded={isLangOpen}
                aria-label="Change language"
              >
                <Globe size={16} />
                <span className="uppercase">{currentLang?.name || language}</span>
                <ChevronDown size={15} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {isLangOpen && (
                <div className="absolute right-0 z-50 mt-2 min-w-[132px] overflow-hidden rounded-[14px] border border-saas-line bg-saas-surface shadow-saas-md">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code)
                        setIsLangOpen(false)
                      }}
                      className={`w-full px-4 py-3 text-left text-sm font-bold transition-colors hover:bg-saas-line ${
                        language === lang.code ? 'bg-saas-line text-saas-ink' : 'text-saas-muted hover:text-saas-ink'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tablet Menu */}
          <div className="hidden items-center gap-2 md:flex lg:hidden">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-black text-black shadow-saas-sm transition hover:bg-neutral-200"
            >
              {t('nav.contact')}
              <ArrowRight size={15} strokeWidth={3} />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full border border-saas-line bg-saas-surface p-3 text-saas-ink shadow-saas-sm"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X size={22} strokeWidth={3} /> : <Menu size={22} strokeWidth={3} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full border border-saas-line bg-saas-surface p-3 text-saas-ink shadow-saas-sm"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X size={22} strokeWidth={3} /> : <Menu size={22} strokeWidth={3} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile and Tablet Menu */}
      {isMenuOpen && (
        <div className="border-t border-saas-line bg-saas-bg/95 p-4 shadow-saas-md lg:hidden">
          <div className="mx-auto grid max-w-[1280px] gap-2 sm:grid-cols-2 md:grid-cols-4">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className={cn(
                  'rounded-[14px] border px-4 py-3 text-sm font-black transition',
                  item.label === 'Contact'
                    ? 'border-white bg-white text-black'
                    : 'border-saas-line bg-saas-surface text-saas-ink hover:bg-saas-line'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(`nav.${item.label.toLowerCase()}`)}
              </Link>
            ))}
          </div>

          {/* Mobile Language Switcher */}
          <div className="mx-auto mt-4 max-w-[1280px] space-y-2">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-saas-muted">เลือกภาษา / Select Language</p>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex-1 rounded-full border px-4 py-3 text-sm font-black transition-all ${
                    language === lang.code
                      ? 'border-white bg-white text-black'
                      : 'border-saas-line bg-saas-surface text-saas-ink hover:bg-saas-line'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
