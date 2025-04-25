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
      <div className=" py-1 justify-between flex font-semibold">
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
            src={nameProfile?.profile || "/profile_man.png"}
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
            {nameProfile?.name||"Missing "}
          </p>
          {/* <p className="text-gray-500 text-sm">Level {level}</p> */}
        </div>
      </div>
    </div>
  );
}
