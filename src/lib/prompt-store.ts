import { put, list, del, get } from '@vercel/blob';

export interface PromptRecord {
  slug: string
  repoUrl: string
  repoName: string
  repoOwner: string
  description: string | null
  stars: number
  language: string | null
  prompt: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

const PREFIX = 'prompts/';

function slugify(name: string, owner: string): string {
  return `${owner}-${name}`
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function generateSlug(repoName: string, repoOwner: string): string {
  return slugify(repoName, repoOwner);
}

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug);
}

async function readBlob(url: string): Promise<PromptRecord> {
  const response = await get(url, { access: 'private' });
  if (!response || response.statusCode !== 200) throw new Error('Blob not found');
  const text = await new Response(response.stream).text();
  return JSON.parse(text) as PromptRecord;
}

export async function savePrompt(record: PromptRecord): Promise<void> {
  if (!isValidSlug(record.slug)) throw new Error('Invalid slug');
  await put(`${PREFIX}${record.slug}.json`, JSON.stringify(record), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
}

export async function getPrompt(slug: string): Promise<PromptRecord | null> {
  if (!isValidSlug(slug)) return null;
  try {
    const { blobs } = await list({ prefix: `${PREFIX}${slug}.json` });
    const blob = blobs.find(b => b.pathname === `${PREFIX}${slug}.json`);
    if (!blob) return null;
    return await readBlob(blob.url);
  } catch {
    return null;
  }
}

export async function listPrompts(): Promise<PromptRecord[]> {
  const { blobs } = await list({ prefix: PREFIX });
  const items: PromptRecord[] = [];

  for (const blob of blobs) {
    if (!blob.pathname.endsWith('.json')) continue;
    try {
      const record = await readBlob(blob.url);
      items.push(record);
    } catch {
      // skip corrupted blobs
    }
  }

  items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return items;
}

export async function deletePrompt(slug: string): Promise<boolean> {
  if (!isValidSlug(slug)) return false;
  try {
    const { blobs } = await list({ prefix: `${PREFIX}${slug}.json` });
    const blob = blobs.find(b => b.pathname === `${PREFIX}${slug}.json`);
    if (!blob) return false;
    await del(blob.url);
    return true;
  } catch {
    return false;
  }
}
