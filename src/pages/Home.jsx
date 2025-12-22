import React from 'react'
import Button from '../components/Button/Button'
import Card from '../components/Card/Card'

// นำเข้า Section ที่เราสร้าง
import About from '../components/Sections/About'
import Contact from '../components/Sections/Contact'

const Home = () => {
  return (
    <div className="flex flex-col">
      
      {/* --- ส่วนที่ 1: Hero (หน้าแรกสุด) --- */}
      <section id="home" className="min-h-screen bg-neo-blue flex flex-col items-center justify-center p-10 border-b-4 border-black">
        <div className="bg-white border-4 border-black p-10 shadow-neo text-center max-w-2xl">
          <h1 className="text-6xl font-black mb-4 uppercase">Hello World!</h1>
          <p className="font-mono text-lg mb-8">
              ผมชื่อ [ชื่อคุณ] Dev สาย Neo-Brutalism
          </p>
          <div className="flex gap-4 justify-center">
            {/* ปุ่มกดแล้วเลื่อนไปหา Projects */}
            <a href="#projects">
                <Button text="ดูผลงาน" color="bg-neo-yellow" />
            </a>
          </div>
        </div>
      </section>

      {/* --- ส่วนที่ 2: About --- */}
      <About />

      {/* --- ส่วนที่ 3: Projects --- */}
      <section id="projects" className="min-h-screen bg-white p-10 border-b-4 border-black flex flex-col items-center">
        <h2 className="text-5xl font-black mb-10 border-b-4 border-neo-green inline-block">MY WORK</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <Card 
            title="CS Logbook" 
            desc="ระบบบันทึกงานภาควิชา" 
            imgUrl="https://placehold.co/600x400/png" 
          />
          <Card 
            title="Shoe Store" 
            desc="ร้านขายรองเท้า" 
            imgUrl="https://placehold.co/600x400/orange/white" 
          />
           <Card 
            title="Portfolio" 
            desc="เว็บแนะนำตัวสไตล์ Brutalism" 
            imgUrl="https://placehold.co/600x400/pink/black" 
          />
        </div>
      </section>

      {/* --- ส่วนที่ 4: Contact --- */}
      <Contact />

    </div>
  )
}

export default Home