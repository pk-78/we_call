import React, { useState } from "react";
import { coins } from "../url/coins";
import { useNavigate } from "react-router-dom";
import Invitation from "../components/Invitation";
import Message from "../components/Message";
import Level from "../components/Level";
import Task from "../components/Task";
import BackPack from "../components/BackPack";
import Profile from "../components/Profile";
import { TbCardsFilled } from "react-icons/tb";

export default function Setting() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(""); // Store the active component
  const messageClicked = "false"

  const renderComponent = () => {
    switch (activeItem) {
      case "message":
        return (
          <Message activeItem={activeItem} messageClicked="true" setActiveItem={setActiveItem} />
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

  // Toggle function to handle button clicks
  const handleButtonClick = (item, messageClicked) => {
    messageClicked= true;
    setActiveItem(activeItem === item ? "" : item);

    console.log("la bhaiya ", activeItem);
  };

  return (
    <div className="flex justify-center items-start p-6 bg-gray-200 min-h-screen">
      {/* Settings Card */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src="/profile_man.png"
              alt="Profile"
              className="rounded-full h-24 w-24 object-cover border-4 border-teal-500"
            />
            <button className="absolute bottom-0 right-0 bg-teal-500 hover:bg-teal-700 text-white text-xs rounded-full p-1 transition duration-300 ease-in-out">
              ✏️
            </button>
          </div>

          {/* Username */}
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">pk_78</h2>

          {/* Stats: Friends, Followers, Following */}
          <div className="flex justify-around w-full mt-4">
            <div className="text-center">
              <span className="block text-gray-600 font-medium">Friends</span>
              <span className="block text-xl font-bold">120</span>
            </div>
            <div className="text-center">
              <span className="block text-gray-600 font-medium">Followers</span>
              <span className="block text-xl font-bold">250</span>
            </div>
            <div className="text-center">
              <span className="block text-gray-600 font-medium">Following</span>
              <span className="block text-xl font-bold">180</span>
            </div>
          </div>

          {/* Total Coins */}
          <div className="mt-6 bg-teal-100 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto transition duration-500 ease-in-out transform hover:scale-105">
            {/* Total Coins Section */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-semibold text-lg">
                Total Coins:
              </span>
              <span className="text-xl text-teal-600 font-bold">{coins}</span>
            </div>

            {/* Stats Section */}
            <div className="flex justify-between mt-1">
              {/* Left Icon and Value */}
              <div className="flex items-center space-x-2">
                <TbCardsFilled className="text-pink-400 text-3xl" />
                <p className="text-gray-800 font-semibold text-xl">2</p>
              </div>

              {/* Right Icon and Value */}
              <div className="flex items-center space-x-2">
                <TbCardsFilled className="text-orange-400 text-3xl" />
                <p className="text-gray-800 font-semibold text-xl">3</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Message */}
            <button
              onClick={() => handleButtonClick("message"); messageClicked= true}
              className={`p-4 w-44 bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
                activeItem === "message" ? "bg-gray-300" : ""
              }`}
            >
              <p className="text-gray-700 font-semibold">Message</p>
            </button>
            {/* Level */}
            <button
              onClick={() => handleButtonClick("level")}
              className={`p-4 bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
                activeItem === "level" ? "bg-gray-300" : ""
              }`}
            >
              <p className="text-gray-700 font-semibold">Level</p>
            </button>
            {/* Task */}
            <button
              onClick={() => handleButtonClick("task")}
              className={`p-4 bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
                activeItem === "task" ? "bg-gray-300" : ""
              }`}
            >
              <p className="text-gray-700 font-semibold">Task</p>
            </button>
            {/* Backpack */}
            <button
              onClick={() => handleButtonClick("backpack")}
              className={`p-4 bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
                activeItem === "backpack" ? "bg-gray-300" : ""
              }`}
            >
              <p className="text-gray-700 font-semibold">Backpack</p>
            </button>
            {/* Invitation */}
            <button
              onClick={() => handleButtonClick("invitation")}
              className={`p-4 bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
                activeItem === "invitation" ? "bg-gray-300" : ""
              }`}
            >
              <p className="text-gray-700 font-semibold">Invitation</p>
            </button>
            {/* Profile */}
            <button
              onClick={() => handleButtonClick("profile")}
              className={`p-4 bg-gray-200 rounded-lg text-center hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 ${
                activeItem === "profile" ? "bg-gray-300" : ""
              }`}
            >
              <p className="text-gray-700 font-semibold">Profile</p>
            </button>
          </div>
        </div>
      </div>

      {/* Invitation Card with Slide-in Effect */}
      {activeItem && (
        <div
          className={`ml-8 w-1/3 transform transition-transform duration-500 ease-in-out ${
            activeItem
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          {renderComponent()}
        </div>
      )}
    </div>
  );
}
