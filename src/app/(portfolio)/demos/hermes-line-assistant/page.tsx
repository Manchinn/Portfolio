import DemoDetailShell from '@/components/demos/DemoDetailShell'

export default function HermesLineAssistantDemoPage() {
  return (
    <DemoDetailShell
      eyebrow="Messaging assistant operations"
      title="Hermes LINE AI Assistant"
      description="A sanitized operator console for a LINE-connected assistant: message flow, controlled routing, private gateway boundaries, and reporting behavior without exposing production configuration."
      accent="emerald"
      icon="message"
      status="Production-shaped, credential-free"
      safetyNote="This demo explains the workflow shape only. It does not call live endpoints, expose tokens, reveal private route behavior, or show real conversation data."
      metrics={[
        { label: 'Entry point', value: 'LINE', note: 'messaging surface' },
        { label: 'Private data', value: '0', note: 'browser-safe' },
        { label: 'Mode', value: 'Mock', note: 'static proof' },
      ]}
      workflow={[
        { label: 'Receive', detail: 'A user asks for a status summary through a messaging channel.' },
        { label: 'Route', detail: 'A controlled edge passes only intended traffic into the assistant workflow.' },
        { label: 'Respond', detail: 'The assistant returns a concise operational answer and can prepare a report.' },
      ]}
      safeguards={[
        'No production endpoint URLs in the browser',
        'No credentials, tokens, or private IDs',
        'No raw user conversations',
        'No public explanation of hardening internals',
      ]}
      consoleLines={[
        { command: 'line event received', response: 'Message classified as status request. Public-safe routing preview only.' },
        { command: 'hermes summarize health', response: 'Gateway healthy. Assistant available. Report can be generated.' },
        { command: 'operator approve report', response: 'Short LINE-ready summary prepared and event state logged.' },
      ]}
      proof={[
        { label: 'Before', detail: 'Status checks and summaries were scattered across manual commands.' },
        { label: 'After', detail: 'A single assistant flow can answer, summarize, and preserve an event trail.' },
        { label: 'Boundary', detail: 'The public page shows the system thinking while hiding implementation details.' },
      ]}
      cta={{ label: 'Discuss assistant workflow', href: '/work-with-me' }}
    />
  )
}
