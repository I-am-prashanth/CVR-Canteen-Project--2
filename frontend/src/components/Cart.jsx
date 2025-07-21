import React from 'react';
import useCartStore from '../store/CartStore'

function Cart() {
  // Calculate total amount
  const items = useCartStore(state => state.items);
   const totalAmount = items?.reduce((sum, item) => {
    return sum + ((item?.price || 0) * (item?.quantity || 1));
  }, 0) || 0;
  
  return (
    <div className='backdrop-blur-sm bg-gray-700/50 rounded-md fixed bottom-4 right-4 p-4 w-72 md:w-96'>
      {/* Cart Items List */}
      <div className='max-h-60 overflow-y-auto mb-4'>
        {items.length === 0 ? (
          <p className='text-white/80'>Your cart is empty</p>
        ) : (
          <ul className='space-y-2'>
            {items.map((item) => (
              <li key={item.id} className='flex justify-between items-center text-white'>
                <div className='flex items-center space-x-2'>
                  <span className='font-medium'>{item.name}</span>
                  {item.quantity > 1 && (
                    <span className='text-sm text-white/60'>× {item.quantity}</span>
                  )}
                </div>
                <span>₹{item.price * (item.quantity || 1)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total and Checkout */}
      <div className='flex justify-between items-center border-t border-white/20 pt-3'>
        <span className='text-white font-bold'>TOTAL:</span>
        <span className='text-amber-400 font-bold'>₹{totalAmount}</span>
      </div>
      <button className='w-full mt-3 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg transition-colors'>
        CHECKOUT
      </button>
    </div>
  );
}

export default Cart;