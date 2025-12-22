import React from 'react'
import { useSocials } from '../../hooks/usePortfolioData'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { data: socials, loading } = useSocials()

  return (
    <footer className="bg-black border-t-4 border-black text-white">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b-4 border-white">
          {/* Brand */}
          <div>
            <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 text-neo-pink">MY.PORTFOLIO</h3>
            <p className="font-mono text-xs sm:text-sm text-gray-300">
              สร้างสรรค์เว็บไซต์และแอปพลิเคชันที่สวยงาม & ใช้งานได้จริง
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-sm sm:text-base text-neo-blue uppercase mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2 font-mono text-xs sm:text-sm">
              <li><a href="#home" className="hover:text-neo-pink transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-neo-pink transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-neo-pink transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-neo-pink transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-black text-sm sm:text-base text-neo-yellow uppercase mb-3 sm:mb-4">Connect</h4>
            <div className="flex gap-3">
              {loading ? (
                <p className="text-xs sm:text-sm text-gray-400">Loading...</p>
              ) : socials && socials.length > 0 ? (
                socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white flex items-center justify-center hover:bg-neo-pink hover:border-neo-pink transition-all duration-200 text-sm sm:text-lg"
                  >
                    {social.name.slice(0, 1)}
                  </a>
                ))
              ) : (
                <p className="text-xs sm:text-sm text-gray-400">No social links</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm text-gray-400 text-center md:text-left">
          <p>© {currentYear} All rights reserved.</p>
          <p>Designed & Built by <span className="text-white font-bold">Chinnakrit Sripan</span></p>
          <p>Made with <span className="text-neo-pink">❤</span> using React + Tailwind</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
