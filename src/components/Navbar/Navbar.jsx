import React from 'react'

const Navbar = () => {
  const linkStyles = "hover:underline decoration-4 underline-offset-4 cursor-pointer"
  return (
    <nav className="flex justify-between items-center border-b-4 border-black bg-white p-4 sticky top-0 z-50">
      <div className="text-2xl font-black bg-black text-white px-2 italic">
        MY.PORTFOLIO
      </div>
      
      <div className="flex gap-4 font-bold">
        {/* ใช้ href="#ชื่อไอดี" เพื่อสั่งให้เลื่อนไปหา */}
        <a href="#home" className={`${linkStyles} decoration-neo-pink`}>Home</a>
        <a href="#about" className={`${linkStyles} decoration-neo-blue`}>About</a>
        <a href="#projects" className={`${linkStyles} decoration-neo-green`}>Projects</a>
        <a href="#contact" className={`${linkStyles} decoration-neo-yellow`}>Contact</a>
      </div>
    </nav>
  )
}

export default Navbar