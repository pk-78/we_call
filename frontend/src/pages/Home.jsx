import React, { useState } from "react";
import LiveCard from "../components/LiveCard";

export default function Home() {
  const [buttonClick, setButtonClick] = useState("random");

  const randomButton = "";

  const nearby = 10;
  const random = 12;
  const follow = 14;

  // function buttonHandler(clickedValue) {
  //   setButtonClick(clickedValue);
  //   console.log(buttonClick);
  // }
  return (
    <div className="md:px-28 py-10 bg-gray-50">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Currently Live</h1>
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

      {/* Live Cards Grid Section */}
      <div>
        {buttonClick === "follow" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
            <LiveCard rate={300} />
            <LiveCard rate={300} />
            <LiveCard rate={200} />
            <LiveCard rate={300} />
            <LiveCard rate={200} />
            <LiveCard rate={200} />
            <LiveCard rate={200} />
            <LiveCard rate={300} />
            <LiveCard rate={300} />
          </div>
        ) : buttonClick === "nearby" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
            <LiveCard rate={300} />
            <LiveCard rate={300} />
            <LiveCard rate={200} />
            <LiveCard rate={300} />
            <LiveCard rate={200} />
            <LiveCard rate={200} />

            <LiveCard rate={300} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
            {" "}
            <LiveCard rate={300} />
            <LiveCard rate={300} />
            <LiveCard rate={200} />
            <LiveCard rate={300} />
            <LiveCard rate={200} />
            <LiveCard rate={300} />
          </div>
        )}
      </div>
    </div>
  );
}
