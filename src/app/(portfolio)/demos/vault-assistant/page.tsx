'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { BookOpen, BrainCircuit, LockKeyhole, MessageSquareText, Search, ShieldCheck } from 'lucide-react'

const sampleNotes = [
  {
    title: 'Career Direction',
    tags: ['career', 'strategy'],
    body: 'Focus on AI automation, internal tools, and full-stack systems that connect real workflows instead of only building isolated frontend screens.',
  },
  {
    title: 'Hermes Operating Style',
    tags: ['assistant', 'workflow'],
    body: 'Assistant should be concise, checklist-first, action-oriented, and careful around risky operational tasks.',
  },
  {
    title: 'Portfolio Positioning',
    tags: ['portfolio', 'market'],
    body: 'Lead with concrete production work: LINE AI assistant, Codex DevOps companion, Obsidian knowledge assistant, and CS Logbook.',
  },
  {
    title: 'Learning System',
    tags: ['learning', 'knowledge'],
    body: 'Use a sanitized read-only export as the safe source for assistant answers. Keep private local vault data out of public demos.',
  },
]

const quickQuestions = [
  'What should I focus on next?',
  'Summarize my assistant style.',
  'How should I position the portfolio?',
]

const retrievalFlow = [
  { label: 'Sanitize', detail: 'Export only safe notes and remove private local vault content.' },
  { label: 'Search', detail: 'Match the question against a small trusted context set.' },
  { label: 'Answer', detail: 'Return a concise response with the same assistant style the real workflow expects.' },
]

function answerQuestion(question: string) {
  const normalized = question.toLowerCase()

  if (normalized.includes('style') || normalized.includes('assistant')) {
    return 'Use a concise, checklist-first assistant style. Give prioritized next actions, stay operational, and warn before risky production changes.'
  }

  if (normalized.includes('portfolio') || normalized.includes('position')) {
    return 'Position the portfolio around real AI automation systems: Hermes LINE AI Assistant, Codex DevOps Companion, Obsidian Vault Knowledge Assistant, and CS Logbook.'
  }

  if (normalized.includes('focus') || normalized.includes('next')) {
    return 'Focus next on demo-quality proof: safe prototypes, case studies, monitoring screenshots, and clear before/after workflows for internal tools.'
  }

  return 'From the sanitized sample vault, the strongest theme is building practical AI automation and internal tools that connect knowledge, alerts, and production operations.'
}

export default function VaultAssistantDemoPage() {
  const [question, setQuestion] = useState(quickQuestions[0])
  const answer = useMemo(() => answerQuestion(question), [question])

  return (
    <main className="min-h-screen bg-neo-cream text-black">
      <section className="border-b-4 border-black bg-neo-mint">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link href="/#projects" className="inline-flex items-center border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px]">
            Back to projects
          </Link>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 border-2 border-black bg-black px-4 py-2 font-black text-white shadow-neo">
                <LockKeyhole size={20} />
                Read-only Sanitized Demo
              </div>
              <h1 className="max-w-4xl text-4xl font-black uppercase leading-tight sm:text-6xl">
                Obsidian Vault Knowledge Assistant
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-bold sm:text-xl">
                A safe prototype of a personal knowledge assistant that answers from a sanitized vault export instead of exposing the private local vault.
              </p>
            </div>
            <div className="border-4 border-black bg-white p-5 shadow-neo-lg">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-green-700" size={28} />
                <p className="font-black uppercase">No private notes exposed</p>
              </div>
              <p className="mt-3 font-mono text-sm">
                This page uses small sample notes only. It demonstrates the RAG-style interaction pattern without connecting to production Hermes or a real vault.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <aside className="space-y-6">
          <div className="border-4 border-black bg-white shadow-neo-lg">
            <div className="flex items-center gap-3 border-b-4 border-black bg-neo-sky px-5 py-4">
              <BookOpen size={24} />
              <h2 className="text-2xl font-black uppercase">Sample Notes</h2>
            </div>
            <div className="space-y-4 p-5">
              {sampleNotes.map((note) => (
                <article key={note.title} className="border-2 border-black bg-neo-cream p-4">
                  <h3 className="text-lg font-black">{note.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span key={tag} className="border-2 border-black bg-neo-lemon px-2 py-1 text-xs font-black uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 font-mono text-sm text-gray-700">{note.body}</p>
                </article>
              ))}
            </div>
          </div>
        </aside>

        <div className="border-4 border-black bg-white shadow-neo-lg">
          <div className="flex items-center gap-3 border-b-4 border-black bg-black px-5 py-4 text-white">
            <BrainCircuit size={26} />
            <h2 className="text-2xl font-black uppercase">Ask the Vault</h2>
          </div>
          <div className="space-y-6 p-5 sm:p-6">
            <div>
              <label htmlFor="vault-question" className="mb-2 block font-black uppercase">
                Question
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                  <input
                    id="vault-question"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    className="w-full border-2 border-black py-3 pl-10 pr-3 font-mono outline-none focus:shadow-neo-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuestion(item)}
                  className="border-2 border-black bg-neo-lemon px-3 py-2 text-sm font-black shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="border-4 border-black bg-neo-cyan p-5">
              <div className="mb-3 flex items-center gap-3">
                <MessageSquareText size={24} />
                <h3 className="text-xl font-black uppercase">Assistant Answer</h3>
              </div>
              <p className="font-mono text-base leading-relaxed">{answer}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {['Sanitized export', 'Read-only access', 'Personal wiki pattern'].map((item) => (
                <div key={item} className="border-2 border-black bg-neo-pink p-4 text-center font-black uppercase">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="border-4 border-black bg-white shadow-neo-lg">
          <div className="border-b-4 border-black bg-neo-lemon px-6 py-4">
            <h2 className="text-2xl font-black uppercase">Retrieval Proof</h2>
          </div>
          <div className="grid gap-4 p-6 md:grid-cols-3">
            {retrievalFlow.map((step, index) => (
              <article key={step.label} className="border-2 border-black bg-neo-cream p-4">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center border-2 border-black bg-white font-black">
                  {index + 1}
                </div>
                <h3 className="text-xl font-black uppercase">{step.label}</h3>
                <p className="mt-3 font-mono text-sm text-gray-700">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
