import Link from 'next/link'
import { Activity, Bell, CheckCircle2, FileText, ShieldCheck, Terminal } from 'lucide-react'

const commands = [
  {
    command: 'hermes health',
    response: 'OK - assistant gateway reachable, health check responding.',
  },
  {
    command: 'hermes notify "Deployment finished"',
    response: 'LINE notification queued: Deployment finished',
  },
  {
    command: 'hermes report "Daily Ops" "VPS healthy. No failed checks."',
    response: 'Report delivered to LINE and written to event log.',
  },
  {
    command: 'prod-health',
    response: 'Public route healthy, private gateway active, security checks passed.',
  },
]

const events = [
  { type: 'health_check', project: 'Hermes', summary: 'Webhook and gateway health passed', status: 'ok' },
  { type: 'deploy_alert', project: 'Portfolio', summary: 'Build passed and deployment notification sent', status: 'sent' },
  { type: 'security_review', project: 'VPS', summary: 'Public exposure review completed', status: 'logged' },
]

export default function CodexDevOpsDemoPage() {
  return (
    <main className="min-h-screen bg-neo-cream text-black">
      <section className="border-b-4 border-black bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link href="/#projects" className="inline-flex items-center border-2 border-white px-4 py-2 text-sm font-black uppercase hover:bg-white hover:text-black">
            Back to projects
          </Link>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 border-2 border-white bg-neo-lemon px-4 py-2 font-black text-black shadow-neo">
                <ShieldCheck size={20} />
                Sanitized Prototype Demo
              </div>
              <h1 className="max-w-4xl text-4xl font-black uppercase leading-tight sm:text-6xl">
                Codex DevOps Companion
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-bold text-gray-200 sm:text-xl">
                A local Codex-to-Hermes workflow for production health checks, LINE alerts, reports, and structured event logs without exposing private APIs.
              </p>
            </div>
            <div className="border-4 border-white bg-neo-cyan p-5 text-black shadow-neo-lg">
              <p className="font-black uppercase">What this demo shows</p>
              <p className="mt-3 font-mono text-sm">
                Mocked command responses and notifications based on the real workflow shape. No private credential, endpoint, or production identity is used here.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="border-4 border-black bg-[#111827] text-white shadow-neo-lg">
          <div className="flex items-center justify-between border-b-4 border-black bg-neo-sky px-5 py-4 text-black">
            <div className="flex items-center gap-3 font-black uppercase">
              <Terminal size={22} />
              Local Terminal
            </div>
            <span className="border-2 border-black bg-white px-3 py-1 font-mono text-xs font-bold">mock mode</span>
          </div>
          <div className="space-y-5 p-5 font-mono text-sm">
            {commands.map((item) => (
              <div key={item.command} className="border-l-4 border-neo-cyan pl-4">
                <p><span className="text-neo-green">$</span> {item.command}</p>
                <p className="mt-2 text-gray-300">{item.response}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="border-4 border-black bg-white p-6 shadow-neo-lg">
            <div className="mb-4 flex items-center gap-3">
              <Bell className="text-neo-coral" size={26} />
              <h2 className="text-2xl font-black uppercase">LINE Alert Preview</h2>
            </div>
            <div className="border-2 border-black bg-neo-mint p-4 font-mono text-sm">
              <p className="font-black">Deployment finished</p>
              <p className="mt-2">Portfolio build passed. Hermes health check returned OK. Event log recorded.</p>
            </div>
          </div>

          <div className="border-4 border-black bg-neo-lemon p-6 shadow-neo-lg">
            <div className="mb-4 flex items-center gap-3">
              <Activity size={26} />
              <h2 className="text-2xl font-black uppercase">Ops Surface</h2>
            </div>
            <ul className="space-y-3 font-bold">
              <li className="flex gap-3"><CheckCircle2 className="shrink-0 text-green-700" /> Health checks</li>
              <li className="flex gap-3"><CheckCircle2 className="shrink-0 text-green-700" /> Deployment notifications</li>
              <li className="flex gap-3"><CheckCircle2 className="shrink-0 text-green-700" /> Server monitoring reports</li>
              <li className="flex gap-3"><CheckCircle2 className="shrink-0 text-green-700" /> Structured event logs</li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="border-4 border-black bg-white shadow-neo-lg">
          <div className="flex items-center gap-3 border-b-4 border-black bg-neo-pink px-6 py-4">
            <FileText size={24} />
            <h2 className="text-2xl font-black uppercase">Event Log Sample</h2>
          </div>
          <div className="grid gap-4 p-6 md:grid-cols-3">
            {events.map((event) => (
              <div key={`${event.type}-${event.project}`} className="border-2 border-black bg-neo-cream p-4">
                <p className="font-mono text-xs font-black uppercase text-gray-600">{event.type}</p>
                <h3 className="mt-2 text-xl font-black">{event.project}</h3>
                <p className="mt-3 font-mono text-sm">{event.summary}</p>
                <span className="mt-4 inline-block border-2 border-black bg-black px-3 py-1 text-xs font-black uppercase text-white">
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
