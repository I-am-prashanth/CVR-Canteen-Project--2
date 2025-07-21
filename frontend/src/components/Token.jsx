import React from 'react';

function Token() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md">
        {/* Token Header */}
        <div className="bg-blue-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">CVR CANTEEN</h2>
            <span className="text-white/90 text-sm">#{Math.floor(Math.random() * 1000)}</span>
          </div>
          <div className="mt-2 flex justify-between text-white/80 text-sm">
            <span>Token: 17-12-2025</span>
            <span>1BSE30</span>
          </div>
        </div>

        {/* Order Details */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Chicken Fried Rice</span>
              <span className="text-gray-600">2 × ₹200</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Chicken Biryani</span>
              <span className="text-gray-600">1 × ₹250</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Chicken Curry</span>
              <span className="text-gray-600">1 × ₹150</span>
            </div>
          </div>

          {/* Total */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Subtotal</span>
              {/* <span className="text-gray-600">₹600</span> */}
              <span className="text-blue-600">₹630</span>
            </div>
            {/* <div className="flex justify-between mt-1">
              <span className="font-medium text-gray-700">GST (5%)</span>
              <span className="text-gray-600">₹30</span>
            </div> */}
            {/* <div className="flex justify-between mt-3 font-bold text-lg">
              <span>Total Amount</span>
              <span className="text-blue-600">₹630</span>
            </div> */}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Thank you for your order!</p>
            {/* <p className="mt-1">Estimated ready time: 12:45 PM</p> */}
          </div>
        </div>

        {/* Barcode/QR Placeholder */}
        <div className="px-6 pb-6 flex justify-center">
          <div className="h-20 w-full bg-gray-100 rounded flex items-center justify-center text-amber-800">
            17-12-2025 1bac 34
          </div>
        </div>
      </div>
    </div>
  );
}

export default Token;