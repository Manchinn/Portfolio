import React from 'react'
import { useTranslation } from '../../i18n/useTranslation'

const SkillTag = ({ name, level }) => {
  const { language } = useTranslation()

  const levelColors = {
    'Advanced': 'bg-neo-pink',
    'Intermediate': 'bg-neo-blue',
    'Beginner': 'bg-neo-yellow'
  }

  const getLevelTranslation = () => {
    const translations = {
      'Advanced': { en: 'Advanced', th: 'ขั้นสูง', zh: '高级' },
      'Intermediate': { en: 'Intermediate', th: 'ขั้นกลาง', zh: '中级' },
      'Beginner': { en: 'Beginner', th: 'ผู้เริ่มต้น', zh: '初级' }
    }
    return translations[level]?.[language] || translations[level]?.en || level
  }

  return (
    <div className={`${levelColors[level] || 'bg-neo-blue'} border-2 border-black px-4 py-2 font-bold text-sm hover:shadow-neo transition-all duration-200`}>
      <span className="uppercase">{name}</span>
      <span className="ml-2 text-xs opacity-70">• {getLevelTranslation()}</span>
    </div>
  )
}

export default SkillTag
