import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

export interface ContentRecord {
  id: string;
  created: string;
  status: string;
  threads: { text: string; hashtags: string[]; published?: boolean; post_id?: string; post_url?: string };
  blog: { title: string; meta_description: string; content: string; tags: string[]; published?: boolean; slug?: string };
}

const CONTENT_DIR = join('/tmp', 'content-pipeline');

function ensureDir() {
  if (!existsSync(CONTENT_DIR)) mkdirSync(CONTENT_DIR, { recursive: true });
}

export function saveContent(record: ContentRecord): void {
  ensureDir();
  writeFileSync(join(CONTENT_DIR, `${record.id}.json`), JSON.stringify(record, null, 2));
}

export function getContent(id: string): ContentRecord | null {
  const filePath = join(CONTENT_DIR, `${id}.json`);
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

export function listContents(): ContentRecord[] {
  ensureDir();
  const files = readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'));
  const items = files.map(f => JSON.parse(readFileSync(join(CONTENT_DIR, f), 'utf-8')) as ContentRecord);
  items.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  return items;
}
