import SaasNavbar from './components/SaasNavbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import CtaBanner from './components/CtaBanner'
import SaasFooter from './components/SaasFooter'

export default function SaasPage() {
  return (
    <main>
      <SaasNavbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <Faq />
      <CtaBanner />
      <SaasFooter />
    </main>
  )
}
