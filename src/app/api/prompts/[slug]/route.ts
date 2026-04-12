import { NextRequest, NextResponse } from 'next/server';
import { getPrompt, deletePrompt } from '@/lib/prompt-store';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const record = await getPrompt(slug);
  if (!record) {
    return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: record });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const deleted = await deletePrompt(slug);
  if (!deleted) {
    return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
