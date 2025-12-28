import React from "react";

function Largeimg(props) {
  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        <img 
          src={props.url} 
          alt="Product" 
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
    </>
  );
}

export default Largeimg;