import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t-4 border-black text-white">
      <div className="max-w-6xl mx-auto p-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b-4 border-white">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black mb-4 text-neo-pink">MY.PORTFOLIO</h3>
            <p className="font-mono text-sm text-gray-300">
              สร้างสรรค์เว็บไซต์และแอปพลิเคชันที่สวยงาม & ใช้งานได้จริง
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-neo-blue uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2 font-mono text-sm">
              <li><a href="#home" className="hover:text-neo-pink transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-neo-pink transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-neo-pink transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-neo-pink transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-black text-neo-yellow uppercase mb-4">Connect</h4>
            <div className="flex gap-3">
              {[
                { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
                { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
                { name: 'Twitter', url: 'https://twitter.com', icon: '𝕏' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-neo-pink hover:border-neo-pink transition-all duration-200 text-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-sm text-gray-400">
          <p>© {currentYear} All rights reserved.</p>
          <p>Designed & Built by <span className="text-white font-bold">ชินณภา</span></p>
          <p>Made with <span className="text-neo-pink">❤</span> using React + Tailwind</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
