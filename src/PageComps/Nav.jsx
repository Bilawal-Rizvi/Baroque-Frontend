import React, { useState } from "react";
import "../app.css";
import { useNavigate } from "react-router-dom";
import { TokenVerifier } from "../Context/ValidateContext";
import { useAuth } from "../Context/Authcontext";

function Nav() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { verifyAndSync } = TokenVerifier();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUserClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const result = await verifyAndSync();
    if (result.isValid) {
      // console.log("✅ Token valid, navigating to profile");
      if (user.role !== "admin") {
        navigate("/user");
      } else {
        navigate("/admin");
      }
    } else {
      // console.log(result.message);
      logout();
      navigate("/login");
    }
    setIsMenuOpen(false);
  };

  const CartClick = async () => {
    const result = await verifyAndSync();
    if (result.isValid) {
      console.log("✅ Token valid, navigating to profile");
      navigate("/cart");
    } else {
      console.log("❌ Token invalid:", result.message);
      logout();
      navigate("/login");
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="relative">
        <div className="p-4 sm:p-2 h-auto sm:h-18 text-2xl border-b flex flex-wrap sm:flex-nowrap justify-between items-center absolute top-0 w-full hover:bg-white transition-all duration-1000 px-4 sm:px-10 bg-white sm:bg-transparent z-50">
          {/* Menu Icon - Mobile */}
          <button
            className="sm:hidden self-center order-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>

          {/* Hamburger for Desktop */}
          <p className="hidden sm:block self-center">
            <i className="fa-solid fa-bars text-2xl cursor-pointer"></i>
          </p>

          {/* Logo - Center on mobile, left-center on desktop */}
          <img onClick={()=> navigate("/")}
            src="\images\LOGO_PNG_V01_ca621119-9615-4843-a4c7-3cbf07d1452a.png"
            className="cursor-pointer w-24 sm:w-32 md:w-35 self-center h-auto order-2 sm:order-0 sm:ml-20 md:ml-40"
            alt="Logo"
          />

          {/* Right Icons - Desktop */}
          <div className="hidden sm:flex gap-3 md:gap-5 items-center text-lg md:text-2xl">
            <p className="self-center text-sm md:text-base cursor-pointer">PAKISTAN</p>
            <p className="self-center text-sm md:text-base">v</p>
            <p className="cursor-pointer hover:text-gray-600 transition-colors">
              <i className="fa-regular fa-user" onClick={handleUserClick}></i>
            </p>
            <p className="cursor-pointer hover:text-gray-600 transition-colors">
              <i className="fa-solid fa-cart-shopping" onClick={() => CartClick()}></i>
            </p>
            <p onClick={()=> navigate("/wishlist")} className="cursor-pointer hover:text-gray-600 transition-colors">
              <i className="fa-regular fa-heart"></i>
            </p>
          </div>

          {/* Mobile Icons - Right side */}
          <div className="flex sm:hidden gap-4 items-center text-xl order-3">
            <p className="cursor-pointer" onClick={handleUserClick}>
              <i className="fa-regular fa-user"></i>
            </p>
            <p className="cursor-pointer" onClick={() => CartClick()}>
              <i className="fa-solid fa-cart-shopping"></i>
            </p>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="sm:hidden w-full order-4 mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col gap-4 text-base">
                <button
                  className="text-left hover:text-gray-600 transition-colors flex items-center gap-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <span>Search</span>
                </button>
                <button
                  className="text-left hover:text-gray-600 transition-colors flex items-center gap-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fa-regular fa-heart"></i>
                  <span>Wishlist</span>
                </button>
                <div className="flex items-center gap-3 pt-2 border-t">
                  <span className="text-sm font-semibold">PAKISTAN</span>
                  <span className="text-sm">v</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Nav;