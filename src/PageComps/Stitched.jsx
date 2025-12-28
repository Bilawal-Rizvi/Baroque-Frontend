import React from "react";
import "/src/App.css";
import Topstit from "./subcomps/SubStitches/Topstit";
import Sorts from "./subcomps/SubStitches/Sorts";
import MainStitched from "./subcomps/SubStitches/MainStitched";
import Nav from "./Nav";
function Stitched({onlyimg}) {
  return (
    <>
      <Nav  />
      <Topstit />
      <Sorts />
      <MainStitched theimage={onlyimg}/>
    </>
  );
}

export default Stitched;
