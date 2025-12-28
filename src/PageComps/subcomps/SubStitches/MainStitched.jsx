import React from "react";
import Sidebar from "./Sidebar";
import Clothes from "./Clothes";

function MainStitched({theimage}) {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-20 mb-12 sm:mb-16 md:mb-20 lg:mb-30 px-4 sm:px-6 lg:px-0">
        {/* Sidebar - Hidden on mobile (controlled by Sidebar component itself) */}
        <div className="lg:block">
          <Sidebar />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 w-full lg:w-auto">
          <Clothes newimage={theimage}/>
        </div>
      </div>
    </>
  );
}

export default MainStitched;  