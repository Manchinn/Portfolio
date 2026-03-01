import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'
import { useTranslation } from '../../i18n/useTranslation'
import { useArticles } from '../../hooks/usePortfolioData'
import Loading, { ErrorDisplay } from '../../components/ui/Loading'

const Articles = () => {
  const { data: articles, loading, error, refetch } = useArticles()
  const { tl } = useTranslation()

  if (loading) return <Loading />
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />
  if (!articles || !Array.isArray(articles)) return null

  // Show only first 4 articles
  const displayedArticles = articles.slice(0, 4)

  return (
    <section id="articles" className="py-20 border-t-4 border-black bg-[#FFFAEB] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xl font-black text-[#FF6B6B] mb-2 uppercase tracking-widest">
            {tl({ en: 'Blog', th: 'บทความ', zh: '博客' })}
          </h2>
          <p className="text-5xl md:text-6xl font-black uppercase text-black">
            {tl({ en: 'Latest Articles', th: 'บทความล่าสุด', zh: '最新文章' })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200 flex flex-col h-full"
            >
              {/* Cover Image */}
              <div className="h-48 overflow-hidden border-b-4 border-black">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Category & Date */}
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">
                    {article.category}
                  </span>
                  <span className="text-xs font-mono text-gray-500">{article.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black uppercase mb-2 line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags?.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="bg-[#FDFFB6] px-2 py-1 text-xs font-bold border border-black">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read Time */}
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                  <Clock size={14} />
                  <span>{article.readTime}</span>
                </div>

                {/* Read More */}
                <Link
                  to={`/article/${article.slug}`}
                  className="inline-flex items-center gap-2 text-black font-bold hover:text-[#FF6B6B] transition-colors"
                >
                  {tl({ en: 'Read More', th: 'อ่านเพิ่มเติม', zh: '阅读更多' })}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <a
            href="#articles"
            className="inline-block bg-black text-white border-4 border-black px-8 py-4 font-black text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            {tl({ en: 'View All Articles', th: 'ดูบทความทั้งหมด', zh: '查看所有文章' })}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Articles
