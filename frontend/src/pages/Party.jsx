import React, { useState } from "react";
import PartyCard from "../components/PartyCard";

export default function Party() {
  const [buttonClick, setButtonClick] = useState("random");

  return (
    <div className="px-28 py-10 bg-gray-50 ">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Party</h1>
        <div className="space-x-4">
          <button
            onClick={() => {
              console.log("daab diye nearby ko");
              setButtonClick("nearby");
            }}
            className={`px-4 py-2  ${
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
            className={`px-4 py-2 ${
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
            className={`px-4 py-2  ${
              buttonClick === "follow"
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700"
            } font-semibold rounded-lg shadow-md hover:bg-teal-600 hover:text-white focus:outline-none`}
          >
            Follow
          </button>
        </div>
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
    </div>
  );
}
