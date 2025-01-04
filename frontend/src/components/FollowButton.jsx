import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";

import UserContext from "../context/UserContext";
import axios from "axios";
import { url } from "../url/url";

export default function FollowButton({
  followingList,
  userId,
  otherProfile = "false",
}) {
  const myId = localStorage.getItem("id");
  const { setNotLoggedInPage, isLoggedIn } = useContext(UserContext);
  const [showButton, setShowButton] = useState(true);
  console.log(followingList);
  console.log("Meri id ", myId);
  const followUnfollow = async (userId) => {
    // console.log("Saamne wale kii id", userId);

    try {
      const response = await axios.post(`${url}/api/user/following/${myId}`, {
        otherId: userId,
      });
      toast.success("Followed Successfully");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const buttonShape =
    otherProfile === "true" ? "rounded" : "rounded-full bg-opacity-80 text-sm";
  return (
    <div>
      {!followingList?.includes(userId) && showButton && (
        <button
          onClick={() => {
            if (!isLoggedIn) {
              setNotLoggedInPage(true);
            } else {
              followUnfollow(userId);
              setShowButton(false);
            }
          }}
          className={`${buttonShape} flex gap-1 bg-teal-600  text-white  py-1 px-3  shadow-lg hover:bg-teal-700 focus:outline-none`}
        >
          <FaPlus className="mt-1" />
          Follow
        </button>
      )}
    </div>
  );
}
