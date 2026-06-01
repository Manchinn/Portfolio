import type { NextConfig } from 'next'

const isDevelopment = process.env.NODE_ENV !== 'production'

const nextConfig: NextConfig = {
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  async redirects() {
    return [
      {
        source: '/prompts',
        destination: 'https://prompts.chinnakrit.dev',
        permanent: true,
      },
      {
        source: '/prompts/:path*',
        destination: 'https://prompts.chinnakrit.dev/:path*',
        permanent: true,
      },
      {
        source: '/Chinnakrit-Sripan_CV.pdf',
        destination: 'https://manchinn.github.io/resume/',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://placehold.co",
              "font-src 'self'",
              `connect-src 'self'${isDevelopment ? ' ws://localhost:* http://localhost:*' : ''}`,
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
