import Link from 'next/link'
import { Bot, CheckCircle2, Globe2, LockKeyhole, MessageCircle, Route, ServerCog, ShieldCheck } from 'lucide-react'

const messageFlow = [
  {
    actor: 'LINE user',
    message: 'Can you check the service status and summarize what matters?',
  },
  {
    actor: 'Hermes',
    message: 'Health endpoint is reachable. Gateway service is active. Public fallback routes stay locked.',
  },
  {
    actor: 'Operator',
    message: 'Send a short report and record the event.',
  },
]

const architecture = [
  { label: 'LINE webhook', detail: 'Receives real messaging traffic through a public HTTPS endpoint.' },
  { label: 'Nginx edge', detail: 'Routes only intended paths and blocks unknown public access.' },
  { label: 'Hermes gateway', detail: 'Runs behind localhost with health checks and service management.' },
  { label: 'Model provider', detail: 'Routes assistant requests through configurable AI provider settings.' },
]

const safeguards = [
  'No private bearer token in the browser',
  'No raw production conversation data',
  'No direct localhost or server internals exposed',
  'Demo content mirrors workflow shape only',
]

export default function HermesLineAssistantDemoPage() {
  return (
    <main className="min-h-screen bg-neo-cream text-black">
      <section className="border-b-4 border-black bg-neo-lemon">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link href="/#projects" className="inline-flex items-center border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px]">
            Back to projects
          </Link>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 border-2 border-black bg-black px-4 py-2 font-black uppercase text-white shadow-neo">
                <MessageCircle size={20} />
                LINE AI Assistant Demo
              </div>
              <h1 className="max-w-4xl text-4xl font-black uppercase leading-tight sm:text-6xl">
                Hermes LINE AI Assistant
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-bold sm:text-xl">
                A public-safe walkthrough of a production assistant architecture: LINE webhook, Nginx routing, local gateway, health checks, and operational reporting.
              </p>
            </div>
            <div className="border-4 border-black bg-white p-5 shadow-neo-lg">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-green-700" size={28} />
                <p className="font-black uppercase">Production-shaped, token-free</p>
              </div>
              <p className="mt-3 font-mono text-sm">
                This page explains the workflow without calling the live webhook, exposing private endpoints, or showing production LINE identities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="border-4 border-black bg-white shadow-neo-lg">
          <div className="flex items-center gap-3 border-b-4 border-black bg-neo-cyan px-5 py-4">
            <Bot size={26} />
            <h2 className="text-2xl font-black uppercase">Conversation Shape</h2>
          </div>
          <div className="space-y-4 p-5">
            {messageFlow.map((item, index) => (
              <article key={`${item.actor}-${index}`} className="border-2 border-black bg-neo-cream p-4">
                <p className="font-mono text-xs font-black uppercase text-gray-600">{item.actor}</p>
                <p className="mt-2 font-bold leading-relaxed">{item.message}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="border-4 border-black bg-[#111827] text-white shadow-neo-lg">
          <div className="flex items-center gap-3 border-b-4 border-black bg-black px-5 py-4">
            <Route size={26} />
            <h2 className="text-2xl font-black uppercase">Request Path</h2>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            {architecture.map((item, index) => (
              <article key={item.label} className="border-2 border-white bg-white p-4 text-black">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center border-2 border-black bg-neo-mint font-black">
                  {index + 1}
                </div>
                <h3 className="text-xl font-black uppercase">{item.label}</h3>
                <p className="mt-3 font-mono text-sm text-gray-700">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div className="border-4 border-black bg-neo-mint p-6 shadow-neo-lg">
          <div className="mb-5 flex items-center gap-3">
            <ServerCog size={28} />
            <h2 className="text-2xl font-black uppercase">Operational Surface</h2>
          </div>
          <ul className="space-y-3 font-bold">
            {['Health endpoint', 'systemd service checks', 'SSL and Nginx routing', 'LINE notification reports'].map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="shrink-0 text-green-700" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-4 border-black bg-white p-6 shadow-neo-lg">
          <div className="mb-5 flex items-center gap-3">
            <LockKeyhole size={28} />
            <h2 className="text-2xl font-black uppercase">Public Demo Safeguards</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {safeguards.map((item) => (
              <div key={item} className="border-2 border-black bg-neo-pink p-4 font-black">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-4 border-black bg-black text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <Globe2 size={24} />
              <p className="font-black uppercase">Built for real operations</p>
            </div>
            <p className="mt-2 max-w-3xl font-mono text-sm text-gray-300">
              The live system keeps sensitive configuration server-side. The portfolio demo focuses on the architecture and operator workflow.
            </p>
          </div>
          <Link href="/#contact" className="inline-flex border-2 border-white px-5 py-3 text-sm font-black uppercase hover:bg-white hover:text-black">
            Discuss a workflow
          </Link>
        </div>
      </section>
    </main>
  )
}
