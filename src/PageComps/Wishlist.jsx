import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

function Wishlist() {
  return (
    <>
    <div>
        <Nav />
    </div>
    <div className='w-full h-100 flex flex-col justify-center items-center'>
             <i className="fa-regular fa-heart text-gray-500 text-8xl"></i>
        <h1 className="text-4xl text-gray-500 font-bold">Coming Soon.....</h1> </div>
    <div>
        <Footer />
    </div>
    </>
  )
}

export default Wishlist