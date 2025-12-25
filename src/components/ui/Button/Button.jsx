import React from 'react'

const Button = ({ text, color = 'bg-neo-yellow', onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`neo-btn neo-press ${color} text-black ${className}`}
    >
      {text}
    </button>
  )
}

export default Button