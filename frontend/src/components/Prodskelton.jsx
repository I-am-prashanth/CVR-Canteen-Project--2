import React from 'react'

function Prodskelton() {
  return (
    <div className="h-45 group relative mt-2 w-72 flex-shrink-0 snap-start transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="card image-full bg-base-100 shadow-sm w-full h-full rounded-xl overflow-hidden border border-gray-100">
       <span className="w-15 loading loading-spinner text-primary mx-30 mt-15"></span>
      </div>
    </div>
  )
}

export default Prodskelton
