import React from "react";
import Smallimg from "./Smallimg";
import { useProduct } from "../../Product.jsx";
import { useNavigate } from "react-router-dom";

function Smallcol({product, onImageClick}) {
  const navigate = useNavigate();
  
  if(!product){
    return <p className="text-center text-gray-500 text-sm py-4">Loading...</p>
  }
  
  return (
    <>
      {/* Desktop - Vertical Column */}
      <div className="hidden md:flex flex-col gap-3 lg:gap-4">
        {product.images.map((img) => (
          <div 
            key={img._id} 
            onClick={() => onImageClick(img.ImgUrl)}
            className="cursor-pointer transition-all duration-300 hover:opacity-80 hover:scale-105 border-2 border-transparent hover:border-gray-300 rounded-lg overflow-hidden"
          >
            <Smallimg URL={img.ImgUrl} />
          </div>
        ))}
      </div>

      {/* Mobile & Tablet - Horizontal Scroll */}
      <div className="md:hidden flex gap-2 sm:gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {product.images.map((img) => (
          <div 
            key={img._id} 
            onClick={() => onImageClick(img.ImgUrl)}
            className="shrink-0 w-20 sm:w-24 cursor-pointer transition-all duration-300 hover:opacity-80 border-2 border-transparent hover:border-gray-300 rounded-lg overflow-hidden"
          >
            <Smallimg URL={img.ImgUrl} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Smallcol;