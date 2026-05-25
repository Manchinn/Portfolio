import type { Language } from '@/data/types'

type CopyBlock = {
  hero: {
    eyebrow: string
    location: string
    status: string
    commandModes: string[]
    statusLabel: string
    locationLabel: string
    modeLabel: string
    primaryCta: string
    secondaryCta: string
  }
  stats: {
    eyebrow: string
    title: string
    subtitle: string
    items: Array<{ value: string; label: string; note: string }>
  }
  capability: {
    eyebrow: string
    title: string
    subtitle: string
  }
  featured: {
    eyebrow: string
    title: string
    subtitle: string
    problem: string
    built: string
    result: string
    cta: string
  }
  workflow: {
    eyebrow: string
    title: string
    subtitle: string
    steps: Array<{ phase: string; title: string; body: string }>
  }
  stack: {
    eyebrow: string
    title: string
    subtitle: string
    groups: Array<{ heading: string; items: string[] }>
  }
  manifesto: {
    eyebrow: string
    title: string
    subtitle: string
    principles: Array<{ key: string; title: string; body: string }>
  }
  timeline: {
    eyebrow: string
    title: string
    subtitle: string
  }
  lab: {
    eyebrow: string
    title: string
    subtitle: string
    demoLabel: string
    notesLabel: string
    viewAll: string
  }
  contact: {
    eyebrow: string
    title: string
    subtitle: string
    primary: string
    channels: string
    response: string
    legal: string
  }
}

