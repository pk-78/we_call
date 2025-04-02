import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function PostImageCard({
  description = "No live Today",
  imageLink = "/tree.jpg",
  name = "pk78",
  // level = "1",
  data = "",
  setViewSinglePost
}) {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, notLoggedInPage, setNotLoggedInPage } =
    useContext(UserContext);

  console.log(data);
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white relative cursor-pointer" 
    onClick={() => setViewSinglePost(data)}>
      <div className="my-1 py-2 justify-between flex font-semibold">
        <span>Date:{data?.date}</span> <span>Time:{data?.time}</span>
      </div>
      {/* Main Image */}
      <div className="relative flex justify-center items-center">
        <img
          className="md:w-[300px] w-[330px] h-[400px]  object-cover rounded-lg"
          src={data?.imageLink ? data?.imageLink : imageLink}
          alt="Post image"
        />
        {/* Follow Button */}
        {/* <button
          onClick={() => {
            if (!isLoggedIn) {
              setNotLoggedInPage(true);
            } else {
            }
          }}
          className={` flex gap-1 absolute top-2 md:right-3 right-6 bg-teal-600 bg-opacity-20 text-white text-sm py-1 px-3 rounded-full shadow-lg hover:bg-teal-600 focus:outline-none`}
        >
          <FaPlus className="mt-1" />
          Follow
        </button> */}
      </div>
      <div className="pl-4  text-sm">
        <p>{data?.description ? data?.description : description}</p>
      </div>
      {/* Profile Section */}
      <div className="flex items-center px-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full cursor-pointer"
            src="/profile_man.png"
            onClick={() => navigate("/profile")}
            alt="Profile"
          />
        </div>

        {/* User Info */}
        <div className="ml-4 mb-1">
          <p
            className="text-gray-700 text-base font-semibold cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            {name}
          </p>
          {/* <p className="text-gray-500 text-sm">Level {level}</p> */}
        </div>
      </div>
    </div>
  );
}
