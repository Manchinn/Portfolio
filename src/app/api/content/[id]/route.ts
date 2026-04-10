import { NextRequest, NextResponse } from 'next/server';
import { getContent } from '@/lib/content-store';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = getContent(id);
  if (!record) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: record });
}
