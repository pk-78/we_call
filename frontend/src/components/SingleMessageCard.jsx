import React from "react";

export default function SingleMessageCard({ username, status = "false" }) {
  return (
    <div className="flex items-center p-1 bg-white shadow-md rounded-lg">
      {/* Profile Image */}
      <div className="w-12 h-12 flex">
        <img
          src="/profile_man.png"
          alt="profile"
          className="w-full h-full rounded-full object-cover"
        />
        <div
          className={`"inline-block w-2 h-2  rounded-full"text-sm rounded-full  ${
            status !=="false" ? "bg-green-500" : "text-gray-500"
          }`}
        ></div>
      </div>

      {/* Username and Notification */}
      <div className="ml-4 flex justify-between">
        <div className="font-semibold text-gray-800">{username}</div>

        <div
          className={`"inline-block w-2 h-2  rounded-full"text-sm rounded-full  ${
            status !=="false" ? "bg-green-500" : "text-gray-500"
          }`}
        ></div>
      </div>
    </div>
  );
}
