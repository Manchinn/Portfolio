import React from 'react'
import { User, Code, Users } from 'lucide-react'
import { useProfile } from '../../hooks/usePortfolioData'
import Loading, { ErrorDisplay } from '../../components/ui/Loading'

const About = () => {
  const { data: profileData, loading, error, refetch } = useProfile()

  if (loading) return <Loading text="Loading profile..." />
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />
  if (!profileData) return <div className="text-center p-10">No profile data available</div>

  return (
    <section id="about" className="py-20 border-t-4 border-black bg-[#FFFFFC] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full md:w-5/12 relative">
            <div className="aspect-square bg-[#FFD6A5] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden">
              {profileData.image ? (
                <img src={profileData.image} alt={profileData.name} className="w-full h-full object-cover" />
              ) : (
                <User size={150} strokeWidth={1.5} className="text-black" />
              )}
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-xs">
              <p className="font-black text-4xl">2+ YEARS</p>
              <p className="font-bold text-sm bg-black text-white inline-block px-2">EXPERIENCE</p>
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-7/12">
            <h2 className="text-xl font-black bg-[#BDB2FF] inline-block px-3 py-1 border-2 border-black mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">ABOUT ME</h2>
            <h3 className="text-4xl md:text-5xl font-black text-black mb-6 uppercase leading-tight">
              PARTNER ที่เข้าใจ<br/>ธุรกิจมากกว่าแค่<br/>นักเขียนโค้ด
            </h3>
            <p className="text-xl font-medium text-black mb-6 leading-relaxed">
              {profileData.bio || "ผมเป็น Full Stack Developer ที่ไม่ได้แค่ทำให้เว็บ 'เสร็จ' แต่ทำให้มัน 'สุด' ผมชอบแก้ปัญหาและชอบเห็นตัวเลขการเติบโตของลูกค้า"}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-[#CAFFBF] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <Code size={32} strokeWidth={2} className="mb-3" />
                <h4 className="font-black text-xl mb-2">Clean Code</h4>
                <p className="font-mono text-sm">โค้ดที่อ่านง่าย บำรุงรักษาได้</p>
              </div>
              <div className="p-6 bg-[#9BF6FF] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <Users size={32} strokeWidth={2} className="mb-3" />
                <h4 className="font-black text-xl mb-2">Team Player</h4>
                <p className="font-mono text-sm">ทำงานเป็นทีมได้ดีเยี่ยม</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About