import React, { useEffect, useState } from 'react'
import ItemComponent from './ItemComponent'
import { useMutation } from '@tanstack/react-query';
import AddProduct from './AddProduct';

function AdminProduct() {
  const [products,setproducts]=useState([]);

  const {mutate:fetchProducts,isLoading}=useMutation({
    mutationFn:async()=>{
      console.log("enteerd")
      const prod = await fetch('/api/admin/getposts', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
    
      });
      if(!prod.ok){
        const res=await prod.json();
       throw res.message ||"unable to fetch the products or you cant access the page" 
      }
      const res=await prod.json();
      
      setproducts(res);
      return res;
    }
  })

  useEffect(()=>{
    
    fetchProducts();
  },[])
  return (
    <div>

      <button onClick={(e)=>{console.log("object")}}> butt</button>


      <div className=" overflow-x-auto   md:grid md:grid-cols-4 gap-4 mx-13 mt-3">

          {products?.map((items)=>(
            <div key={items._id}className='mx-3 md:mx-35'>
            <ItemComponent product={items} fomAdmin={true}/>
            {/* <ItemComponent product={items} fomAdmin={true}/>
            <ItemComponent product={items} fomAdmin={true}/> */}
            </div>
          ))}  
            </div>


          <AddProduct />
    </div>
  )
}

export default AdminProduct
