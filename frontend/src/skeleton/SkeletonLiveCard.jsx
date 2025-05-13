import React from "react";

export default function SkeletonLiveCard() {
  return (
    <div className="border border-gray-300 rounded-xl shadow-lg w-80 bg-white overflow-hidden animate-pulse">
      {/* Image Section */}
      <div className="relative bg-gray-200 h-[400px] w-full rounded-t-xl" />

      {/* Content Section */}
      <div className="px-4 py-2 bg-gradient-to-br from-white to-gray-50 space-y-4">
        <div className="flex justify-between items-start">
          {/* Left: Avatar and Name */}
          <div className="flex items-center space-x-2">
            {/* Profile Image */}
            <div className="w-9 h-9 bg-gray-300 rounded-full" />
            <div className="space-y-1">
              <div className="w-24 h-4 bg-gray-300 rounded" />
              <div className="w-12 h-3 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Right: Rate and Message */}
          <div className="space-y-2 text-right">
            <div className="w-20 h-5 bg-green-200 rounded-full" />
            <div className="w-24 h-4 bg-red-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
