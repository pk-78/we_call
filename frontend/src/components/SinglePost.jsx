import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaCoins, FaGift } from "react-icons/fa";
import { url } from "../url/url";
import UserContext from "../context/UserContext";
import toast from "react-hot-toast";
import SingleComment from "./SingleComment";

export default function SinglePost({ viewSinglePost }) {
  const { id, userDetail } = useContext(UserContext);
  const [commentToPost, setCommentToPost] = useState("");
  const [nameProfile, setNameProfile] = useState(null);
  const [likes, setLikes] = useState(viewSinglePost?.like || []);
  const [isLiking, setIsLiking] = useState(false);
  const [gifts, setGifts] = useState(viewSinglePost?.gift || []);
  const [giftSection, setGiftSection] = useState(false);
  const [gifting, setGifting] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [gifted, setGifted] = useState(viewSinglePost?.gift?.includes(id));
  const [userCoin, setUserCoin] = useState(userDetail?.coins);
  const [clickedGift, setClickedGift] = useState(null);


  useEffect(() => {
    const findName = async () => {
      try {
        const res = await axios.get(
          `${url}/api/user/getNameAndProfile/${viewSinglePost?.owner}`
        );
        setNameProfile(res?.data?.users);
      } catch (error) {
        console.log(error);
      }
    };
    findName();
  }, []);

  const commentHandler = async () => {
    try {
      const response = await axios.post(`${url}/api/post/comment/${id}`, {
        postId: viewSinglePost._id,
        comment: commentToPost,
      });
      toast.success("Comment Added");
      setCommentToPost("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeToggle = async () => {
    try {
      setIsLiking(true);
      const res = await axios.post(`${url}/api/post/like/${id}`, {
        postId: viewSinglePost._id,
      });
      setLikes(res?.data?.likes);
    } catch (err) {
      console.error("Error toggling like:", err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleGift = async (gift) => {
    const giftData = {
      butterfly: 50,
      lollipop: 75,
      rose: 100,
    };

    if (giftData[gift] > userCoin) {
      toast.error("You Don't Have Enough Coins");
    } else {
      try {
        setGifting(true);
        setClickedGift(gift); // for animation

        const res = await axios.post(`${url}/api/post/gift/${id}`, {
          postId: viewSinglePost._id,
          postUploader: viewSinglePost?.owner,
          gift,
        });
        setUserCoin(res.data.user.coins);
        toast.success("Gift Sent");
        setGifts(res?.data?.gifts);
        setGifted(true);
      } catch (err) {
        console.error("Error gifting post:", err);
      } finally {
        setGifting(false);
      }
    }
  };

  const isLiked = likes.includes(id);

  return (
    <div className="mx-auto w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white shadow-lg rounded-lg p-4 h-[90vh] overflow-y-auto">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <img
          src={nameProfile?.profile || "/profile_man.png"}
          alt="User Avatar"
          className="w-10 h-10 object-cover rounded-full"
        />
        <p className="font-semibold text-gray-800">{nameProfile?.name}</p>
      </div>

      {/* Post Description */}
      <p className="mt-2 text-gray-700 text-sm sm:text-base">
        {viewSinglePost?.description}
      </p>
      <div className="flex justify-between font-semibold text-xs sm:text-sm">
        <span>Date: {viewSinglePost?.date}</span>
        <span>Time: {viewSinglePost?.time}</span>
      </div>

      {/* Post Image */}
      <div className="mt-2">
        <img
          src={viewSinglePost?.imageLink || "/dance.jpg"}
          alt="Post"
          className="w-full max-h-[500px] object-contain rounded-lg"
        />
      </div>

      {/* Like & Gift Buttons */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <button
            className={`transition-colors ${
              isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
            }`}
            onClick={handleLikeToggle}
            disabled={isLiking}
          >
            <FaHeart size={22} />
          </button>
          <p className="text-gray-700 text-sm">{likes.length}</p>
        </div>

        {/* Gift Section */}
        {giftSection ? (
          <div className="relative flex flex-col items-end">
            <button
              onClick={() => setGiftSection(false)}
              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md"
            >
              ×
            </button>
            <div className="flex gap-4 flex-wrap justify-end p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
              {["butterfly", "lollipop", "rose"].map((gift) => (
                <div
                key={gift}
                onClick={() => handleGift(gift)}
                className={`cursor-pointer flex flex-col items-center transition-transform duration-300 ease-in-out 
                  ${clickedGift === gift ? "animate-bounceOnce scale-110" : "hover:scale-105"}`}
                onAnimationEnd={() => setClickedGift(null)}
              >
                <img
                  src={`${gift}.jpg`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "rose.png";
                  }}
                  alt={gift}
                  className="h-20 w-20 rounded-md object-cover"
                />
                <div className="flex gap-1 mt-1 text-teal-700 font-semibold">
                  {gift === "butterfly" ? 50 : gift === "lollipop" ? 75 : 100} <FaCoins className="mt-1" />
                </div>
              </div>
              
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              className={`transition-colors ${
                gifted
                  ? "text-yellow-500"
                  : "text-gray-600 hover:text-yellow-500"
              }`}
              onClick={() => setGiftSection(true)}
            >
              <FaGift size={22} />
            </button>
            <p className="text-gray-700 text-sm">{gifts?.length}</p>
          </div>
        )}
      </div>

      {/* Comment Input */}
      <div className="flex items-center bg-white shadow-md rounded-lg p-1 mt-3 border border-gray-300 w-full">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentToPost}
          onChange={(e) => setCommentToPost(e.target.value)}
          className="w-full p-3 border-none outline-none bg-transparent text-gray-700 placeholder-gray-500 text-sm"
        />
        <button
          onClick={commentHandler}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition text-sm"
        >
          Submit
        </button>
      </div>

      {/* Toggle Comments */}
      <div className="mt-3 text-gray-600 text-sm cursor-pointer hover:text-gray-800">
        <button
          onClick={() => setShowComment(!showComment)}
          className="font-bold"
        >
          {showComment ? "Hide Comments" : "Show Comments"}
        </button>
      </div>

      {/* Comments Section */}
      {showComment && (
        <div className="mt-4 space-y-2">
          {viewSinglePost?.comment.map((comment, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 border border-gray-200 rounded-md p-2"
            >
              <SingleComment comment={comment} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
