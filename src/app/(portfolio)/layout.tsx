import type { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar/Navbar'

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
