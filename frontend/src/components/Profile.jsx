import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { url } from "../url/url";
import { useNavigate } from "react-router-dom";
export default function Profile({ activeItem, setActiveItem, user }) {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");
  const [fetchLocation, setFetchLocation] = useState(false);
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  // console.log(id, "inside profile");
  console.log(user);
  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCityFromCoordinates(latitude, longitude);
        },
        (err) => {
          setError("Location access denied or unavailable.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  // Fetch city name using reverse geocoding API
  const fetchCityFromCoordinates = async (latitude, longitude) => {
    // console.log(latitude, longitude);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      // console.log("MAP", data);
      if (
        (data && data.address && data.address.state_district) ||
        data.address.state
      ) {
        setCity(data.address.state_district);
        setState(data.address.state);
      } else {
        setError("City information not available.");
      }
    } catch (err) {
      setError("Failed to fetch city information.");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      console.log("waiting for 2 seconds");
    }, 2000);
    console.log(city, "===", user?.location?.city);
    console.log(state, "===", user?.location?.state);

    if (
      city !== user?.location?.city &&
      state !== user?.location?.state &&
      city !== "" &&
      state !== ""
    ) {
      setFetchLocation(true);
      const updateLocation = async () => {
        try {
          const res = await axios.put(`${url}/api/user/editlocation/${id}`, {
            city,
            state,
          });
          console.log(res);
          toast.success("Location Updated Successfully");
        } catch (error) {
          console.error(error);
          toast.error("Unable to update location.");
        }
      };
      setFetchLocation(false);

      updateLocation();
    }
  }, [city, state]);
  return (
    <div className="p-6  h-[569px] rounded-lg  flex flex-col justify-center items-center">
      {/* Profile Container */}
      <div className="bg-white shadow-lg rounded-lg py-8 px-6 max-w-lg w-full">
        {/* Profile Header */}
        <div
          onClick={() => {
            setActiveItem("");
            console.log("clicked");
          }}
          className="cursor-pointer"
        >
          <FaArrowLeft />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Your Profile</h1>
        </div>

        {/* Profile Details */}
        <div className="flex flex-col items-center space-y-2">
          {/* Username */}

          {/* Profile Picture */}
          <div className="relative">
            <img
              src="/profile_man.png"
              alt="Profile"
              className="rounded-full h-32 w-32 object-cover border-4 border-teal-500"
            />
            {/* Edit Icon */}
            <button className="absolute bottom-0 right-0 bg-teal-500 hover:bg-teal-700 text-white text-xs rounded-full p-1">
              ✏️
            </button>
          </div>

          {/* Gmail */}
          <div className="text-left">
            <p className="text-xl font-medium text-gray-700">{user.name}</p>
            <p className="text-gray-800 font-medium">
              Username: <span>{user.userName}</span>
            </p>
            <p className="text-gray-800 font-medium">
              Email: <span>{user.email}</span>{" "}
            </p>
            <p className="text-gray-800 font-medium">
              Gender: <span>{user.gender}</span>
            </p>
            <p className="text-gray-800 font-medium">
              Age: <span>{user.age}</span>
            </p>
            <p className="text-gray-800 font-medium">
              Location:{" "}
              {fetchLocation ? (
                "Fetching Location..."
              ) : (
                <>
                  <span>{city}</span>, <span>{state}</span>{" "}
                </>
              )}
            </p>
            <p className="text-gray-800 font-medium">
              Language:{" "}
              {user?.language?.map((lang, key) => (
                <span key={key}>{lang},</span>
              ))}
            </p>

            {/* <p className="text-gray-800 font-medium">Password</p> */}

            {/* <p className="text-gray-800 font-medium">Automatic location: <span></span></p> */}
          </div>
        </div>

        {/* Button for Edit Profile */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              navigate("/editProfile");
            }}
            className="bg-teal-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 ease-in-out"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
