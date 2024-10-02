import React, { useContext, useState } from "react";
import PartyCard from "../components/PartyCard";
import { IoIosLocate } from "react-icons/io";
import UserContext from "../context/UserContext";
import { GiCrossedBones } from "react-icons/gi";
import NotLoggedIn from "../components/NotLoggedIn";

export default function Party() {
  const [buttonClick, setButtonClick] = useState("random");
  const { isLoggedIn, setIsLoggedIn, notLoggedInPage, setNotLoggedInPage } =
  useContext(UserContext);

  return (
    <div className="relative md:px-28 md:py-10 my-5 bg-gray-50 ">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-3xl pl-5 font-bold text-gray-800">Party</h1>
        { isLoggedIn && <div className="space-x-4 pr-4">
          <button
            onClick={() => {
              console.log("daab diye nearby ko");
              setButtonClick("nearby");
            }}
            className={`md:px-4 px-1 py-2 md:text-base text-sm  ${
              buttonClick === "nearby"
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700"
            } font-semibold rounded-lg shadow-md hover:bg-teal-600 hover:text-white focus:outline-none`}
          >
            Nearby
          </button>
          <button
            onClick={() => {
              console.log("daab diye random ko");
              setButtonClick("random");
            }}
            className={`md:px-4 px-1 py-2 md:text-base text-sm ${
              buttonClick === "random"
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700"
            } font-semibold rounded-lg shadow-md hover:bg-teal-600 hover:text-white focus:outline-none`}
          >
            Random
          </button>
          <button
            onClick={() => {
              console.log("daab diye follow ko");
              setButtonClick("follow");
            }}
            className={`md:px-4 px-1 py-2 md:text-base text-sm  ${
              buttonClick === "follow"
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700"
            } font-semibold rounded-lg shadow-md hover:bg-teal-600 hover:text-white focus:outline-none`}
          >
            Follow
          </button>
        </div>}
      </div>

      {/* Party Cards Grid Section */}
      <div>
        {buttonClick === "follow" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
            <PartyCard />
            <PartyCard />
            <PartyCard />
            <PartyCard />
            <PartyCard />
            <PartyCard />
            <PartyCard />
            <PartyCard />
            <PartyCard />
          </div>
        ) : buttonClick === "nearby" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
            <PartyCard />
            <PartyCard />
            <PartyCard />
            <PartyCard />
            <PartyCard />
            <PartyCard />

            <PartyCard />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
            {" "}
            <PartyCard />
            <PartyCard />
            <PartyCard />
            <PartyCard />
            <PartyCard />
            <PartyCard />
          </div>
        )}
      </div>
      {notLoggedInPage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg p-4">
            <button
              onClick={() => {
                setNotLoggedInPage(false);
              }}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              <GiCrossedBones size={24} />
            </button>
            <NotLoggedIn />
          </div>
        </div>
      )}
    </div>
  );
}
