import React from 'react'

const Card = ({ title, desc, imgUrl }) => {
  return (
    <div className="border-2 border-black bg-white p-4 shadow-neo hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200">
      {/* ส่วนรูปภาพ */}
      <div className="mb-4 border-2 border-black h-48 overflow-hidden bg-gray-200">
         <img src={imgUrl} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* ส่วนเนื้อหา */}
      <h3 className="text-xl font-black uppercase mb-2">{title}</h3>
      <p className="text-gray-700 font-mono text-sm mb-4">{desc}</p>
      
      {/* ปุ่มเล็กๆ */}
      <button className="w-full border-2 border-black bg-neo-pink py-2 font-bold hover:bg-black hover:text-white transition-colors">
        ดูรายละเอียด &gt;
      </button>
    </div>
  )
}

export default Card