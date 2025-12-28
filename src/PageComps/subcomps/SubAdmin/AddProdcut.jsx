import React, { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useAdmin } from "../../../Context/AdminContext";

function AddProduct() {
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [Title, setTitle] = useState("");
  const [Price, setPrice] = useState("");
  const { AddProduct } = useAdmin();

  const HandleChange = useCallback((e) => {
    setImages(Array.from(e.target.files));
  }, []);

  const removeFile = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const HandleSumbit = async (e) => {
    e.preventDefault();
   const message =  await AddProduct({
      Title,
      Price,
      images,
    });
    if(message){
      alert(message);
      setTitle("");
      setPrice("");
      setImages([]);
    }
  };

  return (
    <div className="m-5 md:m-10 relative bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col flex-1">
          <label className="mb-2 font-medium">Product Title</label>
          <input
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg border border-gray-300 rounded-lg w-full md:w-auto px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-2 font-medium">Product Price</label>
          <input
            type="text"
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
            className="text-lg border border-gray-300 rounded-lg w-full md:w-auto px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="mt-6">
        <label className="text-gray-700 font-medium mb-2 block">
          Upload Images
        </label>
        <div className="flex flex-col sm:flex-row items-start gap-4 flex-wrap">
          <input
            type="file"
            multiple
            onChange={HandleChange}
            className="hidden"
            id="fileUpload"
          />

          {/* Selected Images */}
          <div className="flex flex-wrap gap-3">
            {images.map((file, index) => (
              <div
                key={index}
                className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shadow flex items-center justify-center"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center font-bold hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Custom Button */}
          <label
            htmlFor="fileUpload"
            className="cursor-pointer mt-2 sm:mt-0 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-200 hover:scale-105"
          >
            Select Images
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 md:mt-10 flex justify-end">
        <button
          onClick={HandleSumbit}
          className="cursor-pointer w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-200 hover:scale-105"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
