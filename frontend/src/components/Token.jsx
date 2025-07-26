import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

function Token(props) {
  // const [oper,setoper]=useState("delete");


   const {mutate:deleteToken,isLoading}=useMutation({
        mutationFn:async({tokenNumber,oper})=>{
            try{
              
                const res=await fetch(`/api/admin/delOrdeactivate`,{
                    method:'POST',
                    headers: {
                    "Content-Type": "application/json"
                    },body:JSON.stringify({tokenNumber,oper})
                });
                console.log("ccc")
                if (!res.ok){ 
                    const err=await res.json()
                    throw new Error(err.message || "Token not found");
                }
                const tok=await res.json();
                console.log(tok)
                return tok;


            }catch(error){
              //  MakeToken(null);
                throw error
            }

        },
         onError: (error) => {  // Correct error handling syntax
            setout(error.message)
    console.error('Verification error:', error); 
    setIsValid(false);
  }
      })


  const handeldelete=()=>{
    const tokenNumber=props?.data?.tokenNumber;
    const oper="delete"
      // setoper("delete")
      console.log(oper)
      deleteToken({tokenNumber,oper});
  }

  const handelDeactivate=()=>{
    const tokenNumber=props?.data?.tokenNumber;
    
      
      deleteToken({tokenNumber});

  }

  return (
    <>
    {/* {console.log(props.data)} */}
    {!props.fromAdmin && <div role="alert" className="alert alert-error mx-4 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span className=' text-sm  md:text-lg'>
          Don't Share the this Token with anyone!!!..
        </span>
      </div>}
    <div className="w-full h-auto min-h-150 bg-gray-100 flex  justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md">
        {/* Token Header */}
        <div className={`${props?.data?.isValid ? 'bg-green-600' : 'bg-red-600'} px-6 py-4`}>
        {/* <div className={`${props?.data?.isValid ? 'bg-green-600' : 'bg-red-600'}px-6 py-4`}> */}
          {/* // <div className={`${isValid ? 'bg-green-600' : 'bg-red-600'} px-6 py-4`}></div> */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">CVR CANTEEN</h2>
            <span className="text-white/90 text-sm">#{Math.floor(Math.random() * 1000)}</span>
          </div>
          
        </div>

        {/* Order Details */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
          
          <div className="space-y-3">

            {props?.data.items?.map((items)=>(
              <div key={items._id} className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Chicken Fried Rice</span>
              <span className="text-gray-600">{items.quantity} × ₹{items.price}</span>
            </div>

            ))}



            
          </div>

          {/* Total */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Subtotal</span>
              {/* <span className="text-gray-600">₹600</span> */}
              <span className="text-blue-600">₹{props?.data?.amount || 0}</span>
            </div>
            
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Thank you for your order!</p>
            <p>show token to <span className='text-2xl'>{props?.data.vendor?.name}</span> Stall</p>
          </div>
        </div>

        {/* Barcode/QR Placeholder */}
        <div className="px-6 pb-6 flex justify-center">
          <div className="h-20 w-full bg-gray-100 rounded flex items-center justify-center text-amber-800">
            {props.data.tokenNumber}
          </div>
        </div>
        <div className="flex items-center justify-center gap-8 p-6">
  {/* Delete Button */}

  {props?.fromAdmin &&<div>
  <button className="px-6 py-3 mx-5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
  onClick={handeldelete}>
    Delete
  </button>

 
  <button onClick={handelDeactivate}
  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75">
    Deactivate
  </button>
  </div>
}
</div>
      </div>
    </div>
    </>
  );
}

export default Token;