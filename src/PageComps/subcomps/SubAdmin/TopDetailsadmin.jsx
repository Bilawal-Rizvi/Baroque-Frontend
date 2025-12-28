import React, { useEffect } from 'react';
import { useAdmin } from '../../../Context/AdminContext';
import { useNavigate } from 'react-router-dom';

function TopDetailsadmin() {
  const { Data, GetData } = useAdmin();
  const navigate = useNavigate();

  // useEffect(() => {
  //   GetData();
  // }, []);

  const stats = [
    {
      id: 1,
      title: "Orders Pending",
      value: Data.PendingOrder || 0,
      icon: "fa-regular fa-clock",
      iconColor: "text-amber-400",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      clickable: false
    },
    {
      id: 2,
      title: "Orders Completed",
      value: Data.CompletedOrder || 0,
      icon: "fa-solid fa-circle-check",
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      clickable: false
    },
    {
      id: 3,
      title: "Total Orders",
      value: Data.TotalOrders || 0,
      icon: "fa-solid fa-clipboard-list",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      clickable: false
    },
    {
      id: 4,
      title: "Total Products",
      value: Data.TotalProducts || 0,
      icon: "fa-solid fa-box",
      iconColor: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      clickable: true,
      onClick: () => navigate("/admin/AllProducts")
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          onClick={stat.clickable ? stat.onClick : undefined}
          className={`
            flex flex-col items-center justify-between
            p-5 sm:p-6 rounded-xl border-2 shadow-sm
            transition-all duration-300
            ${stat.bgColor} ${stat.borderColor}
            ${stat.clickable 
              ? 'cursor-pointer hover:shadow-md hover:scale-105 active:scale-100' 
              : ''
            }
          `}
        >
          {/* Icon and Title */}
          <div className="flex flex-col items-center gap-3 w-full">
            <div className={`text-3xl sm:text-4xl ${stat.iconColor}`}>
              <i className={stat.icon}></i>
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 text-center">
              {stat.title}
            </h3>
          </div>

          {/* Value */}
          <div className="mt-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              {stat.value}
            </h2>
          </div>

          {/* Clickable Indicator */}
          {stat.clickable && (
            <div className="mt-3 text-xs sm:text-sm text-gray-600 flex items-center gap-1">
              <span>View All</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TopDetailsadmin;