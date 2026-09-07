// Edge Function: submit-contact
// Public endpoint for the portfolio contact form. Anonymous by design:
// authorization is enforced by RLS (insert allowed only with status='new').
// Uses the publishable key only — no service-role secret is needed here.
//
// Protections: strict origin allowlist, field validation + length caps,
// honeypot field, and a best-effort per-instance IP rate limit.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ALLOWED_ORIGINS = new Set([
  'https://www.chinnakrit.dev',
  'https://chinnakrit.dev',
  'http://localhost:4321',
])

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
// Supabase edge runtime auto-injects SUPABASE_ANON_KEY; newer projects may
// also expose SUPABASE_PUBLISHABLE_KEY. Accept either, require at least one.
const PUBLISHABLE_KEY =
  Deno.env.get('SUPABASE_PUBLISHABLE_KEY') ?? Deno.env.get('SUPABASE_ANON_KEY')!

// Best-effort rate limit: 5 submissions per IP per 10 minutes per instance.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 1000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
    }
  }
  return false
}

function json(body: unknown, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin ?? 'null',
      Vary: 'Origin',
    },
  })
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

Deno.serve(async (req: Request): Promise<Response> => {
  const origin = req.headers.get('origin')

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin ?? 'null',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        Vary: 'Origin',
      },
    })
  }

  if (req.method !== 'POST') {
    return json({ ok: false, error: 'method_not_allowed' }, 405, origin)
  }
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return json({ ok: false, error: 'origin_not_allowed' }, 403, origin)
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('real-client-ip') ??
    'unknown'
  if (rateLimited(ip)) {
    return json({ ok: false, error: 'rate_limited' }, 429, origin)
  }

  let payload: Record<string, unknown>
  try {
    payload = await req.json()
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400, origin)
  }

  // Honeypot: real users never fill this hidden field.
  if (str(payload.website) !== '') {
    return json({ ok: true }, 200, origin)
  }

  const name = str(payload.name)
  const email = str(payload.email)
  const company = str(payload.company)
  const budget = str(payload.budget)
  const message = str(payload.message)
  const locale = str(payload.locale) === 'th' ? 'th' : 'en'

  if (name.length < 1 || name.length > 200) {
    return json({ ok: false, error: 'invalid_name' }, 400, origin)
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
    return json({ ok: false, error: 'invalid_email' }, 400, origin)
  }
  if (company.length > 200 || budget.length > 100) {
    return json({ ok: false, error: 'invalid_optional_fields' }, 400, origin)
  }
  if (message.length < 1 || message.length > 5000) {
    return json({ ok: false, error: 'invalid_message' }, 400, origin)
  }

  const { error } = await createClient(SUPABASE_URL, PUBLISHABLE_KEY)
    .from('contact_submissions')
    .insert({ name, email, company: company || null, budget: budget || null, message, locale, status: 'new' })

  if (error) {
    console.error('insert_failed', error.message)
    return json({ ok: false, error: 'insert_failed' }, 500, origin)
  }

  return json({ ok: true }, 200, origin)
})
