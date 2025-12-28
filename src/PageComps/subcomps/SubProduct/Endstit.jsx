import React from "react";
import { useImages } from "../../../Context/ImageCOntext";
import { useNavigate } from "react-router-dom";

function Endstit({ botimg }) {
  const { images } = useImages();
  const navigate = useNavigate();

  const HandleProduct = (productid) => {
    navigate(`/product/${productid}`);
    window.scrollTo(0, 0); // Scroll to top instead of reload
  };

  // Get only first 4 products for related products section
  const relatedProducts = images.slice(0, 4);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-10 lg:px-15 py-6 sm:py-8 md:py-10">
        {relatedProducts.map((image, index) => (
          <div
            key={image._id || image.id || `product-${index}`}
            onClick={() => {
              HandleProduct(image._id);
            }}
            className="text-center relative flex flex-col items-center w-full cursor-pointer group"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-3/4 w-full h-full mb-3 sm:mb-4">
              <img
                src={image.images[0].ImgUrl}
                alt={image.Title || "Product"}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />

              {/* Quick View Overlay - Desktop Only */}
              <div className="hidden md:flex absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 items-center justify-center">
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black px-4 py-2 text-xs font-semibold rounded-full hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    HandleProduct(image._id);
                  }}
                >
                  QUICK VIEW
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-2 w-full">
              <p className="text-xs sm:text-sm md:text-base text-gray-800 font-medium line-clamp-2 mb-2 hover:text-black transition-colors">
                {image.Title || "Product Title"}
              </p>
              <h2 className="text-sm sm:text-base md:text-lg font-bold text-black mb-1">
                PKR {image.Price?.toLocaleString() || "0"}
              </h2>
              <span className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide font-light">
                VELVET
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Endstit;