import React from 'react'

const Button = ({ text, color = 'bg-neo-yellow', onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
            ${color} 
            border-2 border-black 
            px-4 sm:px-6 py-2 
            font-bold text-sm sm:text-base text-black 
            shadow-neo 
            transition-all 
            hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
            active:bg-white
          `}
    >
      {text}
    </button>
  )
}

export default Button