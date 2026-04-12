import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You reverse-engineer GitHub repositories into concise prompts.
Given repository context, write a single conversational prompt that someone could paste into a coding agent (Claude Code, Cursor, etc.) to recreate this project from scratch.

Rules:
- One prompt, plain language, conversational tone
- Focus on architecture intent, not implementation details
- Mention key tech stack choices and why
- Keep under 500 words
- Write in English
- Do NOT wrap in markdown code fences
- Do NOT add titles or headers — just the prompt text`;

export async function generatePrompt(repoContext: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: repoContext }],
  });

  const msg = response as Anthropic.Message;
  const text = msg.content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map(block => block.text)
    .join('');

  return text.trim();
}
