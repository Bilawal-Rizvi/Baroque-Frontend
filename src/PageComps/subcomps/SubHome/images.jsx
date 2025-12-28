import React from "react";
import { useNavigate } from "react-router-dom";
function Images(props) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="m-1.5 overflow-hidden  h-160 w-max  relative "
        onClick={() => navigate("/stitched")}
      >
        <img
          src={props.URL}
          className="h-160 w-140  block ease-in duration-2000   hover:scale-120"
          alt=""
        />
        <button
          data-text={props.title}
          className=" p delay-200 text-black   border-black border  duration-1000 ease-in  relative  font-lighter  w-32 h-9.5 bottom-20  left-2/6  text-center  bg-white "
        >
          {props.title}
        </button>
      </div>
    </>
  );
}

export default Images;
