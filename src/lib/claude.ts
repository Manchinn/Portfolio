import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface GeneratedContent {
  facebook: { text: string; hashtags: string[] };
  threads: { text: string; hashtags: string[] };
  blog: { title: string; meta_description: string; content: string; tags: string[] };
}

const SYSTEM_PROMPT = `คุณเป็น Thai tech content creator สำหรับ Manchinn personal brand

สร้าง content 3 formats จาก article ที่ได้รับ:
1. Facebook post (hook + body + CTA + hashtags)
2. Threads post (กระชับ, 500 chars max, เหมาะ casual discussion)
3. Blog post (SEO-optimized, 800-1500 คำ, H2/H3 structure)

ตอบเป็น JSON format เท่านั้น ไม่มี markdown code fence:
{
  "facebook": { "text": "...", "hashtags": [...] },
  "threads": { "text": "...", "hashtags": [...] },
  "blog": { "title": "...", "meta_description": "...", "content": "...", "tags": [...] }
}`;

export async function generateContent(articleContent: string, styleGuide: string = ''): Promise<GeneratedContent> {
  const systemPrompt = styleGuide
    ? `${SYSTEM_PROMPT}\n\nStyle guide:\n${styleGuide}`
    : SYSTEM_PROMPT;

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
    tools: [
      {
        type: "advisor_20260301" as const,
        name: "advisor",
        model: "claude-opus-4-6",
        max_uses: 1,
      } as Anthropic.Tool,
    ],
    messages: [
      { role: "user", content: articleContent },
    ],
    betas: ["advisor-tool-2026-03-01", "prompt-caching-2024-07-31"],
  } as Anthropic.MessageCreateParams);

  const result = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");

  return JSON.parse(result);
}
