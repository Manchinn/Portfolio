import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar/Navbar.jsx'
import Home from './pages/Home.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<div className="p-10 font-black text-4xl">หน้า Projects</div>} />
        <Route path="/contact" element={<div className="p-10 font-black text-4xl">หน้า Contact</div>} />
      </Routes>
    </>
  )
}

export default App