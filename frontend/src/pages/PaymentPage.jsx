import React, { useEffect, useState } from 'react'
import useCartStore from '../store/tempstore';
import Checkout from '../components/Checkout';
import { useSearchParams } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import useTokens from '../store/Tokenstore';
import Token from '../components/Token';
// import useCartStore from '../store/CartStore';

function PaymentPage() {
  const props = useCartStore(state => state.items);
  const addToken=useTokens(state=>state.addToken);
  const tokens=useTokens(state=>state.tokens);
  const paid = useCartStore(state => state.paymentPaid);
  const [searchParams] = useSearchParams();
  const [ref,setref]=useState("referance")

  let reference = searchParams.get(ref); // <-- typo as in URL

  const {mutate:getToken}=useMutation({
    mutationFn:async({reference})=>{
      try{
        const res = await fetch('/api/payment/gettoken', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ tokenNumber:reference })
      });
      if(!res.ok){
        const err=await res.json();
        console.log(err)
        throw err
      }
      const token=await res.json();
      return token

      }catch(err){
        console.error(err);
        throw err;
      }
    },
    onSuccess:(token)=>{
      // console.log(token)
      
      addToken(token);
    }
      
    }
  )

    
useEffect(()=>{
  if(reference){
    paid(reference)
    getToken({reference});
  }
},[reference])
  return (
    <div>
      {/* {console.log(props)} */}
      <div>
        <div className="fixed top-0 left-0 right-0 navbar  bg-base-300 rounded-sm z-1 md:w-[80%] md:ml-35">
  <button className="btn btn-ghost text-3xl md:mx-80">Products With respective vendors</button>
</div>
        
      </div>
      <div className='pt-18'>
        {/* {console.log(props)} */}
      {Object.entries(props).map(([index,i])=>{ 
      //  console.log(i)
      return (
        <Checkout item={i} key={index} />
      )}
      )}
      </div>
      <div role="alert" className="alert alert-error mx-4 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span className=' text-sm  md:text-lg'>
          Don't Share the this Token with anyone!!!..
        </span>
      </div>
     
      
      {tokens.map((ele)=>(
        (
          <div key={ele.tokenNumber}>
            <Token   data={ele}  fromAdmin={false} />
            </div>
      )))}

      
    
    </div>
  )
}

export default PaymentPage
