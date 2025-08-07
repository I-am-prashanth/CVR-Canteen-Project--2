import {create} from "zustand"
import { persist } from 'zustand/middleware';


const useCartStore=create(
    persist(
        (set,get)=>({
            
            items:{},
            total:0,
            addItem :(item)=>set((state)=>{
                
                console.log(state,state)
                item.pay=false;
                const vendorId=item.vendor;
                const tempcart={...state.items};
                if(!tempcart[vendorId]){
                    console.log("entered",vendorId)
                    tempcart[vendorId]=[];
                    tempcart[vendorId].push(item);
                }
                else{
                    for(const itm in tempcart){
                        if(item.vendor===itm){
                            let pos=0;
                            tempcart[itm].map((i)=>{
                                // console.log(i)
                                if(item.name===i.name){
                                   return (pos)
                                }
                                pos+=1;
                            })
                            if(pos<tempcart[itm].length){
                                tempcart[itm][pos].quantity+=1
                            }
                            else{
                                tempcart[itm].push(item)
                            }
                       
                        }

                    }
                }
                console.log(tempcart)
                const t=state.total+item.price;
                return {items:tempcart,total:t}




            }),
        

            clearAll: () => set({ items: {}, total: 0, pay: false }),

            paymentPaid:(id)=>set((state)=>{
                // console.log(id);
                const tempcart={...state.items};
                for(const itm in tempcart){
                    if(itm===id){
                        tempcart[itm].forEach(item => {
                            item.pay = true;
                        });
                        break;
                    }
                    // console.log(tempcart[itm]);
                }
                return {items:tempcart}

            }),
            deleteItem:(id)=>set((state)=>{
            console.log(state.items);
            let newCart={}
            for(const i in state.items){
                console.log(state.items[i])
                if(i===id){
                    continue;
                }
                newCart={...newCart,
                    [i]:state.items[i]}
            }
            console.log(newCart)
            
            
            return{items:newCart}
            
        }),

            
            
        }),
        



        {
      name: 'cart-storage', // 👈 This key is used in localStorage
    }
)
)

export default useCartStore;
