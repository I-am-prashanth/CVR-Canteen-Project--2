import React, { useState } from 'react';
import useCartStore from '../../store/CartStore';
import { useMutation } from '@tanstack/react-query';

function ItemComponent(props) {
  // const addItem = useCartStore(state => state.addItem);
  const [update, setUpdate] = useState("notUpdate");
  const {mutate:deleteProd}=useMutation({
    mutationFn:async(id)=>{
      try{
        console.log(id)
        const res=await fetch(`api/admin/deletepost/${id}`,{
          method:'DELETE',
          headers: {
          "Content-Type": "application/json"
        },
        })
        const responce=await res.json();
        console.log(responce)
        return res;

      }catch(err){
        throw err.message;
        // return err.message;
      }
    },
    
  })

  const handleClick = () => {
    addItem({
      name: "Chicken fried rice",
      price: 200
    });
  };

  const handleUpdate = () => {
    // Update logic here
  };
  const deletePost=()=>{
    console.log("product id is",props?.product?._id)
    deleteProd(props?.product?._id )

  }

  return (
    <div className="group relative mt-2 w-72 flex-shrink-0 snap-start transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="card image-full bg-base-100 shadow-sm w-full h-full rounded-xl overflow-hidden border border-gray-100">
        {/* {console.log(props.product)} */}
        {/* Simple Add Image Button */}
        <button 
          className="absolute top-2 right-2 z-20 bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded-md flex items-center gap-1 transition-colors"
          onClick={handleClick}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
          Change Image
        </button>

        <figure className="h-48 overflow-hidden relative">
          <img 
            src={props?.product?.img || ""}
            alt={props?.product?.name || "Menu item"} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </figure>
        
        <div className="card-body justify-end p-4 z-10">
          <div className="space-y-2">
            <h3 className="card-title text-white text-xl font-bold drop-shadow-md">
              {props?.product?.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">₹{props?.product?.price}</span>
              
              {props?.fomAdmin && (
                <div className="flex gap-2">
                  {/* <button 
                    className="btn btn-sm btn-info rounded-full px-4 hover:scale-105 transition-transform" 
                    onClick={handleUpdate}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Update
                  </button> */}

                  <button className="btn btn-sm btn-error rounded-full px-4 hover:scale-105 transition-transform"
                    onClick={deletePost}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemComponent;