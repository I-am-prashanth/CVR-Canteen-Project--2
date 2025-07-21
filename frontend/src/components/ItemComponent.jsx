import React from 'react'
import useCartStore from '../store/CartStore'

function ItemComponent() {
  const addItem=useCartStore(state=>state.addItem);

  const handelClick=()=>{ 
    addItem({
    name:"Chicken fried rice",
    price:200
  })}
  return (
    <>
     <div className="card image-full bg-base-100 shadow-sm w-72 flex-shrink-0 snap-start md:w-full mt-2">
  <figure className="h-48 overflow-hidden">
    <img 
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" 
      alt="Chicken Fried Rice" 
      className="w-full h-full object-cover"
    />
  </figure>
  <div className="card-body p-4 text-cyan-400">
    <p className="card-title text-lgdrop-shadow-md ">Chicken Fried Rice</p>
    <div className="flex items-center gap-2 mt-2">
  <p className=" text-gray-100 mr-0 text-2xl">Price:</p>
  <p className="font-medium line-through text-orange-400 text-lg">$80</p>
  <p className="font-bold text-emerald-500 text-lg">$70</p>
  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
    SAVE $10
  </span>
</div>
    <div className="card-actions justify-end mt-4">
      <button className="btn btn-primary w-auto mt-4 py-3 text-lg font-medium hover:bg-emerald-600 transition-all"
        onClick={handelClick} >
      ADD TO CART
    </button>
    </div>
  </div>
</div>
</>
  )
}

export default ItemComponent
