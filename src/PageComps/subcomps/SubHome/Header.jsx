import React from "react";

function Header() {
  return (
    <div className="relative w-full">
      {/* Image Container */}
      <div className="w-full h-auto">
        <img 
          src="\images\website_6.webp" 
          alt="Header Banner" 
          className="w-full h-auto object-cover"
        />
      </div>
      
      {/* Button - Positioned absolutely on top of image */}
      <div className="absolute inset-0 flex items-end justify-center">
        <button className="text-white border-white border-2 mb-10 duration-500 ease-in hover:bg-black hover:scale-105 transition-all text-sm sm:text-base md:text-lg font-light px-6 py-2 sm:px-8 sm:py-3 md:px-10 md:py-3 bg-transparent backdrop-blur-sm">
          SHOP NOW
        </button>
      </div>
    </div>
  );
}

export default Header;