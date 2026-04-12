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
    <nav className="bg-white sticky top-0 z-50 border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 transform hover:-rotate-2 transition-transform cursor-pointer">
            <div className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black shadow-neo">
              <span className="text-white font-black text-xl">D</span>
            </div>
            <span className="text-2xl font-black tracking-tighter">DEV<span className="text-neo-coral">FOLIO</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.filter(item => item.label !== 'Contact').map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="text-black font-bold text-lg hover:underline decoration-4 decoration-neo-coral underline-offset-4 uppercase"
              >
                {t(`nav.${item.label.toLowerCase()}`)}
              </a>
            ))}
            <a
              href="/#contact"
              className="bg-neo-sky text-black border-2 border-black px-6 py-2 font-bold shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm transition-all uppercase"
            >
              {t('nav.contact')}!
            </a>

            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 bg-neo-lemon border-2 border-black px-3 py-2 font-bold shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-neo-sm transition-all"
              >
                <Globe size={18} />
                <span className="uppercase">{currentLang?.name || language}</span>
                <ChevronDown size={16} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {isLangOpen && (
                <div className="absolute right-0 mt-2 bg-white border-4 border-black shadow-neo z-50 min-w-[120px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code)
                        setIsLangOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 font-bold hover:bg-neo-lemon transition-colors ${language === lang.code ? 'bg-neo-lemon' : ''}`}
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
              className="text-black border-2 border-black p-1 shadow-neo-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              {isMenuOpen ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-neo-peach border-t-4 border-black p-4 space-y-4">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="block text-black font-bold text-xl uppercase border-b-2 border-black pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t(`nav.${item.label.toLowerCase()}`)}
            </a>
          ))}

          {/* Mobile Language Switcher */}
          <div className="space-y-2">
            <p className="font-bold text-sm uppercase">เลือกภาษา / Select Language</p>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex-1 py-2 font-bold border-2 border-black transition-all ${
                    language === lang.code
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-neo-lemon'
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
