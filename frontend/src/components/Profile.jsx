import React from "react";
import { FaArrowLeft } from "react-icons/fa";
export default function Profile({ activeItem, setActiveItem }) {
  return (
    <div className="p-6  h-[569px] rounded-lg  flex flex-col justify-center items-center">
      {/* Profile Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        {/* Profile Header */}
        <div
          onClick={() => {
            setActiveItem("");
            console.log("clicked");
          }}
          className="cursor-pointer"
        >
          <FaArrowLeft />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Your Profile</h1>
        </div>

        {/* Profile Details */}
        <div className="flex flex-col items-center space-y-2">
          {/* Username */}

          {/* Profile Picture */}
          <div className="relative">
            <img
              src="/profile_man.png"
              alt="Profile"
              className="rounded-full h-32 w-32 object-cover border-4 border-teal-500"
            />
            {/* Edit Icon */}
            <button className="absolute bottom-0 right-0 bg-teal-500 hover:bg-teal-700 text-white text-xs rounded-full p-1">
              ✏️
            </button>
          </div>

          {/* Gmail */}
          <div className="text-center">
            <p className="text-xl font-medium text-gray-700">pk_78</p>
            <p className="text-gray-800 font-medium">ID</p>
            <p className="text-gray-800 font-medium">Email</p>
            <p className="text-gray-800 font-medium">Gender</p>
            <p className="text-gray-800 font-medium">Age</p>
            <p className="text-gray-800 font-medium">Location</p>
            <p className="text-gray-800 font-medium">English</p>
            <p className="text-gray-800 font-medium">Mobile Number</p>

            <p className="text-gray-800 font-medium">Password</p>
          </div>
        </div>

        {/* Button for Edit Profile */}
        <div className="mt-8 text-center">
          <button
          onClick={()=>{Navigate("/editProfile")}}
          className="bg-teal-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 ease-in-out">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
