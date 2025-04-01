import React, { useState, useEffect, useContext } from "react";
import PostImageCard from "../components/PostImageCard";
import { FaPlus } from "react-icons/fa6";
import ImageUpload from "../components/ImageUpload";
import { GiCrossedBones } from "react-icons/gi";
import UserContext from "../context/UserContext";
import NotLoggedIn from "../components/NotLoggedIn";

export default function Post() {
  const [buttonClick, setButtonClick] = useState("follow");
  const [createPost, setCreatePost] = useState(false);
  const { isLoggedIn, setIsLoggedIn, notLoggedInPage, setNotLoggedInPage } =
  useContext(UserContext);

  // UseEffect to handle scroll lock when modal is open
  useEffect(() => {
    if (createPost) {
      // Lock the scroll when the modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Unlock the scroll when the modal is closed
      document.body.style.overflow = "auto";
    }

    // Clean up by resetting the overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [createPost]);

  return (
    <div className="relative md:px-28 md:py-10 my-5 bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-3xl pl-5 font-bold text-gray-800">Posts</h1>
        {isLoggedIn && <div className="space-x-4 pr-4">
          {/* Follow Button */}
          <button
            onClick={() => {
              console.log("Follow button clicked");
              setButtonClick("follow");
            }}
            className={`md:px-4 px-2 py-1 md:text-base text-sm  ${
              buttonClick === "follow"
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700"
            } font-semibold rounded-lg hover:bg-teal-600 hover:text-white shadow-md focus:outline-none`}
          >
            Follow
          </button>

          {/* All Button */}
          <button
            onClick={() => {
              console.log("Follow button clicked");
              setButtonClick("all");
            }}
            className={`md:px-4 px-2 py-1 md:text-base text-sm  ${
              buttonClick === "all"
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700"
            } font-semibold rounded-lg hover:bg-teal-600 hover:text-white shadow-md focus:outline-none`}
          >
            All
          </button>

          {/* Create Post Button */}
          <button
            onClick={() => {
              console.log("Create Post button clicked");
              setCreatePost(true);
              //   setButtonClick("createpost");
            }}
            className={`md:px-4 px-2 py-1 md:text-base text-sm    font-semibold rounded-lg bg-gray-200 text-gray-700 hover:bg-teal-600 hover:text-white shadow-md  focus:outline-none`}
          >
            <span className="flex items-center gap-2">
              <FaPlus className="mt-0" />
              Create Post
            </span>
          </button>
        </div>}
      </div>

      {/* Posts Grid */}
      <div>
        {buttonClick === "all" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <PostImageCard />
            <PostImageCard />
            <PostImageCard />
            <PostImageCard />
            <PostImageCard />
            <PostImageCard />
            <PostImageCard />
            <PostImageCard />
            <PostImageCard />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <PostImageCard content="Tomorrow at 8 pm" image="/dance.jpg" name="Priyanshu" level="4"  />
            <PostImageCard content="Today at 10 pm" image="/musicband.webp" name="Sandeep" level="3" />
            <PostImageCard />
            
          </div>
        )}
      </div>

      {/* Image Upload Modal */}
      {createPost && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg p-4">
            <button
              onClick={() => {
                setCreatePost(false);
              }}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              <GiCrossedBones size={24} />
            </button>
            <ImageUpload />
          </div>
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
