import React, { useEffect, useState } from "react";
import Item from "./Item";

function Leftside() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const totalPrice = cart.reduce((acc, item) => {
    const Price = Number(item.product.Price.replace(/,/g, ""));
    return acc + Price * item.quantity;
  }, 0);

  return (
    <>
      <div className="w-full h-full flex flex-col gap-3 sm:gap-4 pt-6 sm:pt-8 md:pt-10 lg:pt-12 px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Cart Items */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <Item
                key={item.product._id || index}
                Title={item.product.Title}
                price={item.product.Price}
                URL={item.product.images[0].ImgUrl}
                quantity={item.quantity}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm sm:text-base">No items in cart</p>
            </div>
          )}
        </div>

        {/* Discount Code Section */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full mb-4 sm:mb-6">
          <input
            type="text"
            className="flex-1 h-11 sm:h-12 px-3 sm:px-4 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:border-black transition-colors"
            placeholder="Discount code"
          />
          <button className="h-11 sm:h-12 px-6 sm:px-8 rounded-md bg-gray-300 text-gray-600 font-medium text-sm sm:text-base hover:bg-gray-400 transition-colors whitespace-nowrap">
            Apply
          </button>
        </div>

        {/* Order Summary */}
        <div className="flex flex-col gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-gray-300 text-sm sm:text-base">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Subtotal</span>
            <span className="font-medium">PKR {totalPrice.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Shipping</span>
            <span className="font-semibold text-green-600">Free</span>
          </div>
          
          <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-gray-300 text-lg sm:text-xl md:text-2xl font-bold">
            <span>Total</span>
            <span>PKR {totalPrice.toLocaleString()}</span>
          </div>
          
          <p className="text-xs sm:text-sm text-gray-500 -mt-2">
            Including PKR 0.00 in taxes
          </p>
        </div>
      </div>
    </>
  );
}

export default Leftside;