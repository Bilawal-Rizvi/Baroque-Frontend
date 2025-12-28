import React from 'react';
import Nav from './Nav';
import TopDetailsadmin from './subcomps/SubAdmin/TopDetailsadmin';
import { useAuth } from '../Context/Authcontext';
import { useNavigate } from 'react-router-dom';
import Orders from './subcomps/SubAdmin/Orders';

function Admin() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const Handlelogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <Nav />
      
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 pb-12">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto pt-20 sm:pt-24 md:pt-28 lg:pt-32">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10 md:mb-12">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Manage your store and orders
              </p>
            </div>
            
            {/* Logout Button */}
            <button 
              onClick={Handlelogout}  
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-sm sm:text-base rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg active:scale-95"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Log Out</span>
            </button>
          </div>

          {/* Top Details Section */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <TopDetailsadmin />
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
              Recent Orders
            </h2>
            <Orders />
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;