import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#FFFAEB] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-block bg-[#FFADAD] border-4 border-black px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
          <h1 className="text-8xl sm:text-9xl font-black text-black leading-none">404</h1>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-black uppercase mb-4">
          Page Not Found
        </h2>

        <p className="font-mono text-lg text-gray-700 mb-10 max-w-md mx-auto border-l-4 border-black pl-4 text-left">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block bg-[#FF9642] text-black border-2 border-black px-8 py-4 font-black text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
