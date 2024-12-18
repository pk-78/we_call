import React, { useContext, useEffect, useState } from "react";
import LiveCard from "../components/LiveCard";
import RequestCall from "../components/RequestCall";
import { GiCrossedBones } from "react-icons/gi";
import UserContext from "../context/UserContext";
import NotLoggedIn from "../components/NotLoggedIn";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../url/url";

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
    state,
    city,
    tag,
    followingList,
  } = useContext(UserContext);
  // console.log(location);
  // console.log(city, state);
  console.log(followingList);

  useEffect(() => {
    if (state === undefined && state === undefined) {
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
        setLocationUser(filterdLocationUser);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    if (city && state) {
      fetchLocationUsers();
    }
  }, [city, state]);
  useEffect(() => {
    const fetchRandomUsers = async () => {
      console.log(tag);
      setRandomLoading(true);
      try {
        const response = await axios.post(`${url}/api/user/getRandomUser`, {
          tag: tag,
        });

        const filteredRandomuser = response?.data?.user?.filter(
          (user) => user._id !== id
        );
        setRandomUser(filteredRandomuser);
        // console.log(randomUser);
      } catch (error) {
        console.log(error);
      }
      setRandomLoading(false);
    };
    if (tag) {
      fetchRandomUsers();
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
          return uniqueUsers;
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

  console.log(followingUser);

  // function buttonHandler(clickedValue) {
  //   setButtonClick(clickedValue);
  //   console.log(buttonClick);
  // }

  function checkRequestCall() {}

  // console.log("ye le bacha", checkEnoughBalance);

  // console.log(requestCall);
  return (
    <div className=" relative md:px-28 md:py-10 my-5 bg-gray-50">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-3xl pl-5 font-bold text-gray-800">
          Currently Live
        </h1>
        {isLoggedIn && (
          <div className="space-x-4 pr-4">
            <button
              onClick={() => {
                console.log("daab diye nearby ko");
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
                console.log("daab diye random ko");
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
                console.log("daab diye follow ko");
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
        {buttonClick === "follow" ? (
          followingLoading ? (
            <div>Loading your follower </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
              {followingUser?.map((user, index)=>(
                <LiveCard
                key={index}
                user={user}
                rate={300}
                requestCall={requestCall}
                setRequestCall={setRequestCall}
                setCheckEnoughBalance={setCheckEnoughBalance}
              />
              ))}
              
            </div>
          )
        ) : buttonClick === "nearby" ? (
          notState ? (
            <div className="text-center font-bold text-2xl text-red-600">
              Please update Your Location
            </div>
          ) : loading ? (
            <div>Fetching users near you</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
              {locationUser?.map((user, index) => (
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
              ))}
            </div>
          )
        ) : randomLoading ? (
          <div>Fetching Random Users</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
            {randomUser?.map((user, index) => (
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
            ))}
          </div>
        )}
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
