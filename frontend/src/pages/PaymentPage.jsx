import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function PaymentPage() {
  const location = useLocation();
  const { state } = location;
  const paymentAmount = location.state?.key1;

  const{data:payment,isLoading,error}=useQuery({
     queryKey: ['paymentData'],
    queryFn: async()=>{
        try{
          const res=await fetch('/api/payment/topay',{
            method:'POST',
            headers: {
          "Content-Type": "application/json"
        },body:JSON.stringify({amount:paymentAmount})
          })
          const out=await res.json();
          console.log(out);
          return out;
        }catch(error){

        }
    }

  })

  
  return (
    <div className='text-9xl'>
      This is payment page {state.key1}
    </div>
  )
}

export default PaymentPage
