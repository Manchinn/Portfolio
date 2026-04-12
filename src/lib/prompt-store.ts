import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from 'fs';
import { join, resolve } from 'path';

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

const PROMPTS_DIR = join('/tmp', 'prompts-library');

function ensureDir(): void {
  if (!existsSync(PROMPTS_DIR)) mkdirSync(PROMPTS_DIR, { recursive: true });
}

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

function safePath(slug: string): string | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const resolved = resolve(join(PROMPTS_DIR, `${slug}.json`));
  if (!resolved.startsWith(resolve(PROMPTS_DIR) + '/') && !resolved.startsWith(resolve(PROMPTS_DIR) + '\\')) return null;
  return resolved;
}

export function savePrompt(record: PromptRecord): void {
  ensureDir();
  const filePath = safePath(record.slug);
  if (!filePath) throw new Error('Invalid slug');
  writeFileSync(filePath, JSON.stringify(record, null, 2));
}

export function getPrompt(slug: string): PromptRecord | null {
  const filePath = safePath(slug);
  if (!filePath || !existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

export function listPrompts(): PromptRecord[] {
  ensureDir();
  const files = readdirSync(PROMPTS_DIR).filter(f => f.endsWith('.json'));
  const items = files.map(f => JSON.parse(readFileSync(join(PROMPTS_DIR, f), 'utf-8')) as PromptRecord);
  items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return items;
}

export function deletePrompt(slug: string): boolean {
  const filePath = safePath(slug);
  if (!filePath || !existsSync(filePath)) return false;
  unlinkSync(filePath);
  return true;
}
