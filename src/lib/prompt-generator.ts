import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';

export type ModelId = 'haiku-4.5' | 'gemini-flash' | 'gpt-4o-mini';

export interface ModelOption {
  id: ModelId
  label: string
  provider: string
  costPerRepo: string
}

export const MODELS: ModelOption[] = [
  { id: 'haiku-4.5', label: 'Claude Haiku 4.5', provider: 'Anthropic', costPerRepo: '~$0.004' },
  { id: 'gemini-flash', label: 'Gemini 2.0 Flash', provider: 'Google', costPerRepo: '~$0.001' },
  { id: 'gpt-4o-mini', label: 'GPT-4o Mini', provider: 'OpenAI', costPerRepo: '~$0.002' },
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

async function generateWithGemini(context: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY || '' });
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: context,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      maxOutputTokens: 2048,
    },
  });

  return (response.text ?? '').trim();
}

async function generateWithGPT4oMini(context: string): Promise<string> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
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
    case 'gemini-flash':
      return generateWithGemini(repoContext);
    case 'gpt-4o-mini':
      return generateWithGPT4oMini(repoContext);
    default:
      return generateWithHaiku(repoContext);
  }
}
