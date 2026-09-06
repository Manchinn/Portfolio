// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import svelte from '@astrojs/svelte'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.chinnakrit.dev',
  output: 'static',
  // Static SSG. No server runtime, backend, CMS, or required runtime secrets.
  integrations: [
    react(),
    svelte(),
    icon({
      include: {
        'material-symbols': ['*'],
        'fa6-brands': ['*'],
        'fa6-regular': ['*'],
        'fa6-solid': ['*'],
      },
    }),
    sitemap(),
  ],
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
