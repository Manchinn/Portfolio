import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface GeneratedContent {
  threads: { text: string; hashtags: string[] };
  blog: { title: string; meta_description: string; content: string; tags: string[] };
}

const SYSTEM_PROMPT = `คุณเป็น Thai tech content creator สำหรับ Manchinn personal brand

สร้าง content 2 formats จาก article ที่ได้รับ:
1. Threads post (กระชับ, 500 chars max, เหมาะ casual discussion)
2. Blog post (SEO-optimized, 800-1500 คำ, H2/H3 structure)

ตอบเป็น JSON format เท่านั้น ไม่มี markdown code fence:
{
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
    system: systemPrompt,
    messages: [
      { role: "user", content: articleContent },
    ],
  });

  const msg = response as Anthropic.Message;
  let result = msg.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");

  // Strip markdown code fences if present
  result = result.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();

  return JSON.parse(result);
}
