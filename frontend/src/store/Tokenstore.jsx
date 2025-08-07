import {create} from "zustand"
import { persist } from 'zustand/middleware';

const useTokens=create(
    persist(
        (set,get)=>({
            tokens:[],
            addToken:(item)=>set((state)=>{
                     const tem=[...state.tokens];
                     const exist=tem.some((ele)=>{
                       return ele.tokenNumber===item.tokenNumber
                     })
                     if(exist) return{tokens:tem};
                     tem.push(item);
                    
                    
                     return{tokens:tem};
            }),
            clear:()=>{
                
        useTokens.persist.clearStorage();        // Clear localStorage
        set({ tokens: [] });                     // Clear in-memory state
      
            }

        }),

        {
      name: 'token-storage', // 👈 This key is used in localStorage
    }
    )
)

export default useTokens;