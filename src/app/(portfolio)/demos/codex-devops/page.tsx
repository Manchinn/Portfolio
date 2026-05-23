import DemoDetailShell from '@/components/demos/DemoDetailShell'

export default function CodexDevOpsDemoPage() {
  return (
    <DemoDetailShell
      eyebrow="Local operator command center"
      title="Codex DevOps Companion"
      description="A local Codex-to-Hermes operating surface for production checks, alerts, reports, and structured event logs. The demo keeps all infrastructure details mocked and browser-safe."
      accent="blue"
      icon="terminal"
      status="Mock command surface"
      safetyNote="Commands and responses are representative examples. No private API, internal host, credential, or production identifier is rendered here."
      metrics={[
        { label: 'Commands', value: '4', note: 'operator actions' },
        { label: 'Private APIs', value: '0', note: 'not exposed' },
        { label: 'Output', value: 'Logs', note: 'report-ready' },
      ]}
      workflow={[
        { label: 'Trigger', detail: 'Codex runs a small local command instead of opening multiple dashboards.' },
        { label: 'Check', detail: 'Hermes-style responses summarize service health, notification state, and event status.' },
        { label: 'Record', detail: 'The workflow turns operational activity into a reportable event trail.' },
      ]}
      safeguards={[
        'No internal API URLs',
        'No bearer tokens or webhook secrets',
        'No server hostnames or private ports',
        'No operational hardening details',
      ]}
      consoleLines={[
        { command: 'hermes health', response: 'OK - assistant gateway reachable, health check responding.' },
        { command: 'hermes notify "Deployment finished"', response: 'Notification queued in mock mode. No external service called.' },
        { command: 'hermes report "Daily Ops"', response: 'Report preview generated and event-log row prepared.' },
        { command: 'prod-health', response: 'Public route healthy, private gateway hidden, security boundary preserved.' },
      ]}
      proof={[
        { label: 'Trigger', detail: 'One command replaces scattered checks.' },
        { label: 'Response', detail: 'Output returns health, notification, and report state.' },
        { label: 'Boundary', detail: 'The demo proves workflow shape without exposing live systems.' },
      ]}
      cta={{ label: 'Scope an ops workflow', href: '/work-with-me' }}
    />
  )
}
