import React, { useCallback, useState } from "react";
import { useCart } from "../../../Context/CarContext";

function Itemcart(props) {
  const [count, setCount] = useState(props.quant);
  const { RemoveProduct, addProduct, Removeitem } = useCart();
  const TotalitemPrice = Number(props.price.replace(/,/g, "")) * count;

  const Addingproduct = useCallback(() => {
    setCount(prev => prev + 1);
    addProduct(props.id, 1);
    window.location.reload();
  }, [props.id, addProduct]);

  const RemovingProduct = useCallback(() => {
    if (count <= 1) return;
    setCount(prev => prev - 1);
    RemoveProduct(props.id, count - 1);
    window.location.reload();
  }, [count, props.id, RemoveProduct]);

  const Removingitem = useCallback(() => {
    Removeitem(props.id);
    window.location.reload();
  }, [props.id, Removeitem]);

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:flex mt-5 items-center justify-between pb-4 border-b border-gray-300 gap-4">
        {/* Product Info */}
        <div className="flex items-center gap-4 lg:gap-5 flex-1">
          <img 
            src={props.URL} 
            alt={props.title}
            className="w-24 h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-cover rounded-md"
          />
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600 font-light uppercase">UNSTITCHED</span>
            <h2 className="font-light text-sm lg:text-base line-clamp-2">{props.title}</h2>
            <h3 className="font-bold text-sm lg:text-base">PKR {props.price.toLocaleString()}</h3>
            <p className="text-xs text-gray-600 font-light">UNSTITCHED / DEFAULT</p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col items-center gap-2">
          <div className="border border-gray-400 font-light h-9 w-24 flex items-center justify-between px-2 rounded">
            <button 
              className="text-2xl font-extralight hover:text-black transition-colors disabled:opacity-50"
              onClick={RemovingProduct}
              disabled={count <= 1}
            >
              -
            </button>
            <span className="text-base font-medium">{count}</span>
            <button 
              className="text-xl font-extralight hover:text-black transition-colors"
              onClick={Addingproduct}
            >
              +
            </button>
          </div>
          <button 
            className="text-xs underline text-gray-600 hover:text-black transition-colors"
            onClick={Removingitem}
          >
            remove
          </button>
        </div>

        {/* Total Price */}
        <div className="w-24 lg:w-32 text-right">
          <h3 className="text-sm lg:text-base font-semibold">PKR {TotalitemPrice.toLocaleString()}</h3>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden mt-4 pb-4 border-b border-gray-300">
        <div className="flex gap-3 mb-3">
          {/* Product Image */}
          <img 
            src={props.URL} 
            alt={props.title}
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md shrink-0"
          />
          
          {/* Product Info */}
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-xs text-gray-600 font-light uppercase">UNSTITCHED</span>
            <h2 className="font-light text-sm line-clamp-2">{props.title}</h2>
            <h3 className="font-bold text-sm">PKR {props.price}</h3>
            <p className="text-xs text-gray-600 font-light">UNSTITCHED / DEFAULT</p>
          </div>
        </div>

        {/* Quantity and Total - Mobile */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col items-start gap-2">
            <div className="border border-gray-400 h-9 w-24 flex items-center justify-between px-2 rounded">
              <button 
                className="text-2xl font-extralight"
                onClick={RemovingProduct}
                disabled={count <= 1}
              >
                -
              </button>
              <span className="text-base font-medium">{count}</span>
              <button 
                className="text-xl font-extralight"
                onClick={Addingproduct}
              >
                +
              </button>
            </div>
            <button 
              className="text-xs underline text-gray-600"
              onClick={Removingitem}
            >
              remove
            </button>
          </div>
          
          <div className="text-right">
            <h3 className="text-base font-semibold">PKR {TotalitemPrice.toLocaleString()}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Itemcart;