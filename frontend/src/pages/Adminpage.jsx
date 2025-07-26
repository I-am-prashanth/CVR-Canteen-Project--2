import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import AdminProduct from '../components/Admin/AdminProduct';
import TokenVerify from '../components/Admin/TokenVerify';

function Adminpage() {
    const location = useLocation();
    const { state } = location;
    const [selectedOption, setSelectedOption] = useState("verify Token");

const handleMenuSelect = (option) => {
  setSelectedOption(option);
  // Add additional logic based on selection
  switch(option) {
    case 'verify':
      console.log('Verify Token selected');
      break;
    case 'history':
      console.log('History selected');
      break;
    case 'product':
      console.log('Add Product selected');
      break;
    default:
      break;
  }
};
  return (
    <>
    {console.log("object")}
    <nav className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
               <li><a onClick={() => handleMenuSelect('verify Token')}>Verify Token</a></li>
        <li><a onClick={() => handleMenuSelect('history')}>History</a></li>
        <li><a onClick={() => handleMenuSelect('product')}>Product Section</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl font-bold">{state?.data.name}</a>
        </div>
        
      </nav>
      <div className='h-auto min-h-182 w-full bg-blue-300 pt-5'> {/* Changed to padding */}
        
 
  <div className="text-4xl font-semibold mb-4 truncate mx-25">
    {selectedOption || 'Admin Panel'}
  </div>
  {(selectedOption==="verify Token" || selectedOption==="history" ) && <TokenVerify />}
  {/* {(selectedOption==="history") && <AdminProduct />} */}
  {(selectedOption==="product") && <AdminProduct />}
  
    
  
</div>

    </>
  )
}

export default Adminpage