export const copy: Record<Language, CopyBlock> = {
  en: {
    hero: {
      eyebrow: 'Operator // online',
      location: 'Thailand · GMT+7',
      status: 'Building production AI workflows',
      commandModes: ['Build', 'Automate', 'Operate', 'Optimize'],
      statusLabel: 'Status',
      locationLabel: 'Location',
      modeLabel: 'Command modes',
      primaryCta: 'Open transmission',
      secondaryCta: 'View featured systems',
    },
    stats: {
      eyebrow: 'Signal // metrics',
      title: 'Systems shipped, not slides made.',
      subtitle: 'A snapshot of what is currently live, monitored, and iterated on across personal infrastructure.',
      items: [
        { value: '12+', label: 'Production systems', note: 'Live across web, ops, and assistants' },
        { value: '20+', label: 'Automation workflows', note: 'Connecting APIs, alerts, and operators' },
        { value: '99.x%', label: 'Targeted uptime', note: 'Health-checked and recovery-ready' },
      ],
    },
    capability: {
      eyebrow: 'Surface // capability',
      title: 'Where the operator console connects.',
      subtitle: 'Six surfaces that recur across the systems I build — each one designed to be shipped, observed, and handed off.',
    },
    featured: {
      eyebrow: 'Systems // featured',
      title: 'Production systems and assistant workflows.',
      subtitle: 'Real systems running today. Each entry maps a concrete problem to what was built and how it now operates.',
      problem: 'Problem',
      built: 'Built',
      result: 'Result',
      cta: 'Open dossier',
    },
    workflow: {
      eyebrow: 'Process // build loop',
      title: 'How I take an idea to a system on a server.',
      subtitle: 'A repeatable loop. Define the operator job, build the system, operate it in production, then iterate from real signal.',
      steps: [
        {
          phase: '01 · Define',
          title: 'Map the operator job',
          body: 'Identify the recurring task, the failure modes, the trust boundary, and the success signal. No code until the loop is clear.',
        },
        {
          phase: '02 · Build',
          title: 'Compose the system',
          body: 'Wire AI, APIs, messaging, and storage into a workflow with strict secrets handling and a clean public surface.',
        },
        {
          phase: '03 · Operate',
          title: 'Run it in production',
          body: 'Deploy to real infrastructure with health checks, alerts, structured event logs, and a documented runbook.',
        },
        {
          phase: '04 · Iterate',
          title: 'Tighten the loop',
          body: 'Observe usage, prune friction, reduce surface area, and graduate one-off scripts into reusable system blocks.',
        },
      ],
    },
    stack: {
      eyebrow: 'Stack // matrix',
      title: 'A pragmatic stack for shippable AI systems.',
      subtitle: 'Tools chosen because they survive contact with production — not because they are trending.',
      groups: [
        {
          heading: 'AI & Models',
          items: ['ChatGPT', 'OpenAI API', 'Claude', 'OpenRouter', 'Prompt patterns', 'RAG-style retrieval'],
        },
        {
          heading: 'Web & App',
          items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Vercel Blob'],
        },
        {
          heading: 'Ops & Channels',
          items: ['LINE Messaging API', 'PowerShell', 'Codex CLI', 'VPS · reverse proxy', 'Health checks', 'Docker'],
        },
      ],
    },
    manifesto: {
      eyebrow: 'Manifesto // engineering',
      title: 'Operating principles.',
      subtitle: 'How I think when I build — applied to every system I put my name on.',
      principles: [
        {
          key: '/01',
          title: 'Ship to production',
          body: 'A system that does not run in production has not been built yet. Demos are scaffolding, not the deliverable.',
        },
        {
          key: '/02',
          title: 'Secure by default',
          body: 'Secrets live in env, not in code. Public surfaces stay public-safe. Private internals stay private — always.',
        },
        {
          key: '/03',
          title: 'Automate the repeatable',
          body: 'If a task happens twice, it is a candidate for a workflow. If it happens three times, it already is one.',
        },
        {
          key: '/04',
          title: 'Build for the next operator',
          body: 'Health checks, event logs, runbooks. The system should be operable by someone who is not me.',
        },
      ],
    },
    timeline: {
      eyebrow: 'Trace // experience',
      title: 'A working trace of systems built.',
      subtitle: 'Three eras, all converging on the same theme: turn manual work into observable, shippable systems.',
    },
    lab: {
      eyebrow: 'Lab // showcase',
      title: 'Notes, demos, and works in progress.',
      subtitle: 'Public-safe artifacts from the lab — explainers, demo surfaces, and exploratory builds.',
      demoLabel: 'Demos',
      notesLabel: 'Lab notes',
      viewAll: 'Open',
    },
    contact: {
      eyebrow: 'Channel // open',
      title: 'Build a secure, useful AI system.',
      subtitle: 'I take on focused engagements where an AI workflow needs to actually run in production. Email is the fastest channel.',
      primary: 'Start a transmission',
      channels: 'Secondary channels',
      response: 'Typical response within 24 hours',
      legal: 'All systems described stay within public-safe boundaries. No private infra, credentials, or operational details are exposed.',
    },
  },
  th: {
    hero: {
      eyebrow: 'Operator // online',
      location: 'ประเทศไทย · GMT+7',
      status: 'กำลังสร้าง AI workflow บน production จริง',
      commandModes: ['Build', 'Automate', 'Operate', 'Optimize'],
      statusLabel: 'สถานะ',
      locationLabel: 'ตำแหน่ง',
      modeLabel: 'โหมดทำงาน',
      primaryCta: 'เปิด transmission',
      secondaryCta: 'ดูระบบที่ทำมา',
    },
    stats: {
      eyebrow: 'Signal // metrics',
      title: 'นับจากระบบที่ ship จริง ไม่ใช่ slide',
      subtitle: 'ภาพรวมของระบบที่กำลังทำงานอยู่ ทั้งเว็บ ops และ assistant',
      items: [
        { value: '12+', label: 'Production systems', note: 'รันจริงทั้งเว็บ ops และ assistant' },
        { value: '20+', label: 'Automation workflows', note: 'เชื่อม API, alerts, operator' },
        { value: '99.x%', label: 'เป้าหมาย uptime', note: 'มี health-check และ recovery ครบ' },
      ],
    },
    capability: {
      eyebrow: 'Surface // capability',
      title: 'จุดที่ operator console เชื่อมต่อ',
      subtitle: 'หกพื้นผิวที่ recur ในระบบที่ผมสร้าง — ออกแบบให้ ship ได้, ตรวจสอบได้, และส่งต่อได้',
    },
    featured: {
      eyebrow: 'Systems // featured',
      title: 'ระบบ production และ assistant workflow',
      subtitle: 'ระบบจริงที่รันอยู่ แต่ละชุดบอกว่าโจทย์อะไร สร้างอะไร และตอนนี้ทำงานยังไง',
      problem: 'Problem',
      built: 'Built',
      result: 'Result',
      cta: 'เปิด dossier',
    },
    workflow: {
      eyebrow: 'Process // build loop',
      title: 'จากไอเดียถึงระบบบนเซิร์ฟเวอร์ — ทำยังไง',
      subtitle: 'Loop ที่ทำซ้ำได้ กำหนดงานของ operator, build, run จริง แล้ว iterate จาก signal ที่เห็น',
      steps: [
        {
          phase: '01 · Define',
          title: 'Map operator job',
          body: 'ระบุ task ที่ทำซ้ำ, failure mode, trust boundary และ success signal ก่อน — ยังไม่เขียน code',
        },
        {
          phase: '02 · Build',
          title: 'ประกอบระบบ',
          body: 'เชื่อม AI, API, messaging และ storage เป็น workflow ที่จัดการ secrets เคร่ง และ public surface สะอาด',
        },
        {
          phase: '03 · Operate',
          title: 'รัน production จริง',
          body: 'Deploy บน infrastructure จริง พร้อม health checks, alerts, structured event logs และ runbook',
        },
        {
          phase: '04 · Iterate',
          title: 'รัด loop ให้แน่น',
          body: 'ดูการใช้งาน ตัด friction ลด surface แล้วเลื่อน one-off script เป็น system block ที่ reuse ได้',
        },
      ],
    },
    stack: {
      eyebrow: 'Stack // matrix',
      title: 'Stack ที่เลือกเพื่อ ship จริง',
      subtitle: 'เครื่องมือที่ผ่านสนาม production ไม่ได้เลือกเพราะ trending',
      groups: [
        {
          heading: 'AI & Models',
          items: ['ChatGPT', 'OpenAI API', 'Claude', 'OpenRouter', 'Prompt patterns', 'RAG-style retrieval'],
        },
        {
          heading: 'Web & App',
          items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Vercel Blob'],
        },
        {
          heading: 'Ops & Channels',
          items: ['LINE Messaging API', 'PowerShell', 'Codex CLI', 'VPS · reverse proxy', 'Health checks', 'Docker'],
        },
      ],
    },
    manifesto: {
      eyebrow: 'Manifesto // engineering',
      title: 'หลักทำงาน',
      subtitle: 'วิธีคิดเวลาผมสร้างระบบ ใช้กับทุกงานที่ใส่ชื่อตัวเองลงไป',
      principles: [
        {
          key: '/01',
          title: 'Ship ขึ้น production',
          body: 'ระบบที่ยังไม่ run จริง = ยังไม่เสร็จ. Demo เป็นแค่ scaffolding ไม่ใช่ deliverable',
        },
        {
          key: '/02',
          title: 'Secure by default',
          body: 'Secrets อยู่ใน env ไม่ใช่ใน code. Public ต้อง public-safe. Private ต้อง private — ตลอด',
        },
        {
          key: '/03',
          title: 'Automate งานซ้ำ',
          body: 'งานที่ทำสองครั้งคือว่าที่ workflow. ครั้งที่สาม คือ workflow แน่ๆ',
        },
        {
          key: '/04',
          title: 'Build เผื่อ operator คนถัดไป',
          body: 'Health check, event log, runbook — ระบบควรให้คนที่ไม่ใช่ผม operate ได้',
        },
      ],
    },
    timeline: {
      eyebrow: 'Trace // experience',
      title: 'Working trace ของระบบที่สร้าง',
      subtitle: 'สามช่วงเวลา ทิศเดียวกัน — เปลี่ยนงาน manual ให้เป็นระบบที่ ship และ observe ได้',
    },
    lab: {
      eyebrow: 'Lab // showcase',
      title: 'Notes, demo และงานที่กำลังลอง',
      subtitle: 'Artifact public-safe จาก lab — explainer, demo surface และ exploratory build',
      demoLabel: 'Demos',
      notesLabel: 'Lab notes',
      viewAll: 'เปิด',
    },
    contact: {
      eyebrow: 'Channel // open',
      title: 'สร้างระบบ AI ที่ปลอดภัยและใช้จริง',
      subtitle: 'รับงานที่ต้องการ AI workflow รันจริงบน production. Email เร็วที่สุด',
      primary: 'เริ่ม transmission',
      channels: 'ช่องทางสำรอง',
      response: 'ตอบกลับภายใน 24 ชั่วโมง',
      legal: 'ทุกระบบในนี้อธิบายในขอบเขต public-safe ไม่เปิด private infra, credential หรือ operational detail',
    },
  },
}
