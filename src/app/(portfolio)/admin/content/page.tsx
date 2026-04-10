'use client'

import { useState, useEffect, useCallback } from 'react'
import ContentCard from '@/components/admin/ContentCard'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

interface ContentPiece {
  id: string
  created: string
  status: string
  facebook: { text: string; hashtags: string[]; published?: boolean; post_url?: string }
  threads: { text: string; hashtags: string[]; published?: boolean; post_url?: string }
  blog: { title: string; meta_description: string; content: string; published?: boolean; slug?: string }
}

export default function AdminContent() {
  const [contents, setContents] = useState<ContentPiece[]>([])
  const [articleText, setArticleText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchContents = useCallback(async () => {
    try {
      const res = await fetch(`${API}/content`)
      const data = await res.json()
      if (data.success) setContents(data.data || [])
    } catch {
      // silently fail on load
    }
  }, [])

  useEffect(() => { fetchContents() }, [fetchContents])

  async function handleGenerate() {
    if (!articleText.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/content/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article: articleText }),
      })
      const data = await res.json()
      if (data.success) {
        setContents(prev => [data.data, ...prev])
        setArticleText('')
      } else {
        setError(data.error || 'Generation failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }

  async function handlePublish(id: string, platform: string) {
    try {
      const res = await fetch(`${API}/content/${id}/publish/${platform}`, { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        await fetchContents() // refresh full list
      } else {
        setError(data.error || `Publish to ${platform} failed`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Publish error')
    }
  }

  return (
    <div className="min-h-screen bg-neo-cream p-8">
      <h1 className="text-3xl font-bold mb-6 border-b-4 border-black pb-2 font-mono">
        Content Pipeline
      </h1>

      {/* Generate section */}
      <div className="mb-8 border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000]">
        <h2 className="font-bold mb-3">Generate Content</h2>
        <textarea
          value={articleText}
          onChange={e => setArticleText(e.target.value)}
          placeholder="วาง article content จาก vault ที่นี่..."
          className="w-full h-40 p-4 border-4 border-black font-mono text-sm resize-none focus:outline-none focus:border-neo-blue"
        />
        <div className="flex items-center gap-4 mt-3">
          <button
            onClick={handleGenerate}
            disabled={loading || !articleText.trim()}
            className="bg-neo-yellow px-6 py-3 border-4 border-black font-bold shadow-[4px_4px_0px_0px_#000] hover:shadow-none transition-shadow disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate Content (3 formats)'}
          </button>
          {loading && <span className="text-sm text-gray-500 font-mono animate-pulse">Claude กำลังสร้าง content...</span>}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 border-4 border-red-500 bg-red-50 text-red-700 text-sm font-mono">
          {error}
          <button onClick={() => setError('')} className="ml-4 underline">dismiss</button>
        </div>
      )}

      {/* Content list */}
      <div className="space-y-4">
        {contents.length === 0 && !loading && (
          <p className="text-gray-400 font-mono text-center py-8">ยังไม่มี content — generate อันแรกเลย</p>
        )}
        {contents.map(c => (
          <ContentCard key={c.id} content={c} onPublish={handlePublish} />
        ))}
      </div>
    </div>
  )
}
