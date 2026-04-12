'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!password.trim()) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (data.success) {
        const redirect = searchParams.get('redirect') || '/admin/prompts'
        router.push(redirect)
      } else {
        setError('Wrong password')
      }
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_#000]"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-neo-yellow border-2 border-black">
          <Lock className="w-5 h-5" />
        </div>
        <h1 className="text-2xl font-black uppercase">Admin Login</h1>
      </div>

      {error && (
        <div className="mb-4 p-3 border-2 border-red-500 bg-red-50 text-red-700 text-sm font-mono">
          {error}
        </div>
      )}

      <label className="block font-bold text-sm mb-2">Password</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter admin password"
        className="w-full p-3 border-4 border-black font-mono text-sm focus:outline-none focus:border-neo-blue mb-4"
        autoFocus
      />

      <button
        type="submit"
        disabled={loading || !password.trim()}
        className="w-full bg-neo-yellow px-6 py-3 border-4 border-black font-bold shadow-[4px_4px_0px_0px_#000] hover:shadow-none transition-shadow disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Logging in...
          </>
        ) : (
          'Login'
        )}
      </button>
    </form>
  )
}

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-neo-cream flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Suspense fallback={<div className="text-center font-mono">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
