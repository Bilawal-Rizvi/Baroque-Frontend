import React from "react";
import { useAdmin } from "../../../Context/AdminContext";
import { useNavigate } from "react-router-dom";

function Orders() {
  const { Orders, loading } = useAdmin();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-gray-400 mb-3"></i>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (!Orders || Orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <i className="fa-solid fa-clipboard-list text-5xl text-gray-300 mb-4"></i>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h3>
        <p className="text-gray-500">Orders will appear here once customers make purchases.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200">
              <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Order ID
              </th>
              <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Customer
              </th>
              <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Date
              </th>
              <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {Orders.map((item) => (
              <tr
                key={item._id}
                onClick={() => navigate("/admin/singleorder", { state: item._id })}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              >
                <td className="p-3 sm:p-4 text-sm text-gray-900 font-mono">
                  #{item._id.slice(-6).toUpperCase()}
                </td>
                <td className="p-3 sm:p-4 text-sm text-gray-900">
                  {item.name}
                </td>
                <td className="p-3 sm:p-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Pending"
                        ? "bg-amber-100 text-amber-700"
                        : item.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3 sm:p-4 text-sm text-gray-600">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 sm:p-4 text-sm font-semibold text-gray-900">
                  PKR {item.totalPrice?.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {Orders.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate("/admin/singleorder", { state: item._id })}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Order ID</p>
                <p className="text-sm font-mono font-semibold text-gray-900">
                  #{item._id.slice(-6).toUpperCase()}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                  item.status === "Pending"
                    ? "bg-amber-100 text-amber-700"
                    : item.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Customer:</span>
                <span className="text-sm font-medium text-gray-900">{item.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Date:</span>
                <span className="text-sm text-gray-700">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-xs text-gray-500">Total:</span>
                <span className="text-base font-bold text-gray-900">
                  PKR {item.totalPrice?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;