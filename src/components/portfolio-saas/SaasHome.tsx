'use client'

import {
  ArrowRight,
  Bot,
  Boxes,
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers3,
  Map,
  MessageSquareText,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Workflow,
} from 'lucide-react'
import { profile, profileCommon, projects, skills } from '@/data/portfolio'
import type { Language, Project } from '@/data/types'
import { useTranslation } from '@/i18n/useTranslation'
import { copy } from '@/components/portfolio/copy'
import { SaasButton, SaasCard, SaasHeader, SaasSection } from './_shared'

type LocalCopy = {
  heroEyebrow: string
  heroTitlePrefix: string
  heroBody: string
  primaryCta: string
  secondaryCta: string
  proofEyebrow: string
  workflowEyebrow: string
  workflowTitle: string
  workflowSubtitle: string
  systemsEyebrow: string
  capabilitiesEyebrow: string
  demosEyebrow: string
  demosTitle: string
  demosSubtitle: string
  stackEyebrow: string
  finalEyebrow: string
  finalTitle: string
  finalSubtitle: string
  openDemo: string
  viewAllDemos: string
  problem: string
  built: string
  result: string
  techLabel: string
  proof: Array<{ label: string; value: string; note: string }>
  workflow: Array<{ title: string; body: string; icon: typeof MessageSquareText }>
}

const localCopy: Record<Language, LocalCopy> = {
  en: {
    heroEyebrow: 'AI coding workflow portfolio',
    heroTitlePrefix: 'Build useful AI workflows from prompt to production.',
    heroBody:
      'A softer product-style view of the same work: assistant workflows, internal tools, public-safe demos, and deployment-ready systems.',
    primaryCta: 'Scope a workflow',
    secondaryCta: 'Explore demos',
    proofEyebrow: 'Proof close to the surface',
    workflowEyebrow: 'Workflow builder',
    workflowTitle: 'From prompt shape to a working product surface.',
    workflowSubtitle:
      'The portfolio is organized around the work loop: clarify the task, build a prototype, add real state, then publish a safe demo or internal tool.',
    systemsEyebrow: 'Featured systems',
    capabilitiesEyebrow: 'Capabilities',
    demosEyebrow: 'Demo lab',
    demosTitle: 'Public-safe demos that show the workflow, not private internals.',
    demosSubtitle:
      'Each demo is framed like a small product surface: catalog UX, assistant routing, dashboards, landing pages, and workflow proof.',
    stackEyebrow: 'Stack and tools',
    finalEyebrow: 'Work with me',
    finalTitle: 'Turn one messy workflow into a focused AI tool or demo.',
    finalSubtitle:
      'Useful first scopes: a public-safe demo, an internal dashboard, an assistant workflow, or a production handoff surface.',
    openDemo: 'Open demo',
    viewAllDemos: 'View all demos',
    problem: 'Problem',
    built: 'Built',
    result: 'Result',
    techLabel: 'Core stack',
    proof: [
      { label: 'Assistant workflows', value: 'AI + channels', note: 'Messaging, alerts, and operator flows' },
      { label: 'Public-safe proof', value: 'Demo-first', note: 'Show capability without private details' },
      { label: 'Full-stack systems', value: 'Next.js + APIs', note: 'Typed UI, routes, data, and state' },
      { label: 'Operational loop', value: 'Build -> verify', note: 'Health checks, reports, and handoff notes' },
    ],
    workflow: [
      { title: 'Capture workflow', body: 'Map the recurring job, users, data boundary, and success signal.', icon: MessageSquareText },
      { title: 'Shape prompt/spec', body: 'Convert intent into scoped issue briefs, acceptance criteria, and safe copy.', icon: Sparkles },
      { title: 'Build prototype', body: 'Create a clickable route with responsive UI, state, and realistic mock data.', icon: Code2 },
      { title: 'Publish proof', body: 'Verify the build, sanitize public copy, and make the demo easy to inspect.', icon: Rocket },
    ],
  },
  th: {
    heroEyebrow: 'Portfolio สำหรับ AI coding workflow',
    heroTitlePrefix: 'สร้าง AI workflow ที่ใช้ได้จริง ตั้งแต่ prompt ถึง production.',
    heroBody:
      'หน้าตาใหม่แบบ product/SaaS แต่ยังใช้ข้อมูลเดิม: assistant workflow, internal tools, public-safe demos และระบบที่พร้อม deploy',
    primaryCta: 'คุย scope งาน',
    secondaryCta: 'ดู demos',
    proofEyebrow: 'Proof ที่เห็นเร็ว',
    workflowEyebrow: 'Workflow builder',
    workflowTitle: 'จาก prompt/spec ไปเป็น product surface ที่คลิกใช้งานได้',
    workflowSubtitle:
      'โครง portfolio จัดตาม loop การทำงาน: ทำโจทย์ให้ชัด, สร้าง prototype, ใส่ state จริง แล้ว publish เป็น demo หรือ internal tool ที่ปลอดภัย',
    systemsEyebrow: 'ระบบเด่น',
    capabilitiesEyebrow: 'ความสามารถหลัก',
    demosEyebrow: 'Demo lab',
    demosTitle: 'Demo แบบ public-safe ที่โชว์ workflow โดยไม่เปิด internals',
    demosSubtitle:
      'แต่ละ demo วางเป็น product surface ขนาดเล็ก เช่น catalog UX, assistant routing, dashboard, landing page และ workflow proof',
    stackEyebrow: 'Stack และ tools',
    finalEyebrow: 'Work with me',
    finalTitle: 'เปลี่ยน workflow ที่ยุ่งให้เป็น AI tool หรือ demo ที่ชัด',
    finalSubtitle:
      'Scope ที่เหมาะเริ่มก่อน: public-safe demo, internal dashboard, assistant workflow หรือหน้า handoff สำหรับ production',
    openDemo: 'เปิด demo',
    viewAllDemos: 'ดู demos ทั้งหมด',
    problem: 'Problem',
    built: 'Built',
    result: 'Result',
    techLabel: 'Core stack',
    proof: [
      { label: 'Assistant workflows', value: 'AI + channels', note: 'Messaging, alerts และ operator flows' },
      { label: 'Public-safe proof', value: 'Demo-first', note: 'โชว์ capability โดยไม่เปิดข้อมูล private' },
      { label: 'Full-stack systems', value: 'Next.js + APIs', note: 'Typed UI, routes, data และ state' },
      { label: 'Operational loop', value: 'Build -> verify', note: 'Health checks, reports และ handoff notes' },
    ],
    workflow: [
      { title: 'Capture workflow', body: 'จับงานซ้ำ, user, data boundary และ success signal ให้ชัด', icon: MessageSquareText },
      { title: 'Shape prompt/spec', body: 'แปลง intent เป็น issue brief, acceptance criteria และ copy ที่ปลอดภัย', icon: Sparkles },
      { title: 'Build prototype', body: 'สร้าง route ที่คลิกได้ มี responsive UI, state และ mock data ที่สมจริง', icon: Code2 },
      { title: 'Publish proof', body: 'ตรวจ build, sanitize public copy และทำให้ demo inspect ง่าย', icon: Rocket },
    ],
  },
}

