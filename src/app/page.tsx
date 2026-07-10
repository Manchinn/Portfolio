import Navbar from '@/components/layout/Navbar/Navbar'
import Footer from '@/components/layout/Footer'
import { SaasHome } from '@/components/portfolio-saas/SaasHome'

export default function Home() {
  return (
    <>
      <Navbar />
      <SaasHome />
      <Footer />
    </>
  )
}
