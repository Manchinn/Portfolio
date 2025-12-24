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
      <section id="home" className="min-h-screen bg-neo-blue flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 border-b-4 border-black">
        <div className="bg-white border-4 border-black p-6 sm:p-8 md:p-10 shadow-neo text-center max-w-2xl w-full mx-4">
          {/* Profile Image */}
          {profileData.image && (
            <div className="mb-6 sm:mb-8 border-4 border-black w-24 h-24 sm:w-32 sm:h-32 mx-auto overflow-hidden">
              <img
                src={profileData.image}
                alt={profileData.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 sm:mb-4 uppercase">{profileData.name}</h1>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-neo-blue">{profileData.title}</h2>
          <p className="font-mono text-base sm:text-lg mb-6 sm:mb-8 text-gray-700">
            {profileData.shortBio}
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#projects">
              <Button text="ดูผลงาน" color="bg-neo-yellow" />
            </a>
            <a href="#contact">
              <Button text="ติดต่อผม" color="bg-neo-pink" />
            </a>
            <a href={profileData.resume} download>
              <Button text="Download CV" color="bg-neo-green" />
            </a>
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