const capabilityIcons = [Bot, Layers3, ShieldCheck, Boxes, Workflow]
const demoIcons = [Store, Bot, Search]

export function SaasHome() {
  const { language } = useTranslation()
  const lang = language as Language
  const c = localCopy[lang]
  const oldCopy = copy[lang]
  const data = { ...profile[lang], ...profileCommon }
  const featuredProjects = projects[lang].slice(0, 4)
  const demoProjects = projects[lang].filter((project) => project.demo).slice(0, 3)

  return (
    <main className="min-h-screen overflow-x-hidden bg-saas-bg text-saas-ink">
      <SaasHero c={c} data={data} />
      <ProofStrip c={c} />
      <WorkflowBuilder c={c} />
      <FeaturedProjectCards c={c} title={oldCopy.featured.title} subtitle={oldCopy.featured.subtitle} projects={featuredProjects} />
      <CapabilityCards c={c} title={oldCopy.capability.title} subtitle={oldCopy.capability.subtitle} skills={skills[lang]} />
      <DemoLab c={c} projects={demoProjects} />
      <StackBadges c={c} title={oldCopy.stack.title} subtitle={oldCopy.stack.subtitle} groups={oldCopy.stack.groups} />
      <FinalCTA c={c} email={data.email} />
    </main>
  )
}

