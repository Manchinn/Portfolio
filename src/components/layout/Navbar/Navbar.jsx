import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems } from '../../../data/portfolio'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 transform hover:-rotate-2 transition-transform cursor-pointer">
            <div className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-white font-black text-xl">D</span>
            </div>
            <span className="text-2xl font-black tracking-tighter">DEV<span className="text-[#FF6B6B]">FOLIO</span></span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.filter(item => item.label !== 'Contact').map((item, idx) => (
              <a 
                key={idx} 
                href={item.href} 
                className="text-black font-bold text-lg hover:underline decoration-4 decoration-[#FF6B6B] underline-offset-4 uppercase"
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-[#A0C4FF] text-black border-2 border-black px-6 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
            >
              Contact Me!
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-black border-2 border-black p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              {isMenuOpen ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FFD6A5] border-t-4 border-black p-4 space-y-4">
          {navItems.map((item, idx) => (
            <a 
              key={idx} 
              href={item.href} 
              className="block text-black font-bold text-xl uppercase border-b-2 border-black pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar;