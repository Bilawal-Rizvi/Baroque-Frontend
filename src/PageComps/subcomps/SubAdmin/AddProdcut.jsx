import React, { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "../../../Context/AdminContext";

function AddProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [Title, setTitle] = useState("");
  const [Price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const { AddProduct } = useAdmin();

  const HandleChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages((prev) => [...prev, ...files]);
    }
  }, []);

  const removeFile = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    
    if (!Title.trim()) {
      alert("Please enter product title");
      return;
    }
    
    if (!Price.trim() || isNaN(Price)) {
      alert("Please enter valid price");
      return;
    }
    
    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    setLoading(true);
    const message = await AddProduct({
      Title,
      Price,
      images,
    });
    setLoading(false);

    if (message) {
      alert(message);
      setTitle("");
      setPrice("");
      setImages([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            Add New Product
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
          >
            ← Go Back
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
          <form onSubmit={HandleSubmit} className="space-y-6">
            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Title Input */}
              <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700 text-sm sm:text-base">
                  Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={Title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter product title"
                  className="text-base border border-gray-300 rounded-lg w-full px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Price Input */}
              <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700 text-sm sm:text-base">
                  Product Price (PKR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={Price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                  className="text-base border border-gray-300 rounded-lg w-full px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="border-t pt-6">
              <label className="text-gray-800 font-semibold mb-3 block text-sm sm:text-base">
                Product Images <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Upload multiple images of your product (recommended: at least 3 images)
              </p>

              <div className="space-y-4">
                {/* Upload Button */}
                <div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={HandleChange}
                    className="hidden"
                    id="fileUpload"
                  />
                  <label
                    htmlFor="fileUpload"
                    className="inline-flex items-center justify-center gap-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Select Images</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    {images.length > 0
                      ? `${images.length} image${images.length > 1 ? "s" : ""} selected`
                      : "No images selected"}
                  </p>
                </div>

                {/* Selected Images Grid */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {images.map((file, index) => (
                      <div
                        key={index}
                        className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md group"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="opacity-0 group-hover:opacity-100 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg transition-all duration-200 transform hover:scale-110"
                          >
                            ×
                          </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs truncate">
                            {file.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto sm:flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !Title.trim() || !Price.trim() || images.length === 0}
                className="w-full sm:w-auto sm:flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-500 disabled:hover:shadow-md"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Adding Product...
                  </span>
                ) : (
                  "Add Product"
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