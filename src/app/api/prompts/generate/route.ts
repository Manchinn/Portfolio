import { NextRequest, NextResponse } from 'next/server';
import { parseGitHubUrl, fetchRepoContext, buildContextString } from '@/lib/github';
import { generatePrompt, MODELS } from '@/lib/prompt-generator';
import type { ModelId } from '@/lib/prompt-generator';

const validModelIds = new Set(MODELS.map(m => m.id));

export async function POST(request: NextRequest) {
  try {
    const { repoUrl, model } = await request.json();
    if (!repoUrl || typeof repoUrl !== 'string') {
      return NextResponse.json({ error: 'repoUrl is required' }, { status: 400 });
    }

    const selectedModel: ModelId = validModelIds.has(model) ? model : 'haiku-4.5';

    const { owner, repo } = parseGitHubUrl(repoUrl);
    const repoContext = await fetchRepoContext(owner, repo);
    const contextString = buildContextString(repoContext);
    const prompt = await generatePrompt(contextString, selectedModel);

    return NextResponse.json({
      success: true,
      data: {
        prompt,
        metadata: {
          name: repoContext.metadata.name,
          owner: repoContext.metadata.owner,
          description: repoContext.metadata.description,
          stars: repoContext.metadata.stars,
          language: repoContext.metadata.language,
        },
      },
    });
  } catch (err) {
    const raw = err instanceof Error ? err.message : '';
    const safe = raw.includes('Invalid GitHub URL') || raw.includes('not found')
      ? raw
      : 'Failed to generate prompt. Please try again.';
    return NextResponse.json({ error: safe }, { status: 500 });
  }
}
