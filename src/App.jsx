import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar/Navbar.jsx'
import Home from './pages/Home.jsx'
import ArticlePage from './pages/ArticlePage.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/projects" element={<div className="p-10 font-black text-4xl">Projects Page</div>} />
        <Route path="/contact" element={<div className="p-10 font-black text-4xl">Contact Page</div>} />
      </Routes>
    </>
  )
}

export default App