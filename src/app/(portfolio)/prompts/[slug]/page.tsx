'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Star, ExternalLink, Copy, Check, ArrowLeft, Tag, Calendar } from 'lucide-react'

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

export default function PromptDetail() {
  const params = useParams<{ slug: string }>()
  const [prompt, setPrompt] = useState<PromptRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch(`/api/prompts/${params.slug}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setPrompt(data.data)
        } else {
          setNotFound(true)
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [params.slug])

  function handleCopy() {
    if (!prompt) return
    navigator.clipboard.writeText(prompt.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neo-cream flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-black border-t-neo-yellow rounded-full animate-spin" />
          <p className="mt-4 font-mono text-gray-500">Loading prompt...</p>
        </div>
      </div>
    )
  }

  if (notFound || !prompt) {
    return (
      <div className="min-h-screen bg-neo-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">404</h1>
          <p className="font-mono text-gray-500 mb-6">Prompt not found</p>
          <Link
            href="/prompts"
            className="inline-flex items-center gap-2 bg-neo-yellow px-6 py-3 border-4 border-black font-bold shadow-[4px_4px_0px_0px_#000] hover:shadow-none transition-shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </Link>
        </div>
      </div>
    )
  }

  const date = new Date(prompt.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-neo-cream">
      {/* Back nav */}
      <div className="border-b-4 border-black bg-white px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/prompts"
            className="inline-flex items-center gap-2 font-mono text-sm hover:text-neo-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Prompts Library
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl md:text-4xl font-black mb-2">
                {prompt.repoOwner}/{prompt.repoName}
              </h1>
              {prompt.description && (
                <p className="text-gray-600 text-lg">{prompt.description}</p>
              )}
            </div>
            <a
              href={prompt.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border-4 border-black font-bold bg-white hover:bg-neo-cream shadow-[4px_4px_0px_0px_#000] hover:shadow-none transition-all shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
              View on GitHub
            </a>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <span className="flex items-center gap-1 text-sm text-gray-600">
              <Star className="w-4 h-4" />
              {prompt.stars.toLocaleString()} stars
            </span>
            {prompt.language && (
              <span className="text-xs px-3 py-1 bg-neo-green border-2 border-black font-mono font-bold">
                {prompt.language}
              </span>
            )}
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {date}
            </span>
          </div>

          {/* Tags */}
          {prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {prompt.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1 bg-neo-sky border-2 border-black font-mono"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Prompt block */}
        <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-3 border-b-4 border-black bg-neo-cream">
            <span className="font-mono font-bold text-sm uppercase tracking-wider">
              Prompt
            </span>
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-2 px-4 py-2 border-2 border-black font-bold text-sm transition-all ${
                copied
                  ? 'bg-neo-green'
                  : 'bg-neo-yellow hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Prompt
                </>
              )}
            </button>
          </div>

          {/* Prompt text */}
          <div className="p-6 md:p-8">
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-800">
              {prompt.prompt}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
