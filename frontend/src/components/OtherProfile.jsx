import React, { useContext } from "react";
import { FaRegStar, FaStar, FaArrowLeft, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { FaPlus } from "react-icons/fa6";

export default function OtherProfile({ coins }) {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, notLoggedInPage, setNotLoggedInPage } =
    useContext(UserContext);

  return (
    <div className="flex justify-center items-start p-2 mb-8 bg-gray-200 min-h-screen">
      {/* Back Button */}
      <div
        onClick={() => navigate(-1)}
        className="absolute top-2 left-1 pl-1 py-3 md:p-3 rounded-full shadow-md cursor-pointer transition duration-200"
      >
        <FaArrowLeft className="text-white text-xl" />
      </div>

      <div className="bg-white shadow-lg rounded-lg w-full max-w-md  mb-6 lg:max-w-3xl lg:p-6 lg:space-x-6">
        <div className="w-full lg:space-y-4">
          <img
            src="/random_profile.jpg"
            alt="Cover"
            className="w-full object-cover rounded-lg mb-4"
          />

          <div className="lg:px-6 px-2">
            <img
              src="/profile_man.png"
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-teal-500 object-cover mt-2 mb-4 shadow-md"
            />

            <div className="flex justify-between ">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">pk_78</h2>
                <p className="text-gray-500">India</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      setNotLoggedInPage(true);
                    } else {
                    }
                  }}
                  className={` flex gap-2 py-2 px-6 bg-teal-600  text-white text-sm rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none`}
                >
                  <FaPlus className="mt-1" />
                  Follow
                </button>
                <button className="mt-2 px-6 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-500">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="lg:w-2/3 px-2 lg:px-0">
          {/* Bio Section */}
          <div className="text-left">
            <p className="text-gray-700">
              Let's meet on a video call to discuss more.
            </p>
            <div className="flex justify-center lg:justify-start space-x-3 mt-2">
              <span className="bg-teal-200 px-3 py-1 rounded-full text-gray-800">
                English
              </span>
              <span className="bg-teal-200 px-3 py-1 rounded-full text-gray-800">
                Hindi
              </span>
            </div>
          </div>

          {/* Hobbies Section */}
          <div className="mt-2">
            <div className="flex justify-center lg:justify-start space-x-3 mt-2">
              <span className="bg-pink-400 text-white px-3 py-1 rounded-full">
                Dancer
              </span>
              <span className="bg-pink-400 px-3 py-1 rounded-full text-white">
                Singer
              </span>
              <span className="bg-pink-400 px-3 py-1 rounded-full text-white">
                Film Lover
              </span>
            </div>
          </div>

          {/* Stats: Friends, Followers, Following */}
          <div className="flex justify-around mt-6 text-center lg:justify-start lg:space-x-8">
            <div className="flex flex-col">
              <span className="text-gray-600">Friends</span>
              <span className="text-xl font-bold">120</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Followers</span>
              <span className="text-xl font-bold">250</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Following</span>
              <span className="text-xl font-bold">180</span>
            </div>
          </div>

          {/* Rating Section */}
          <div className="mt-6 flex  justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-700">Rating:</h3>
            </div>
            <div className="flex items-center space-x-1">
              <FaStar className="text-yellow-400 text-xl" />
              <FaStar className="text-yellow-400 text-xl" />
              <FaStar className="text-yellow-400 text-xl" />
              <FaStarHalfAlt className="text-yellow-400 text-xl" />
              <FaRegStar className="text-yellow-400 text-xl" />
            </div>
          </div>

          {/* Tags Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-teal-600">Tags:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-teal-100 px-3 py-1 rounded-full text-gray-800">
                Beautiful
              </span>
              <span className="bg-teal-100 px-3 py-1 rounded-full text-gray-800">
                Adventurous
              </span>
              <span className="bg-teal-100 px-3 py-1 rounded-full text-gray-800">
                Creative
              </span>
              <span className="bg-teal-100 px-3 py-1 rounded-full text-gray-800">
                Charming
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
