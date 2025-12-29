import React from "react";

function Item(props) {
  const total = Number(props.price.replace(/,/g,""))* props.quantity
  return (
    <>
      <div className="flex s gap-3">
        <div className="border-3  border-white w-15 h-18  rounded-2xl flex justify-center items-center mb-5 relative">
          <div className="absolute top-0 right-0 bg-black rounded-lg text-white pl-1 pr-1 ">{props.quantity}</div>
          <img
            src={props.URL}
            width="40"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-1 justify-center mb-5 ">
            <h1>{props.Title}</h1>
            <span className="text-gray-500"> UNSTITCHED / DEFAULT</span>
        </div>
        <h1  className="text-center mt-3 mb-5">Rs {total.toLocaleString()}</h1>
      </div>
    </>
  );
}

export default Item;
