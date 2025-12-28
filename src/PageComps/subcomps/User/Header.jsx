import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()

  return (
    <div className='bg-gray-300 h-20 pl-10 flex items-center' >
        <img src="\images\LOGO_PNG_V01_ca621119-9615-4843-a4c7-3cbf07d1452a.png " className='h-8' alt="" />
        <button onClick={ ()=> navigate("/")} className='p-2 ml-4 text-xl cursor-pointer rounded-lg   hover:bg-gray-400 text-white transition-all'>Shop</button>
    </div>
  )
}

export default Header