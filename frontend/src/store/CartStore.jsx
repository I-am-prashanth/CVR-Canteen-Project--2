import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { useLocation } from 'react-router-dom';

const useCartStore = create(
  persist(
    (set, get) => ({
     pay:false,
      items:  {}, 
      addItem: (item) => set((state) => {
        const vendorId = item.vendor;
         const updatedItems = { ...state.items };
         if (!updatedItems[vendorId]) {
            updatedItems[vendorId] = [];
          }
        let existingItem = -1;
        for(const vendorId in state.items){
          console.log(item)
          console.log(state.items)
          existingItem = (state.items[vendorId]===item)?vendorId:-1;
    // (i) => i.name === item.name

  if (existingItem>-1) break;

        }
        
        if (existingItem>-1) {
          return {
            items: state.items.map((i) => 
              i.name === item.name
                ? { ...i, quantity: (i.quantity || 1) + 1 }
                : i
            )
          };
        } else {
          return {
            items: items.push(item)
          };
        }
      }),

      paymentPaid: (vendor) =>
  set((state) => {
    const updatedItems = { ...state.items };

    for (const vendorId in updatedItems) {
      // if (
      //   updatedItems[vendorId].items.length > 0 &&
      //   updatedItems[vendorId].items[0].vendorName === vendor
      // ) {
      //   updatedItems[vendorId] = {
      //     ...updatedItems[vendorId],
      //     pay: true,
      //   };
      // }
      console.log(vendorId)
    }

    return { items: updatedItems };
  }),
      
      removeItem: (item) => set((state) => ({
        items: state.items.filter((it) => 
          it.id !== item.id && it.productname !== item.productname
        )
      })),
      
      decreaseQuantity: (item) => set((state) => {
        const existingItem = state.items.find(
          (i) => i.id === item.id || i.productname === item.productname
        );
        
        if (existingItem?.quantity > 1) {
          return {
            items: state.items.map((i) => 
              i.id === item.id || i.productname === item.productname
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
          };
        } else {
          return {
            items: state.items.filter((it) => 
              it.id !== item.id && it.productname !== item.productname
            )
          };
        }
      }),
      
      // Only clear after successful payment verification
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => get().items.length,
      getTotalQuantity: () => get().items.reduce((total, item) => total + (item.quantity || 1), 0),
      getTotalPrice: () => get().items.reduce(
        (total, item) => total + (item.price * (item.quantity || 1)), 0
      )
    }),
    {
      name: 'cart-storage', // unique name for localStorage
      getStorage: () => localStorage, // or sessionStorage
    }
  )
);

export default useCartStore;