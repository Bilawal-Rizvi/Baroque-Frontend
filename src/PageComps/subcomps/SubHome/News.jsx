import React from "react";

function News() {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-12 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20 gap-4 sm:gap-5 w-full px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
          NEWSLETTER
        </h1>
        <p className="text-center text-sm sm:text-base max-w-xl px-4">
          Sign up to get notified and <b>Get 5% OFF</b> when you subscribe to
          our newsletter.
        </p>
        
        {/* Desktop Layout */}
        <div className="hidden sm:flex gap-3 md:gap-5 w-full max-w-2xl">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="p-3 flex-1 border border-gray-300 h-12 focus:outline-none focus:border-black transition-colors"
          />
          <button className="bg-black text-white h-12 px-6 md:px-8 hover:bg-gray-800 transition-colors whitespace-nowrap">
            SUBSCRIBE
          </button>
        </div>

        {/* Mobile Layout */}
        <div className="flex sm:hidden flex-col gap-3 w-full max-w-md px-4">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="p-3 w-full border border-gray-300 h-12 focus:outline-none focus:border-black transition-colors"
          />
          <button className="bg-black text-white h-12 w-full hover:bg-gray-800 transition-colors">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </>
  );
}

export default News;