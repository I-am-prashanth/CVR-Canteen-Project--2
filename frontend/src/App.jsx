import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import NewHome from './components/Home'
import Login from './pages/Login'
import Cart from './components/Cart'
import useCartStore from './store/CartStore'
import Token from './components/Token'


function App() {
  const [count, setCount] = useState(0)
  const items=useCartStore(state=>state.items)

  return (
   <>

    {/* <Home /> */}
    {/* <NewHome /> */}
    {/* <Login /> */}
     
    {/* <Cart /> */}

    {/* <Token /> */}








    <footer className="bg-gray-800 text-white py-6 ">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} CVR Canteen. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-blue-300">Terms</a>
            <a href="#" className="hover:text-blue-300">Privacy</a>
            <a href="#" className="hover:text-blue-300">Contact</a>
          </div>
        </div>
      </footer>
    
       
   </>
  )
}

export default App
