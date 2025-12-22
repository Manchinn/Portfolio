import React from 'react'
import { useProfile } from '../../hooks/usePortfolioData'
import Loading, { ErrorDisplay } from '../Loading'

const About = () => {
  const { data: profileData, loading, error, refetch } = useProfile()

  if (loading) return <Loading text="Loading profile..." />
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />
  if (!profileData) return <div className="text-center p-10">No profile data available</div>

  return (
    <section id="about" className="min-h-screen bg-neo-yellow border-b-4 border-black p-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-5xl font-black mb-12 border-b-4 border-black inline-block pb-2">ABOUT ME</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          {profileData.image && (
            <div className="border-4 border-black overflow-hidden shadow-neo h-96">
              <img 
                src={profileData.image} 
                alt={profileData.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="bg-white border-4 border-black p-8 shadow-neo flex flex-col justify-center">
            <h3 className="text-2xl font-black mb-4 text-neo-blue uppercase">ใครคือผม</h3>
            <p className="font-mono text-base leading-relaxed mb-6 text-gray-700">
              {profileData.bio}
            </p>
            
            <div className="space-y-4 border-t-4 border-black pt-6">
              <div>
                <h4 className="font-black uppercase text-sm text-neo-pink mb-2">📧 Email</h4>
                <a href={`mailto:${profileData.email}`} className="font-mono text-neo-blue hover:underline">
                  {profileData.email}
                </a>
              </div>
              
              <div>
                <h4 className="font-black uppercase text-sm text-neo-pink mb-2">📍 Location</h4>
                <p className="font-mono">{profileData.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border-4 border-black p-6 shadow-neo text-center">
            <h4 className="text-3xl font-black text-neo-pink mb-2">6+</h4>
            <p className="font-bold uppercase text-sm">Projects Completed</p>
          </div>
          <div className="bg-white border-4 border-black p-6 shadow-neo text-center">
            <h4 className="text-3xl font-black text-neo-blue mb-2">2+</h4>
            <p className="font-bold uppercase text-sm">Years Experience</p>
          </div>
          <div className="bg-white border-4 border-black p-6 shadow-neo text-center">
            <h4 className="text-3xl font-black text-neo-green mb-2">100%</h4>
            <p className="font-bold uppercase text-sm">Passion & Dedication</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About