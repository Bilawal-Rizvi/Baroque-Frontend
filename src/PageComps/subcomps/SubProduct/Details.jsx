import React from "react";
import Topdel from "./Topdel";
import Middel from "./Middel";
import Bottomdel from "./Bottomdel";

function Details() {
  return (
    <>
      <div className="flex flex-col w-full lg:w-90 px-4 sm:px-6 lg:px-0 lg:mr-8 gap-4 sm:gap-6">
        <Topdel />
        <Middel />
        <Bottomdel />
      </div>
    </>
  );
}

export default Details;