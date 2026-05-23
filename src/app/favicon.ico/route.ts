export const runtime = 'edge'

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0f172a"/>
  <path d="M35 18c-8 0-14 6-14 14s6 14 14 14c4 0 7-1 10-4" fill="none" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"/>
  <path d="M44 18 29 46" fill="none" stroke="#f8fafc" stroke-width="5" stroke-linecap="round"/>
</svg>`

export function GET() {
  return new Response(icon, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
