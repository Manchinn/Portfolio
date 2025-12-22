import React, { useState } from 'react'
import { useProfile } from '../../hooks/usePortfolioData'
import { submitContact } from '../../services/portfolioService'
import Loading, { ErrorDisplay } from '../Loading'

const Contact = () => {
  const { data: profileData, loading: profileLoading, error: profileError, refetch } = useProfile()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)
    try {
      await submitContact(formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      setSubmitError(err.message)
    }
  }

  if (profileLoading) return <Loading text="Loading contact info..." />
  if (profileError) return <ErrorDisplay error={profileError} onRetry={refetch} />

  return (
    <section id="contact" className="min-h-screen bg-neo-pink border-b-4 border-black p-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <h2 className="text-5xl font-black mb-12 border-b-4 border-black inline-block pb-2">GET IN TOUCH</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white border-4 border-black p-8 shadow-neo">
            <h3 className="text-2xl font-black mb-6 uppercase">Send Message</h3>

            {submitted ? (
              <div className="bg-neo-green border-4 border-black p-6 text-center">
                <p className="font-black text-lg text-white">✓ ขอบคุณที่ติดต่อ!</p>
                <p className="font-mono text-sm mt-2">จะตอบกลับเร็วๆนี้</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block font-bold mb-2 uppercase text-sm">ชื่อ *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="ชื่อของคุณ"
                    className="w-full border-2 border-black p-3 font-mono focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neo-blue"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-bold mb-2 uppercase text-sm">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full border-2 border-black p-3 font-mono focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neo-blue"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block font-bold mb-2 uppercase text-sm">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="ข้อความของคุณ..."
                    rows="5"
                    className="w-full border-2 border-black p-3 font-mono focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neo-blue resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-neo-blue border-2 border-black p-3 font-black text-white hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 shadow-neo uppercase"
                >
                  ส่งข้อความ →
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="bg-white border-4 border-black p-6 shadow-neo hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200">
              <h4 className="font-black text-lg mb-2 uppercase">📧 Email</h4>
              <a
                href={`mailto:${profileData.email}`}
                className="font-mono text-neo-blue hover:underline decoration-4"
              >
                {profileData.email}
              </a>
            </div>

            {/* Phone */}
            <div className="bg-white border-4 border-black p-6 shadow-neo hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200">
              <h4 className="font-black text-lg mb-2 uppercase">📱 Phone</h4>
              <a
                href={`tel:${profileData.phone}`}
                className="font-mono text-neo-green hover:underline decoration-4"
              >
                {profileData.phone}
              </a>
            </div>

            {/* Location */}
            <div className="bg-white border-4 border-black p-6 shadow-neo hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200">
              <h4 className="font-black text-lg mb-2 uppercase">📍 Location</h4>
              <p className="font-mono text-gray-700">{profileData.location}</p>
            </div>

            {/* Resume Download */}
            <div className="bg-neo-yellow border-4 border-black p-6 shadow-neo">
              <h4 className="font-black text-lg mb-3 uppercase">📄 Resume</h4>
              <a
                href={profileData.resume}
                download
                className="inline-block w-full text-center bg-black border-2 border-black text-white px-4 py-3 font-black hover:bg-white hover:text-black transition-all duration-200 uppercase"
              >
                Download CV →
              </a>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t-4 border-black">
          <h3 className="text-2xl font-black mb-6 uppercase">Follow Me</h3>
          <div className="flex gap-4 flex-wrap">
            {[
              { name: 'GitHub', emoji: '🐙', url: 'https://github.com' },
              { name: 'LinkedIn', emoji: '💼', url: 'https://linkedin.com' },
              { name: 'Twitter', emoji: '𝕏', url: 'https://twitter.com' },
              { name: 'Email', emoji: '✉️', url: '#' }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-4 border-black px-6 py-3 font-black hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 shadow-neo uppercase"
              >
                <span className="mr-2">{social.emoji}</span>{social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact