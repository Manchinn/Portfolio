import { NextResponse } from 'next/server';
import { listContents } from '@/lib/content-store';

export async function GET() {
  const items = listContents();
  return NextResponse.json({ success: true, data: items });
}
