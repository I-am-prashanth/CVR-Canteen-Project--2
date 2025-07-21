import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [], // Properly initialized empty array
  
  addItem: (newItem) => set((state) => {
    // Check if item already exists
    const existingItem = state.items.find(item => item.id === newItem.id);
    
    if (existingItem) {
      // Update quantity if exists
      return {
        items: state.items.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      };
    }
    // Add new item with quantity 1
    return { 
      items: [...state.items, { 
        ...newItem, 
        quantity: 1 
      }] 
    };
  }),
  
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
}));

export default useCartStore;