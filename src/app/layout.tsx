import type { Metadata } from 'next'
import { LanguageProvider } from '@/i18n/useTranslation'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chinnakrit Sripan — AI Automation & Full-stack Systems Builder',
  description: 'Portfolio of AI automation, full-stack systems, DevOps workflows, and production assistant projects by Chinnakrit Sripan.',
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
