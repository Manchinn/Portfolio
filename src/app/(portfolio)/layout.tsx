import Navbar from '@/components/layout/Navbar/Navbar'

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
