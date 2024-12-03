// import React, { useState } from "react";
// import { coins } from "../url/coins";
// import { useNavigate } from "react-router-dom";
// import Invitation from "../components/Invitation";
// import Message from "../components/Message";
// import Level from "../components/Level";
// import Task from "../components/Task";
// import BackPack from "../components/BackPack";
// import Profile from "../components/Profile";
// import { TbCardsFilled } from "react-icons/tb";
// import { MdTask } from "react-icons/md";
// import DailyCheckIn from "../components/DailyCheckIn";
// import { GiCrossedBones } from "react-icons/gi";
// import { GiTwoCoins } from "react-icons/gi";

// export default function Setting() {
//   const navigate = useNavigate();
//   const [activeItem, setActiveItem] = useState(""); // Store the active component
//   const [messageClicked, setMessageClicked] = useState("false");
//   const [dailyCheckIn, setDailyCheckIn] = useState(false);

//   const renderComponent = () => {
//     switch (activeItem) {
//       case "message":
//         return (
//           <Message
//             activeItem={activeItem}
//             messageClicked
//             setActiveItem={setActiveItem}
//           />
//         );
//       case "level":
//         return <Level activeItem={activeItem} setActiveItem={setActiveItem} />;
//       case "task":
//         return <Task activeItem={activeItem} setActiveItem={setActiveItem} />;
//       case "backpack":
//         return (
//           <BackPack activeItem={activeItem} setActiveItem={setActiveItem} />
//         );
//       case "invitation":
//         return (
//           <Invitation activeItem={activeItem} setActiveItem={setActiveItem} />
//         );
//       case "profile":
//         return (
//           <Profile activeItem={activeItem} setActiveItem={setActiveItem} />
//         );
//       default:
//         return null;
//     }
//   };

//   // Toggle function to handle button clicks
//   const handleButtonClick = (item, messageClicked) => {
//     messageClicked = "true";
//     setActiveItem(activeItem === item ? "" : item);

//     console.log("la bhaiya ", activeItem);
//   };

//   return (
//     <div className="flex justify-center items-start p-6 bg-gray-200 ">
//       {/* Settings Card */}
//       <div className="relative bg-white shadow-lg rounded-lg w-full max-w-md p-6">
//         <button
//           onClick={() => {
//             setDailyCheckIn(true);
//           }}
//           className="absolute text-3xl top-2 right-2 text-yellow-500 hover:text-yellow-600"
//         >
//           <MdTask className="cursor-pointer" />
//         </button>
//         <div className="flex flex-col items-center">

//           <div className="relative">
//             <img
//               src="/profile_man.png"
//               alt="Profile"
//               className="rounded-full h-24 w-24 object-cover border-4 border-teal-500"
//             />
//             <button className="absolute bottom-0 right-0 bg-teal-500 hover:bg-teal-700 text-white text-xs rounded-full p-1 transition duration-300 ease-in-out">
//               ✏️
//             </button>
//           </div>

//           {/* Username */}
//           <h2 className="text-2xl font-semibold text-gray-800 mt-2">pk_78</h2>
//           <p>This is my description</p>

//           {/* Stats: Friends, Followers, Following */}
//           <div className="flex justify-around w-full mt-2">
//             <div className="text-center">
//               <span className="block text-gray-600 font-medium">Friends</span>
//               <span className="block text-xl font-bold">120</span>
//             </div>
//             <div className="text-center">
//               <span className="block text-gray-600 font-medium">Followers</span>
//               <span className="block text-xl font-bold">250</span>
//             </div>
//             <div className="text-center">
//               <span className="block text-gray-600 font-medium">Following</span>
//               <span className="block text-xl font-bold">180</span>
//             </div>
//           </div>
//           <div className="flex justify-between">
//             <div>
//               <div className="">
//                 <div className="flex lg:justify-start space-x-3 mt-2">
//                   <span className="bg-teal-200 px-3 py-1 rounded-full text-gray-800">
//                     English
//                   </span>
//                   <span className="bg-teal-200 px-3 py-1 rounded-full text-gray-800">
//                     Hindi
//                   </span>
//                 </div>
//               </div>

//               {/* Hobbies Section */}
//               <div className="mt-2">
//                 <div className="flex justify-center lg:justify-start space-x-3 mt-2">
//                   <span className="bg-pink-400 text-white px-3 py-1 rounded-full">
//                     Dancer
//                   </span>
//                   <span className="bg-pink-400 px-3 py-1 rounded-full text-white">
//                     Singer
//                   </span>
//                   <span className="bg-pink-400 px-3 py-1 rounded-full text-white">
//                     Film Lover
//                   </span>
//                 </div>
//               </div>
//             </div>

//           </div>