function SaasHero({ c, data }: { c: LocalCopy; data: typeof profile.en & typeof profileCommon }) {
  return (
    <section id="home" className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-24">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-saas-mint/60 to-transparent" aria-hidden />
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:px-8 lg:py-24">
        <div className="relative">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-green">{c.heroEyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-balance text-5xl font-black leading-[0.95] text-saas-ink sm:text-6xl lg:text-7xl">
            {c.heroTitlePrefix}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-saas-muted">{data.bio}</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-saas-muted">{c.heroBody}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <SaasButton href="/work-with-me" icon={<ArrowRight className="h-4 w-4" />}>
              {c.primaryCta}
            </SaasButton>
            <SaasButton href="/demos" variant="secondary" icon={<ExternalLink className="h-4 w-4" />}>
              {c.secondaryCta}
            </SaasButton>
          </div>
        </div>

        <div className="relative grid gap-4 self-end">
          <SaasCard tone="dark" className="rounded-[24px] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-mint">Builder profile</p>
                <h2 className="mt-4 text-3xl font-black leading-tight">{data.name}</h2>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-white/10">
                <Workflow className="h-7 w-7 text-saas-mint" />
              </div>
            </div>
            <p className="mt-5 text-base leading-7 text-white/72">{data.title}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {['Prompt systems', 'Public demos', 'Internal tools', data.location].map((item) => (
                <div key={item} className="rounded-[10px] border border-white/12 bg-white/7 px-3 py-2 text-sm font-bold text-white/82">
                  {item}
                </div>
              ))}
            </div>
          </SaasCard>
          <div className="grid gap-4 sm:grid-cols-2">
            <SaasCard tone="mint">
              <CheckCircle2 className="h-5 w-5 text-saas-green" />
              <p className="mt-3 text-sm font-black">Public-safe demos</p>
              <p className="mt-1 text-sm leading-6 text-saas-muted">Sanitized product surfaces and mock workflows.</p>
            </SaasCard>
            <SaasCard tone="cream">
              <Map className="h-5 w-5 text-saas-green" />
              <p className="mt-3 text-sm font-black">From brief to route</p>
              <p className="mt-1 text-sm leading-6 text-saas-muted">Specs, UI, state, build checks, and handoff.</p>
            </SaasCard>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProofStrip({ c }: { c: LocalCopy }) {
  return (
    <SaasSection className="pt-0" wide>
      <div className="rounded-[24px] border border-saas-line bg-white p-4 shadow-saas-md sm:p-5">
        <p className="px-2 pb-4 text-xs font-black uppercase tracking-[0.16em] text-saas-green">{c.proofEyebrow}</p>
        <div className="grid gap-3 md:grid-cols-4">
          {c.proof.map((item) => (
            <div key={item.label} className="rounded-[14px] bg-saas-surface-soft p-4">
              <p className="text-sm font-black text-saas-ink">{item.value}</p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-saas-green">{item.label}</p>
              <p className="mt-2 text-sm leading-6 text-saas-muted">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </SaasSection>
  )
}

function WorkflowBuilder({ c }: { c: LocalCopy }) {
  return (
    <SaasSection id="workflow">
      <SaasHeader eyebrow={c.workflowEyebrow} title={c.workflowTitle} subtitle={c.workflowSubtitle} align="center" />
      <div className="mt-12 grid gap-4 md:grid-cols-4">
        {c.workflow.map((step, index) => {
          const Icon = step.icon
          return (
            <SaasCard key={step.title} hover className="min-h-[240px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-saas-mint text-saas-green">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-black text-saas-muted">0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-black text-saas-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-saas-muted">{step.body}</p>
            </SaasCard>
          )
        })}
      </div>
    </SaasSection>
  )
}

function FeaturedProjectCards({
  c,
  title,
  subtitle,
  projects: featuredProjects,
}: {
  c: LocalCopy
  title: string
  subtitle: string
  projects: Project[]
}) {
  return (
    <SaasSection id="systems" className="bg-white/55">
      <SaasHeader eyebrow={c.systemsEyebrow} title={title} subtitle={subtitle} align="split" rightSlot={<SaasButton href="/#projects" variant="secondary">Projects</SaasButton>} />
      <div id="projects" className="mt-12 grid gap-5 lg:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectProofCard key={project.id} project={project} c={c} />
        ))}
      </div>
    </SaasSection>
  )
}

function ProjectProofCard({ project, c }: { project: Project; c: LocalCopy }) {
  return (
    <SaasCard hover className="flex min-h-full flex-col rounded-[24px] p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-saas-green">{project.category}</p>
          <h3 className="mt-3 text-2xl font-black leading-tight text-saas-ink">{project.title}</h3>
        </div>
        <span className="rounded-full bg-saas-surface-soft px-3 py-1 text-xs font-black text-saas-muted">{project.date}</span>
      </div>
      <p className="mt-4 text-sm leading-7 text-saas-muted">{project.description}</p>
      {project.caseStudy && (
        <div className="mt-5 grid gap-3">
          {[
            [c.problem, project.caseStudy.problem],
            [c.built, project.caseStudy.built],
            [c.result, project.caseStudy.result],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[10px] bg-saas-surface-soft p-3">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-saas-green">{label}</p>
              <p className="mt-1 text-sm leading-6 text-saas-muted">{value}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.slice(0, 3).map((tech) => (
          <span key={tech} className="rounded-full border border-saas-line bg-white px-3 py-1 text-xs font-black text-saas-muted">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-6">
        <SaasButton href={project.demo} variant="ghost" icon={<ArrowRight className="h-4 w-4" />}>
          {c.openDemo}
        </SaasButton>
      </div>
    </SaasCard>
  )
}

function CapabilityCards({
  c,
  title,
  subtitle,
  skills: skillGroups,
}: {
  c: LocalCopy
  title: string
  subtitle: string
  skills: typeof skills.en
}) {
  return (
    <SaasSection id="capabilities">
      <SaasHeader eyebrow={c.capabilitiesEyebrow} title={title} subtitle={subtitle} />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.slice(0, 5).map((group, index) => {
          const Icon = capabilityIcons[index] ?? Boxes
          return (
            <SaasCard key={group.category} hover>
              <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-saas-mint text-saas-green">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-black">{group.category}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.slice(0, 5).map((item) => (
                  <span key={item.name} className="rounded-full bg-saas-surface-soft px-3 py-1 text-xs font-black text-saas-muted">
                    {item.name}
                  </span>
                ))}
              </div>
            </SaasCard>
          )
        })}
      </div>
    </SaasSection>
  )
}

function DemoLab({ c, projects: demoProjects }: { c: LocalCopy; projects: Project[] }) {
  return (
    <SaasSection id="demos" className="bg-saas-surface-soft">
      <SaasHeader
        eyebrow={c.demosEyebrow}
        title={c.demosTitle}
        subtitle={c.demosSubtitle}
        align="split"
        rightSlot={<SaasButton href="/demos" variant="secondary" icon={<ExternalLink className="h-4 w-4" />}>{c.viewAllDemos}</SaasButton>}
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {demoProjects.map((project, index) => {
          const Icon = demoIcons[index] ?? Store
          return (
            <SaasCard key={project.id} hover className="rounded-[24px] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-white text-saas-green shadow-saas-sm">
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-saas-green">{project.category}</p>
              <h3 className="mt-3 text-xl font-black leading-tight">{project.title}</h3>
              <p className="mt-3 text-sm leading-7 text-saas-muted">{project.description}</p>
              <div className="mt-5">
                <SaasButton href={project.demo} variant="ghost" icon={<ArrowRight className="h-4 w-4" />}>
                  {c.openDemo}
                </SaasButton>
              </div>
            </SaasCard>
          )
        })}
      </div>
    </SaasSection>
  )
}

function StackBadges({
  c,
  title,
  subtitle,
  groups,
}: {
  c: LocalCopy
  title: string
  subtitle: string
  groups: Array<{ heading: string; items: string[] }>
}) {
  return (
    <SaasSection id="stack">
      <SaasHeader eyebrow={c.stackEyebrow} title={title} subtitle={subtitle} align="center" />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {groups.map((group) => (
          <SaasCard key={group.heading} className="rounded-[24px] p-6">
            <h3 className="text-lg font-black">{group.heading}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-full border border-saas-line bg-white px-3 py-1.5 text-xs font-black text-saas-muted">
                  {item}
                </span>
              ))}
            </div>
          </SaasCard>
        ))}
      </div>
    </SaasSection>
  )
}

function FinalCTA({ c, email }: { c: LocalCopy; email: string }) {
  return (
    <SaasSection id="contact" className="pb-24">
      <div className="rounded-[24px] border border-saas-ink bg-saas-ink p-6 text-white shadow-saas-md sm:p-10 lg:p-12">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-mint">{c.finalEyebrow}</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h2 className="max-w-3xl text-balance text-3xl font-black leading-[1.04] sm:text-5xl">{c.finalTitle}</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">{c.finalSubtitle}</p>
          </div>
          <SaasButton href={`mailto:${email}`} icon={<ArrowRight className="h-4 w-4" />} className="bg-white text-saas-ink hover:bg-saas-mint">
            {c.primaryCta}
          </SaasButton>
        </div>
      </div>
    </SaasSection>
  )
}
