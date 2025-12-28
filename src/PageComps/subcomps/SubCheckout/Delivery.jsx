import React, { useState } from "react";

function Delivery({Address, setAddress, Phone, setPhone}) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="flex w-full flex-col gap-3 sm:gap-4">
        {/* Country Selection */}
        <select className="w-full border border-gray-300 h-11 sm:h-12 rounded-md text-sm sm:text-base px-3 sm:px-4 focus:outline-none focus:border-black transition-colors bg-white">
          <option>Pakistan</option>
        </select>

        {/* Name Field (Read-only) */}
        <div className="w-full h-11 sm:h-12 px-3 sm:px-4 border border-gray-300 rounded-md bg-gray-100 flex items-center text-sm sm:text-base text-gray-700">
          {user?.name || "User Name"}
        </div>

        {/* Address Input */}
        <input 
          type="text" 
          placeholder="Address" 
          required  
          value={Address} 
          onChange={(e) => setAddress(e.target.value)} 
          className="w-full h-11 sm:h-12 px-3 sm:px-4 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:border-black transition-colors"
        />

        {/* Phone Input */}
        <div className="w-full flex flex-col gap-2 sm:gap-3">
          <input 
            type="tel" 
            placeholder="Phone (e.g., +92 300 1234567)" 
            value={Phone} 
            required  
            onChange={(e) => setPhone(e.target.value)} 
            className="w-full h-11 sm:h-12 px-3 sm:px-4 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:border-black transition-colors"
          />
          
          {/* Save Info Checkbox */}
          <div className="flex items-center gap-2">
            <input 
              type="checkbox"  
              name="saveInfo" 
              id="saveInfo"
              className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer accent-black"
            />
            <label 
              htmlFor="saveInfo" 
              className="text-xs sm:text-sm text-gray-700 cursor-pointer select-none"
            >
              Save this information for next time
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Delivery;