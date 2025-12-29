import React, { useEffect, useState } from 'react'
import Header from './subcomps/User/Header'
import { useAuth } from '../Context/Authcontext'
import { replace, useNavigate } from 'react-router-dom';
import { TokenVerifier } from '../Context/ValidateContext';
import UserCart from './subcomps/User/UserCart';
function User() {
    const navigate = useNavigate();
        const {logout,user,loading} = useAuth();
      const [veryfying,setVerifying] = useState();
  useEffect(()=>{
     if (loading) return;
    if(!user){
       
      
      if (!user) {
        navigate("/login", { replace: true });
        return;
      }
    }
  },[])
    // ✅ Jab tak loading hai, loading screen dikhao
  if (loading || veryfying) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
       <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  const Handlelogout = ()=>{
    logout();
    navigate("/",{replace:true})
  }
   if (!user) {
    return null; // Redirect ho jayega useEffect se
  }
  return (
    <>
    <Header/>
    <div className='ml-14 mt-4 mr-14'>
        <h1 className='text-3xl font-bold'>Profile:</h1>
        <h1 className='mt-2 text-2xl'>Name:{user.name}</h1>
        <h1 className='mt-2 text-2xl'>Email:{user.email}</h1>
    </div>
    <div className='ml-14 mt-4 mr-14 p-5 bg-gray-300 rounded-lg'>
        <h1 className='text-3xl'>Orders:</h1>
        <div className='mt-3 bg-white p-5 rounded-lg'>   
          <UserCart/>
        </div>
    </div>
    <div className='flex justify-end mr-14'>
        <button className='text-white bg-black p-4 mt-4 mb-4 rounded-xl' onClick={Handlelogout}>Log Out</button>
    </div>
    </>
    
  )
}

export default User