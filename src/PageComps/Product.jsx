import React, { use, useState, useEffect, useMemo } from "react";
import Details from "./subcomps/SubProduct/Details";
import Smallcol from "./subcomps/SubProduct/Smallcol";
import Largecol from "./subcomps/SubProduct/Largecol";
import { useNavigate, useParams } from "react-router-dom";
import { useImages } from "../Context/ImageCOntext";
import axios from "axios";
import Nav from "./Nav";

function useProduct() {
  const { id } = useParams();
  const { images, setImages } = useImages();
const BASE_URL = import.meta.env.VITE_BASE_URL;


  useEffect(() => {
    const fetchimages = async () => {
      if (images.length === 0) {
        const response = await axios.get(`${BASE_URL}/api/images`);
        setImages(response.data);
      }
    };
    fetchimages();
  }, [id, images.length, setImages]);

  const product = useMemo(() => {
    return images.find((img) => img._id === id);
  }, [images, id]);

  return { product, productid: id };
}

// Main Function
function Product({setonimg }) {
  const { product, productid } = useProduct();
  const [selectedImage, setSelectedImage] = useState(null);

  // Set default image when product is loaded
  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0].ImgUrl);
    }
  }, [product]);

  return (
    <>
      <Nav />
      
      {/* Product Detail Section */}
      <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-32 px-4 sm:px-6 lg:px-10 xl:px-13 border-b border-gray-300 pb-8 sm:pb-10 lg:pb-12">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-12 max-w-screen-2xl mx-auto">
          
          {/* Small Images - Horizontal on Mobile, Vertical on Desktop */}
          <div className="order-2 lg:order-1 w-full lg:w-auto lg:shrink-0">
            <Smallcol 
              product={product} 
              onImageClick={(ImgUrl) => {
                setSelectedImage(ImgUrl);
              }} 
            />
          </div>

          {/* Large Image - Full Width on Mobile, Flexible on Desktop */}
          <div className="order-1 lg:order-2 flex-1 w-full lg:w-auto">
            <div className="sticky top-20 lg:top-24">
              <Largecol img={selectedImage} />
            </div>
          </div>

          {/* Product Details - Full Width on Mobile, Fixed on Desktop */}
          <div className="order-3 w-full lg:w-90 xl:w-96 lg:shrink-0">
            <div className="sticky top-20 lg:top-24">
              <Details />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export { Product, useProduct };