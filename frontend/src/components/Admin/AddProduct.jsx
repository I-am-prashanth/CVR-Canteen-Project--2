import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(10);
  const [productImg, setProductImg] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProductImg(event.target.result);
      };
      reader.readAsDataURL(file);
    }
    const formData = new FormData();
  formData.append('image', file);
  };

  const { mutate: addproduct, isLoading } = useMutation({
    mutationFn: async ({productName,price,productImg}) => {
      try {
        const res = await fetch('/api/admin/addproduct', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name:productName,img:productImg,price })
      });
      if(!res.ok){
        const err=await res.json();
        console.log(err);
        return null;
      }
      const prod=await res.json();
      console.log(prod);
      return prod;
      } catch (error) {
        console.log("Eroor: ",error);
        throw error.message || "Error occurred while adding product";
      }
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addproduct({productName,price,productImg});
  };

  return (
    
    <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-12">
     
      <div className="md:w-1/2">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-serif">
            Add New Product
            <span className="block w-16 h-1 bg-amber-500 mx-auto mt-2 rounded-full"></span>
          </h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Product Image Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-medium text-lg">Product Image</span>
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-white hover:bg-gray-50 transition-all duration-300 hover:border-amber-400 group overflow-hidden">
                  {productImg ? (
                    <img 
                      src={productImg} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 transform group-hover:scale-105 transition-transform">
                      <svg className="w-10 h-10 mb-4 text-gray-400 group-hover:text-amber-500 transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 group-hover:text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400 group-hover:text-gray-500">PNG, JPG, WEBP (Max 2MB)</p>
                    </div>
                  )}
                  <input 
                    id="dropzone-file" 
                    type="file" 
                    className="hidden" 
                    onChange={handleImageChange}
                    accept="image/png, image/jpeg, image/webp"
                  />
                </label>
              </div>
            </div>
            
            {/* Product Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-medium text-lg">Product Name</span>
              </label>
              <input 
                type="text" 
                name="productName"
                placeholder="e.g. Chicken Fried Rice" 
                className="input input-bordered w-full bg-white focus:ring-2 focus:ring-amber-400 focus:border-transparent text-gray-700 placeholder-gray-400 h-12 rounded-xl transition-all duration-200 hover:shadow-sm"
                required
                value={productName}
                onChange={(e) =>{
                
                  setProductName(e.target.value)}}
              />
            </div>

            {/* Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 font-medium text-lg">Price (₹)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input 
                    type="number" 
                    name="price"
                    placeholder="200" 
                    className="input input-bordered w-full bg-white focus:ring-2 focus:ring-amber-400 focus:border-transparent text-gray-700 pl-8 h-12 rounded-xl transition-all duration-200 hover:shadow-sm"
                    min="1"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <button 
                type="button" 
                className="btn btn-outline btn-error rounded-full px-8 h-12 min-h-12 transform hover:-translate-x-1 transition-all duration-300 hover:shadow-lg"
                onClick={() => {
                  setProductName("");
                  setPrice(10);
                  setPreviewImage(null);
                  setProductImg(null);
                }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn bg-gradient-to-r from-amber-500 to-amber-600 border-none text-white rounded-full px-8 h-12 min-h-12 transform hover:translate-x-1 hover:scale-105 transition-all duration-300 hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Add Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;