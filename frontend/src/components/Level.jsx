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
  const [level, setLevel] = useState(null);

  useEffect(() => {

    const checkLevel = async () => {
      if (Number(myConsumption) < 1000) {
        setUpperLimitConsuption(1000);
        setLevel(1)
        setLowerLimitConsuption(0);
      } else if (Number(myConsumption) >= 1000 && myConsumption<5000) {
        setUpperLimitConsuption(5000);
        setLevel(2)
        setLowerLimitConsuption(1000);
      } else if (Number(myConsumption) >= 5000 && myConsumption<10000) {
        setUpperLimitConsuption(10000);
        setLevel(3)
        setLowerLimitConsuption(5000)
      } else if (Number(myConsumption) >= 10000 && myConsumption<20000) {
        setUpperLimitConsuption(20000);
        setLevel(4)
        setLowerLimitConsuption(10000)
      } else if (Number(myConsumption) >= 20000 && myConsumption<50000) {
        setUpperLimitConsuption(50000);
        setLevel(5)
        setLowerLimitConsuption(2000)
      }
      
    };
    checkLevel();
  }, [myConsumption]);

  console.log(myConsumption)

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
            <p className="text-4xl text-teal-500 font-bold">{level}</p>
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
                Level {Number(level) + 1}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
