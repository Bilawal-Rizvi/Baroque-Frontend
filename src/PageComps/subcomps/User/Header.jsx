import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div 
            onClick={() => navigate("/")} 
            className="flex items-center cursor-pointer group"
          >
            <img
              src="/images/LOGO_PNG_V01_ca621119-9615-4843-a4c7-3cbf07d1452a.png"
              className="h-8 sm:h-10 lg:h-12 transition-transform duration-200 group-hover:scale-105"
              alt="Logo"
            />
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 active:scale-95"
            >
              Shop
            </button>
            
            <button
              onClick={() => navigate("/products")}
              className="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 active:scale-95"
            >
              Products
            </button>

            {/* Cart Button with Icon */}
            <button
              onClick={() => navigate("/cart")}
              className="relative px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="hidden sm:inline">Cart</span>
            </button>

            {/* Account Button */}
            <button
              onClick={() => navigate("/login")}
              className="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="hidden sm:inline">Account</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;