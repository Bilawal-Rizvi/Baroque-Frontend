import React from "react";

function Footer() {
  return (
    <>
      <div className="min-h-screen bg-gray-950 text-gray-300 p-6 sm:p-10">
        <div className="flex flex-col lg:flex-row w-full justify-between gap-8 lg:gap-20">
          {/* About Section */}
          <div className="flex flex-col gap-5 w-full lg:w-1/3">
            <h2 className="text-gray-300 text-xl font-semibold">ABOUT</h2>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Who We Are</li>
              <li className="hover:text-white cursor-pointer transition-colors">Our Responsibility</li>
              <li className="hover:text-white cursor-pointer transition-colors">Service We Provide</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="leading-relaxed">
                Our Shop: First Floor, Dolmen Mall, Shop No F-06, A Block DHA
                Phase 6, Lahore
              </li>
              <li className="flex gap-5 text-2xl mt-2">
                <i className="fa-brands fa-facebook-f hover:text-white cursor-pointer transition-colors"></i>
                <i className="fa-brands fa-instagram hover:text-white cursor-pointer transition-colors"></i>
                <i className="fa-brands fa-youtube hover:text-white cursor-pointer transition-colors"></i>
                <i className="fa-brands fa-tiktok hover:text-white cursor-pointer transition-colors"></i>
                <i className="fa-brands fa-whatsapp hover:text-white cursor-pointer transition-colors"></i>
              </li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div className="flex flex-col gap-5 w-full lg:w-1/3">
            <h2 className="text-gray-300 text-xl font-semibold">Customer Service</h2>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Dispatch Timeline</li>
              <li className="hover:text-white cursor-pointer transition-colors">Exchange Information</li>
              <li className="hover:text-white cursor-pointer transition-colors">Email: info@baroque.pk</li>
              <li>UAN 111-302-302</li>
              <li>WhatsApp: +92 325 7001111</li>
            </ul>
          </div>

          {/* Policies Section */}
          <div className="flex flex-col gap-5 w-full lg:w-1/3">
            <h2 className="text-gray-300 text-xl font-semibold">Policies</h2>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Refund Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Shipping Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition-colors">Legal</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 sm:mt-20 gap-4 sm:gap-0 border-t border-gray-800 pt-8">
          <p className="text-sm">Pakistan v</p>
          <p className="text-sm">© 2025 - BAROQUE</p>
          <div className="flex gap-5">
            <img
              src="\images\39-395774_visa-logo-visa-classic-logo-png-transparent-png.png"
              width="50"
              height="30"
              alt="Visa"
              className="object-contain"
            />
            <img 
              src="\images\Mastercard-logo.svg" 
              width="50" 
              height="30"
              alt="Mastercard"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;