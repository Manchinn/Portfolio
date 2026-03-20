import React from 'react'
import { Github, Linkedin, ExternalLink } from 'lucide-react'
import { useTranslation } from '../../i18n/useTranslation'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { tl } = useTranslation()

  return (
    <footer className="bg-black text-white py-12 border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-black">DEV<span className="text-neo-coral">FOLIO</span></h3>
          <p className="text-sm text-gray-400 mt-1 font-mono">{tl({ en: 'BUILDING THE WEB, BRUTALLY.', th: 'สร้างเว็บอย่างมีสไตล์', zh: '暴力美学构建网站' })}</p>
        </div>
        <div className="flex space-x-4">
          {[Github, Linkedin, ExternalLink].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-10 h-10 bg-white border-2 border-white text-black flex items-center justify-center hover:bg-neo-coral hover:border-neo-coral transition-colors"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-sm text-center font-mono text-gray-500">
        © {currentYear} DEVFOLIO. {tl({ en: 'NO RIGHTS RESERVED.', th: 'สงวนลิขสิทธิ์', zh: '版权所有。' })}
      </div>
    </footer>
  )
}

export default Footer
