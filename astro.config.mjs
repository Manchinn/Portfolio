// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.chinnakrit.dev',
  output: 'static',
  // Static SSG. No server runtime, no backend, no CMS — soft-pixel SE portfolio.
  integrations: [react(), sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'th'],
    routing: {
      prefixDefaultLocale: false, // en at "/", th at "/th/"
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
