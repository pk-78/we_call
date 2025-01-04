import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import UserContext from "../context/UserContext";

export default function Level({
  activeItem,
  setActiveItem,
  myLevel,
  myConsumption,
}) {
  const [upperLimitConsumption, setUpperLimitConsuption] = useState("");
  const [lowerLimitConsumption, setLowerLimitConsuption] = useState("");

  useEffect(() => {

    const checkLevel = async () => {
      if (Number(myLevel) === 1) {
        setUpperLimitConsuption(1000);
        setLowerLimitConsuption(0);
      } else if (Number(myLevel) === 2) {
        setUpperLimitConsuption(2500);
        setLowerLimitConsuption(1000)
      } else if (Number(myLevel) === 3) {
        setUpperLimitConsuption(5000);
        setLowerLimitConsuption(2500)
      } else if (Number(myLevel) === 4) {
        setUpperLimitConsuption(10000);
        setLowerLimitConsuption(5000)
      } else if (Number(myLevel) === 6) {
        setUpperLimitConsuption(25000);
        setLowerLimitConsuption(5000)
      }
      
    };
    checkLevel();
  }, [myLevel]);

  return (
    <div className="p-6  h-[569px] rounded-lg  flex flex-col justify-center items-center ">
      {/* Level Container */}

      <div className="bg-gray-50 shadow-lg rounded-lg p-8 max-w-lg w-full">
        {/* Header */}
        <div
          onClick={() => {
            setActiveItem("");
            console.log("kya hua", !activeItem);
            console.log("clicked");
          }}
          className="cursor-pointer"
        >
          <FaArrowLeft />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Your Level</h1>
          <p className="text-gray-600">Track your progress to the next level</p>
        </div>

        {/* Level Information */}
        <div className="space-y-6">
          {/* Current Level */}
          <div className="text-center">
            <p className="text-gray-700 text-xl font-medium">
              Your Current Level:
            </p>
            <p className="text-4xl text-teal-500 font-bold">{myLevel}</p>
          </div>

          {/* Progress Bar */}
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-teal-600">
                  Level Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-teal-600">
                  Total Consumption {Number(myConsumption)} coins
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-teal-100">
              <div
               style={{
                width: `${(Number(myConsumption) - lowerLimitConsumption) / (upperLimitConsumption - lowerLimitConsumption) * 100}%`
              }}
              
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
              ></div>
            </div>
          </div>

          {/* Message */}
          <div className="text-center">
            <p className="text-gray-700">
              You need to spend{" "}
              <span className="text-teal-600 font-semibold">
                {Number(upperLimitConsumption) - Number(myConsumption)}
              </span>{" "}
              more coins to reach
              <span className="text-teal-600 font-semibold">
                {" "}
                Level {Number(myLevel) + 1}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
