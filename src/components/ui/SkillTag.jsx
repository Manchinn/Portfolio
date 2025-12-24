import React from 'react'

const SkillTag = ({ name, level }) => {
  const levelColors = {
    'Advanced': 'bg-neo-pink',
    'Intermediate': 'bg-neo-blue',
    'Beginner': 'bg-neo-yellow'
  }

  return (
    <div className={`${levelColors[level] || 'bg-neo-blue'} border-2 border-black px-4 py-2 font-bold text-sm hover:shadow-neo transition-all duration-200`}>
      <span className="uppercase">{name}</span>
      <span className="ml-2 text-xs opacity-70">• {level}</span>
    </div>
  )
}

export default SkillTag
