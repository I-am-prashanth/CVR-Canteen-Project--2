import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import NewHome from './components/Home'
import Login from './pages/Login'

import useCartStore from './store/CartStore'
import Token from './components/Token'
import PaymentPage from './pages/PaymentPage';
import Adminpage from './pages/Adminpage';


function App() {
  const [count, setCount] = useState(0)
  const items=useCartStore(state=>state.items)

  return (
   <>
  
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Login/>} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/Token' element={<Token/>} />
        <Route path='/adminpage' element={<Adminpage />} />
    
    </Routes>








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
