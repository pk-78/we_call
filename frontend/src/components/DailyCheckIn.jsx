import React from "react";
import { RiCoinLine } from "react-icons/ri";

export default function DailyCheckIn({checkIn}) {
  console.log(checkIn)
  const days = [
    { day: "Day 1", reward: 50 },
    { day: "Day 2", reward: 60 },
    { day: "Day 3", reward: 70 },
    { day: "Day 4", reward: 80 },
    { day: "Day 5", reward: 90 },
    { day: "Day 6", reward: 100 },
    { day: "Day 7", reward: 110 },
    { day: "Day 7 +", reward: 150 },
  ];

  return (
    <div className="max-w-md mx-auto cursor-pointer bg-white p-6 rounded-lg shadow-md">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Daily Check-In
      </h1>

      {/* Daily Check-In Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {days.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm transition-transform transform hover:scale-105 
              ${
                index === Number(checkIn-1) || (index === 7 && Number(checkIn)>=7 )
                  ? "bg-teal-100 border-teal-400"
                  : "bg-gray-50 border-gray-300"
              }`}
          >
            <p className="text-lg font-semibold text-gray-800 mb-2">
              {day.day}
            </p>
            <div className="flex items-center">
              <RiCoinLine className="text-yellow-400 text-2xl mr-1" />
              <p className="text-xl font-bold text-teal-600">+{day.reward}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
