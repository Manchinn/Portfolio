import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useProfile } from '../../hooks/usePortfolioData';
import { useTranslation } from '../../i18n/useTranslation';
import { submitContact } from '../../services/portfolioService';
import Loading, { ErrorDisplay } from '../../components/ui/Loading';

const Contact = () => {
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    refetch,
  } = useProfile();
  const { t, tl } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      await submitContact(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  if (profileLoading) return <Loading />;
  if (profileError)
    return <ErrorDisplay error={profileError} onRetry={refetch} />;

  return (
    <section id="contact" className="bg-neo-lavender py-20 border-t-4 border-black scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-black text-black mb-8 uppercase leading-tight">
          {tl({ en: 'READY TO', th: 'พร้อม', zh: '准备' })}<br/>{tl({ en: 'START?', th: 'เริ่มต้นหรือยัง', zh: '开始了吗？' })}
        </h2>
        <div className="bg-white border-4 border-black p-8 inline-block shadow-neo-lg max-w-2xl block rotate-0 sm:-rotate-1">
          <p className="text-xl font-bold text-black mb-8">
            {tl({ en: 'Don\'t let your ideas stay as dreams—let\'s discuss the details and build it together.', th: 'อย่าให้ไอเดียของคุณเป็นแค่ความฝัน—มาคุยกันเลยและสร้างมันขึ้นมาด้วยกัน', zh: '不要让你的想法只停留在梦中——让我们详细讨论并一起实现它。' })}
          </p>

          {submitted ? (
            <div className="bg-neo-mint border-4 border-black p-6 text-center mb-6">
              <p className="font-black text-xl">✓ {tl({ en: 'Thanks for reaching out!', th: 'ขอบคุณที่ติดต่อมา!', zh: '感谢您的联系！' })}</p>
              <p className="font-mono text-sm mt-2">{tl({ en: 'I\'ll get back to you soon.', th: 'ผมจะติดต่อกลับไปเร็วๆ นี้', zh: '我会尽快回复您。' })}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left mb-6">
              <div>
                <label className="block font-black mb-2 uppercase text-sm">{t('contact.name')} *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={tl({ en: 'Your name', th: 'ชื่อของคุณ', zh: '您的姓名' })}
                  className="w-full border-4 border-black p-3 font-mono focus:outline-none focus:ring-4 focus:ring-neo-cyan"
                />
              </div>
              <div>
                <label className="block font-black mb-2 uppercase text-sm">{t('contact.email')} *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full border-4 border-black p-3 font-mono focus:outline-none focus:ring-4 focus:ring-neo-cyan"
                />
              </div>
              <div>
                <label className="block font-black mb-2 uppercase text-sm">{t('contact.message')} *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder={tl({ en: 'Your message...', th: 'ข้อความของคุณ...', zh: '您的留言...' })}
                  rows="4"
                  className="w-full border-4 border-black p-3 font-mono focus:outline-none focus:ring-4 focus:ring-neo-cyan resize-none"
                />
              </div>

              {submitError && (
                <div className="border-4 border-black bg-neo-red-light font-mono p-3 text-center">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-black text-white border-4 border-black px-8 py-4 font-black text-xl hover:bg-neo-coral hover:text-black transition-all shadow-[4px_4px_0px_0px_#ffffff] flex items-center justify-center gap-3"
              >
                <Mail className="w-6 h-6" /> {t('contact.send').toUpperCase()}
              </button>
            </form>
          )}

          <a
            href={`mailto:${profileData?.email || 'contact@example.com'}`}
            className="inline-flex items-center bg-black text-white border-2 border-black px-8 py-4 font-black text-xl hover:bg-neo-coral hover:text-black transition-all shadow-[4px_4px_0px_0px_#ffffff]"
          >
            <Mail className="w-6 h-6 mr-3" /> {tl({ en: 'SEND EMAIL NOW', th: 'ส่งอีเมล', zh: '立即发送邮件' })}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
