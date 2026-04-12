import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Prompts Library — Reverse-Engineered GitHub Repos | chinnakrit.dev',
  description: 'Ready-to-use coding prompts generated from GitHub repositories. Paste into Claude Code, Cursor, or any coding agent to recreate projects from scratch.',
  openGraph: {
    title: 'Prompts Library | chinnakrit.dev',
    description: 'Reverse-engineered GitHub repos into ready-to-use coding prompts.',
    url: 'https://www.chinnakrit.dev/prompts',
    siteName: 'chinnakrit.dev',
    type: 'website',
  },
}

export default function PromptsLayout({ children }: { children: ReactNode }) {
  return children
}
