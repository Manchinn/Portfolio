'use client'

import { useState, useEffect } from 'react'
import { Star, ArrowRight, Search, Tag } from 'lucide-react'
import Link from 'next/link'

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

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'bg-neo-blue text-white',
  JavaScript: 'bg-neo-yellow',
  Python: 'bg-neo-green',
  Rust: 'bg-neo-coral',
  Go: 'bg-neo-cyan',
  default: 'bg-neo-lavender',
}

function getLangColor(lang: string | null): string {
  if (!lang) return LANGUAGE_COLORS.default
  return LANGUAGE_COLORS[lang] || LANGUAGE_COLORS.default
}

export default function PromptsLibrary() {
  const [prompts, setPrompts] = useState<PromptRecord[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/prompts')
      .then(r => r.json())
      .then(data => {
        if (data.success) setPrompts(data.data || [])
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = prompts.filter(p => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      p.repoName.toLowerCase().includes(q) ||
      p.repoOwner.toLowerCase().includes(q) ||
      p.prompt.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      (p.language && p.language.toLowerCase().includes(q))
    )
  })

  return (
    <div className="min-h-screen bg-neo-cream">
      {/* Hero */}
      <section className="border-b-4 border-black bg-white px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            Prompts Library
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Reverse-engineered GitHub repos into ready-to-use prompts for vibe coding.
            <br />
            Paste into Claude Code, Cursor, or any coding agent.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search prompts by name, language, or tag..."
              className="w-full pl-12 pr-4 py-4 border-4 border-black font-mono text-sm focus:outline-none focus:border-neo-blue shadow-[4px_4px_0px_0px_#000]"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-4 border-black border-t-neo-yellow rounded-full animate-spin" />
            <p className="mt-4 font-mono text-gray-500">Loading prompts...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-mono text-gray-400 text-lg">
              {search ? 'No prompts match your search.' : 'No prompts yet — check back soon!'}
            </p>
          </div>
        ) : (
          <>
            <p className="font-mono text-sm text-gray-500 mb-6">
              {filtered.length} prompt{filtered.length !== 1 ? 's' : ''} available
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => (
                <Link
                  key={p.slug}
                  href={`/prompts/${p.slug}`}
                  className="group border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all block"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-lg truncate">
                        {p.repoName}
                      </h3>
                      <p className="text-sm text-gray-500 font-mono">
                        {p.repoOwner}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 shrink-0 ml-2">
                      <Star className="w-3.5 h-3.5" />
                      {p.stars >= 1000
                        ? `${(p.stars / 1000).toFixed(1)}k`
                        : p.stars.toLocaleString()}
                    </div>
                  </div>

                  {/* Language badge */}
                  {p.language && (
                    <span className={`inline-block text-xs px-2 py-0.5 border-2 border-black font-mono font-bold mb-3 ${getLangColor(p.language)}`}>
                      {p.language}
                    </span>
                  )}

                  {/* Preview */}
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                    {p.prompt.slice(0, 180)}
                    {p.prompt.length > 180 ? '...' : ''}
                  </p>

                  {/* Tags */}
                  {p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {p.tags.slice(0, 4).map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-neo-cream border border-black font-mono"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                      {p.tags.length > 4 && (
                        <span className="text-xs text-gray-400 font-mono">
                          +{p.tags.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-1 text-sm font-bold group-hover:text-neo-blue transition-colors">
                    View Prompt
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
