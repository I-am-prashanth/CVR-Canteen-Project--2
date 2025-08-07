import React from 'react'
import useCartStore from '../store/CartStore';
import { useEffect } from 'react';
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import Token from"./Token.jsx"
import useTokens from '../store/Tokenstore.jsx';
import { Product } from '../../../backend/models/product.model.js';
function Checkout(props) {

  
  const tokens=useTokens(state=>state.tokens)
  //  console.log(props.item[1])
  // console.log(props.item)
   const {mutate:Payment,isLoading}=useMutation({
          mutationFn:async({amt})=>{
            console.log("entered")
              try{
                const compactItems = props.item.map(({ _id, quantity }) => ({ product:_id, quantity }));
                const itemsString = JSON.stringify(compactItems);
                console.log(itemsString)
                // console.log("items",props.item)
                  const res=await fetch(`/api/payment/topay`,{
                      method:'POST',
                      headers: {
                      "Content-Type": "application/json"
                      },body:JSON.stringify({amount:amt})
                  });
                  const getkey=await fetch("api/payment/getKey",{
                      method:'GET',
                      headers: {
                      "Content-Type": "application/json"
                      }}
                  );
                  const key=await getkey.json();
                  console.log("key: ",key)
                   if (!res.ok){ 
                      const err=await res.json()
                      throw new Error(err.message || "Token not found");
                  }
                  const tok=await res.json();
                  console.log(tok)

                  const options = {
        key:"rzp_test_eyQXJrGQIQ01Eq", // Replace with your Razorpay key_id
        amount: amt, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'prashanth',
        description: 'Test Transaction',
        order_id:tok.order.id , // This is the order_id created in the backend

        callback_url: 'api/payment/verify', // Your success URL
        notes:{
          vendor:props.item[0].vendor|| "hi",
          items:itemsString || '[]',
          amount:amt,
        },
        prefill: {
          name: 'prashanth Kumar',
          email: 'prashanthpathigari@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open()
      rzp.on('payment.failed', function(response) {
        console.error('Payment failed:', response.error);
        // Handle failed payment (show error message to user)
      });         
                 
                  return tok;
  
  
              }catch(error){
                  throw error
              }
  
          },
           onError: (error) => { 
      console.error('Verification error:', error); 
    }
        })
    const payNow=()=>{
      Payment({amt});
    }



  let [amt,setamt]=useState(0);
  useEffect(()=>{
    if (props.item) {
    const total =props.item.reduce((sum, element) => sum + element.price*element.quantity, 0);
    setamt(total);
  } 
  },[props.item])


  // if(props.item && props.item[0]?.pay){
  // return (
  // <>
  // {/* { console.log(props.item)} */}
  //  <Token data={props.item}  fromAdmin={false}/>
  //  </> 
    
    
  // )}
  
    return(
      <div>
      <div className="card w-96 bg-base-100 mb-10 shadow-sm mx-4 md:mx-130">
        {/* {console.log(props.item)} */}
  <div className="card-body">
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold">{props.item[0].vendorName}</h2>
      <span className="text-xl">{amt}</span>
    </div>
    <ul className="mt-6 flex flex-col gap-2 ">
      { props.item?.map((i)=>{
        return(
        <li key={i.name}>
      
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>{i.name}: </span>  <span>{i.quantity} X {i.price}$</span>  <span> = {i.quantity*i.price}</span> 
      </li>
      )})}
     
      
    </ul>
    <div className="mt-6">
      <button className="btn btn-primary btn-block" onClick={payNow} >PAYNOW:<span className='text-accent'>{ amt}</span> </button>
    </div>
  </div>
</div>
{/* {console.log("tokens",tokens)} */}

</div>


    )
  
}

export default Checkout
