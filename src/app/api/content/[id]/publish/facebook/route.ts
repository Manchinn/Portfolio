import { NextRequest, NextResponse } from 'next/server';
import { getContent, saveContent } from '@/lib/content-store';
import { postToFacebook } from '@/lib/social';

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const record = getContent(id);
    if (!record) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const result = await postToFacebook(record.facebook.text, record.facebook.hashtags);

    record.facebook.published = true;
    record.facebook.post_id = result.id;
    record.facebook.post_url = result.url;
    saveContent(record);

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
