import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { articles } from '@/data/portfolio'
import ArticleContent from './ArticleContent'

export const dynamicParams = false

export function generateStaticParams() {
  return articles.en.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = articles.en.find((item) => item.slug === slug)

  return article
    ? { title: `${article.title} | Software Engineering Portfolio`, description: article.excerpt }
    : {}
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.en.find((item) => item.slug === slug)
  if (!article) notFound()

  return <ArticleContent slug={slug} />
}
