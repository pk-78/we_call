import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import { url } from "../url/url";

export default function PostImageCard({
  description = "No live Today",
  imageLink = "/tree.jpg",
  name = "pk78",
  // level = "1",
  data = "",
  setViewSinglePost,
}) {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, notLoggedInPage, setNotLoggedInPage } =
    useContext(UserContext);
  console.log(data?.owner);
  const [nameProfile, setNameProfile] = useState(null);

  useEffect(() => {
    const findName = async () => {
      console.log("mai hu yha");
      try {
        console.log(`${url}/api/user/getNameAndProfile/${data?.owner}`);
        const res = await axios.get(
          `${url}/api/user/getNameAndProfile/${data?.owner}`
        );
        console.log("yha tk aaya");
        console.log(res?.data?.users);
        setNameProfile(res?.data?.users);
      } catch (error) {
        console.log(error);
      }
    };
    findName();
  }, []);

  console.log(data);
  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg h-auto p-1 bg-white relative cursor-pointer"
      onClick={() => setViewSinglePost(data)}
    >
      <div className=" px-4 py-2 bg-teal-600 text-white rounded-t-lg text-sm font-semibold tracking-wide">
        {/* <span className="text-white bg-teal-600 px-2 py-1 rounded-md shadow-sm">
          Schedule
        </span> */}
        <div className="flex justify-between">
          <span className="whitespace-nowrap">📆 {data?.date || "N/A"}</span>
          <span className="whitespace-nowrap">⏰ {data?.time || "N/A"}</span>
        </div>
      </div>

      {/* Main Image */}
      <div className="relative w-full max-w-[330px] mx-auto">
        <img
          className="w-full aspect-[3/4] object-cover rounded-lg"
          src={data?.imageLink || imageLink}
          alt="Post image"
        />
      </div>

      {/* Description */}
      <div className="px-4 py-2 text-sm text-gray-700">
        <p className="leading-snug">{data?.description || description}</p>
      </div>

      {/* Profile Section */}
      <div className="flex items-center px-4  border-t border-gray-100 ">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            className="w-9 h-9 rounded-full border border-gray-300 object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
            src={nameProfile?.profile || "/profile_man.png"}
            onClick={() => navigate(`/profile/${nameProfile._id}`)}
            alt="Profile"
          />
        </div>

        {/* User Info */}
        <div className="ml-3">
          <p
            className="text-gray-800 text-sm md:text-base font-semibold hover:text-teal-600 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate(`/profile/${nameProfile._id}`)}
          >
            {nameProfile?.name || "Unknown User"}
          </p>
          {/* <p className="text-gray-500 text-xs">Level {level}</p> */}
        </div>
      </div>
    </div>
  );
}
