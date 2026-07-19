'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from 'lucide-react'
import { articles, publicContactUrl } from '@/data/portfolio'
import type { Language } from '@/data/types'
import { getArticleChrome } from '@/content/article'
import { getSharedChrome } from '@/content/shared'
import { useTranslation } from '@/i18n/useTranslation'
import { PortfolioButton } from '@/components/portfolio/primitives'

export default function ArticleContent({ slug }: { slug: string }) {
  const { language } = useTranslation()
  const lang = language as Language
  const article = articles[lang].find((item) => item.slug === slug)

  if (!article) return null

  const c = getArticleChrome(lang)
  const shared = getSharedChrome(lang)
  const relatedArticles = articles[lang].filter((item) => item.slug !== slug).slice(0, 2)

  return (
    <main className="min-h-dvh bg-portfolio-bg text-portfolio-ink">
      <article>
        <header className="border-b-2 border-portfolio-ink/15">
          <div className="mx-auto max-w-[920px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Link
              href="/#articles"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-portfolio-accent-strong hover:text-portfolio-accent"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {c.back}
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-4 text-portfolio-muted">
              <span className="font-[family-name:var(--font-pixel)] text-[10px] font-normal uppercase tracking-wide text-portfolio-accent">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-xs">
                <Clock className="size-4" aria-hidden />
                {article.readTime}
              </span>
            </div>
            <h1 className="mt-5 max-w-[20ch] text-balance break-words text-4xl font-semibold leading-tight text-portfolio-ink sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-portfolio-muted text-pretty">{article.excerpt}</p>
          </div>
        </header>

        <div className="mx-auto max-w-[920px] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="grid gap-12">
            {article.sections.map((section) => (
              <section key={section.heading} className="border-t-2 border-portfolio-ink/10 pt-8">
                <h2 className="text-2xl font-semibold leading-tight text-portfolio-ink sm:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-5 grid gap-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="max-w-3xl text-base leading-8 text-portfolio-muted text-pretty"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-6 grid gap-3 border-l-2 border-portfolio-accent pl-5 text-base leading-7 text-portfolio-ink">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="text-pretty">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-portfolio-md border-2 border-portfolio-ink bg-portfolio-surface px-5 py-8 shadow-portfolio-sm sm:px-7">
            <PortfolioButton
              href={publicContactUrl}
              external
              icon={<ArrowUpRight className="size-4" aria-hidden />}
            >
              {shared.contactAction}
            </PortfolioButton>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-portfolio-muted">{shared.contactNotice}</p>
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="border-t-2 border-portfolio-ink/15 bg-portfolio-surface-soft">
          <div className="mx-auto max-w-[920px] px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-pixel)] text-[10px] font-normal uppercase tracking-wide text-portfolio-accent sm:text-[11px]">
              {c.related}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/article/${related.slug}`}
                  className="group flex min-h-full flex-col rounded-portfolio-md border-2 border-portfolio-ink/15 bg-portfolio-surface p-5 shadow-portfolio-sm transition-[border-color,box-shadow,transform] duration-150 hover:border-portfolio-ink hover:shadow-portfolio-md active:translate-x-px active:translate-y-px active:shadow-none"
                >
                  <p className="font-[family-name:var(--font-pixel)] text-[10px] font-normal uppercase tracking-wide text-portfolio-accent">
                    {related.category}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-tight text-portfolio-ink group-hover:text-portfolio-accent-strong">
                    {related.title}
                  </h3>
                  <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-portfolio-accent-strong">
                    {c.read}
                    <ArrowRight className="size-4" aria-hidden />
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
