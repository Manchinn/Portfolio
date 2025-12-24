import React, { useState } from 'react'
import { navItems } from '../../data/portfolio'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkStyles = "hover:text-neo-pink transition-colors duration-300 font-bold relative group";

  return (
    <nav className="flex justify-between items-center border-b-4 border-black bg-white p-3 sm:p-4 sticky top-0 z-50 shadow-neo">
      {/* Logo */}
      <div className="text-lg sm:text-xl md:text-2xl font-black bg-black text-white px-2 sm:px-3 py-1 italic hover:scale-105 transition-transform duration-200">
        MY.PORTFOLIO
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8">
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            className={linkStyles}
          >
            {item.label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neo-pink transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl font-black bg-black text-white p-2 hover:bg-neo-pink transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b-4 border-black flex flex-col gap-4 p-4 md:hidden animate-fade-in">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="font-bold text-neo-blue hover:text-neo-pink transition-colors"
              onClick={() => setIsOpen(false)}
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