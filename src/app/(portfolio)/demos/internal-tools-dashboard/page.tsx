import Link from 'next/link'
import { Activity, BarChart3, CheckCircle2, ClipboardList, Database, LayoutDashboard, LockKeyhole, UsersRound } from 'lucide-react'

const workflow = [
  { label: 'Capture', detail: 'Collect activity records through a structured form instead of scattered notes.' },
  { label: 'Review', detail: 'Give admins a dashboard view for checking progress and follow-up status.' },
  { label: 'Act', detail: 'Turn records into next actions, reports, and handoff notes.' },
]

const records = [
  { name: 'Student activity', status: 'Reviewed', owner: 'Admin' },
  { name: 'Follow-up note', status: 'Pending', owner: 'Advisor' },
  { name: 'Progress report', status: 'Ready', owner: 'Coordinator' },
]

const modules = [
  { icon: ClipboardList, title: 'Logbook Records', body: 'Database-backed entries for tracking structured student activity.' },
  { icon: UsersRound, title: 'Admin Workflow', body: 'Views that help an operator review, filter, and follow up.' },
  { icon: Database, title: 'Data Foundation', body: 'A full-stack base for auth, records, dashboards, and deployment.' },
]

const handoffChecks = [
  'Clear owner and status for every record',
  'Summary metrics for quick admin review',
  'Mock table shape that matches a real operator workflow',
  'No live school data or private identifiers',
]

export default function InternalToolsDashboardDemoPage() {
  return (
    <main className="min-h-screen bg-neo-cream text-black">
      <section className="border-b-4 border-black bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link href="/#projects" className="inline-flex items-center border-2 border-white px-4 py-2 text-sm font-black uppercase hover:bg-white hover:text-black">
            Back to projects
          </Link>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 border-2 border-white bg-neo-mint px-4 py-2 font-black uppercase text-black shadow-neo">
                <LayoutDashboard size={20} />
                Internal Tools Demo
              </div>
              <h1 className="max-w-4xl text-4xl font-black uppercase leading-tight sm:text-6xl">
                Logbook Operations Dashboard
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-bold text-gray-200 sm:text-xl">
                A sanitized case-study demo for a full-stack internal tool: activity records, admin review, status tracking, and operational handoff.
              </p>
            </div>
            <div className="border-4 border-white bg-neo-lemon p-5 text-black shadow-neo-lg">
              <div className="flex items-center gap-3">
                <LockKeyhole size={28} />
                <p className="font-black uppercase">No real student data</p>
              </div>
              <p className="mt-3 font-mono text-sm">
                All rows are mock records. This page demonstrates the product surface and workflow, not a live school database.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <aside className="space-y-6">
          <div className="border-4 border-black bg-white p-6 shadow-neo-lg">
            <div className="mb-5 flex items-center gap-3">
              <Activity size={28} />
              <h2 className="text-2xl font-black uppercase">Workflow</h2>
            </div>
            <div className="space-y-4">
              {workflow.map((item, index) => (
                <article key={item.label} className="border-2 border-black bg-neo-cream p-4">
                  <p className="font-mono text-xs font-black uppercase text-gray-600">Step {index + 1}</p>
                  <h3 className="mt-1 text-xl font-black uppercase">{item.label}</h3>
                  <p className="mt-2 font-mono text-sm text-gray-700">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </aside>

        <div className="border-4 border-black bg-white shadow-neo-lg">
          <div className="flex items-center justify-between border-b-4 border-black bg-neo-sky px-5 py-4">
            <div className="flex items-center gap-3">
              <BarChart3 size={26} />
              <h2 className="text-2xl font-black uppercase">Admin Snapshot</h2>
            </div>
            <span className="border-2 border-black bg-white px-3 py-1 font-mono text-xs font-bold uppercase">mock data</span>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-3">
            {[
              ['Records', '128'],
              ['Reviewed', '91'],
              ['Open Follow-ups', '14'],
            ].map(([label, value]) => (
              <div key={label} className="border-2 border-black bg-neo-mint p-4">
                <p className="font-mono text-xs font-black uppercase">{label}</p>
                <p className="mt-2 text-4xl font-black">{value}</p>
              </div>
            ))}
          </div>
          <div className="px-5 pb-5">
            <div className="overflow-hidden border-2 border-black">
              <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] bg-black px-4 py-3 text-sm font-black uppercase text-white">
                <span>Record</span>
                <span>Status</span>
                <span>Owner</span>
              </div>
              {records.map((record) => (
                <div key={record.name} className="grid grid-cols-[1.2fr_0.8fr_0.8fr] border-t-2 border-black bg-neo-cream px-4 py-3 font-mono text-sm">
                  <span>{record.name}</span>
                  <span>{record.status}</span>
                  <span>{record.owner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon

            return (
              <article key={module.title} className="border-4 border-black bg-white p-6 shadow-neo-lg">
                <Icon size={32} className="mb-4" />
                <h2 className="text-2xl font-black uppercase">{module.title}</h2>
                <p className="mt-3 font-mono text-sm text-gray-700">{module.body}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-8 border-4 border-black bg-neo-pink p-6 shadow-neo-lg">
          <div className="mb-4 flex items-center gap-3">
            <CheckCircle2 className="text-green-700" size={28} />
            <h2 className="text-2xl font-black uppercase">Case-study Result</h2>
          </div>
          <p className="max-w-4xl font-bold leading-relaxed">
            The important product lesson is the workflow: replace scattered admin records with a structured system that can be reviewed, operated, and handed off.
          </p>
        </div>

        <div className="mt-8 border-4 border-black bg-white p-6 shadow-neo-lg">
          <h2 className="text-2xl font-black uppercase">Review Checklist</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {handoffChecks.map((item) => (
              <div key={item} className="flex gap-3 border-2 border-black bg-neo-cream p-4 font-bold">
                <CheckCircle2 className="shrink-0 text-green-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
