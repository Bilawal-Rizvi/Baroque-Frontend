import React from 'react'
import Rightside from './subcomps/SubCheckout/Rightside'
import Leftside from './subcomps/SubCheckout/Leftside'
import Nav from './Nav'

function Checkout() {
  return (
    <>
      <Nav />
      
      <div className='flex flex-col lg:flex-row mt-20 sm:mt-24 md:mt-28 lg:mt-32 min-h-screen'>
        {/* Left Side - Form (Order: 1 on mobile, appears first) */}
        <div className='w-full lg:w-2/3 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-35 py-6 sm:py-8 md:py-10 lg:h-screen lg:overflow-y-auto order-1'>
          <Rightside />
        </div>
        
        {/* Right Side - Order Summary (Order: 2 on mobile, appears second) */}
        <div className='w-full lg:w-1/2 bg-gray-100 lg:bg-gray-200 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 lg:h-screen lg:overflow-y-auto order-2 lg:sticky lg:top-0'>
          <Leftside />
        </div>
      </div>
    </>
  )
}

export default Checkout