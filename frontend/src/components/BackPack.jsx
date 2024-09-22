import React from "react";
import { RxBackpack } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa";

export default function BackPack({ activeItem, setActiveItem }) {
  return (
    <div className="p-6 bg-gray-50 h-[569px] rounded-lg  flex flex-col justify-center items-center">
      {/* Backpack Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        {/* Header */}
        <div
          onClick={() => {
            setActiveItem("");
            console.log("clicked");
          }}
          className="cursor-pointer"
        >
          <FaArrowLeft />
        </div>
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">My Backpack</h1>
        </div>

        {/* Backpack Icon */}
        <div className="text-teal-500 mb-6">
          <RxBackpack size={80} />
        </div>

        {/* Empty Message */}
        <div className="text-center">
          <p className="text-gray-700 text-lg">
            You have no items in your Backpack now.
          </p>
        </div>
      </div>
    </div>
  );
}
