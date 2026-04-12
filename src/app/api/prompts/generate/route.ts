import { NextRequest, NextResponse } from 'next/server';
import { parseGitHubUrl, fetchRepoContext, buildContextString } from '@/lib/github';
import { generatePrompt } from '@/lib/prompt-generator';

export async function POST(request: NextRequest) {
  try {
    const { repoUrl } = await request.json();
    if (!repoUrl || typeof repoUrl !== 'string') {
      return NextResponse.json({ error: 'repoUrl is required' }, { status: 400 });
    }

    const { owner, repo } = parseGitHubUrl(repoUrl);
    const repoContext = await fetchRepoContext(owner, repo);
    const contextString = buildContextString(repoContext);
    const prompt = await generatePrompt(contextString);

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
