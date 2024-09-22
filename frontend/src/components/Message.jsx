import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import SingleMessageCard from "./SingleMessageCard";

export default function Message({ activeItem, setActiveitem }) {
  console.log("daba diye gye kya");
  const [openMessageBox, setOpenMessageBox] = useState(false);

  console.log(activeItem);

  return (
    <div
      className={`w-[300px] px-1  z-20 fixed right-1 transition-all duration-700 ${
        openMessageBox ? "top-14 h-[80vh]" : "bottom-16 h-12"
      }`}
    >
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-4 bg-teal-blue rounded-t-lg">
        <div>
          <p className="text-white">Messages</p>
        </div>
        <div
          onClick={() => {
            setOpenMessageBox(!openMessageBox);
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
    </div>
  );
}
