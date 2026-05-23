import DemoDetailShell from '@/components/demos/DemoDetailShell'

export default function InternalToolsDashboardDemoPage() {
  return (
    <DemoDetailShell
      eyebrow="Internal workflow dashboard"
      title="Logbook Operations Dashboard"
      description="A sanitized internal-tools demo for activity records, admin review, status tracking, and handoff. It shows the operator surface without using live school data."
      accent="amber"
      icon="dashboard"
      status="Mock data only"
      safetyNote="All rows are representative records. No real student data, school identifiers, private database details, or admin credentials are included."
      metrics={[
        { label: 'Records', value: '128', note: 'mock total' },
        { label: 'Reviewed', value: '91', note: 'sample state' },
        { label: 'Follow-ups', value: '14', note: 'open items' },
      ]}
      workflow={[
        { label: 'Capture', detail: 'Collect activity records through structured forms instead of scattered notes.' },
        { label: 'Review', detail: 'Give admins a focused dashboard for progress, status, and follow-up ownership.' },
        { label: 'Handoff', detail: 'Turn records into summary metrics, next actions, and clean transfer notes.' },
      ]}
      safeguards={[
        'No real student records',
        'No private database schema',
        'No school or account identifiers',
        'No admin route details',
      ]}
      table={{
        columns: ['Record', 'Status', 'Owner'],
        rows: [
          { cells: ['Student activity', 'Reviewed', 'Admin'] },
          { cells: ['Follow-up note', 'Pending', 'Advisor'] },
          { cells: ['Progress report', 'Ready', 'Coordinator'] },
          { cells: ['Handoff checklist', 'Draft', 'Operator'] },
        ],
      }}
      proof={[
        { label: 'Before', detail: 'Admin follow-up lived across scattered records and manual review.' },
        { label: 'After', detail: 'A dashboard makes status, owner, and next action visible in one place.' },
        { label: 'Boundary', detail: 'The case study proves workflow design without exposing sensitive data.' },
      ]}
      cta={{ label: 'Build an internal tool', href: '/work-with-me' }}
    />
  )
}
