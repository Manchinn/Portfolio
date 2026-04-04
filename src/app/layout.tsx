import type { Metadata } from 'next'
import { LanguageProvider } from '@/i18n/useTranslation'
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
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
