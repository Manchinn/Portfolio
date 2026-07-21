'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from 'lucide-react'
import { articles, publicContactUrl } from '@/data/portfolio'
import type { Language } from '@/data/types'
import { getArticleChrome } from '@/content/article'
import { getSharedChrome } from '@/content/shared'
import { useTranslation } from '@/i18n/useTranslation'
import { PortfolioButton } from '@/components/portfolio/primitives'

/**
 * Article route — Long Document family under DESIGN.md soft-pixel system.
 * Hallmark · macrostructure: Long Document · design-system: DESIGN.md · designed-as-app
 * Hard frames only on inquiry CTA; related reading is an index list (not twin cards).
 */
export default function ArticleContent({ slug }: { slug: string }) {
  const { language } = useTranslation()
  const lang = language as Language
  const article = articles[lang].find((item) => item.slug === slug)

  if (!article) return null

  const c = getArticleChrome(lang)
  const shared = getSharedChrome(lang)
  const relatedArticles = articles[lang].filter((item) => item.slug !== slug).slice(0, 2)

  return (
    <main className="min-h-dvh overflow-x-clip bg-portfolio-bg text-portfolio-ink">
      <article>
        <header className="border-b-2 border-portfolio-ink/15">
          <div className="mx-auto grid max-w-[920px] gap-10 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:items-end lg:gap-12 lg:px-8 lg:py-20">
            <div className="min-w-0">
              <Link
                href="/#articles"
                className="inline-flex min-h-11 max-w-full items-center gap-2 text-sm font-semibold text-portfolio-accent-strong hover:text-portfolio-accent sm:whitespace-nowrap"
              >
                <ArrowLeft className="size-4 shrink-0" aria-hidden />
                <span className="min-w-0 text-pretty">{c.back}</span>
              </Link>
              <h1 className="mt-8 max-w-[18ch] text-balance break-words text-4xl font-semibold leading-[1.08] text-portfolio-ink sm:text-5xl">
                {article.title}
              </h1>
            </div>
            <div className="min-w-0 border-t-2 border-portfolio-ink/10 pt-6 lg:border-t-0 lg:pt-0">
              <div className="flex flex-wrap items-center gap-3 text-portfolio-muted">
                <span className="font-mono text-xs font-medium text-portfolio-accent">{article.category}</span>
                <span className="inline-flex items-center gap-2 font-mono text-xs">
                  <Clock className="size-4 shrink-0" aria-hidden />
                  {article.readTime}
                </span>
              </div>
              <p className="mt-4 max-w-xl text-base leading-7 text-portfolio-muted text-pretty sm:text-lg sm:leading-8">
                {article.excerpt}
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[720px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-12">
            {article.sections.map((section, index) => (
              <section
                key={section.heading}
                className="border-t-2 border-portfolio-ink/10 pt-8"
              >
                <div className="grid gap-3 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5">
                  <span className="font-mono text-xs font-semibold tabular-nums text-portfolio-line-strong">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
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
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 border-2 border-portfolio-ink bg-portfolio-surface px-5 py-8 shadow-portfolio-md sm:px-7">
            <PortfolioButton
              href={publicContactUrl}
              external
              icon={<ArrowUpRight className="size-4" aria-hidden />}
            >
              {shared.contactAction}
            </PortfolioButton>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-portfolio-muted text-pretty">
              {shared.contactNotice}
            </p>
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="border-t-2 border-portfolio-ink/15 bg-portfolio-surface-soft/50">
          <div className="mx-auto max-w-[920px] px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-portfolio-ink sm:text-3xl">{c.related}</h2>
            <div className="mt-8 divide-y-2 divide-portfolio-ink/10 border-y-2 border-portfolio-ink/15">
              {relatedArticles.map((related, index) => (
                <article
                  key={related.slug}
                  className="grid gap-3 py-6 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6"
                >
                  <span className="font-mono text-xs font-semibold tabular-nums text-portfolio-line-strong">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-portfolio-muted">
                      <span className="text-portfolio-accent">{related.category}</span>
                      <span className="mx-2 text-portfolio-line-strong" aria-hidden>
                        ·
                      </span>
                      {related.readTime}
                    </p>
                    <h3 className="mt-2 break-words text-xl font-semibold leading-tight text-portfolio-ink">
                      {related.title}
                    </h3>
                  </div>
                  <Link
                    href={`/article/${related.slug}`}
                    className="inline-flex min-h-11 w-fit max-w-full items-center gap-2 text-sm font-semibold text-portfolio-accent-strong hover:text-portfolio-accent sm:whitespace-nowrap"
                  >
                    <span className="min-w-0 text-pretty">{c.read}</span>
                    <ArrowRight className="size-4 shrink-0" aria-hidden />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
