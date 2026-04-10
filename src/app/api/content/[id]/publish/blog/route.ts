import { NextRequest, NextResponse } from 'next/server';
import { getContent, saveContent } from '@/lib/content-store';

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const record = getContent(id);
    if (!record) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const blog = record.blog;
    const article = {
      id: Date.now(),
      slug: blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''),
      title: blog.title,
      excerpt: blog.meta_description,
      content: blog.content,
      coverImage: `https://placehold.co/800x400/3b82f6/ffffff?text=${encodeURIComponent(blog.title.slice(0, 20))}`,
      tags: blog.tags,
      category: 'AI & Technology',
      readTime: `${Math.ceil(blog.content.split(/\s+/).length / 200)} min read`,
      date: new Date().toISOString().split('T')[0],
      featured: false,
    };

    record.blog.published = true;
    record.blog.slug = article.slug;
    saveContent(record);

    return NextResponse.json({ success: true, data: article });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
