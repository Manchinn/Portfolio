import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from 'lucide-react'
import { useArticle } from '../hooks/usePortfolioData'
import { useTranslation } from '../i18n/useTranslation'
import * as PortfolioService from '../services/portfolioService'
import Loading, { ErrorDisplay } from '../components/ui/Loading'

const ArticlePage = () => {
  const { slug } = useParams()
  const { data: article, loading, error, refetch } = useArticle(slug)
  const { tl } = useTranslation()
  const [allArticles, setAllArticles] = useState([])

  // Fetch all articles to show related articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await PortfolioService.getArticles()
        setAllArticles(articles.filter(a => a.slug !== slug).slice(0, 3))
      } catch (err) {
        console.error('Error fetching articles:', err)
      }
    }
    fetchArticles()
  }, [slug])

  if (loading) return <Loading />
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />
  if (!article) {
    return (
      <div className="min-h-screen bg-neo-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Article Not Found</h1>
          <Link to="/" className="text-neo-coral font-bold hover:underline">
            {tl({ en: 'Go Home', th: 'กลับหน้าหลัก', zh: '返回首页' })}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neo-cream">
      {/* Header */}
      <header className="bg-black text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            to="/#articles"
            className="inline-flex items-center gap-2 text-white font-bold hover:text-neo-coral transition-colors"
          >
            <ArrowLeft size={20} />
            {tl({ en: 'Back to Articles', th: 'กลับไปบทความ', zh: '返回文章' })}
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Cover Image */}
        <div className="border-4 border-black mb-8 overflow-hidden shadow-neo-lg">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="bg-black text-white px-3 py-1 font-bold text-sm uppercase">
            {article.category}
          </span>
          <div className="flex items-center gap-1 text-gray-600 font-mono text-sm">
            <Calendar size={16} />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 font-mono text-sm">
            <Clock size={16} />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black uppercase mb-6 text-black">
          {article.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags?.map((tag, idx) => (
            <span key={idx} className="bg-neo-lemon px-3 py-1 text-sm font-bold border-2 border-black">
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {article.content?.split('\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={idx} className="text-2xl font-black mt-8 mb-4 uppercase">{paragraph.replace('## ', '')}</h2>
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={idx} className="text-xl font-bold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>
            }
            if (paragraph.startsWith('- ')) {
              return <li key={idx} className="ml-4 mb-2">{paragraph.replace('- ', '')}</li>
            }
            if (paragraph.startsWith('```')) {
              return null
            }
            if (paragraph.trim()) {
              return <p key={idx} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>
            }
            return null
          })}
        </div>

        {/* Back to Articles */}
        <div className="mt-12 pt-8 border-t-4 border-black">
          <Link
            to="/#articles"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-bold border-2 border-black hover:bg-white hover:text-black transition-colors shadow-neo"
          >
            {tl({ en: 'Back to Articles', th: 'กลับไปบทความ', zh: '返回文章' })}
            <ArrowRight size={20} />
          </Link>
        </div>
      </article>

      {/* Related Articles */}
      {allArticles.length > 0 && (
        <section className="bg-white border-t-4 border-black py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-black uppercase mb-8">
              {tl({ en: 'Related Articles', th: 'บทความที่เกี่ยวข้อง', zh: '相关文章' })}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/article/${relatedArticle.slug}`}
                  className="border-4 border-black bg-white shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all block"
                >
                  <div className="h-32 overflow-hidden border-b-4 border-black">
                    <img
                      src={relatedArticle.coverImage}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-black text-sm uppercase line-clamp-2">{relatedArticle.title}</h3>
                    <p className="text-xs text-gray-500 mt-2">{relatedArticle.readTime}</p>
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

export default ArticlePage
