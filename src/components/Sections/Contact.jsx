import React, { useState } from "react";
import { Mail } from "lucide-react";
import { useProfile } from "../../hooks/usePortfolioData";
import { submitContact } from "../../services/portfolioService";
import Loading, { ErrorDisplay } from "../../components/ui/Loading";

const Contact = () => {
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    refetch,
  } = useProfile();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  if (profileLoading) return <Loading text="Loading contact info..." />;
  if (profileError)
    return <ErrorDisplay error={profileError} onRetry={refetch} />;

  return (
    <section id="contact" className="bg-[#BDB2FF] py-20 border-t-4 border-black scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-black text-black mb-8 uppercase leading-tight">
          READY TO<br/>START?
        </h2>
        <div className="bg-white border-4 border-black p-8 inline-block shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-2xl transform -rotate-1">
          <p className="text-xl font-bold text-black mb-8">
            Don’t let your ideas stay as dreams—let’s discuss the details and build it together.
          </p>
          
          {submitted ? (
            <div className="bg-[#CAFFBF] border-4 border-black p-6 text-center mb-6">
              <p className="font-black text-xl">✓ Thanks for reaching out!</p>
              <p className="font-mono text-sm mt-2">I’ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left mb-6">
              <div>
                <label className="block font-black mb-2 uppercase text-sm">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full border-4 border-black p-3 font-mono focus:outline-none focus:ring-4 focus:ring-[#9BF6FF]"
                />
              </div>
              <div>
                <label className="block font-black mb-2 uppercase text-sm">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full border-4 border-black p-3 font-mono focus:outline-none focus:ring-4 focus:ring-[#9BF6FF]"
                />
              </div>
              <div>
                <label className="block font-black mb-2 uppercase text-sm">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message..."
                  rows="4"
                  className="w-full border-4 border-black p-3 font-mono focus:outline-none focus:ring-4 focus:ring-[#9BF6FF] resize-none"
                />
              </div>
              
              {submitError && (
                <div className="border-4 border-black bg-[#FFADAD] font-mono p-3 text-center">
                  {submitError}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-black text-white border-4 border-black px-8 py-4 font-black text-xl hover:bg-[#FF6B6B] hover:text-black transition-all shadow-[4px_4px_0px_0px_#ffffff] flex items-center justify-center gap-3"
              >
                <Mail className="w-6 h-6" /> SEND MESSAGE
              </button>
            </form>
          )}
          
          <a 
            href={`mailto:${profileData?.email || 'contact@example.com'}`} 
            className="inline-flex items-center bg-black text-white border-2 border-black px-8 py-4 font-black text-xl hover:bg-[#FF6B6B] hover:text-black transition-all shadow-[4px_4px_0px_0px_#ffffff]"
          >
            <Mail className="w-6 h-6 mr-3" /> SEND EMAIL NOW
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
