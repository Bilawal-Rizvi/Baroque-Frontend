import React, { useCallback, useEffect, useState } from "react";
import { useCart } from "../../../Context/CarContext";
import Itemcart from "../SubCart/Itemcart";

function UserCart() {
  const { getCart, userid } = useCart();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      if (!userid) return; // wait until userid is available
      try {
        const fetchedCart = await getCart();
        setCart(fetchedCart || []); // fallback to empty array
      } catch (err) {
        console.error("Error fetching cart:", err);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [userid, getCart]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Loading cart...</p>
        </div>
      </div>
    );
  }

  const visibleCart = JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <div className="w-full">
      {visibleCart?.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {visibleCart.map((item) => (
            <Itemcart
              key={item.product._id}
              URL={item.product.images?.[0]?.ImgUrl || ""}
              title={item.product.Title || "No title"}
              price={item.product.Price || 0}
              quant={item.quantity}
              id={item.product._id}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-100 text-center p-6">
          <div className="mb-6">
            <svg
              className="w-20 h-20 sm:w-24 sm:h-24 text-gray-300 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            Your Cart is Empty
          </h3>
          <p className="text-gray-600 mb-6 max-w-sm">
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
          </p>
          <button
            onClick={() => window.location.href = "/products"}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default UserCart;