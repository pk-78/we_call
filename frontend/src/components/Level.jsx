import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Level({ activeItem, setActiveItem }) {
  return (
    <div className="p-6 bg-gray-50 h-[569px] rounded-lg  flex flex-col justify-center items-center">
      {/* Level Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        {/* Header */}
        <div
          onClick={() => {
            setActiveItem("");
            console.log("kya hua", !activeItem);
            console.log("clicked");
          }}
          className="cursor-pointer"
        >
          <FaArrowLeft />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Your Level</h1>
          <p className="text-gray-600">Track your progress to the next level</p>
        </div>

        {/* Level Information */}
        <div className="space-y-6">
          {/* Current Level */}
          <div className="text-center">
            <p className="text-gray-700 text-xl font-medium">
              Your Current Level:
            </p>
            <p className="text-4xl text-teal-500 font-bold">4</p>
          </div>

          {/* Progress Bar */}
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-teal-600">
                  Level Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-teal-600">
                  46,000 coins needed
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-teal-100">
              <div
                style={{ width: "50%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
              ></div>
            </div>
          </div>

          {/* Message */}
          <div className="text-center">
            <p className="text-gray-700">
              You need to spend{" "}
              <span className="text-teal-600 font-semibold">46,000</span> more
              coins to reach
              <span className="text-teal-600 font-semibold"> Level 5</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
