import { articles } from '@/data/portfolio'
import ArticleContent from './ArticleContent'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return articles.en.map((article) => ({ slug: article.slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.en.find(a => a.slug === slug)
  if (!article) notFound()

  return <ArticleContent slug={slug} />
}
