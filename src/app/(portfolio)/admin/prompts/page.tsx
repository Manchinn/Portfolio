'use client'

import { useState, useEffect, useCallback } from 'react'
import { Copy, Trash2, ExternalLink, Star, Loader2 } from 'lucide-react'

interface PromptRecord {
  slug: string
  repoUrl: string
  repoName: string
  repoOwner: string
  description: string | null
  stars: number
  language: string | null
  prompt: string
  tags: string[]
  createdAt: string
}

interface GenerateResult {
  prompt: string
  metadata: {
    name: string
    owner: string
    description: string | null
    stars: number
    language: string | null
  }
}

export default function AdminPrompts() {
  const [prompts, setPrompts] = useState<PromptRecord[]>([])
  const [repoUrl, setRepoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Generate result state
  const [generated, setGenerated] = useState<GenerateResult | null>(null)
  const [editedPrompt, setEditedPrompt] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [saving, setSaving] = useState(false)

  const fetchPrompts = useCallback(async () => {
    try {
      const res = await fetch('/api/prompts')
      const data = await res.json()
      if (data.success) setPrompts(data.data || [])
    } catch {
      // silent
    }
  }, [])

  useEffect(() => { fetchPrompts() }, [fetchPrompts])

  async function handleGenerate() {
    if (!repoUrl.trim()) return
    setLoading(true)
    setError('')
    setGenerated(null)
    try {
      const res = await fetch('/api/prompts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl }),
      })
      const data = await res.json()
      if (data.success) {
        setGenerated(data.data)
        setEditedPrompt(data.data.prompt)
        setTagsInput(data.data.metadata.language || '')
      } else {
        setError(data.error || 'Generation failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!generated || !editedPrompt.trim()) return
    setSaving(true)
    setError('')
    try {
      const tags = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)

      const res = await fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoUrl,
          repoName: generated.metadata.name,
          repoOwner: generated.metadata.owner,
          description: generated.metadata.description,
          stars: generated.metadata.stars,
          language: generated.metadata.language,
          prompt: editedPrompt,
          tags,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setPrompts(prev => [data.data, ...prev])
        setGenerated(null)
        setEditedPrompt('')
        setTagsInput('')
        setRepoUrl('')
      } else {
        setError(data.error || 'Save failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(slug: string) {
    try {
      const res = await fetch(`/api/prompts/${slug}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setPrompts(prev => prev.filter(p => p.slug !== slug))
      }
    } catch {
      setError('Delete failed')
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-neo-cream p-8">
      <h1 className="text-3xl font-bold mb-6 border-b-4 border-black pb-2 font-mono">
        Prompts Library — Admin
      </h1>

      {/* Generate section */}
      <div className="mb-8 border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000]">
        <h2 className="font-bold mb-3 text-lg">Generate from GitHub Repo</h2>
        <div className="flex gap-3">
          <input
            type="url"
            value={repoUrl}
            onChange={e => setRepoUrl(e.target.value)}
            placeholder="https://github.com/owner/repo"
            className="flex-1 p-3 border-4 border-black font-mono text-sm focus:outline-none focus:border-neo-blue"
            onKeyDown={e => e.key === 'Enter' && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !repoUrl.trim()}
            className="bg-neo-yellow px-6 py-3 border-4 border-black font-bold shadow-[4px_4px_0px_0px_#000] hover:shadow-none transition-shadow disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Prompt'
            )}
          </button>
        </div>
        {loading && (
          <p className="text-sm text-gray-500 font-mono animate-pulse mt-2">
            Fetching repo data + generating prompt via Haiku...
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 border-4 border-red-500 bg-red-50 text-red-700 text-sm font-mono">
          {error}
          <button onClick={() => setError('')} className="ml-4 underline">dismiss</button>
        </div>
      )}

      {/* Preview + Edit */}
      {generated && (
        <div className="mb-8 border-4 border-neo-blue bg-white p-6 shadow-[4px_4px_0px_0px_#5471FF]">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-bold text-lg">
              {generated.metadata.owner}/{generated.metadata.name}
            </h2>
            <span className="flex items-center gap-1 text-sm text-gray-600">
              <Star className="w-3 h-3" />
              {generated.metadata.stars.toLocaleString()}
            </span>
            {generated.metadata.language && (
              <span className="text-xs px-2 py-1 bg-neo-green border-2 border-black font-mono">
                {generated.metadata.language}
              </span>
            )}
          </div>

          {generated.metadata.description && (
            <p className="text-sm text-gray-600 mb-4">{generated.metadata.description}</p>
          )}

          <label className="block font-bold text-sm mb-1">Prompt (edit before saving)</label>
          <textarea
            value={editedPrompt}
            onChange={e => setEditedPrompt(e.target.value)}
            className="w-full h-64 p-4 border-4 border-black font-mono text-sm resize-y focus:outline-none focus:border-neo-blue"
          />

          <label className="block font-bold text-sm mb-1 mt-4">Tags (comma-separated)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={e => setTagsInput(e.target.value)}
            placeholder="react, nextjs, typescript"
            className="w-full p-3 border-4 border-black font-mono text-sm focus:outline-none focus:border-neo-blue"
          />

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              disabled={saving || !editedPrompt.trim()}
              className="bg-neo-green px-6 py-3 border-4 border-black font-bold shadow-[4px_4px_0px_0px_#000] hover:shadow-none transition-shadow disabled:opacity-40 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Prompt'
              )}
            </button>
            <button
              onClick={() => setGenerated(null)}
              className="px-6 py-3 border-4 border-black font-bold hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Saved prompts list */}
      <h2 className="font-bold text-xl mb-4 font-mono">
        Saved Prompts ({prompts.length})
      </h2>
      <div className="space-y-4">
        {prompts.length === 0 && (
          <p className="text-gray-400 font-mono text-center py-8">
            ยังไม่มี prompt — generate อันแรกจาก GitHub repo เลย
          </p>
        )}
        {prompts.map(p => (
          <div key={p.slug} className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg">{p.repoOwner}/{p.repoName}</h3>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="w-3 h-3" />
                    {p.stars.toLocaleString()}
                  </span>
                  {p.language && (
                    <span className="text-xs px-2 py-0.5 bg-neo-green border-2 border-black font-mono">
                      {p.language}
                    </span>
                  )}
                </div>
                <pre className="text-sm text-gray-700 font-mono whitespace-pre-wrap line-clamp-3 mb-2">
                  {p.prompt}
                </pre>
                {p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-neo-sky border border-black font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => copyToClipboard(p.prompt)}
                  className="p-2 border-2 border-black hover:bg-neo-yellow transition-colors"
                  title="Copy prompt"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-2 border-black hover:bg-neo-blue hover:text-white transition-colors"
                  title="Open on GitHub"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => handleDelete(p.slug)}
                  className="p-2 border-2 border-black hover:bg-neo-coral hover:text-white transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
