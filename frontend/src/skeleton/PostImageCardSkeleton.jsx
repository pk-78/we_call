// components/PostImageCardSkeleton.jsx
import React from "react";

export default function PostImageCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg h-auto p-1 bg-white animate-pulse">
      <div className="py-3 justify-between flex font-semibold text-gray-300">
        <span className="w-24 h-4 bg-gray-300 rounded"></span>
        <span className="w-24 h-4 bg-gray-300 rounded"></span>
      </div>

      <div className="relative flex justify-center items-center mt-2">
        <div className="md:w-[300px] w-[330px] h-[400px] bg-gray-300 rounded-lg" />
      </div>

      <div className="pl-4 mt-2 text-sm">
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-1"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
      </div>

      <div className="flex items-center px-4 mt-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="ml-4 space-y-2">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
