import React from "react";
import { useAdmin } from "../../../Context/AdminContext";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function AllProducts() {
  const { GetProducts, DelProducts } = useAdmin();
  const [AllProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const HandleDelClick = useCallback(async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await DelProducts(id);
        setAllProducts(prev => prev.filter(p => p._id !== id));
    }
  }, [DelProducts]);

  useEffect(() => {
    const fetchProducts = async () => {
         try {
      setLoading(true);
      const products = await GetProducts();
      setAllProducts(products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

    fetchProducts();
  }, [GetProducts]);
 if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-gray-400 mb-3"></i>
          <p className="text-gray-600">Loading Products...</p>
        </div>
      </div>
    );
  }
  if (AllProducts.length < 1) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">No Products Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header with Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            All Products ({AllProducts.length})
          </h1>
          <button
            onClick={() => navigate("/admin/AddProduct")}
            className="w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span>
            <span>Add New Product</span>
          </button>
        </div>

        {/* Products Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="grid grid-cols-5 bg-gray-100 p-4 font-semibold text-sm text-gray-700 border-b">
                  <span>Image</span>
                  <span className="col-span-2">Title</span>
                  <span>Price</span>
                  <span className="text-center">Actions</span>
                </div>

                {/* Table Body */}
                {AllProducts.map((p) => (
                  <div
                    key={p._id}
                    className="grid grid-cols-5 items-center p-4 border-b hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={p.images?.[0]?.ImgUrl}
                      alt={p.Title}
                      className="w-16 h-16 object-cover rounded border"
                    />

                    <span className="font-medium text-gray-800 col-span-2 pr-4">
                      {p.Title}
                    </span>

                    <span className="text-gray-700 font-semibold">
                      PKR {p.Price.toLocaleString()}
                    </span>

                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => navigate("/admin/EditProduct", { state: p })}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => HandleDelClick(p._id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tablet View (md to lg) */}
          <div className="hidden md:block lg:hidden">
            <div className="divide-y">
              {AllProducts.map((p) => (
                <div key={p._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-4">
                    <img
                      src={p.images?.[0]?.ImgUrl}
                      alt={p.Title}
                      className="w-24 h-24 object-cover rounded border shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                        {p.Title}
                      </h3>
                      <p className="text-lg font-bold text-green-600 mb-3">
                        PKR {p.Price.toLocaleString()}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate("/admin/EditProduct", { state: p })}
                          className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => HandleDelClick(p._id)}
                          className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y">
            {AllProducts.map((p) => (
              <div key={p._id} className="p-4 space-y-3">
                <div className="flex gap-3">
                  <img
                    src={p.images?.[0]?.ImgUrl}
                    alt={p.Title}
                    className="w-20 h-20 object-cover rounded border shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                      {p.Title}
                    </h3>
                    <p className="text-lg font-bold text-green-600">
                      PKR {p.Price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate("/admin/EditProduct", { state: p })}
                    className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => HandleDelClick(p._id)}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="pt-2">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;