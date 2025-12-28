import React from "react";
import "/src/Index.css";
import { useNavigate } from "react-router-dom";
function TriImg(props) {
  const navigate = useNavigate();
  return (
    <>
      <div onClick={()=> navigate("/stitched")} className="m-1.5 overflow-hidden  h-110 w-max  relative ">
        <img
          src={props.URL}
          className=" w-90 h-120  block ease-in duration-2000   hover:scale-120"
          alt=""
        />
        <button
          data-text={props.title}
          className=" p delay-200 text-black   border-black border  duration-1000 ease-in  relative  font-lighter  w-32 h-9.5 bottom-30  left-2/6  text-center  bg-white "
        >
          {props.title}
        </button>
      </div>
    </>
  );
}

export default TriImg;
