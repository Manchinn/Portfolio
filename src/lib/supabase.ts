// Supabase utilities for the portfolio.
//
// Publishable (anon) credentials are PUBLIC by design — they appear in the
// built bundle and carry no privileged access: RLS restricts anonymous reads
// to `published` rows only. Service-role keys must never be committed,
// logged, or used by this module.
//
// Two independent access paths:
// - `createBrowserClient` — /admin SPA runtime (user JWT after login) and
//   (unused today) visitor-side reads of published rows.
// - `createBuildClient`  — build-time CMS loader. Uses the anon key and
//   relies on public-read policies (published rows only).

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type ContentLocale = 'en' | 'th'
export type ContentStatus = 'draft' | 'review' | 'published' | 'archived'

export const SUPABASE_URL = 'https://bzmxvbuvlmzpqjzijbud.supabase.co'
export const SUPABASE_ANON_KEY = 'sb_publishable_-rJngXmKXXhZF3R_RmyCsw_cztng3Mv'

export function createBrowserClient(): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

export function createBuildClient(): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
