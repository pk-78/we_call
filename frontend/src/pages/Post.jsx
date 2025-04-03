import React, { useState, useEffect, useContext } from "react";
import PostImageCard from "../components/PostImageCard";
import { FaPlus } from "react-icons/fa6";
import ImageUpload from "../components/ImageUpload";
import { GiCrossedBones } from "react-icons/gi";
import UserContext from "../context/UserContext";
import NotLoggedIn from "../components/NotLoggedIn";
import SinglePost from "../components/SinglePost";
import axios from "axios";
import { url } from "../url/url";
import { FcDataRecovery } from "react-icons/fc";

export default function Post() {
  const [buttonClick, setButtonClick] = useState("follow");
  const [viewSinglePost, setViewSinglePost] = useState(null);
  const [createPost, setCreatePost] = useState(false);
  const [postIdArray, setPostIdArray] = useState(null);
  const [myPostData, setMyPostData] = useState(null);
  const [allPostData, setAllPostData] = useState(null);
  const [followPostData, setFollowPostData] = useState(null);
  const {
    isLoggedIn,
    setIsLoggedIn,
    notLoggedInPage,
    setNotLoggedInPage,
    id,
    userDetail,
  } = useContext(UserContext);

  console.log(userDetail?.otherProfile?.following);
  //  setPostIdArray(userDetail.posts);
  useEffect(() => {
    if (createPost || viewSinglePost) {
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
  }, [createPost, viewSinglePost]);

  useEffect(() => {
    // setPostIdArray(userDetail?.posts);
    // console.log(postIdArray)

    const myPostDataFunc = async () => {
      const response = await axios.get(`${url}/api/user/getPostByUserId/${id}`);
      // console.log(response);
      const sorted = response?.data?.posts?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setMyPostData(sorted);

      // console.log(myPostData);
    };

    const allPostDataFunc = async () => {
      const response = await axios.get(`${url}/api/user/getAllPost`);
      // console.log(response);
      const sorted = response?.data?.posts?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setAllPostData(sorted);
      // console.log(allPostData);
    };

    const followPostDataFunc = async () => {
      const response = await Promise.all(
        userDetail?.otherProfile?.following?.map((id) =>
          axios.get(`${url}/api/user/getPostByUserId/${id}`)
        )
      );

      // console.log(response)
      const data = response.map((res) => res?.data?.posts);
      const other = [];

      // Use forEach() instead of map()
      data?.forEach((d) => d?.forEach((m) => other.push(m)));

      console.log(other);
      const sorted = other.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setFollowPostData(sorted);

      // console.log(data);
    };

    myPostDataFunc();
    allPostDataFunc();
    followPostDataFunc();
  }, [userDetail]);

  return (
    <div className="relative md:px-28 md:py-10 my-5 bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-3xl pl-5 font-bold text-gray-800">Posts</h1>
        {isLoggedIn && (
          <div className="space-x-4 pr-4">
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
            <button
              onClick={() => {
                console.log("Follow button clicked");
                setButtonClick("my");
              }}
              className={`md:px-4 px-2 py-1 md:text-base text-sm  ${
                buttonClick === "my"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } font-semibold rounded-lg hover:bg-teal-600 hover:text-white shadow-md focus:outline-none`}
            >
              My
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
          </div>
        )}
      </div>

      {/* Posts Grid */}
      <div>
        {buttonClick === "all" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allPostData?.map((data, _id) => (
              <div key={_id}>
                <PostImageCard
                  data={data}
                  setViewSinglePost={setViewSinglePost}
                />
              </div>
            ))}
          </div>
        ) : buttonClick === "follow" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {followPostData?.map((data, _id) => (
              <div key={_id}>
                <PostImageCard
                  data={data}
                  setViewSinglePost={setViewSinglePost}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myPostData?.map((data, _id) => (
              <div key={_id}>
                {" "}
                <PostImageCard
                  data={data}
                  setViewSinglePost={setViewSinglePost}
                />
              </div>
            ))}
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
            <ImageUpload id={id} />
          </div>
        </div>
      )}
      {viewSinglePost && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg p-4">
            <button
              onClick={() => {
                setViewSinglePost(null);
              }}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              <GiCrossedBones size={24} />
            </button>
            <SinglePost viewSinglePost={viewSinglePost} />
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
