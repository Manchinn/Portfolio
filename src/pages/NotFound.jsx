import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/useTranslation'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-neo-cream flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-block bg-neo-red-light border-4 border-black px-8 py-4 shadow-neo-lg mb-8">
          <h1 className="text-8xl sm:text-9xl font-black text-black leading-none">404</h1>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-black uppercase mb-4">
          {t('notFound.title')}
        </h2>

        <p className="font-mono text-lg text-gray-700 mb-10 max-w-md mx-auto border-l-4 border-black pl-4 text-left">
          {t('notFound.description')}
        </p>

        <Link
          to="/"
          className="inline-block bg-neo-orange text-black border-2 border-black px-8 py-4 font-black text-lg shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo transition-all uppercase"
        >
          {t('notFound.backToHome')}
        </Link>
      </div>
    </div>
  )
}

export default NotFound
