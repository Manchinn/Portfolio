import type { Metadata } from 'next'
import { LanguageProvider } from '@/i18n/useTranslation'
import Navbar from '@/components/layout/Navbar/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chinnakrit Sripan — Portfolio',
  description: 'Frontend Developer / Full-stack Developer portfolio showcasing projects and skills.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
