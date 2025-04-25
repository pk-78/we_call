import React, { useContext, useState } from "react";
import { coins } from "../url/coins";
import Live from "../components/Live";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import NotLoggedIn from "../components/NotLoggedIn";
import { GiCrossedBones } from "react-icons/gi";

export default function GoLive() {
  const [isLive, setIsLive] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, notLoggedInPage, setNotLoggedInPage, userDetail } =
    useContext(UserContext);
  // const [notLoggedInPage, setNotLoggedInPage] = useState(false);
  coins; // Example value; ideally, this would be a prop or fetched from a state/store.
  const id = localStorage.getItem("id")
  console.log(id)

  return (
    <div className=" relative max-w-md mx-auto my-2 p-6 bg-white shadow-lg rounded-lg text-center">
      {userDetail?.coins >= 200 ? (
        isLive ? (
          <Live setIsLive={setIsLive} />
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              You're ready to go live!
            </h2>
            <p className="text-gray-700">
              Create your live room and interact with your fans in real-time.
            </p>
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  setNotLoggedInPage(true);
                } else {
                  setIsLive(true);
                  navigate(`/live-room/${id}?role=host`)
                }
              }}
              className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
            >
              Create Live Room
            </button>
          </div>
        )
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Oops, not enough coins!
          </h2>
          <p className="text-gray-700 mb-4">
            You need more coins to create a live room. Recharge now to continue.
          </p>
          <button
            onClick={() => {
              navigate("/pricing");
            }}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Recharge Now
          </button>
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
