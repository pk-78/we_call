import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../url/url";

export default function SingleComment({ comment }) {
  const [nameProfile, setNameProfile] = useState(null);
  console.log(comment, "abhi ka h");
  useEffect(() => {
    const findName = async () => {
      console.log("mai hu yha");
      try {
        // console.log(`${url}/api/user/getNameAndProfile/${data?.owner}`);
        const res = await axios.get(
          `${url}/api/user/getNameAndProfile/${comment?.userId}`
        );
        console.log("yha tk aaya abhi wala");
        console.log(res?.data?.users);
        setNameProfile(res?.data?.users);
      } catch (error) {
        console.log(error);
      }
    };
    findName();
  }, []);
  console.log("Mera lo", comment);
  return (
    <div className="flex">
      <div class="w-10 h-10 rounded-full overflow-hidden border border-black">
        <img
          src={nameProfile?.profile || "/profile_man.png"}
          alt="Profile"
          class="w-full h-full object-cover"
        />
      </div>
      <div className="ml-2">
        <div class="font-semibold">{nameProfile?.name}</div>
        <p class="text-gray-700">{comment.comment}</p>
      </div>
    </div>
  );
}
