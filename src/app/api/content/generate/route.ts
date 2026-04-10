import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/claude';
import { saveContent } from '@/lib/content-store';

export async function POST(request: NextRequest) {
  try {
    const { article, styleGuide } = await request.json();
    if (!article) return NextResponse.json({ error: 'article is required' }, { status: 400 });

    const content = await generateContent(article, styleGuide || '');

    const id = `content-${Date.now()}`;
    const record = { id, created: new Date().toISOString(), status: 'draft', ...content };
    saveContent(record);

    return NextResponse.json({ success: true, data: record });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
