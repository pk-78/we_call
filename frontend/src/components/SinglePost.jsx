import axios from "axios";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaGift } from "react-icons/fa6";
import { url } from "../url/url";

export default function SinglePost({ viewSinglePost }) {
  const [commentToPost, setCommentToPost] = useState("");
  console.log(viewSinglePost);
  const commentHandler = async () => {
    try {
      const response = await axios.post(
        `${url}/api/user/${viewSinglePost._id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const comments = [
    {
      username: "pk78",
      comment: "beautiful",
    },
    {
      username: "abhi",
      comment: "fantastic",
    },
    {
      username: "mrityu",
      comment: "excellent",
    },
    {
      username: "udit",
      comment: "lawander",
    },
  ];
  return (
    <div className="max-w-lg mx-auto h-[700px] w-[500px] bg-white shadow-lg rounded-lg p-4 overflow-y-auto">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <img
          src="/profile_man.png"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <p className="font-semibold text-gray-800">Pk78</p>
      </div>

      {/* Post Description */}
      <p className="mt-2 text-gray-700">{viewSinglePost?.description}</p>
      <div className="flex justify-between font-semibold">
        <span>Date: {viewSinglePost?.date}</span>
        <span>Time: {viewSinglePost?.time}</span>
      </div>

      {/* Post Image */}
      <div className="mt-2">
        <img src="/dance.jpg" alt="Post" className=" h-96 rounded-lg" />
      </div>

      {/* Like & Gift Buttons */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <button className="text-gray-600 hover:text-red-500">
            <FaHeart size={22} />
          </button>
          <p className="text-gray-700">{viewSinglePost?.like?.length}</p>
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <button className="text-gray-600 hover:text-yellow-500">
            <FaGift size={22} />
          </button>
          <p className="text-gray-700">{viewSinglePost?.gift?.length}</p>
        </div>
      </div>
      <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-1 mt-1 border border-gray-300 w-full max-w-lg mx-auto">
        {/* Input Field */}
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentToPost}
          onChange={(e) => setCommentToPost(e.target.value)}
          className="w-full p-3 border-none outline-none bg-transparent text-gray-700 placeholder-gray-500"
        />

        {/* Submit Button */}
        <button
          onClick={commentHandler}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
        >
          Submit
        </button>
      </div>

      {/* Comments Section */}
      <div class="mt-3 text-gray-600 text-sm cursor-pointer hover:text-gray-800">
        View all comments
      </div>

      <div class="mt-4">
        {comments.map((comment) => (
          <div class="flex items-start space-x-4 border-opacity-90 border rounded-md my-2 p-1  border-gray-200">
            <div class="w-10 h-10 rounded-full overflow-hidden border border-black">
              <img
                src="/profile_man.png"
                alt="Profile"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <div class="font-semibold">{comment.username}</div>
              <p class="text-gray-700">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
