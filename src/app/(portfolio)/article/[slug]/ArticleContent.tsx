'use client'

import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react'
import { articles } from '@/data/portfolio'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/data/types'

interface ArticleContentProps {
  slug: string
}

export default function ArticleContent({ slug }: ArticleContentProps) {
  const { tl, language } = useTranslation()
  const langArticles = articles[language as Language]
  const article = langArticles.find(a => a.slug === slug)
  const allArticles = langArticles.filter(a => a.slug !== slug).slice(0, 3)

  if (!article) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center text-saas-ink">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4 text-white">Article Not Found</h1>
          <Link href="/" className="text-saas-muted font-bold hover:text-white hover:underline">
            {tl({ en: 'Go Home', th: 'กลับหน้าหลัก' })}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent text-saas-ink">
      {/* Header */}
      <header className="border-b border-saas-line bg-saas-surface-soft py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/#articles"
            className="inline-flex items-center gap-2 text-saas-muted font-bold hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            {tl({ en: 'Back to Articles', th: 'กลับไปบทความ' })}
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Cover Image */}
        <div className="border border-saas-line mb-8 overflow-hidden rounded-[20px] shadow-saas-md">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="bg-saas-surface-soft text-saas-ink border border-saas-line px-3 py-1 font-bold text-sm uppercase rounded-full">
            {article.category}
          </span>
          <div className="flex items-center gap-1 text-saas-muted font-mono text-sm">
            <Calendar size={16} />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1 text-saas-muted font-mono text-sm">
            <Clock size={16} />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">
          {article.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags?.map((tag, idx) => (
            <span key={idx} className="bg-saas-surface-soft text-saas-muted px-3 py-1 text-sm font-bold border border-saas-line rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {article.content?.split('\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={idx} className="text-2xl font-bold mt-8 mb-4 text-white">{paragraph.replace('## ', '')}</h2>
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={idx} className="text-xl font-bold mt-6 mb-3 text-white">{paragraph.replace('### ', '')}</h3>
            }
            if (paragraph.startsWith('- ')) {
              return <li key={idx} className="ml-4 mb-2 text-saas-muted">{paragraph.replace('- ', '')}</li>
            }
            if (paragraph.startsWith('```')) {
              return null
            }
            if (paragraph.trim()) {
              return <p key={idx} className="mb-4 text-saas-muted leading-relaxed">{paragraph}</p>
            }
            return null
          })}
        </div>

        {/* Back to Articles */}
        <div className="mt-12 pt-8 border-t border-saas-line">
          <Link
            href="/#articles"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-black shadow-saas-sm transition hover:bg-neutral-200"
          >
            {tl({ en: 'Back to Articles', th: 'กลับไปบทความ' })}
            <ArrowRight size={20} />
          </Link>
        </div>
      </article>

      {/* Related Articles */}
      {allArticles.length > 0 && (
        <section className="bg-saas-surface-soft border-t border-saas-line py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-white">
              {tl({ en: 'Related Articles', th: 'บทความที่เกี่ยวข้อง' })}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/article/${relatedArticle.slug}`}
                  className="border border-saas-line bg-saas-surface rounded-[20px] shadow-saas-sm hover:-translate-y-0.5 transition-all block overflow-hidden"
                >
                  <div className="h-32 overflow-hidden border-b border-saas-line">
                    <img
                      src={relatedArticle.coverImage}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-white line-clamp-2">{relatedArticle.title}</h3>
                    <p className="text-xs text-saas-muted mt-2">{relatedArticle.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
