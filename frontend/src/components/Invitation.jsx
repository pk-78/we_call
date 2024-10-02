import { TbCardsFilled } from "react-icons/tb";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

export default function Invitation({ activeItem, setActiveItem }) {
  return (
    <div className="p-6  h-[569px] rounded-lg  flex flex-col justify-center items-center">
      {/* Invite Title */}
     

      {/* Invite Description */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full text-center">
      <div
        onClick={() => {
          setActiveItem("");
          console.log("clicked");
        }}
        className="cursor-pointer"
      >
        <FaArrowLeft />
      </div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-teal-600">Invite and Earn</h1>
      </div>
        <p className="text-lg text-gray-700 mb-4">
          Invite your friends and earn coins
        </p>

        {/* Reward Breakdown */}
        <div className="space-y-4 mb-6">
          <p className="text-gray-800 font-semibold text-2xl">
            2{" "}
            <span className="text-pink-400 font-semibold text-2xl flex items-center justify-center">
              <TbCardsFilled className="mr-2" /> cards per share
            </span>
          </p>

          <p className="text-gray-800 font-semibold text-2xl">
            3{" "}
            <span className="text-orange-400 text-2xl font-semibold flex items-center justify-center">
              <TbCardsFilled className="mr-2" /> cards per share
            </span>
          </p>
        </div>

        {/* Share Button */}
        <div>
          <button className="flex items-center  w-full justify-center bg-teal-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-teal-600 transition">
            Share
            <IoShareSocialOutline className="ml-2 text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}
