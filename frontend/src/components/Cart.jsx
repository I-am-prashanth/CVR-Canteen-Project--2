import React from 'react';
import { create } from 'zustand';
import { Link } from 'react-router-dom';
import useCartStore from '../store/tempstore';

// Cart Store Definition

// Cart Component
function Cart() {
  const items = useCartStore(state => state.items);
  const totalAmount = useCartStore(state => state.total);
  const removeItem = useCartStore(state => state.removeItem);
  const clearCart = useCartStore(state => state.clearAll);

  return (
    <div className='backdrop-blur-sm bg-gray-700/50 rounded-md fixed bottom-4 right-4 p-4 w-72 md:w-96'>
      {/* Cart Items List */}
      <div className='max-h-60 overflow-y-auto mb-4'>
        {Object.values(items)?.length === 0 ? (
          <p className='text-white/80'>Your cart is empty</p>
        ) : (
          <ul className='space-y-2'>
            {/* console.log(items) */}
            {/* {console.log(items,Object.keys(items).length)} */}
            {Object.entries(items).map(([index,item]) => (
              <div key={index}>
               {Array.isArray(item) && item?.map((item,idx) => (
              
              <li key={idx} className='flex justify-between items-center text-white group'>
                <div className='flex items-center space-x-2'>
                  <span className='font-medium'>{item.name}</span>
                  {item.quantity > 1 && (
                    <span className='text-sm text-white/60'>× {item.quantity}</span>
                  )}
                </div>
                <div className='flex items-center gap-2'>
                  <span>₹{item.price * (item.quantity || 1)}</span>
                  
                </div>
              </li>
               ))}
                </div>
            ))}
          </ul>
          //  </>
        )}
       
      </div>

      {/* Total and Checkout */}
      <div className='flex justify-between items-center border-t border-white/20 pt-3'>
        <div className='flex gap-2'>
          {Object.keys(items).length > 0 && (
            <button 
              onClick={clearCart}
              className='text-xs text-red-300 hover:text-red-200'
            >
              Clear All
            </button>
          )}
          <span className='text-white font-bold'>TOTAL:</span>
        </div>
        <span className='text-amber-400 font-bold'>₹{totalAmount|| 0} </span>
      </div>
      
       <Link  
        to="/payment" 
        state={{ items }}
        onClick={() => items.length === 0 && event.preventDefault()}
      >
        <button 
          className={`w-full mt-3 py-2 rounded-lg transition-colors ${
           Object.keys(items).length> 0 
              ? 'bg-amber-500 hover:bg-amber-600 text-white' 
              : 'bg-gray-500 cursor-not-allowed text-gray-300'
          }`}
          // disabled={items.length === 0}
        >
         
          CHECKOUT
          
        </button>
        </Link>
      
    </div>
  );
}

export default Cart;