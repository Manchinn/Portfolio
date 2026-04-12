import { NextRequest, NextResponse } from 'next/server';
import { listPrompts, savePrompt, generateSlug } from '@/lib/prompt-store';
import type { PromptRecord } from '@/lib/prompt-store';

export async function GET() {
  const items = await listPrompts();
  return NextResponse.json({ success: true, data: items });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { repoUrl, repoName, repoOwner, description, stars, language, prompt, tags } = body;

    if (!prompt || !repoName || !repoOwner) {
      return NextResponse.json({ error: 'prompt, repoName, and repoOwner are required' }, { status: 400 });
    }

    const slug = generateSlug(repoName, repoOwner);
    const now = new Date().toISOString();

    const record: PromptRecord = {
      slug,
      repoUrl: repoUrl || `https://github.com/${repoOwner}/${repoName}`,
      repoName,
      repoOwner,
      description: description || null,
      stars: stars || 0,
      language: language || null,
      prompt,
      tags: tags || [],
      createdAt: now,
      updatedAt: now,
    };

    await savePrompt(record);
    return NextResponse.json({ success: true, data: record });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
