import React, { useEffect, useMemo } from "react";
import "/src/App.css";
import { useNavigate } from "react-router-dom";
import { useImages } from "../../../Context/ImageCOntext";
function SingleImg(props) {
  const navigate = useNavigate();
  const {images}= useImages()
  useEffect(()=>{
  // console.log(images[0].images[0].ImgUrl)
  },[])
  if(!images)return <p>Loading...</p>
  const image= images.find(img=>{
      return  img.images[0].ImgUrl === props.URL
  })
  // console.log(image)
return (
  <>
    <div className="text-center relative w-full max-w-sm mx-auto group cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-2/4">
        <img
          src={props.URL}
          alt={image?.Title || "Product"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3 sm:mt-4 px-2">
        <p className="text-sm sm:text-base text-gray-800 font-medium line-clamp-2 mb-2">
          {image.Title}
        </p>
        <h1 className="text-base sm:text-lg md:text-xl font-bold text-black mb-1">
          PKR {image.Price.toLocalString()}
        </h1>
        <span className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">
          VELVET
        </span>
      </div>
    </div>
  </>
  );
}

export default SingleImg;
