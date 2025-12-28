import React from "react";
import Images from "./subcomps/SubHome/images";
import "/src/App.css";
import TriImg from "./subcomps/SubHome/TriImg";
import News from "./subcomps/SubHome/News";
import Header from "./subcomps/SubHome/Header";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

function Home() {
  return (
    <>
      <Nav  />
      <Header />
      <h1 className=" text-4xl mt-10 text-center">OWN YOUR NEW LOOK</h1>
      <div className="flex content-center flex-wrap justify-center  mt-20 gap-10 ">
        <Images
          URL="\images\46_d956ecb9-b464-409b-8d97-807082aa862c.webp"
          title="FORMALS"
        />
        <Images
          URL="\images\45_e2ac7bbf-dd5e-4a56-9044-b6339c35bbe2.webp"
          title="WINTER"
        />
      </div>
      <h1 className=" text-4xl mt-10 text-center">READY TO WEAR</h1>
      <div className=" flex content-center flex-wrap justify-center  mt-20 gap-10">
        <TriImg
          URL="\images\180_9b99d0ac-2421-44fe-b448-2eab8e0c1a5a.jpg "
          title="Shirts"
        />
        <TriImg
          URL="\images\169_3dd8b1e1-e19e-48df-ba65-99d2ae6d93e2.jpg "
          title="Velvets"
        />
        <TriImg
          URL="\images\196_58328ca8-6bb3-41e8-a711-f66511be7abe.jpg"
          title="Winters"
        />
      </div>
      <h1 className="text-4xl mt-10 text-center">CHANTELLE COLLECTION</h1>
      <div className="flex content-center flex-wrap justify-center  mt-20 gap-10 ">
        <Images
          URL="\images\31_039a628f-2dfe-4b3d-a267-c48233630563.webp"
          title="UNSTICHED"
        />
        <Images
          URL="\images\45_e2ac7bbf-dd5e-4a56-9044-b6339c35bbe2.webp"
          title="STITCHED"
        />
      </div>
      <News />
    </>
  );
}

export default Home;
