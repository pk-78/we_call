// components/SettingSkeleton.jsx
import React from "react";

export default function SettingSkeleton() {
  return (
    <div className="bg-white shadow-lg rounded-lg w-full  sm:max-w-md md:max-w-lg lg:max-w-3xl p-4 sm:p-6 animate-pulse">
      <div className="w-full h-60 bg-gray-300 rounded-lg mb-4" />

      <div className="flex gap-2 mb-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex-1 h-8 bg-gray-300 rounded-lg" />
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <div className="h-20 w-20 bg-gray-300 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/2" />
          <div className="h-4 bg-gray-300 rounded w-1/3" />
        </div>
      </div>
      <div>
        <div className="flex items-center my-2 ">
          <div className="h-4 bg-gray-300 rounded w-1/12 mr-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="flex items-center my-2">
          <div className="h-4 bg-gray-300 rounded w-1/12 mr-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
