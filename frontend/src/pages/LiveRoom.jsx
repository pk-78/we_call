import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../url/url";
import FollowButton from "../components/FollowButton";
import UserContext from "../context/UserContext";

export default function LiveRoom() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const {followingList} = useContext(UserContext)

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(`${url}/api/user/getuser/${id}`);
        setUser(response?.data?.user);
        console.log(response?.data?.user);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchUserDetail();
    }
  }, [id]);

  return (
    <div className="flex items-center justify-center  bg-gray-200">
      <div className="relative flex items-center justify-center">
        {/* Video Player */}
        <video width="350" autoPlay controls className="rounded-lg shadow-lg">
          <source src="MyVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Profile Info and Follow Button */}
        <div className="absolute top-1 left-1 flex items-center gap-2  bg-opacity-50 p-2 rounded-lg">
          <img
            src={user?.avatar ? user?.avatar : "/profile_man.png"}
            alt="Profile"
            className="w-8 h-8 border object-cover rounded-full"
          />
          <h2 className="text-white text-lg font-semibold">{user?.userName}</h2>
          <FollowButton followingList={followingList} userId={id} />
        </div>

        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-2 right-2 text-white hover:text-red-500 transition p-1 rounded-full bg-black bg-opacity-50"
        >
          <IoClose size={24} />
        </button>
      </div>
    </div>
  );
}
