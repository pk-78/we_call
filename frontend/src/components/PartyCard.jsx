import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function PartyCard() {
  const navigate = useNavigate();
  return (
    <div className="border border-gray-200 rounded-xl shadow-lg w-80 bg-white overflow-hidden hover:shadow-4xl hover:shadow-light-blue/40 transition-all duration-300 ease-in-out transform hover:scale-105">
      {/* Image Section */}
      <div className="relative group">
        <img
          src="/car.jpg"
          alt="Party image"
          className="w-full h-[300px] object-cover cursor-pointer rounded-t-xl transform transition-transform duration-300 "
        />
        <button
          className={` flex gap-1 absolute top-2 right-2 bg-teal-600 bg-opacity-20 text-white text-sm py-1 px-3 rounded-full shadow-lg hover:bg-teal-700 focus:outline-none`}
        >
          <FaPlus className="mt-1" />
          Follow
        </button>
        {/* Join Button */}
      </div>

      {/* Content Section */}
      <div className="p-6 bg-gradient-to-br from-white to-gray-50">
        <div className="flex justify-between items-start mb-4">
          {/* Party Info */}
          <div className="flex items-center space-x-2">
            {/* Profile Image */}
            <img
              src="/profile_man.png"
              alt="Profile"
              onClick={() => navigate("/profile")}
              className="w-8 h-8 rounded-full cursor-pointer object-cover"
            />
            <div>
              <p
                className="text-xl font-bold text-teal-700 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                {" "}
                pk_78
              </p>
              <p className="text-sm text-gray-500">Join and make friends</p>
            </div>
          </div>
          {/* <div>
            <p className="text-lg font-bold text-teal-700">Owner: Priyanshu</p>
            <p className="text-sm text-gray-500">Join and make friends</p>
          </div> */}
          {/* Location */}
          <div className=" text-green-600 font-semibold text-lg px-4 py-1">
            India
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex justify-between  mb-4">
          <div className="flex justify-between gap-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              <p className="m-0">100+ people have joined</p>
            </div>
            <button
              onClick={() => navigate("/party-room")}
              className="bg-green-600 text-green-100 font-semibold text-lg px-4 py-1 rounded-full shadow-sm"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
