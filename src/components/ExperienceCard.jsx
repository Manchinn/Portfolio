import React from 'react'

const ExperienceCard = ({ year, position, company, description, achievements }) => {
  return (
    <div className="border-4 border-black bg-white p-6 shadow-neo mb-6 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200">
      {/* Header */}
      <div className="mb-4 border-b-4 border-black pb-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-black uppercase text-neo-pink">{position}</h3>
          <span className="bg-neo-yellow border-2 border-black px-3 py-1 font-bold text-sm">{year}</span>
        </div>
        <p className="text-lg font-bold text-neo-blue italic">{company}</p>
      </div>

      {/* Description */}
      <p className="font-mono text-gray-700 mb-4">{description}</p>

      {/* Achievements */}
      {achievements && achievements.length > 0 && (
        <div>
          <h4 className="font-black text-sm uppercase mb-3">ผลสำเร็จ:</h4>
          <ul className="space-y-2">
            {achievements.map((achievement, idx) => (
              <li key={idx} className="flex gap-3 font-mono text-sm">
                <span className="font-black text-neo-pink">▶</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ExperienceCard
