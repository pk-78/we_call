import React from "react";
import { FaArrowLeft } from "react-icons/fa";
export default function Profile({ activeItem, setActiveItem, user }) {
  return (
    <div className="p-6  h-[569px] rounded-lg  flex flex-col justify-center items-center">
      {/* Profile Container */}
      <div className="bg-white shadow-lg rounded-lg py-8 px-6 max-w-lg w-full">
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
          <div className="text-left">
            <p className="text-xl font-medium text-gray-700">{user.name}</p>
            <p className="text-gray-800 font-medium">ID: <span>{user.userName}</span></p>
            <p className="text-gray-800 font-medium">Email: <span>{user.email}</span> </p>
            <p className="text-gray-800 font-medium">Gender: <span>{user.gender}</span></p>
            <p className="text-gray-800 font-medium">Age: <span>{user.age}</span></p>
            <p className="text-gray-800 font-medium">Location: <span>{user.location}</span></p>
            <p className="text-gray-800 font-medium">Language: <span>{user.language}</span></p>
            

            {/* <p className="text-gray-800 font-medium">Password</p> */}
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
