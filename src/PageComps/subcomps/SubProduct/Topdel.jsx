import React from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../../Product";

function Topdel() {
  const {product, productid} = useProduct();
  
  if(!product){
    return <p className="text-center text-gray-500 text-sm py-4">Loading...</p>
  }
  
  return (
    <>
      <div className="flex flex-col gap-2 sm:gap-3 border-b pb-4 sm:pb-5">
        <h1 className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium">
          {product.Title}
        </h1>
        <b className="text-xl sm:text-2xl md:text-3xl text-black">
          PKR {product.Price?.toLocaleString()}
        </b>
        <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
          EWUF4306 ● 3 PIECE
        </span>
      </div>
    </>
  );
}

export default Topdel;