import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

export type ModelId = 'haiku-4.5' | 'qwen-turbo' | 'groq-llama';

export interface ModelOption {
  id: ModelId
  label: string
  provider: string
  costPerRepo: string
}

export const MODELS: ModelOption[] = [
  { id: 'haiku-4.5', label: 'Claude Haiku 4.5', provider: 'Anthropic', costPerRepo: '~$0.004' },
  { id: 'qwen-turbo', label: 'Qwen Turbo', provider: 'Alibaba', costPerRepo: 'Free' },
  { id: 'groq-llama', label: 'Llama 3.3 70B', provider: 'Groq', costPerRepo: 'Free' },
];

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

async function generateWithHaiku(context: string): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: context }],
  });

  const msg = response as Anthropic.Message;
  return msg.content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map(block => block.text)
    .join('')
    .trim();
}

async function generateWithQwen(context: string): Promise<string> {
  const client = new OpenAI({
    apiKey: process.env.DASHSCOPE_API_KEY,
    baseURL: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
  });
  const response = await client.chat.completions.create({
    model: 'qwen-turbo',
    max_tokens: 2048,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: context },
    ],
  });

  return (response.choices[0]?.message?.content ?? '').trim();
}

async function generateWithGroq(context: string): Promise<string> {
  const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
  });
  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 2048,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: context },
    ],
  });

  return (response.choices[0]?.message?.content ?? '').trim();
}

export async function generatePrompt(repoContext: string, model: ModelId = 'haiku-4.5'): Promise<string> {
  switch (model) {
    case 'haiku-4.5':
      return generateWithHaiku(repoContext);
    case 'qwen-turbo':
      return generateWithQwen(repoContext);
    case 'groq-llama':
      return generateWithGroq(repoContext);
    default:
      return generateWithHaiku(repoContext);
  }
}