//           {/* Total Coins */}
//           <div className="mt-4 mx-12 bg-teal-100  px-5 py-1 rounded-lg shadow-lg w-full transition duration-500 ease-in-out transform hover:scale-105">
//             {/* Total Coins Section */}
//             <div className="flex items-center justify-between">
//               <span className="text-gray-700 font-semibold text-lg">
//                 Total Coins:
//               </span>
//               <span className="text-xl text-teal-600 font-bold">{coins}</span>
//             </div>

//             {/* Stats Section */}
//             <div className="flex justify-between mt-1">
//               {/* Left Icon and Value */}
//               <div className="flex items-center space-x-2">
//                 <TbCardsFilled className="text-pink-400 text-3xl" />
//                 <p className="text-gray-800 font-semibold text-xl">2</p>
//               </div>

//               {/* Right Icon and Value */}
//               <div className="flex items-center space-x-2">
//                 <TbCardsFilled className="text-orange-400 text-3xl" />
//                 <p className="text-gray-800 font-semibold text-xl">3</p>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4 mt-4">
//             {/* Message */}
//             {/* <button
//               onClick={() => handleButtonClick("message", messageClicked)}
//               className={`p-4 w-44 bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
//                 activeItem === "message" ? "bg-gray-300" : ""
//               }`}
//             >
//               <p className="text-gray-700 font-semibold">Message</p>
//             </button> */}
//             {/* Level */}
//             <button
//               onClick={() => handleButtonClick("level")}
//               className={`p-4 w-44 bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
//                 activeItem === "level" ? "bg-gray-300" : ""
//               }`}
//             >
//               <p className="text-gray-700 font-semibold">Level</p>
//             </button>
//             {/* Task */}
//             <button
//               onClick={() => handleButtonClick("task")}
//               className={`p-4 w-44 bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
//                 activeItem === "task" ? "bg-gray-300" : ""
//               }`}
//             >
//               <p className="text-gray-700 font-semibold">Task</p>
//             </button>
//             {/* Backpack */}
//             <button
//               onClick={() => handleButtonClick("backpack")}
//               className={`p-4 w-44 bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
//                 activeItem === "backpack" ? "bg-gray-300" : ""
//               }`}
//             >
//               <p className="text-gray-700 font-semibold">Backpack</p>
//             </button>
//             {/* Invitation */}
//             <button
//               onClick={() => handleButtonClick("invitation")}
//               className={`p-4 w-44 bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
//                 activeItem === "invitation" ? "bg-gray-300" : ""
//               }`}
//             >
//               <p className="text-gray-700 font-semibold">Invitation</p>
//             </button>
//             {/* Profile */}
//             <button
//               onClick={() => handleButtonClick("profile")}
//               className={`p-4 w-44 bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
//                 activeItem === "profile" ? "bg-gray-300" : ""
//               }`}
//             >
//               <p className="text-gray-700 font-semibold">Profile</p>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Invitation Card with Slide-in Effect */}
//       {activeItem && (
//         <div
//           className={`ml-8 w-1/3 transform transition-transform duration-500 ease-in-out ${
//             activeItem
//               ? "translate-x-0 opacity-100"
//               : "translate-x-full opacity-0"
//           }`}
//         >
//           {renderComponent()}
//         </div>
//       )}
//       {dailyCheckIn && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//           <div className="relative bg-white rounded-lg p-4">
//             <button
//               onClick={() => {
//                 setDailyCheckIn(false);
//               }}
//               className="absolute top-2 right-2 text-red-600 hover:text-red-800"
//             >
//               <GiCrossedBones size={24} />
//             </button>
//             <DailyCheckIn />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useContext, useState } from "react";
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

