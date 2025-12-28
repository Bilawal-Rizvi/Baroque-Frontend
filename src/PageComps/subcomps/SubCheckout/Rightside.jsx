import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import Delivery from "./Delivery";
import Payment from "./Payment";
import { useAuth } from "../../../Context/Authcontext";
import axios from "axios";

function Rightside() {
  const [Address, setAddress] = useState("");
  const [Phone, setPhone] = useState("");
  const [cart, setCart] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
const BASE_URL = import.meta.env.VITE_BASE_URL;


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const totalPrice = cart.reduce((acc, item) => {
    const Price = Number(item.product.Price.replace(/,/g, ""));
    return acc + Price * item.quantity;
  }, 0);

  const OrderPlacing = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const FormattedProduct = cart.map(item => ({
        productId: item.product._id,
        name: item.product.Name,
        price: Number(item.product.Price.replace(/,/g, "")),
        quantity: item.quantity
      }));

      const response = await axios.post(`${BASE_URL}/api/checkout`, {
        user: user._id,
        name: user.name,
        email: user.email,
        address: Address,
        products: FormattedProduct,
        totalPrice: totalPrice,
        PhoneNo: Phone
      });

      if (response.data.success) {
        // console.log(response.data.message);
        alert(response.data.message);
        localStorage.removeItem("cart");
        // console.log(response.data.order);
      }
    } catch (err) {
      console.log(
        err.response?.data?.message || err.message || "Something went wrong"
      );
      alert(err.response?.data?.message || "Order failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={OrderPlacing} className="max-w-2xl">
        {/* Contact Section */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
          <h1 className="flex flex-col sm:flex-row justify-between text-xl sm:text-2xl items-start sm:items-center font-bold gap-2">
            Contact 
            <span className="font-light text-sm sm:text-base underline cursor-pointer hover:text-gray-600 transition-colors">
              Sign in
            </span>
          </h1>
          <Contact />
        </div>

        {/* Delivery Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Delivery
          </h1>
          <Delivery 
            Address={Address}
            setAddress={setAddress}
            Phone={Phone}
            setPhone={setPhone}
          />
        </div>

        {/* Payment Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Payment
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-light mb-4">
            All transactions are secure and encrypted.
          </p>
          <Payment />
          
          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting || !Address || !Phone}
            className="w-full bg-black text-white mt-4 sm:mt-5 mb-4 sm:mb-5 h-11 sm:h-12 rounded-md font-semibold text-sm sm:text-base hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </form>

      {/* Footer Links */}
      <div className="text-xs sm:text-sm flex flex-wrap gap-3 sm:gap-4 text-gray-600 pb-8 sm:pb-10">
        <a href="#" className="underline hover:text-black transition-colors">Refund policy</a>
        <a href="#" className="underline hover:text-black transition-colors">Shipping</a>
        <a href="#" className="underline hover:text-black transition-colors">Privacy</a>
        <a href="#" className="underline hover:text-black transition-colors">Terms of Service</a>
        <a href="#" className="underline hover:text-black transition-colors">Contact</a>
      </div>
    </>
  );
}

export default Rightside;