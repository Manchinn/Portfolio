'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { articles, publicContactUrl } from '@/data/portfolio'
import type { Language } from '@/data/types'
import { getSharedChrome } from '@/content/shared'
import { useTranslation } from '@/i18n/useTranslation'

const copy = {
  en: {
    back: 'Back to articles',
    related: 'Continue reading',
    read: 'Read article',
  },
  th: {
    back: 'กลับไปบทความ',
    related: 'อ่านต่อ',
    read: 'อ่านบทความ',
  },
}

export default function ArticleContent({ slug }: { slug: string }) {
  const { language } = useTranslation()
  const lang = language as Language
  const article = articles[lang].find((item) => item.slug === slug)

  if (!article) return null

  const c = copy[lang]
  const relatedArticles = articles[lang].filter((item) => item.slug !== slug).slice(0, 2)

  return (
    <main className="min-h-dvh bg-portfolio-bg text-portfolio-ink">
      <article>
        <header className="border-b border-portfolio-line">
          <div className="mx-auto max-w-[920px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Link
              href="/#articles"
              className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-portfolio-accent-strong hover:text-portfolio-accent"
            >
              <ArrowLeft className="size-4" />
              {c.back}
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-4 text-xs font-semibold uppercase text-portfolio-muted">
              <span className="text-portfolio-accent">{article.category}</span>
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4" />
                {article.readTime}
              </span>
            </div>
            <h1 className="mt-5 max-w-[20ch] break-words text-4xl font-semibold leading-tight text-portfolio-ink sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-portfolio-muted">{article.excerpt}</p>
          </div>
        </header>

        <div className="mx-auto max-w-[920px] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="grid gap-12">
            {article.sections.map((section) => (
              <section key={section.heading} className="border-t border-portfolio-line pt-8">
                <h2 className="text-2xl font-semibold leading-tight text-portfolio-ink sm:text-3xl">{section.heading}</h2>
                <div className="mt-5 grid gap-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="max-w-3xl text-base leading-8 text-portfolio-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-6 grid gap-3 border-l-2 border-portfolio-accent pl-5 text-base leading-7 text-portfolio-ink">
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-14 border-y border-portfolio-line py-8">
            <a
              href={publicContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-[6px] bg-portfolio-accent px-5 py-3 text-sm font-semibold text-white hover:bg-portfolio-accent-strong"
            >
              {getSharedChrome(lang).contactAction}
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="border-t border-portfolio-line bg-portfolio-surface-soft">
          <div className="mx-auto max-w-[920px] px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-portfolio-ink">{c.related}</h2>
            <div className="mt-7 divide-y divide-portfolio-line border-y border-portfolio-line">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/article/${related.slug}`}
                  className="grid gap-3 py-6 hover:text-portfolio-accent-strong sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase text-portfolio-accent">{related.category}</p>
                    <h3 className="mt-2 text-xl font-semibold">{related.title}</h3>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    {c.read}
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
