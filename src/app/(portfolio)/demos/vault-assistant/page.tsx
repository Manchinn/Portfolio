import DemoDetailShell from '@/components/demos/DemoDetailShell'

export default function VaultAssistantDemoPage() {
  return (
    <DemoDetailShell
      eyebrow="Read-only knowledge assistant"
      title="Obsidian Vault Knowledge Assistant"
      description="A public-safe RAG-style demo that answers from a small sanitized sample set instead of exposing a private local vault. The page shows retrieval behavior, assistant style, and safety boundaries."
      accent="violet"
      icon="vault"
      status="Sanitized sample context"
      safetyNote="The assistant panel uses prepared sample answers only. No raw vault content, local paths, private notes, or live Hermes connection is exposed."
      metrics={[
        { label: 'Sample notes', value: '4', note: 'sanitized' },
        { label: 'Vault access', value: '0', note: 'read-only demo' },
        { label: 'Mode', value: 'RAG', note: 'pattern proof' },
      ]}
      workflow={[
        { label: 'Sanitize', detail: 'Export only safe notes and remove private local vault content.' },
        { label: 'Retrieve', detail: 'Match a question against trusted sample context and known operating style.' },
        { label: 'Answer', detail: 'Return a concise assistant response with clear next action framing.' },
      ]}
      safeguards={[
        'No private Obsidian notes',
        'No local vault path exposure',
        'No live assistant endpoint',
        'No hidden personal data in the browser',
      ]}
      assistantQuestions={[
        {
          question: 'What should I focus on next?',
          answer: 'Focus on demo-quality proof: safe prototypes, case studies, monitoring screenshots, and clear before/after workflows for internal tools.',
        },
        {
          question: 'Summarize my assistant style.',
          answer: 'Use a concise, checklist-first assistant style. Give prioritized next actions, stay operational, and warn before risky production changes.',
        },
        {
          question: 'How should I position the portfolio?',
          answer: 'Position the portfolio around real AI automation systems: Hermes LINE AI Assistant, Codex DevOps Companion, Obsidian Vault Knowledge Assistant, and CS Logbook.',
        },
      ]}
      proof={[
        { label: 'Context', detail: 'Answers come from sample notes instead of raw vault access.' },
        { label: 'Style', detail: 'The response format mirrors the desired executive-assistant behavior.' },
        { label: 'Boundary', detail: 'Private knowledge stays local while the demo shows the retrieval pattern.' },
      ]}
      cta={{ label: 'Plan knowledge workflow', href: '/work-with-me' }}
    />
  )
}
