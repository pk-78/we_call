import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Task({ activeItem, setActiveItem }) {
  return (
    <div className="p-6 bg-gray-50 h-[569px] rounded-lg  flex flex-col justify-center items-center">
      {/* Task Container */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        {/* Header */}
        <div
          onClick={() => {
            setActiveItem(!activeItem);
            console.log("clicked");
          }}
          className="cursor-pointer"
        >
          <FaArrowLeft />
        </div>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Daily Tasks</h1>
          <p className="text-gray-600">Complete these tasks to earn rewards!</p>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {/* Task Item */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-800 font-medium">Use 1 card</p>
            <span className="text-pink-500">🃏</span>
          </div>

          {/* Task Item */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-800 font-medium">Recharge</p>
            <span className="text-yellow-500">🔋</span>
          </div>

          {/* Task Item */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-800 font-medium">Get a 5-star rating</p>
            <span className="text-yellow-500">⭐️</span>
          </div>

          {/* Task Item */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-800 font-medium">Follow 1 person</p>
            <span className="text-blue-500">👥</span>
          </div>

          {/* Task Item */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-800 font-medium">
              Get followed by 1 person
            </p>
            <span className="text-green-500">👤</span>
          </div>
        </div>
      </div>
    </div>
  );
}
