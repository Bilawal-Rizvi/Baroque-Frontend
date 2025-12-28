import React from "react";
import SingleImg from "./SingleImg";
import { useImages } from "../../../Context/ImageCOntext";
import { useNavigate } from "react-router-dom";

function Clothes() {
  const { images } = useImages();
  const navigate = useNavigate();
  
  const HandleProduct = (productid) => {
    navigate(`/stitched/${productid}`);
  };
// console.log(images)
  return (
    <>
      <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 px-2 sm:px-4 md:px-6 lg:px-8">
        {images && images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-h-screen overflow-y-auto pb-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
         {images?.map(img =>(
              <div 
                key={img._id || img.id || `product-${index}`} 
                onClick={() => { HandleProduct(img._id) }}
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-lg overflow-hidden"
              >
                <SingleImg URL={img.images?.[0]?.ImgUrl} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64 sm:h-80 md:h-96">
            <p className="text-gray-500 text-sm sm:text-base md:text-lg">No images available</p>
          </div>
        )}
      </div>  
    </>
  );
}

export default Clothes;