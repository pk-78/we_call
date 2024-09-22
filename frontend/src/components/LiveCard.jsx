import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { coins } from "../url/coins";

export default function LiveCard({ rate }) {
  const buttonColor =
    coins >= rate
      ? "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
      : "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700";

  return (
    <div className="border border-gray-300 rounded-xl shadow-lg w-80 bg-white overflow-hidden hover:shadow-2xl hover:shadow-light-blue/30 transition-all duration-300 ease-in-out transform hover:scale-105">
      {/* Image Section */}
      <div className="relative group ">
        <img
          src="/car.jpg"
          alt="Wait for the images"
          className="w-full h-[400px] object-cover rounded-t-xl transform transition-transform duration-00 group-hover:scale-105"
        />
        <button
          className={` flex gap-1 absolute top-2 right-2 bg-teal-600 bg-opacity-20 text-white text-sm py-1 px-3 rounded-full shadow-lg hover:bg-teal-700 focus:outline-none`}
        >
            <FaPlus  className="mt-1"/>
          Follow
          
        </button>
        {/* Call Button */}
        <button
          className={`absolute bottom-4 right-4 ${buttonColor} text-2xl flex rounded-full p-3 text-white shadow-lg transition-all ease-in-out duration-200 transform hover:scale-105 focus:outline-none`}
        >
          <IoCallOutline />
        </button>
      </div>

      {/* Content Section */}
      <div className="px-4 py-2 bg-gradient-to-br from-white to-gray-50">
        <div className="flex justify-between items-start mb-4">
          {/* Name, Profile Image, and Location */}
          <div className="flex items-center space-x-2">
            {/* Profile Image */}
            <img
              src="/profile_man.png"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-xl font-bold text-teal-700">pk_78</p>
              <p className="text-sm text-teal-500">India</p>
            </div>
          </div>

          {/* Rate */}
          <div className="">
            <div className="bg-green-100 text-green-600 font-semibold text-base px-4 mb-1 rounded-full shadow-sm">
              {rate} coins/min
            </div>
            <button className="">
              {coins >= rate ? (
                <div></div>
              ) : (
                <p className="text-sm bg-red-100 px-2 rounded-full text-red-600">
                  You need to Recharge
                </p>
              )}
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            <p>Online Now</p>
          </div>
          <p className="text-gray-500">10k Followers</p>
        </div>
      </div>
    </div>
  );
}