export default function Setting() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(""); // Store the active component
  const [dailyCheckIn, setDailyCheckIn] = useState(false);
  const { userDetail, setuserDetail } = useContext(UserContext);

  console.log(userDetail)
  coins;

  const renderComponent = () => {
    switch (activeItem) {
      case "message":
        return (
          <Message activeItem={activeItem} setActiveItem={setActiveItem} />
        );
      case "level":
        return <Level activeItem={activeItem} setActiveItem={setActiveItem} />;
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
          <Profile activeItem={activeItem} setActiveItem={setActiveItem} />
        );
      default:
        return null;
    }
  };

  const handleButtonClick = (item) => {
    setActiveItem(activeItem === item ? "" : item);
  };

  return (
    <div className="flex justify-center items-start p-2 mb-4 sm:p-6 bg-gray-200 min-h-screen">
      {/* Settings Card */}

      {/* Component Slide-in Effect */}
      {!activeItem ? (
        <div className="relative bg-white shadow-lg rounded-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl p-4 sm:p-6">
          <div className="flex flex-col items-start">
            <div className="w-full lg:space-y-2">
              <img
                src="/random_profile.jpg"
                alt="Cover"
                className="w-full object-cover rounded-lg mb-4"
              />
            </div>
            <div className="flex gap-1 md:gap-4 my-1">
              <button
                onClick={() => handleButtonClick("level")}
                className={` md:px-8 px-1  text-sm md:text-lg bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeItem === "level" ? "bg-gray-300" : ""
                }`}
              >
                <p className="text-gray-700 font-semibold">Level</p>
              </button>
              <button
                onClick={() => handleButtonClick("task")}
                className={` md:px-8 px-1  text-sm md:text-lg bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeItem === "task" ? "bg-gray-300" : ""
                }`}
              >
                <p className="text-gray-700 font-semibold">Task</p>
              </button>
              <button
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
              </button>
              <button
                onClick={() => handleButtonClick("profile")}
                className={` md:px-8 px-1  text-sm md:text-lg bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
                  activeItem === "profile" ? "bg-gray-300" : ""
                }`}
              >
                <p className="text-gray-700 font-semibold">Profile</p>
              </button>
            </div>

            <div className="relative w-full">
              <div className="relative ">
                <img
                  src="/profile_man.png"
                  alt="Profile"
                  className="rounded-full h-20 w-20 sm:h-24 sm:w-24 object-cover border-4 border-teal-500"
                />
                <button className="absolute bottom-0 left-16 bg-teal-500 hover:bg-teal-700 text-white text-xs rounded-full p-1 transition duration-300 ease-in-out">
                  ✏️
                </button>
              </div>

              <button
                onClick={() => {
                  setDailyCheckIn(true);
                }}
                className="absolute text-2xl sm:text-3xl top-2 right-2 text-yellow-500 hover:text-yellow-600"
              >
                <MdTask className="cursor-pointer" />
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-2">
             {userDetail?.userName}
            </h2>
            <p className="text-sm">This is my description</p>
            <div className="mt-2 ">
              <div className="">
                <div className="flex lg:justify-start space-x-3 mt-2">
                  <span className="bg-teal-200 px-3 py-1 rounded-full text-gray-800">
                    English{" "}
                  </span>
                  <span className="bg-teal-200 px-3 py-1 rounded-full text-gray-800">
                    Hindi
                  </span>
                </div>{" "}
              </div>
              <div className="flex justify-center lg:justify-start space-x-3 mt-2">
                <span className="bg-pink-400 text-white px-3 py-1 rounded-full">
                  Dancer
                </span>
                <span className="bg-pink-400 px-3 py-1 rounded-full text-white">
                  {" "}
                  Singer
                </span>
                <span className="bg-pink-400 px-3 py-1 rounded-full text-white">
                  Film Lover
                </span>
              </div>
            </div>

            {/* Stats: Friends, Followers, Following */}
            <div className="flex justify-around mt-6 text-center lg:justify-start lg:space-x-8">
            <div className="flex flex-col">
              <span className="text-gray-600">Friends</span>
              <span className="text-xl font-bold">120</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Followers</span>
              <span className="text-xl font-bold">250</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Following</span>
              <span className="text-xl font-bold">180</span>
            </div>
          </div>
            

            <div className="mt-6 flex  justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-700">Rating:</h3>
              </div>
              <div className="flex items-center space-x-1">
                <FaStar className="text-yellow-400 text-xl" />
                <FaStar className="text-yellow-400 text-xl" />
                <FaStar className="text-yellow-400 text-xl" />
                <FaStarHalfAlt className="text-yellow-400 text-xl" />
                <FaRegStar className="text-yellow-400 text-xl" />
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-bold text-teal-600">Tags:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-teal-100 px-3 py-1 rounded-full text-gray-800">
                  Beautiful
                </span>
                <span className="bg-teal-100 px-3 py-1 rounded-full text-gray-800">
                  Adventurous
                </span>
                <span className="bg-teal-100 px-3 py-1 rounded-full text-gray-800">
                  Creative
                </span>
                <span className="bg-teal-100 px-3 py-1 rounded-full text-gray-800">
                  Charming
                </span>
              </div>
            </div>

            {/* Total Coins */}
            <div className="mt-4 bg-teal-100 px-4 py-2 sm:px-5 sm:py-3 rounded-lg shadow-lg w-full transition duration-500 ease-in-out transform hover:scale-105">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-semibold text-lg">
                  Total Coins:
                </span>
                <span className="text-xl text-teal-600 font-bold">{coins}</span>
              </div>
              <div className="flex justify-between mt-1">
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
              </div>
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
            <DailyCheckIn />
          </div>
        </div>
      )}
    </div>
  );
}
