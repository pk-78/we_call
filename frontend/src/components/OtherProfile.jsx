import React, { useContext, useEffect, useState } from "react";
import { FaRegStar, FaStar, FaArrowLeft, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { url } from "../url/url";
import FollowButton from "./FollowButton";
import SettingSkeleton from "../skeleton/SettingSkeleton";

export default function OtherProfile({ coins }) {
  const navigate = useNavigate();
  const [user, setuser] = useState([]);
  const {
    isLoggedIn,
    setIsLoggedIn,
    notLoggedInPage,
    setNotLoggedInPage,
    followingList,
  } = useContext(UserContext);
  const { id } = useParams();
  const myId = localStorage.getItem("id");
  const [fullStar, setFullStar] = useState(null);
  const [halfStar, setHalfStar] = useState(null);
  const [emptyStar, setEmptyStar] = useState(null);
  const [followerList, setFollowersList] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log(id);

  useEffect(() => {
    const fetchUserDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}/api/user/getuser/${id}`);
        console.log(response?.data?.user);
        setuser(response?.data?.user);
        setFollowersList(response?.data?.user?.otherProfile?.followers);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    const showRating = async () => {
      const intPart = Math.trunc(user?.rating);
      setFullStar(intPart);
      const fractionPart = user?.rating - intPart;
      setHalfStar(fractionPart);
      if (fractionPart > 0) {
        const leftPart = 4 - intPart;
        setEmptyStar(leftPart);
      } else {
        const leftPart = 5 - intPart;
        setEmptyStar(leftPart);
      }
      console.log(fullStar, halfStar, emptyStar);
    };
    fetchUserDetail();
    showRating();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center"><SettingSkeleton /></div>;
  }

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
            src={user.coverImage ? user?.coverImage : "/random_profile.jpg"}
            alt="Cover"
            className="w-full object-cover rounded-lg mb-4"
          />

          <div className="lg:px-6 px-2">
            <img
              src={user?.avatar ? user?.avatar : "/profile_man.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-teal-500 object-cover mt-2 mb-4 shadow-md"
            />

            <div className="flex justify-between ">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {user.name}
                </h2>
                <h2 className="text-xl font-semibold text-gray-800">
                  {user.userName}
                </h2>
                <p className="text-gray-500">India</p>
              </div>
              <div>
                {!followerList?.includes(myId) ? (
                  <FollowButton
                    followingList={followingList}
                    userId={user?._id}
                    otherProfile="true"
                  />
                ) : (
                  <button
                    aria-label="Follow this user"
                    onClick={() => {
                      if (!isLoggedIn) {
                        setNotLoggedInPage(true);
                      } else {
                        // Call the follow logic
                        followUser(myId);
                      }
                    }}
                    className="flex gap-2 py-2 px-6 bg-teal-600 text-white text-sm rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none"
                  >
                    Unfollow
                  </button>
                )}

                {/* <button className="mt-2 px-6 py-2 bg-teal-600 text-white  rounded-lg shadow-md hover:bg-teal-700">
                  Message
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="lg:w-2/3 px-2 lg:px-0">
          {/* Bio Section */}
          <div className="mt-2 ">
              <div className="">
                <div className="flex flex-wrap lg:justify-start space-x-3 mt-2">
                  <h3 className="text-lg font-semibold text-teal-600">
                    Language:
                  </h3>
                  {user?.language?.map((language, index) => (
                    <span className="bg-teal-200 px-3 py-1 my-1 rounded-full text-gray-800">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap  lg:justify-start space-x-3 mt-2">
                <h3 className="text-lg font-semibold text-teal-600">Hobby:</h3>
                {user?.hobby?.map((hobby, index) => (
                  <span
                    key={index}
                    className="bg-pink-400 px-3 py-1 my-1 rounded-full text-white"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>

          {/* Stats: Friends, Followers, Following */}
          <div className="flex ml-2 gap-4 mt-6 text-center lg:justify-start lg:space-x-8">
            {/* <div className="flex flex-col">
              <span className="text-gray-600">Friends</span>
              <span className="text-xl font-bold">
                {user?.otherProfile?.friends?.length}
              </span>
            </div> */}
            <div className="flex flex-col">
              <span className="text-gray-600">Followers</span>
              <span className="text-xl font-bold">
                {user?.otherProfile?.followers?.length}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Following</span>
              <span className="text-xl font-bold">
                {user?.otherProfile?.following?.length}
              </span>
            </div>
          </div>

          {/* Rating Section */}
          <div className="mt-6 flex  ">
            <div>
              <h3 className="text-lg font-bold text-gray-700">
                Rating:{user?.rating}
              </h3>
            </div>
            <div className="flex items-center space-x-1">
              {[
                ...Array(
                  Number.isInteger(fullStar) && fullStar > 0 ? fullStar : 0
                ),
              ].map((_, index) => (
                <FaStar
                  key={`full-${index}`}
                  className="text-yellow-400 text-xl"
                />
              ))}

              {/* Half Star */}
              {halfStar > 0 && (
                <FaStarHalfAlt className="text-yellow-400 text-xl" />
              )}

              {/* Empty Stars */}
              {[
                ...Array(
                  Number.isInteger(emptyStar) && emptyStar > 0 ? emptyStar : 0
                ),
              ].map((_, index) => (
                <FaRegStar
                  key={`empty-${index}`}
                  className="text-yellow-400 text-xl"
                />
              ))}
            </div>
          </div>
          <div className="flex">
              <div className="font-semibold">Gifts:</div>
              
              <div className="flex gap-4 px-4 py-2 bg-white rounded-lg ">
                {/* Single Gift */}
                <div className=" flex flex-col items-center hover:scale-105 transition-transform">
                  <img
                    src="/butterfly.jpg"
                    alt="Butterfly"
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex gap-1 mt-1 text-teal-700 font-semibold">
                    {user?.gift?.butterfly}X
                  </div>
                </div>

                <div className=" flex flex-col items-center hover:scale-105 transition-transform">
                  <img
                    src="/lollipop.jpg"
                    alt="Lollipop"
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex gap-1 mt-1 text-teal-700 font-semibold">
                    {user?.gift?.lollipop}X
                  </div>
                </div>

                <div className=" flex flex-col items-center hover:scale-105 transition-transform">
                  <img
                    src="/rose.png"
                    alt="Rose"
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex gap-1 mt-1 text-teal-700 font-semibold">
                    {user?.gift?.rose}X
                  </div>
                </div>
              </div>
            </div>

          {/* Tags Section */}
          <div className="my-2">
            <div className="flex flex-wrap gap-2 mt-2">
              <h3 className="text-lg font-bold text-teal-600">Tags:</h3>
              {user?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-teal-100 px-3 py-1 rounded-full text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
