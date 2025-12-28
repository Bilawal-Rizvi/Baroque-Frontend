import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../../Context/CarContext";
import { TokenVerifier } from "../../../Context/ValidateContext";

function Middel() {
  const navigate = useNavigate();
  const [active, setActive] = useState(true);
  const [count, setCount] = useState(1);
  const { verifyAndSync } = TokenVerifier();
  const { id } = useParams();
  const { addProduct } = useCart();

  const userChecker = useCallback(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("please login first");
      return navigate("/login");
    }
    return user._id;
  }, [navigate]);

  const AddingProduct = useCallback(async (id, count) => {
    const userid = userChecker();
    if (!userid) {
      return;
    }
    const verify = verifyAndSync();
    
    if (verify) {
      await addProduct(id, count);
      navigate("/cart");
    } else {
      navigate("/login");
    }
  }, [userChecker, verifyAndSync, addProduct, navigate]);

  return (
    <>
      <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-5">
        {/* Type Selection */}
        <div className="flex flex-col gap-3">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide">
            TYPE:
          </h2>
          <div className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap">
            <button
              className={`
                flex-1 sm:flex-initial border-2 font-light h-10 sm:h-11 md:h-12 
                px-4 sm:px-6 md:px-8 rounded transition-all duration-300
                ${active 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-black border-gray-300 hover:border-black'
                }
              `}
              disabled={active}
              onClick={() => setActive(true)}
            >
              UNSTITCHED
            </button>
            <button
              className={`
                flex-1 sm:flex-initial border-2 font-light h-10 sm:h-11 md:h-12 
                px-4 sm:px-6 md:px-8 rounded transition-all duration-300
                ${!active 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-black border-gray-300 hover:border-black'
                }
              `}
              disabled={!active}
              onClick={() => setActive(!active)}
            >
              STITCHED
            </button>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex flex-col gap-3">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide">
            QUANTITY:
          </h2>
          <div className="flex items-center border-2 border-gray-300 rounded h-10 sm:h-11 md:h-12 w-full sm:w-40 md:w-44">
            <button
              onClick={() => count > 1 && setCount(count - 1)}
              className="flex-1 text-2xl sm:text-3xl font-light hover:bg-gray-100 transition-colors h-full"
              disabled={count <= 1}
            >
              -
            </button>
            <span className="flex-1 text-center text-base sm:text-lg font-medium">
              {count}
            </span>
            <button
              onClick={() => setCount(count + 1)}
              className="flex-1 text-xl sm:text-2xl font-light hover:bg-gray-100 transition-colors h-full"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => AddingProduct(id, count)}
          className="
            w-full h-11 sm:h-12 md:h-13 mt-2
            bg-black text-white font-semibold text-sm sm:text-base
            border-2 border-black rounded
            hover:bg-white hover:text-black
            transition-all duration-300 ease-in-out
            active:scale-95
          "
        >
          ADD TO CART
        </button>
      </div>
    </>
  );
}

export default Middel;