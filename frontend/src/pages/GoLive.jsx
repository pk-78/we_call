import React from "react";
import { coins } from "../url/coins";

export default function GoLive() {
  coins; // Example value; ideally, this would be a prop or fetched from a state/store.

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
      {coins >= 200 ? (
        <div>
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            You're ready to go live!
          </h2>
          <p className="text-gray-700">
            Create your live room and interact with your fans in real-time.
          </p>
          <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out">
            Create Live Room
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Oops, not enough coins!
          </h2>
          <p className="text-gray-700 mb-4">
            You need more coins to create a live room. Recharge now to continue.
          </p>
          <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">
            Recharge Now
          </button>
        </div>
      )}
    </div>
  );
}
