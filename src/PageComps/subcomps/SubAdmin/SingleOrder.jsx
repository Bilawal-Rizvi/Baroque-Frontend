import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "../../../Context/AdminContext";
import { useEffect } from "react";

function SingleOrder() {
  const {state:item} = useLocation();
  const [order,setOrder] = useState(null);
  const {UpdateStatus,SingleOrder} = useAdmin();
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  

useEffect(() => {
  const fetchOrder = async () => {
    try {
      setLoading(true); // start loading
      const data = await SingleOrder(item);
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // stop loading
    }
  };

  fetchOrder();
}, [item]);

  const HandleClick = async () => {
    if (order.status === "Completed") {
      alert("Order already completed");
      return;
    }

    const updatedOrder = await UpdateStatus(order._id);
    if (updatedOrder) {
      alert("Order marked as completed");
      // window.location.reload();
    }
  };
 if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-gray-400 mb-3"></i>
          <p className="text-gray-600">Loading Order...</p>
        </div>
      </div>
    );
  }
  if (!order) {
    return (
      <div className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">No Order Found</h1>
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Order Details</h1>

        {/* Customer Info Card */}
        <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-lg shadow-sm space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <p className="text-sm text-gray-600">Customer</p>
              <p className="font-semibold text-gray-800">{order.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-800 break-all">{order.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold text-gray-800">{order.PhoneNo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="font-semibold text-lg text-green-600">PKR {order.totalPrice.toLocaleString()}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Delivery Address</p>
            <p className="font-semibold text-gray-800">{order.address}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t">
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                order.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {order.status}
              </span>
            </div>
            <button 
              onClick={HandleClick} 
              className="w-full sm:w-auto px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={order.status === "Completed"}
            >
              Mark as Completed
            </button>
          </div>

          <div>
            <p className="text-sm text-gray-600">Order Date</p>
            <p className="font-semibold text-gray-800">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-lg shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Products</h2>
          
          {/* Desktop Table View */}
          <div className="hidden md:block border rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-100 p-4 font-semibold text-sm text-gray-700">
              <span>Image</span>
              <span>Title</span>
              <span>Price</span>
              <span>Quantity</span>
            </div>

            {order.products.map((p) => (
              <div
                key={p._id}
                className="grid grid-cols-4 items-center p-4 border-t text-sm hover:bg-gray-50 transition-colors"
              >
                <img
                  src={p.productId?.images?.[0]?.ImgUrl}
                  alt={p.productId?.Title}
                  className="w-16 h-16 object-cover rounded border"
                />
                <span className="font-medium text-gray-800">{p.productId?.Title}</span>
                <p className="text-gray-700">PKR {p.productId?.Price.toLocaleString()}</p>
                <span className="font-semibold text-gray-800">{p.quantity}</span>
              </div>
            ))}
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {order.products.map((p) => (
              <div
                key={p._id}
                className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <img
                    src={p.productId?.images?.[0]?.ImgUrl}
                    alt={p.productId?.Title}
                    className="w-20 h-20 object-cover rounded border shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {p.productId?.Title}
                    </h3>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Price:</span>
                      <p className="font-semibold text-gray-800">PKR {p.productId?.Price?.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-semibold text-gray-800">{p.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="pt-2">
          <button 
            onClick={()=>navigate(-1)}
            className="w-full sm:w-auto px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleOrder;