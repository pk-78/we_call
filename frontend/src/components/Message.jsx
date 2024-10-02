import React, { useContext, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import SingleMessageCard from "./SingleMessageCard";
import UserContext from "../context/UserContext";
import { GiCrossedBones } from "react-icons/gi";
import NotLoggedIn from "./NotLoggedIn";

export default function Message({ messageClicked = "false", setActiveitem }) {
  console.log("daba diye gye kya");
  const [openMessageBox, setOpenMessageBox] = useState(false);
  const { isLoggedIn, setIsLoggedIn, notLoggedInPage, setNotLoggedInPage } =
    useContext(UserContext);

  return (
    <div
      className={`w-[300px] px-1  z-20 fixed ${
        messageClicked === "true" ? "right-20" : "right-1"
      } transition-all duration-700 ${
        openMessageBox ? "top-14 h-[80vh]" : "bottom-16 h-12"
      }`}
    >
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-4 bg-teal-blue rounded-t-lg">
        <div>
          <p className="text-white block ">Messages</p>
        </div>
        <div
          onClick={() => {
            if (!isLoggedIn) {
              setNotLoggedInPage(true);
            } else {
              setOpenMessageBox(!openMessageBox);
            }
          }}
        >
          {openMessageBox ? (
            <IoIosArrowDown className="text-xl text-gray-100 cursor-pointer" />
          ) : (
            <IoIosArrowBack className="text-xl text-gray-100 cursor-pointer" />
          )}
        </div>
      </div>

      {/* Messages Container */}
      {openMessageBox && (
        <div className="flex-1 overflow-y-auto space-y-1 p-1 bg-white rounded-b-lg shadow-lg">
          <SingleMessageCard username="pk_78" status={true} />
          <SingleMessageCard username="pk_78" status={true} />
          <SingleMessageCard username="pk_78" />
          <SingleMessageCard username="pk_78" status={true} />
          <SingleMessageCard username="pk_78" />
          <SingleMessageCard username="pk_78" status={true} />
          <SingleMessageCard username="pk_78" status={true} />
          <SingleMessageCard username="pk_78" status={true} />
          <SingleMessageCard username="pk_78" status={true} />
        </div>
      )}
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
