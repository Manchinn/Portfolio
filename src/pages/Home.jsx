import React from 'react'
import Button from '../components/ui/Button/Button'

// นำเข้า Sections ทั้งหมด
import About from '../components/Sections/About'
import Skills from '../components/Sections/Skills'
import Experience from '../components/Sections/Experience'
import Projects from '../components/Sections/Projects'
import Contact from '../components/Sections/Contact'
import Footer from '../components/layout/Footer'

// นำเข้าข้อมูล
import { profileData } from '../data/portfolio'

const Home = () => {
  return (
    <div className="flex flex-col">

      {/* --- Section 1: Hero --- */}
      <section id="home" className="neo-section bg-neo-blue text-black flex items-center">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2 items-center px-4 w-full">
          {/* Hero copy */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 bg-white border-2 border-black px-3 py-2 font-mono text-sm shadow-neo-sm uppercase">
              🚀 Portfolio 2025
            </span>
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight neo-heading border-b-0">
                {profileData.name}
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-black mt-2">{profileData.title}</p>
            </div>
            <p className="font-mono text-base sm:text-lg text-black/80 max-w-xl">
              {profileData.shortBio}
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#projects">
                <Button text="ดูผลงาน" color="bg-neo-yellow" className="neo-press shadow-neo-lg" />
              </a>
              <a href="#contact">
                <Button text="ติดต่อผม" color="bg-neo-pink" className="neo-press shadow-neo-lg" />
              </a>
              <a href={profileData.resume} download>
                <Button text="Download CV" color="bg-neo-green" className="neo-press shadow-neo-lg" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[{ label: 'Projects', value: '6+' }, { label: 'Years', value: '2+' }, { label: 'Clients', value: '100%' }].map((stat, idx) => (
                <div key={idx} className="neo-card p-4 text-center shadow-neo-sm">
                  <div className="text-3xl font-black mb-1">{stat.value}</div>
                  <div className="font-mono text-sm uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="neo-card neo-card-thick shadow-neo-lg p-6 sm:p-8 bg-white animate-scale-up flex flex-col gap-4">
            {profileData.image && (
              <div className="border-4 border-black overflow-hidden h-56 sm:h-72 bg-gray-100">
                <img src={profileData.image} alt={profileData.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black uppercase">เกี่ยวกับผม</h3>
              <p className="font-mono text-sm sm:text-base text-gray-800">{profileData.bio}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="neo-card shadow-neo-sm p-3">
                <p className="font-black text-sm uppercase mb-1 text-neo-blue">Email</p>
                <a href={`mailto:${profileData.email}`} className="font-mono text-sm break-all text-neo-blue hover:underline">{profileData.email}</a>
              </div>
              <div className="neo-card shadow-neo-sm p-3">
                <p className="font-black text-sm uppercase mb-1 text-neo-pink">Location</p>
                <p className="font-mono text-sm text-gray-800">{profileData.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: About --- */}
      <About />

      {/* --- Section 3: Skills --- */}
      <Skills />

      {/* --- Section 4: Experience --- */}
      <Experience />

      {/* --- Section 5: Projects --- */}
      <Projects />

      {/* --- Section 6: Contact --- */}
      <Contact />

      {/* --- Section 7: Footer --- */}
      <Footer />

    </div>
  )
}

export default Home