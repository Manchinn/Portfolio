import React from 'react'
import { GraduationCap } from 'lucide-react'
import { useProfile } from '../../hooks/usePortfolioData'
import { useTranslation } from '../../i18n/useTranslation'
import Loading, { ErrorDisplay } from '../../components/ui/Loading'

const About = () => {
  const { data: profileData, loading, error, refetch } = useProfile()
  const { t, tl } = useTranslation()
  const profileImage = profileData?.image?.trim() || ''

  const getEducationPath = () => {
    if (profileData?.education) return profileData.education
    return [
      { level: tl({ en: 'High School', th: 'มัธยมศึกษา', zh: '高中' }), name: tl({ en: 'Bangsaphan Witthaya School', th: 'โรงเรียนบางสะพานวิทยา', zh: '邦沙潘威塔亚学校' }), period: '2015 - 2020 (Grade 7 - 12)' },
      { level: tl({ en: 'University', th: 'มหาวิทยาลัย', zh: '大学' }), name: tl({ en: "King Mongkut's University of Technology North Bangkok", th: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง', zh: '曼谷北理工大学' }), period: "2021 - 2025 (Bachelor's Degree)" }
    ]
  }

  const educationPath = getEducationPath()

  if (loading) return <Loading />
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />
  if (!profileData) return <div className="text-center p-10">{tl({ en: 'No profile data available', th: 'ไม่มีข้อมูลโปรไฟล์', zh: '暂无个人资料' })}</div>

  return (
    <section id="about" className="py-20 border-t-4 border-black bg-[#FFFFFC] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full md:w-5/12 relative">
            <div className="aspect-square bg-[#FFD6A5] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={profileData.name ? `${profileData.name} portrait` : 'Profile portrait'}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-xs">
              <p className="font-black text-4xl">2+ {tl({ en: 'YEARS', th: 'ปี', zh: '年' })}</p>
              <p className="font-bold text-sm bg-black text-white inline-block px-2">{tl({ en: 'EXPERIENCE', th: 'ประสบการณ์', zh: '经验' })}</p>
            </div>
          </div>

          {/* Personal Info */}
          <div className="w-full md:w-7/12">
            <h2 className="text-xl font-black bg-[#BDB2FF] inline-block px-3 py-1 border-2 border-black mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">{t('about.title').toUpperCase()}</h2>
            <h3 className="text-4xl md:text-5xl font-black text-black mb-6 uppercase leading-tight">
              {profileData.name || tl({ en: 'FULL STACK DEVELOPER', th: 'นักพัฒนาเว็บ', zh: '全栈开发者' })}
            </h3>
            <p className="text-xl font-medium text-black leading-relaxed">
              {profileData.bio || t('about.description')}
            </p>

            <h4 className="text-lg font-black bg-[#FFD6A5] inline-block px-3 py-1 border-2 border-black mt-8 mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">{tl({ en: 'EDUCATION PATH', th: 'การศึกษา', zh: '教育背景' })}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {educationPath.map((edu, idx) => (
                <div key={idx} className="p-5 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex gap-3 items-start">
                  <div className="p-2 bg-[#CAFFBF] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <GraduationCap className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase tracking-wide">{edu.level}</p>
                    <p className="font-bold text-lg text-black leading-snug">{edu.name}</p>
                    <p className="font-mono text-xs text-gray-700 mt-1">{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About