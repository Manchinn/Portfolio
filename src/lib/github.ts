interface RepoMetadata {
  name: string
  owner: string
  description: string | null
  stars: number
  language: string | null
  defaultBranch: string
}

interface RepoContext {
  metadata: RepoMetadata
  readme: string
  tree: string[]
  dependencies: Record<string, string> | null
}

export function parseGitHubUrl(url: string): { owner: string; repo: string } {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) throw new Error('Invalid GitHub URL');
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

async function ghFetch(path: string): Promise<Response> {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'chinnakrit-prompts-library',
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return fetch(`https://api.github.com${path}`, { headers });
}

export async function fetchRepoContext(owner: string, repo: string): Promise<RepoContext> {
  const [metaRes, readmeRes, treeRes] = await Promise.all([
    ghFetch(`/repos/${owner}/${repo}`),
    ghFetch(`/repos/${owner}/${repo}/readme`),
    ghFetch(`/repos/${owner}/${repo}/git/trees/HEAD`),
  ]);

  if (!metaRes.ok) throw new Error(`Repository not found: ${owner}/${repo}`);

  const meta = await metaRes.json();
  const metadata: RepoMetadata = {
    name: meta.name,
    owner: meta.owner.login,
    description: meta.description,
    stars: meta.stargazers_count,
    language: meta.language,
    defaultBranch: meta.default_branch,
  };

  // README (base64 decode)
  let readme = '';
  if (readmeRes.ok) {
    const readmeData = await readmeRes.json();
    readme = Buffer.from(readmeData.content, 'base64').toString('utf-8');
    if (readme.length > 3000) readme = readme.slice(0, 3000) + '\n\n[truncated]';
  }

  // File tree
  let tree: string[] = [];
  if (treeRes.ok) {
    const treeData = await treeRes.json();
    tree = (treeData.tree as Array<{ path: string; type: string }>)
      .map(item => `${item.type === 'tree' ? '📁' : '📄'} ${item.path}`);
  }

  // Try fetching package.json for dependencies
  let dependencies: Record<string, string> | null = null;
  try {
    const pkgRes = await ghFetch(`/repos/${owner}/${repo}/contents/package.json`);
    if (pkgRes.ok) {
      const pkgData = await pkgRes.json();
      const pkg = JSON.parse(Buffer.from(pkgData.content, 'base64').toString('utf-8'));
      dependencies = { ...pkg.dependencies, ...pkg.devDependencies };
    }
  } catch {
    // no package.json — skip
  }

  return { metadata, readme, tree, dependencies };
}

export function buildContextString(ctx: RepoContext): string {
  let context = `Repository: ${ctx.metadata.name}
Description: ${ctx.metadata.description || 'N/A'}
Stars: ${ctx.metadata.stars} | Language: ${ctx.metadata.language || 'Unknown'}

File Structure:
${ctx.tree.join('\n')}

README:
${ctx.readme}`;

  if (ctx.dependencies) {
    const deps = Object.entries(ctx.dependencies)
      .map(([name, version]) => `  ${name}: ${version}`)
      .join('\n');
    context += `\n\nDependencies:\n${deps}`;
  }

  return context;
}
