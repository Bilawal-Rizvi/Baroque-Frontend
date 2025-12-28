import React, { useState } from "react";

function Bottomdel() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    { id: 1, icon: "fa-box", title: "PRODUCT DETAILS", content: "Product details content here..." },
    { id: 2, icon: "fa-plane-departure", title: "DELIVERY", content: "Delivery information here..." },
    { id: 3, icon: "fa-tag", title: "DESCRIPTION", content: "Description content here..." },
    { id: 4, icon: "fa-rotate", title: "RETURN AND EXCHANGE", content: "Return policy here..." },
    { id: 5, icon: "fa-leaf", title: "CARE AND INSTRUCTIONS", content: "Care instructions here..." }
  ];

  return (
    <>
      <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-15 font-light">
        {sections.map((section, index) => (
          <div 
            key={section.id}
            className={`
              border-t 
              ${index === sections.length - 1 ? 'border-b' : ''}
            `}
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center gap-3 sm:gap-4 md:gap-5 pt-4 sm:pt-5 md:pt-6 pb-4 sm:pb-5 md:pb-6 w-full hover:bg-gray-50 transition-colors px-2 sm:px-0"
            >
              <i className={`fa-solid ${section.icon} text-base sm:text-lg md:text-xl text-gray-700`}></i>
              <h2 className="flex justify-between items-center w-full text-sm sm:text-base md:text-lg font-medium">
                {section.title}
                <span 
                  className={`
                    text-xl sm:text-2xl font-extralight transition-transform duration-300
                    ${openSection === section.id ? 'rotate-45' : 'rotate-0'}
                  `}
                >
                  +
                </span>
              </h2>
            </button>
            
            {/* Expandable Content */}
            <div 
              className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${openSection === section.id ? 'max-h-96 opacity-100 pb-4 sm:pb-5 md:pb-6' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="pl-8 sm:pl-10 md:pl-12 pr-2 sm:pr-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                {section.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Bottomdel;