import React from 'react'

/**
 * Loading Spinner Component
 */
const Loading = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-12 h-12 border-4',
    large: 'w-16 h-16 border-4'
  }

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div
        className={`${sizeClasses[size]} border-black border-t-transparent rounded-full animate-spin`}
      ></div>
      {text && (
        <p className="mt-4 font-mono text-lg font-bold animate-pulse">{text}</p>
      )}
    </div>
  )
}

/**
 * Loading Skeleton Component
 */
export const LoadingSkeleton = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="border-4 border-black bg-white p-6 shadow-neo animate-pulse">
        <div className="h-48 bg-gray-200 border-2 border-black mb-4"></div>
        <div className="h-6 bg-gray-200 border-2 border-black mb-2"></div>
        <div className="h-4 bg-gray-200 border-2 border-black mb-4"></div>
        <div className="h-10 bg-gray-200 border-2 border-black"></div>
      </div>
    )
  }

  if (type === 'text') {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-gray-200 border-2 border-black rounded"></div>
        <div className="h-4 bg-gray-200 border-2 border-black rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 border-2 border-black rounded w-4/6"></div>
      </div>
    )
  }

  return (
    <div className="border-4 border-black bg-white p-8 shadow-neo animate-pulse">
      <div className="h-8 bg-gray-200 border-2 border-black mb-6 w-1/3"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 border-2 border-black"></div>
        <div className="h-4 bg-gray-200 border-2 border-black"></div>
        <div className="h-4 bg-gray-200 border-2 border-black w-5/6"></div>
      </div>
    </div>
  )
}

/**
 * Error Display Component
 */
export const ErrorDisplay = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-neo-pink border-4 border-black">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-2xl font-black mb-2 uppercase">Oops! Something went wrong</h3>
      <p className="font-mono text-gray-700 mb-6">{error || 'Unknown error occurred'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-black text-white border-2 border-black px-6 py-3 font-bold hover:bg-white hover:text-black transition-all duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export default Loading
