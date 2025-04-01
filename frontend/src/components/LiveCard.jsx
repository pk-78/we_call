import React, { useContext } from "react";
import { IoCallOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { coins } from "../url/coins";
import RequestCall from "./RequestCall";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import { url } from "../url/url";
import toast from "react-hot-toast";
import FollowButton from "./FollowButton";

export default function LiveCard({
  rate,
  setCheckEnoughBalance,
  requestCall,
  setRequestCall,
  // id = "",
  user = "",
}) {
  const myId = localStorage.getItem("id");
 
  const navigate = useNavigate();
  const {
    isLoggedIn,
    setIsLoggedIn,
    notLoggedInPage,
    setNotLoggedInPage,
    followingList,
    userDetail

  } = useContext(UserContext);
  const isEligibleToCall =userDetail?.coins >= user?.rate;
  const buttonColor =
    userDetail?.coins >= user?.rate
      ? "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
      : "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700";
  // console.log(user);

  return (
    <div className="border border-gray-300 rounded-xl shadow-lg w-80 bg-white overflow-hidden hover:shadow-2xl hover:shadow-light-blue/30 transition-all duration-300 ease-in-out transform hover:scale-105">
      {/* Image Section */}
      <div className="relative group ">
        <img
          src={user?.avatar? user?.avatar:"/car.jpg"}
          
          alt="Wait for the images"
          onClick={() => {
            navigate(`/live-room/${user?._id}`);
          }}
          className="w-full h-[400px] object-cover cursor-pointer rounded-t-xl transform transition-transform duration-00 "
        />
        <div className="flex gap-1 absolute top-2 right-2">
          <FollowButton followingList={followingList} userId={user._id} />
        </div>
        {/* Call Button */}
        {/* <button
          onClick={() => {
            if (!isLoggedIn) {
              setNotLoggedInPage(true);
            } else {
              setRequestCall(true);
              isEligibleToCall
                ? setCheckEnoughBalance(true)
                : setCheckEnoughBalance(false);
            }
          }}
          className={`absolute bottom-4 right-4 ${buttonColor} text-2xl flex rounded-full p-3 text-white shadow-lg transition-all ease-in-out duration-200 transform hover:scale-105 focus:outline-none`}
        >
          <IoCallOutline />
        </button> */}
      </div>

      {/* Content Section */}
      <div className="px-4 py-2 bg-gradient-to-br from-white to-gray-50">
        <div className="flex justify-between items-start mb-4">
          {/* Name, Profile Image, and Location */}
          <div className="flex items-center space-x-2">
            {/* Profile Image */}
            <div className="relative">
            <img
              src={user?.avatar?user?.avatar:"/profile_man.png"}
              alt="Profile"
              onClick={() => navigate(`/profile/${user?._id}`)}
              className="  w-9 h-9 border-2 border-teal-600  rounded-full object-cover cursor-pointer"
            />
            <span className="absolute bottom-0 right-0 inline-block w-3 h-3 bg-green-500 rounded-full"></span>
            
            </div>
            <div>
              <p
                className="text-xl font-bold text-teal-700 cursor-pointer"
                onClick={() => navigate(`/profile/${user?._id}`)}
              >
                {user?.userName}
              </p>
              <p className="text-sm text-teal-500">India</p>
            </div>
          </div>

          {/* Rate */}
          <div className="">
            <div className="bg-green-100 text-green-600 font-semibold text-base px-4 mb-1 rounded-full shadow-sm">
              {user?.rate} coins/min
            </div>
            <button className="">
              {isEligibleToCall ? (
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
            
            {/* <p>Online Now</p>  */}
          </div>
          {/* <p className="text-gray-500">
            {user?.otherProfile?.followers?.length + " "} Followers
          </p> */}
        </div>
      </div>
    </div>
  );
}
