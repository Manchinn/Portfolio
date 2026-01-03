import React from 'react'

const Card = ({ title, desc, imgUrl }) => {
  return (
    <div className="border-2 border-black bg-white p-3 sm:p-4 shadow-neo hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200">
      {/* Image */}
      <div className="mb-3 sm:mb-4 border-2 border-black h-40 sm:h-48 overflow-hidden bg-gray-200">
        <img src={imgUrl} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <h3 className="text-lg sm:text-xl font-black uppercase mb-2">{title}</h3>
      <p className="text-gray-700 font-mono text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{desc}</p>

      {/* Action button */}
      <button className="w-full border-2 border-black bg-neo-pink py-2 text-sm sm:text-base font-bold hover:bg-black hover:text-white transition-colors">
        View details &gt;
      </button>
    </div>
  )
}

export default Card