import React from "react";
import { useNavigate } from "react-router-dom";
function Botcart(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col mr-35 ml-35 items-end justify-end mt-10 mb-10 gap-3">
        <h1 className="font-bold">TOTAL: PKR {props.TotalPrice}</h1>
        <span className="r text-gray-500">
          Tax included. Shipping calculated at checkout.
        </span>
        <button
          data-text="CHECKOUT"
          onClick={() => navigate("/checkout")}
          className=" p delay-200 text-black   border-black border  duration-1000 ease-in  relative  font-lighter  w-32 h-9.5   text-center  bg-white "
        >
          CHECKOUT
        </button>
      </div>
    </>
  );
}

export default Botcart;
