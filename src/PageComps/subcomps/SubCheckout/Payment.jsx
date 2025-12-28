import React, { useState } from "react";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  return (
    <>
      <div className="w-full pb-4 sm:pb-6 border-b border-gray-300 mb-3 sm:mb-4">
        {/* Payment Method Options */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-4">
          {/* Cash on Delivery */}
          <div className="flex items-center gap-3 p-3 sm:p-4 border border-gray-300 rounded-md hover:border-black transition-colors cursor-pointer">
            <input 
              type="radio" 
              name="paymentMethod" 
              id="cod" 
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer accent-black shrink-0" 
            />
            <label 
              htmlFor="cod" 
              className="text-sm sm:text-base text-gray-800 cursor-pointer flex-1"
            >
              Cash on Delivery (COD)
            </label>
          </div>

         
        </div>
      </div>
    </>
  );
}

export default Payment;