import { NextRequest, NextResponse } from 'next/server';
import { parseGitHubUrl, fetchRepoContext, buildContextString } from '@/lib/github';
import { generatePrompt, MODELS } from '@/lib/prompt-generator';
import type { ModelId } from '@/lib/prompt-generator';

const validModelIds = new Set(MODELS.map(m => m.id));

export async function POST(request: NextRequest) {
  let requestedModel = 'unknown';
  try {
    const { repoUrl, model } = await request.json();
    requestedModel = model || 'haiku-4.5';
    if (!repoUrl || typeof repoUrl !== 'string') {
      return NextResponse.json({ error: 'repoUrl is required' }, { status: 400 });
    }

    const selectedModel: ModelId = validModelIds.has(model) ? model : 'haiku-4.5';

    // Check API key exists before calling
    if (selectedModel === 'qwen-turbo' && !process.env.DASHSCOPE_API_KEY) {
      return NextResponse.json({ error: 'DASHSCOPE_API_KEY not configured' }, { status: 500 });
    }
    if (selectedModel === 'groq-llama' && !process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'GROQ_API_KEY not configured' }, { status: 500 });
    }

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
    const raw = err instanceof Error ? err.message : String(err);
    const errName = err instanceof Error ? err.constructor.name : 'Unknown';
    console.error(`[generate] model=${requestedModel}`);
    console.error(`[generate] type=${errName}`);
    console.error(`[generate] msg=${raw.slice(0, 200)}`);
    const safe = raw.includes('Invalid GitHub URL') || raw.includes('not found')
      ? raw
      : `Failed to generate (${requestedModel}): ${raw.slice(0, 100)}`;
    return NextResponse.json({ error: safe }, { status: 500 });
  }
}
