import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbCardsFilled } from "react-icons/tb";
import { MdTask } from "react-icons/md";
import { GiCrossedBones } from "react-icons/gi";
import DailyCheckIn from "../components/DailyCheckIn";
import Invitation from "../components/Invitation";
import Message from "../components/Message";
import Level from "../components/Level";
import Task from "../components/Task";
import BackPack from "../components/BackPack";
import Profile from "../components/Profile";
import { coins } from "../url/coins";
import { FaArrowLeft, FaRegStar, FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import UserContext from "../context/UserContext";
import { FaCoins } from "react-icons/fa6";
import { SiBasicattentiontoken } from "react-icons/si";
import axios from "axios";
import { url } from "../url/url";
import toast from "react-hot-toast";
import SettingSkeleton from "../skeleton/SettingSkeleton";

export default function Setting() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("");
  const [dailyCheckIn, setDailyCheckIn] = useState(false);
  const [user, setUser] = useState("");
  const { id, userDetail } = useContext(UserContext);
  const [fullStar, setFullStar] = useState(5);
  const [halfStar, setHalfStar] = useState(0);
  const [emptyStar, setEmptyStar] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);
  const [selectedBannerFile, setSelectedBannerFile] = useState(null);
  const isUser = localStorage.getItem("isUser");
  const [loading, setLoading]= useState(false)
  const [uploadBannerLoading, setUploadBannerLoading]= useState(false)
  const [uploadProfileLoading, setUploadProfileLoading]= useState(false)

  useEffect(() => {
    
    const fetchUserDetail = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${url}/api/user/getuser/${id}`);
        console.log(response);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        toast.error("Something wrong while fetching details");
      }
      setLoading(false)
    };

    if (id) {
      fetchUserDetail();
    }
  }, [id]);

  useEffect(() => {
    const showRating = async () => {
      const intPart = Math.trunc(user?.rating);
      setFullStar(intPart);
      const fractionPart = user?.rating - intPart;
      setHalfStar(fractionPart);
      if (fractionPart > 0) {
        const leftPart = 4 - intPart;
        setEmptyStar(leftPart);
      } else {
        const leftPart = 5 - intPart;
        setEmptyStar(leftPart);
      }
      console.log(fullStar, halfStar, emptyStar);
    };
    showRating();
  }, [user?.rating]);

  coins;
  console.log("id mila", id);

  const renderComponent = () => {
    switch (activeItem) {
      case "message":
        return (
          <Message activeItem={activeItem} setActiveItem={setActiveItem} />
        );
      case "level":
        return (
          <Level
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            myLevel={user?.level}
            myConsumption={user?.coinConsumption}
          />
        );
      case "task":
        return <Task activeItem={activeItem} setActiveItem={setActiveItem} />;
      case "backpack":
        return (
          <BackPack activeItem={activeItem} setActiveItem={setActiveItem} />
        );
      case "invitation":
        return (
          <Invitation activeItem={activeItem} setActiveItem={setActiveItem} />
        );
      case "profile":
        return (
          <Profile
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            user={user}
          />
        );
      default:
        return null;
    }
  };

  const handleButtonClick = (item) => {
    setActiveItem(activeItem === item ? "" : item);
  };
  const handleProfileImage = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
    // console.log(file)
    if (file) {
      setSelectedProfileFile(URL.createObjectURL(file));
    }
  };
  const handleBannerImage = (event) => {
    const file = event.target.files[0];
    setBannerImage(file);
    // console.log(file)
    if (file) {
      setSelectedBannerFile(URL.createObjectURL(file));
    }
  };
  const handleUploadProfile = async () => {
    console.log(profileImage);
    if (!profileImage) {
      toast.error("No image found please try again");
    }
    if (!id) {
      console.log("No id found");
    }
    setUploadProfileLoading(true)
    try {
      const formData = new FormData();
      formData.append("profilePicture", profileImage);
      const response = await axios.post(
        `${url}/api/user/updateProfile/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Profile Updated SuccessFully");
        setProfileImage(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
    setUploadProfileLoading(false)
  };
  const handleUploadBanner = async () => {
    if (!bannerImage) {
      toast.error("No image found please try again");
    }
    if (!id) {
      console.log("No id found");
    }
    setUploadBannerLoading(true)
    try {
      const formData = new FormData();
      formData.append("bannerImage", bannerImage);
      const response = await axios.post(
        `${url}/api/user/updatebanner/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Cover Picture Updated SuccessFully");
        setBannerImage(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
    setUploadBannerLoading(false)
  };
  if (loading) {
    return (
      <div className="flex justify-center items-start p-2 sm:p-6 bg-gray-200 min-h-screen">
        <SettingSkeleton />
      </div>
    );
  }
  

  return (
    <div className="flex justify-center items-start p-2 mb-10 sm:p-6 bg-gray-200 min-h-screen">
      {/* Settings Card */}

      {/* Component Slide-in Effect */}
      {!activeItem ? (
        <div className="relative bg-white shadow-lg rounded-lg w-full  sm:max-w-md md:max-w-lg lg:max-w-3xl p-4 sm:p-6">
          <div className="flex flex-col items-start">
            <div className=" relative w-full lg:space-y-2">
              <img
                src={
                  selectedBannerFile
                    ? selectedBannerFile
                    : user?.coverImage
                    ? user?.coverImage
                    : "/random_profile.jpg"
                }
                alt="Cover"
                className="w-full object-cover rounded-lg mb-4"
              />
              <label
                htmlFor="bannerPicture"
                className="cursor-pointer absolute top-0 right-0 opacity-80 bg-teal-600 hover:bg-teal-700 text-white text-xs rounded-full p-1 transition duration-300 ease-in-out"
              >
                ✏️
              </label>
              <input
                id="bannerPicture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBannerImage}
              />
            </div>
            <div className="flex gap-1 md:gap-1 my-1">
              <button
                onClick={() => handleButtonClick("level")}
                className={` md:px-8 px-1  text-sm md:text-lg bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeItem === "level" ? "bg-gray-300" : ""
                }`}
              >
                <p className="text-gray-700 font-semibold">Level</p>
              </button>
              {/* <button
                onClick={() => handleButtonClick("task")}
                className={` md:px-8 px-1  text-sm md:text-lg bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeItem === "task" ? "bg-gray-300" : ""
                }`}
              >
                <p className="text-gray-700 font-semibold">Task</p>
              </button> */}

              {/* <button
                onClick={() => handleButtonClick("backpack")}
                className={` md:px-8 px-1  text-sm md:text-lg bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeItem === "backpack" ? "bg-gray-300" : ""
                }`}
              >
                <p className="text-gray-700 font-semibold">Backpack</p>
              </button>
              <button
                onClick={() => handleButtonClick("invitation")}
                className={` md:px-8 px-1  text-sm md:text-lg bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeItem === "invitation" ? "bg-gray-300" : ""
                }`}
              >
                <p className="text-gray-700 font-semibold">Invitation</p>
              </button> */}
              <button
                onClick={() => handleButtonClick("profile")}
                className={` md:px-8 px-1  text-sm md:text-lg bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeItem === "profile" ? "bg-gray-300" : ""
                }`}
              >
                <p className="text-gray-700 font-semibold">Profile</p>
              </button>
              <button
                onClick={() => navigate("/pricing")}
                className={` md:px-8 px-1  text-sm md:text-lg bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeItem === "task" ? "bg-gray-300" : ""
                }`}
              >
                <p className="text-gray-700 font-semibold">Recharge</p>
              </button>
            </div>

            <div className="relative w-full">
              <div className="relative ">
                <img
                  src={
                    selectedProfileFile
                      ? selectedProfileFile
                      : user?.avatar
                      ? user?.avatar
                      : "/profile_man.png"
                  }
                  alt="Profile"
                  className="rounded-full h-20 w-20 sm:h-24 sm:w-24 object-cover border-4 border-teal-500"
                />
                <label
                  htmlFor="profilePicture"
                  className="cursor-pointer absolute bottom-0 left-16 bg-teal-500 hover:bg-teal-700 text-white text-xs rounded-full p-1 transition duration-300 ease-in-out"
                >
                  ✏️
                </label>
                <input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImage}
                />
              </div>

              <div>
                <button
                  onClick={() => {
                    setDailyCheckIn(true);
                  }}
                  className="absolute text-2xl sm:text-3xl top-2 right-2 text-yellow-500 hover:text-yellow-600"
                >
                  <MdTask className="cursor-pointer" />
                </button>

                {bannerImage && (
                  <button
                    onClick={handleUploadBanner}
                    className="absolute text-base font-semibold py-1 bg-teal-600 px-2 rounded text-white  top-18 right-2"
                  >
                   <div className="flex justify-center items-center">
                {uploadBannerLoading ?"Uploading..." : "Upload Banner"}
              </div>
                  </button>
                )}
                {profileImage && (
                  <button
                    onClick={handleUploadProfile}
                    className="absolute text-base font-semibold py-1 bg-teal-600 px-2 rounded text-white  bottom-4 right-2"
                  >
                   <div className="flex justify-center items-center">
                {uploadProfileLoading ?"Uploading..."  : "Upload Profile"}
              </div>
                  </button>
                )}
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-sm">{user.description}</p>
            <div className="mt-2 ">
              <div className="">
                <div className="flex flex-wrap lg:justify-start space-x-3 mt-2">
                  <h3 className="text-lg font-semibold text-teal-600">
                    Language:
                  </h3>
                  {user?.language?.map((language, index) => (
                    <span className="bg-teal-200 px-3 py-1 my-1 rounded-full text-gray-800">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap  lg:justify-start space-x-3 mt-2">
                <h3 className="text-lg font-semibold text-teal-600">Hobby:</h3>
                {user?.hobby?.map((hobby, index) => (
                  <span
                    key={index}
                    className="bg-pink-400 px-3 py-1 my-1 rounded-full text-white"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats: Friends, Followers, Following */}
            <div className="flex justify-around gap-2 mt-6 text-center lg:justify-start lg:space-x-8">
              {/* <div className="flex flex-col">
                <span className="text-gray-600">Friends</span>
                <span className="text-xl font-bold">
                  {user?.otherProfile?.friends?.length}
                </span>
              </div> */}
              <div className="flex flex-col">
                <span className="text-gray-600">Followers</span>
                <span className="text-xl font-bold">
                  {user?.otherProfile?.followers?.length}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600">Following</span>
                <span className="text-xl font-bold">
                  {user?.otherProfile?.following?.length}
                </span>
              </div>
            </div>

            <div className="mt-6 flex  justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-700">
                  Rating: <span>{user?.rating}</span>
                </h3>
              </div>
              <div className="flex items-center space-x-1">
                {/* Full Stars */}
                {[
                  ...Array(
                    Number.isInteger(fullStar) && fullStar > 0 ? fullStar : 0
                  ),
                ].map((_, index) => (
                  <FaStar
                    key={`full-${index}`}
                    className="text-yellow-400 text-xl"
                  />
                ))}

                {/* Half Star */}
                {halfStar > 0 && (
                  <FaStarHalfAlt className="text-yellow-400 text-xl" />
                )}

                {/* Empty Stars */}
                {[
                  ...Array(
                    Number.isInteger(emptyStar) && emptyStar > 0 ? emptyStar : 0
                  ),
                ].map((_, index) => (
                  <FaRegStar
                    key={`empty-${index}`}
                    className="text-yellow-400 text-xl"
                  />
                ))}
              </div>
            </div>
            <div className="flex">
              <div className="font-semibold">Gifts:</div>
              <div className="flex gap-4 px-4 py-2 bg-white rounded-lg ">
                {/* Single Gift */}
                <div className=" flex flex-col items-center hover:scale-105 transition-transform">
                  <img
                    src="butterfly.jpg"
                    alt="Butterfly"
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex gap-1 mt-1 text-teal-700 font-semibold">
                    {user?.gift?.butterfly}X
                  </div>
                </div>

                <div className=" flex flex-col items-center hover:scale-105 transition-transform">
                  <img
                    src="lollipop.jpg"
                    alt="Lollipop"
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex gap-1 mt-1 text-teal-700 font-semibold">
                    {user?.gift?.lollipop}X
                  </div>
                </div>

                <div className=" flex flex-col items-center hover:scale-105 transition-transform">
                  <img
                    src="rose.png"
                    alt="Rose"
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex gap-1 mt-1 text-teal-700 font-semibold">
                    {user?.gift?.rose}X
                  </div>
                </div>
              </div>
            </div>

            <div className="flex  flex-wrap justify-center lg:justify-start space-x-3 mt-2">
              <h3 className="text-lg font-bold text-teal-600 ">Tags:</h3>

              {user?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-teal-100 px-3 py-1  my-1 rounded-full text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Total Coins */}
            <div className="mt-4 bg-teal-100 px-4 py-2 sm:px-5 sm:py-3 rounded-lg shadow-lg w-full transition duration-500 ease-in-out transform hover:scale-105">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-semibold text-lg">
                  Total Coins:
                </span>
                <span className="text-xl gap-2 flex text-teal-600 font-bold">
                  {user?.coins} <FaCoins className="" />
                </span>
              </div>
              {isUser === "false" && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-semibold text-lg">
                    Total Earnings:
                  </span>
                  <span className="text-xl gap-2 flex text-teal-600 font-bold">
                    {user?.TotalEarning} <SiBasicattentiontoken />
                  </span>
                </div>
              )}
              {/* <div className="flex items-center justify-between">
                <span className="text-gray-700 font-semibold text-lg">
                  My Calling Price:
                </span>
                <span className="text-xl text-teal-600 font-bold">{user?.rate}{" "}coins/min</span>
              </div> */}
              {/* <div className="flex justify-between mt-1">
                <div className="flex items-center space-x-2">
                  <TbCardsFilled className="text-pink-400 text-2xl sm:text-3xl" />
                  <p className="text-gray-800 font-semibold text-lg sm:text-xl">
                    2
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <TbCardsFilled className="text-orange-400 text-2xl sm:text-3xl" />
                  <p className="text-gray-800 font-semibold text-lg sm:text-xl">
                    3
                  </p>
                </div>
              </div> */}
            </div>

            {/* Buttons */}
          </div>
        </div>
      ) : (
        <div
          className={`ml-8 w-full sm:w-1/2 transform transition-transform duration-500 ease-in-out`}
        >
          {renderComponent()}
        </div>
      )}

      {/* Daily Check-In Modal */}
      {dailyCheckIn && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg p-4">
            <button
              onClick={() => setDailyCheckIn(false)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              <GiCrossedBones size={24} />
            </button>
            <DailyCheckIn checkIn={user?.dailyCheckIn} />
          </div>
        </div>
      )}
    </div>
  );
}
