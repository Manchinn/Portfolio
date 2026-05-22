'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { navItems } from '../../../data/portfolio'
import { useTranslation } from '../../../i18n/useTranslation'

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

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-700">
              <span className="text-sm font-black text-white">C/</span>
            </div>
            <span className="text-sm font-black uppercase tracking-[0.18em] text-slate-900">System Profile</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-2 md:flex">
            {navItems.filter(item => item.label !== 'Contact').map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="rounded-md px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"
              >
                {t(`nav.${item.label.toLowerCase()}`)}
              </a>
            ))}
            <a
              href="/#contact"
              className="rounded-md bg-blue-700 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-blue-800"
            >
              {t('nav.contact')}
            </a>

            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <Globe size={18} />
                <span className="uppercase">{currentLang?.name || language}</span>
                <ChevronDown size={16} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {isLangOpen && (
                <div className="absolute right-0 z-50 mt-2 min-w-[120px] rounded-md border border-slate-200 bg-white shadow-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code)
                        setIsLangOpen(false)
                      }}
                      className={`w-full px-4 py-2 text-left text-sm font-bold transition-colors hover:bg-blue-50 ${language === lang.code ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-md border border-slate-200 p-2 text-slate-700"
            >
              {isMenuOpen ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="space-y-3 border-t border-slate-200 bg-white p-4 md:hidden">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="block rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-slate-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {t(`nav.${item.label.toLowerCase()}`)}
            </a>
          ))}

          {/* Mobile Language Switcher */}
          <div className="space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">เลือกภาษา / Select Language</p>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex-1 rounded-md border py-2 font-bold transition-all ${
                    language === lang.code
                      ? 'border-blue-700 bg-blue-700 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-blue-50'
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
