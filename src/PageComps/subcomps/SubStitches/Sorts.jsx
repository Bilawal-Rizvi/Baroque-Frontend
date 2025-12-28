import React from "react";

function Sorts() {
  return (
    <>
      <div className="flex border-t border-b">
        <div className="flex h-15 p-5 gap-3 justify-end items-center text-2xl   border-r">
          <i className="fa-solid fa-bars"></i>
          <i className="fa-solid fa-bars-staggered"></i>
          <i className="fa-solid fa-square"></i>
        </div>
        <h1 className=" self-center text-center w-240">
          <b>201 Products</b>
        </h1>
        <div className="border-l text-center flex items-center pl-2 ">
          <span className=" font-light self-center text-center   ">
            SORT BY V
          </span>
        </div>
      </div>
    </>
  );
}

export default Sorts;
