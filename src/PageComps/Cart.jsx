import React, { useEffect, useState } from "react";
import Headcart from "./subcomps/SubCart/Headcart";
import Itemcart from "./subcomps/SubCart/Itemcart";
import Botcart from "./subcomps/SubCart/Botcart";
import Nav from "./Nav";
import { useCart } from "../Context/CarContext";

function Cart() {
  const { getCart, userid } = useCart();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter out products with quantity <= 0
  const visibleCart = cart.filter(item => item.quantity > 0 && item.product);

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

  const totalPrice = visibleCart.reduce((acc, item) => {
    const Price = Number(item.product.Price.replace(/,/g, ""));
    return acc + Price * item.quantity;
  }, 0);

  if (loading) {
    return (
      <>
        <Nav />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-gray-600">Loading cart...</p>
        </div>
      </>
    );
  }

  localStorage.setItem("cart", JSON.stringify(visibleCart));

  return (
    <>
      <Nav />
      <div className="mt-24 sm:mt-28 md:mt-32 lg:mt-35 px-4 sm:px-6 md:px-8 lg:px-10 pb-8">
        {/* Page Header */}
        <div className="max-w-6xl mx-auto">
          <Headcart />
        </div>

        {/* Cart Content */}
        <div className="max-w-6xl mx-auto mt-6 sm:mt-8">
          {/* Desktop Table Header */}
          <div className="hidden md:flex items-center justify-between pb-4 border-gray-300 font-light border-b text-gray-600 text-sm">
            <h2 className="flex-1">PRODUCT</h2>
            <h2 className="w-32 text-center">QUANTITY</h2>
            <h2 className="w-32 text-right">TOTAL</h2>
          </div>

          {/* Cart Items */}
          {visibleCart?.length > 0 ? (
            <div className="divide-y divide-gray-300 md:divide-y-0">
              {visibleCart.map(item => (
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
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 md:py-24">
              <div className="text-center">
                <i className="fa-solid fa-cart-shopping text-4xl sm:text-5xl md:text-6xl text-gray-300 mb-4"></i>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-600 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-sm sm:text-base text-gray-500 mb-6">
                  Add some products to get started
                </p>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded hover:bg-gray-800 transition-colors text-sm sm:text-base"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Cart Summary - Only show if cart has items */}
      {visibleCart?.length > 0 && (
        <Botcart TotalPrice={totalPrice || 0} />
      )}
    </>
  );
}

export default Cart;