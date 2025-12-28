import React from 'react';

function Contact() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <>
      <div className="w-full flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* Email Display (Read-only) */}
        <div className="border border-gray-300 w-full h-11 sm:h-12 rounded-md px-3 sm:px-4 flex items-center bg-gray-50 text-sm sm:text-base text-gray-700">
          {user?.email || "user@example.com"}
        </div>
        
        {/* Newsletter Checkbox */}
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            name="newsletter" 
            id="newsletter"
            className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer accent-black shrink-0"
          />
          <label 
            htmlFor="newsletter" 
            className="text-xs sm:text-sm text-gray-700 cursor-pointer select-none"
          >
            Email me with news and offers
          </label>
        </div>
      </div>

      {/* International Website Notice */}
      <div className="flex flex-col gap-2 sm:gap-3 bg-gray-100 p-3 sm:p-4 rounded-md border border-gray-300">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-circle-info text-sm sm:text-base text-gray-500 shrink-0"></i>
          <h2 className="text-sm sm:text-base font-medium text-gray-800">
            International Website
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-0 sm:pl-6">
          To deliver products outside of Pakistan visit our International Website:{" "}
          <a 
            href="https://baroque.com.pk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline text-blue-600 hover:text-blue-800 transition-colors break-all"
          >
            https://baroque.com.pk
          </a>
        </p>
      </div>
    </>
  );
}

export default Contact;