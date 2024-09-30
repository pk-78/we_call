import React, { useState } from "react";
import { ImPhoneHangUp } from "react-icons/im";
import { coins } from "../url/coins";
import OfferPage from "./OfferPage";
import { GiCrossedBones } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function RequestCall({ setRequestCall, checkEnoughBalance }) {
  const [offerPage, setOfferPage] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`${
        checkEnoughBalance
          ? "fixed top-0 right-0 mt-12 mr-2 flex justify-end items-center opacity-90"
          : "fixed inset-0 flex justify-center items-center"
      } bg-black bg-opacity-50 z-50`}
    >
      <div className="relative bg-white rounded-lg p-4">
        {checkEnoughBalance ? (
          <div></div>
        ) : (
          <div>
            <button
              onClick={() => {
                setRequestCall(false);
              }}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              <GiCrossedBones size={24} />
            </button>
          </div>
        )}

        <div className="  bg-white bg-opacity-90  p-6 rounded-lg shadow-lg">
          {/* Title */}
          {checkEnoughBalance ? (
            <div className="w-64 ">
              <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Request a Call
              </h1>

              {/* Profile Section */}
              <div className="flex flex-col items-center space-y-4 mb-6">
                {/* Profile Image */}
                <img
                  className="w-24 h-24 rounded-full border-4 border-teal-500"
                  src="profile_man.png"
                  alt="Profile"
                />

                {/* Username */}
                <p className="text-xl font-semibold text-gray-800">Username</p>

                {/* Call Button */}
                <button
                  onClick={() => {
                    setRequestCall(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full flex items-center space-x-2 shadow-lg transition-transform transform hover:scale-105 focus:outline-none"
                >
                  <ImPhoneHangUp className="text-xl" />
                  <span className="text-lg font-semibold">Hang Up</span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Not Enough Balance Section */}
              <div className="w-72 bg-red-100 p-4 rounded-lg mt-6 text-center shadow-sm">
                <h2 className="text-red-600 text-lg font-bold mb-2">
                  Not Enough Balance
                </h2>
                <p className="text-gray-700 mb-4">
                  It looks like you don't have enough balance to continue the
                  call.
                </p>
                <button
                  onClick={() => {
                    navigate("/pricing");
                  }}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none"
                >
                  Recharge Now
                </button>
              </div>
            </div>
          )}

          {offerPage && (
            <div className=" ">
              <OfferPage />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
