import React, { useContext, useEffect, useState } from "react";
import LiveCard from "../components/LiveCard";
import RequestCall from "../components/RequestCall";
import { GiCrossedBones } from "react-icons/gi";
import UserContext from "../context/UserContext";
import NotLoggedIn from "../components/NotLoggedIn";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../url/url";
import SkeletonLiveCard from "../skeleton/SkeletonLiveCard";

export default function Home() {
  const [buttonClick, setButtonClick] = useState("random");
  const [requestCall, setRequestCall] = useState(false);
  const [checkEnoughBalance, setCheckEnoughBalance] = useState(false);
  const [locationUser, setLocationUser] = useState([]);
  const [randomUser, setRandomUser] = useState([]);
  const [followingUser, setFollowingUser] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [randomLoading, setRandomLoading] = useState(false);
  const [followingLoading, setFollowingLoading] = useState(false);
  const [notState, setNotState] = useState(false);
  const id = localStorage.getItem("id");

  const {
    isLoggedIn,
    notLoggedInPage,
    setNotLoggedInPage,
    userDetail,
    state,
    city,
    tag,
    followingList,
  } = useContext(UserContext);
  // console.log(location);
  // console.log(city, state);
  // console.log(followingList);

  useEffect(() => {
    if (city === undefined && state === undefined) {
      setNotState(true);
    }
    const fetchLocationUsers = async () => {
      setNotState(false);
      setIsLoading(true);
      try {
        const response = await axios.post(`${url}/api/user/getuserByLocation`, {
          city: city,
          state: state,
        });
        // console.log(response?.data?.user);
        const filterdLocationUser = response?.data?.user?.filter(
          (user) => user._id !== id
        );

        const isLiveLocationUser = filterdLocationUser?.sort((a, b) => {
          if (a.isLive === b.isLive) return 0; // No change if both are same
          return a.isLive ? -1 : 1;
        });
        setLocationUser(isLiveLocationUser);
        // console.log(locationUser)
      } catch (error) {
        // console.log(error);
      }
      setIsLoading(false);
    };
    if (city && state) {
      fetchLocationUsers();
    }
  }, [city, state]);
  useEffect(() => {
    const checkIn = async () => {
      try {
        const checkInResponse = await axios.post(
          `${url}/api/user/dailyCheckIn/${id}`
        );
        // console.log(checkInResponse);
      } catch (error) {
        // console.log(error);
      }
    };

    const fetchRandomUsers = async () => {
      // console.log(tag);
      setRandomLoading(true);
      try {
        const response = await axios.post(`${url}/api/user/getRandomUser`, {
          tag: tag,
        });

        const filteredRandomuser = response?.data?.user?.filter(
          (user) => user._id !== id
        );
        const isLiveRandomUser = filteredRandomuser?.sort((a, b) => {
          if (a.isLive === b.isLive) return 0; // No change if both are same
          return a.isLive ? -1 : 1;
        });
        setRandomUser(isLiveRandomUser);
        // console.log(randomUser);
      } catch (error) {
        // console.log(error);
      }
      setRandomLoading(false);
    };
    if (tag) {
      fetchRandomUsers();
    }
    const todayDate = new Date().toDateString(); // Normalize today's date to a string
    // console.log(todayDate)
    // console.log(new Date(userDetail?.lastLogin).toDateString())
    if (
      new Date(userDetail?.lastLogin).toDateString() !== todayDate &&
      userDetail?.lastLogin
    ) {
      checkIn();
    }
  }, [tag]);
  useEffect(() => {
    const fetchFollowingUsers = async () => {
      setFollowingLoading(true);
      try {
        const userResponses = await Promise.all(
          followingList.map((userId) =>
            axios.get(`${url}/api/user/getUser/${userId}`)
          )
        );

        const newUsers = userResponses
          .map((response) => response?.data?.user)
          .filter((user) => user);

        // Update state while ensuring no duplicates
        setFollowingUser((prev) => {
          const uniqueUsers = [...prev];
          newUsers.forEach((newUser) => {
            if (!uniqueUsers.some((user) => user._id === newUser._id)) {
              uniqueUsers.push(newUser);
            }
          });
          const sortedUsers = uniqueUsers.sort((a, b) => b.isLive - a.isLive);
          return sortedUsers;
        });
      } catch (error) {
        console.error("Error fetching following users:", error);
      } finally {
        setFollowingLoading(false);
      }
    };

    if (followingList) {
      fetchFollowingUsers();
    }
  }, [followingList]);

  // console.log(followingUser);
  // console.log(randomUser);
  // console.log(locationUser);

  // function buttonHandler(clickedValue) {
  //   setButtonClick(clickedValue);
    // console.log(buttonClick);
  // }

  function checkRequestCall() {}

  // console.log("ye le bacha", checkEnoughBalance);

  // console.log(requestCall);
  return (
    <div className=" relative md:px-28 md:py-10 my-5 bg-gray-50">
      {/* Title Section */}
      <div className="flex justify-center items-center mb-6">
        {isLoggedIn && (
          <div className="space-x-4 pr-4">
            <button
              onClick={() => {
                // console.log("daab diye nearby ko");
                setButtonClick("nearby");
              }}
              className={`md:px-4 px-1 py-2 md:text-base text-sm  ${
                buttonClick === "nearby"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } font-semibold rounded-lg shadow-md hover:bg-teal-600 hover:text-white focus:outline-none`}
            >
              Nearby
            </button>
            <button
              onClick={() => {
                // console.log("daab diye random ko");
                setButtonClick("random");
              }}
              className={`md:px-4 px-1 py-2 md:text-base text-sm ${
                buttonClick === "random"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } font-semibold rounded-lg shadow-md hover:bg-teal-600 hover:text-white focus:outline-none`}
            >
              Random
            </button>
            <button
              onClick={() => {
                // console.log("daab diye follow ko");
                setButtonClick("follow");
              }}
              className={`md:px-4 px-1 py-2 md:text-base text-sm  ${
                buttonClick === "follow"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } font-semibold rounded-lg shadow-md hover:bg-teal-600 hover:text-white focus:outline-none`}
            >
              Follow
            </button>
          </div>
        )}
      </div>

      {/* Live Cards Grid Section */}
      <div>
        <h3 className="md:text-3xl pl-5 mb-4 font-bold text-gray-800">
          Currenty Live
        </h3>
        <div className="flex justify-center items-center">
          {buttonClick === "follow" ? (
            followingLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {[...Array(6)].map((_, index) => (
                  <SkeletonLiveCard key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
                {followingUser?.filter((user) => user?.isLive)?.length >= 1 ? (
                  followingUser
                    ?.filter((user) => user?.isLive)
                    ?.map((user, index) => (
                      <LiveCard
                        key={index}
                        user={user}
                        rate={300}
                        requestCall={requestCall}
                        setRequestCall={setRequestCall}
                        setCheckEnoughBalance={setCheckEnoughBalance}
                      />
                    ))
                ) : (
                  <div className="my-20 text-2xl text-center w-full">
                    No one is live from your follower list
                  </div>
                )}
              </div>
            )
          ) : buttonClick === "nearby" ? (
            notState ? (
              <div className="text-center font-bold text-2xl text-red-600">
                Please update Your Location In Setting
              </div>
            ) : loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {[...Array(6)].map((_, index) => (
                  <SkeletonLiveCard key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
                {locationUser?.filter((user) => user?.isLive)?.length >= 1 ? (
                  locationUser
                    ?.filter((user) => user?.isLive)
                    ?.map((user, index) => (
                      <div key={index}>
                        <LiveCard
                          // id={id}
                          user={user}
                          rate={200}
                          requestCall={requestCall}
                          setRequestCall={setRequestCall}
                          setCheckEnoughBalance={setCheckEnoughBalance}
                        />
                      </div>
                    ))
                ) : (
                  <div className="my-20 text-2xl text-center w-full">
                    No one is Live near you
                  </div>
                )}
              </div>
            )
          ) : randomLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              {[...Array(6)].map((_, index) => (
                <SkeletonLiveCard key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
              {randomUser?.filter((user) => user?.isLive)?.length >= 1 ? (
                randomUser
                  ?.filter((user) => user?.isLive)
                  ?.map((user, index) => (
                    <div key={index}>
                      <LiveCard
                        // id={id}
                        user={user}
                        rate={200}
                        requestCall={requestCall}
                        setRequestCall={setRequestCall}
                        setCheckEnoughBalance={setCheckEnoughBalance}
                      />
                    </div>
                  ))
              ) : (
                <div className="my-20 text-2xl text-center w-full">
                  No one is live, please come later
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mb-16">
        <h3 className="md:text-3xl pl-5 font-bold text-gray-800">Not Live</h3>
        <div className="flex justify-center items-center ">
          {buttonClick === "follow" ? (
            followingLoading ? (
              <div className="grid grid-cols-1   sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {[...Array(6)].map((_, index) => (
                  <SkeletonLiveCard key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
                {followingUser?.filter((user) => !user?.isLive)?.length >= 1 ? (
                  followingUser?.filter((user) => !user?.isLive)?.map((user, index) => (
                    <LiveCard
                      key={index}
                      user={user}
                      rate={300}
                      requestCall={requestCall}
                      setRequestCall={setRequestCall}
                      setCheckEnoughBalance={setCheckEnoughBalance}
                    />
                  ))
                ) : (
                  <div className="text-2xl text-center w-full">
                    You have empty following list, please follow someone
                  </div>
                )}
              </div>
            )
          ) : buttonClick === "nearby" ? (
            notState ? (
              <div className="text-center font-bold text-2xl text-red-600">
                Please update Your Location In Setting
              </div>
            ) : loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {[...Array(6)].map((_, index) => (
                  <SkeletonLiveCard key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
                {locationUser?.filter((user) => !user?.isLive)?.length >= 1 ? (
                  locationUser?.filter((user) => !user?.isLive)?.map((user, index) => (
                    <div key={index}>
                      <LiveCard
                        // id={id}
                        user={user}
                        rate={200}
                        requestCall={requestCall}
                        setRequestCall={setRequestCall}
                        setCheckEnoughBalance={setCheckEnoughBalance}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-2xl text-center w-full">
                    No users nearby you , Please come later
                  </div>
                )}
              </div>
            )
          ) : randomLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              {[...Array(6)].map((_, index) => (
                <SkeletonLiveCard key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
              {randomUser?.filter((user) => !user?.isLive)?.length >= 1 ? (
                randomUser?.filter((user) => !user?.isLive)?.map((user, index) => (
                  <div key={index}>
                    <LiveCard
                      // id={id}
                      user={user}
                      rate={200}
                      requestCall={requestCall}
                      setRequestCall={setRequestCall}
                      setCheckEnoughBalance={setCheckEnoughBalance}
                    />
                  </div>
                ))
              ) : (
                <div className="text-2xl text-center w-full">
                  Please refresh page to watch more users
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {requestCall && (
        <RequestCall
          checkEnoughBalance={checkEnoughBalance}
          setRequestCall={setRequestCall}
        />
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
