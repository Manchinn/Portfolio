import React from 'react'
import { ArrowRight, Github, Linkedin, Mail, Check } from 'lucide-react'

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
    <div className="font-sans text-black bg-[#FFFAEB] min-h-screen selection:bg-black selection:text-white">

      {/* --- Section 1: Hero --- */}
      <header id="home" className="relative overflow-hidden scroll-mt-20 py-20 bg-[#FFFAEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Hero copy */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="inline-block bg-[#CAFFBF] border-2 border-black px-4 py-1 font-bold mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
                <span>👋 Open to work: Freelance & Contract</span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-black text-black leading-none mb-6">
                CHINNAKRIT SRIPAN<br/>
                <span className="text-[#9BF6FF] bg-black px-2">PORTFOLIO</span><br/>
                WEBSITE
              </h1>
              <p className="text-xl font-bold text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0 border-l-4 border-black pl-4">
                {profileData.shortBio || "ผมช่วยเปลี่ยนไอเดียของคุณให้เป็น Web Application ที่ใช้งานได้จริง สวยงาม รวดเร็ว และรองรับ SEO"}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#projects" className="bg-[#FF9642] text-black border-2 border-black px-8 py-4 font-black text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center">
                  ดูผลงาน <ArrowRight className="ml-2 w-6 h-6 border-2 border-black rounded-full p-0.5 bg-white" />
                </a>
                <a href="#about" className="bg-white text-black border-2 border-black px-8 py-4 font-black text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center">
                  เกี่ยวกับผม
                </a>
              </div>
              
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-6">
                {[
                  { Icon: Github, href: "https://github.com" },
                  { Icon: Linkedin, href: "https://linkedin.com" },
                  { Icon: Mail, href: `mailto:${profileData.email}` }
                ].map((item, i) => (
                  <a key={i} href={item.href} className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-pointer">
                    <item.Icon size={24} strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>

            {/* Hero Illustration (Geometric Shapes) */}
            <div className="w-full lg:w-1/2 relative min-h-[400px] flex items-center justify-center">
              <div className="absolute w-64 h-64 bg-[#FDFFB6] border-4 border-black top-0 right-10 z-0"></div>
              <div className="absolute w-64 h-64 bg-[#FFC6FF] border-4 border-black bottom-0 left-10 z-0"></div>
              
              {/* Code Card */}
              <div className="relative bg-white border-4 border-black p-6 z-10 w-full max-w-md shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-4 bg-[#A0C4FF] -mx-6 -mt-6 p-6">
                  <span className="font-bold font-mono text-lg">App.tsx</span>
                  <div className="flex gap-2">
                    <div className="w-4 h-4 bg-[#FF6B6B] border-2 border-black rounded-full"></div>
                    <div className="w-4 h-4 bg-[#FDFFB6] border-2 border-black rounded-full"></div>
                    <div className="w-4 h-4 bg-[#CAFFBF] border-2 border-black rounded-full"></div>
                  </div>
                </div>
                <div className="font-mono text-sm font-bold space-y-2">
                  <div className="text-black"><span className="text-[#FF6B6B]">const</span> createSuccess = <span className="text-[#457B9D]">async</span> () ={'>'} {'{'}</div>
                  <div className="pl-6 border-l-2 border-gray-200">
                    <span className="text-[#FF6B6B]">const</span> project = <span className="text-[#457B9D]">await</span> buildSomethingCool();
                  </div>
                  <div className="pl-6 border-l-2 border-gray-200">
                    <span className="text-[#FF6B6B]">return</span> <span className="text-[#2A9D8F]">"Ready to launch! 🚀"</span>;
                  </div>
                  <div className="text-black">{'}'}</div>
                </div>
                <div className="absolute -bottom-5 -right-5 bg-[#9BF6FF] border-4 border-black p-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                  <Check size={20} strokeWidth={3} />
                  <span>Build Success</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

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