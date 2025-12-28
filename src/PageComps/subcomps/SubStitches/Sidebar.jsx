import React, { useState } from "react";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filterItems = [
    "Availability",
    "Price",
    "Type",
    "Fabric",
    "Size",
    "Pieces",
    "Product Style"
  ];

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-black text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <i className="fa-solid fa-filter"></i>
          <span>Filters</span>
        </button>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static top-0 left-0 h-full lg:h-auto
          bg-white z-50 lg:z-auto
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64 sm:w-72 lg:w-50
          shadow-xl lg:shadow-none
        `}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-2xl hover:text-gray-600"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        {/* Filter List */}
        <div className="px-4 sm:px-6 lg:pl-10 text-lg lg:text-xl font-light overflow-y-auto h-full lg:h-auto pb-20 lg:pb-0">
          <ul className="flex flex-col gap-4 lg:gap-5 pt-6 lg:pt-10 pb-6 lg:pb-10">
            {filterItems.map((item, index) => (
              <li
                key={index}
                className={`
                  flex justify-between items-center
                  ${index !== filterItems.length - 1 ? 'border-b' : ''}
                  pb-4 lg:pb-5
                  cursor-pointer
                  hover:text-gray-600 transition-colors
                `}
              >
                {item}
                <span className="transform transition-transform hover:rotate-180 duration-300">
                  <i className="fa-solid fa-chevron-down text-sm"></i>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;