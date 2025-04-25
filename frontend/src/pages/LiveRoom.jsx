// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa6";
// import { IoClose } from "react-icons/io5";
// import { useNavigate, useParams } from "react-router-dom";
// import { url } from "../url/url";
// import FollowButton from "../components/FollowButton";
// import UserContext from "../context/UserContext";

// export default function LiveRoom() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const { id } = useParams();
//   const {followingList} = useContext(UserContext)

//   useEffect(() => {
//     const fetchUserDetail = async () => {
//       try {
//         const response = await axios.get(`${url}/api/user/getuser/${id}`);
//         setUser(response?.data?.user);
//         console.log(response?.data?.user);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     if (id) {
//       fetchUserDetail();
//     }
//   }, [id]);

//   return (
//     <div className="flex items-center justify-center  bg-gray-200">
//       <div className="relative flex items-center justify-center">
//         {/* Video Player */}
//         <video width="350" autoPlay controls className="rounded-lg shadow-lg">
//           <source src="MyVideo.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>

//         {/* Profile Info and Follow Button */}
//         <div className="absolute top-1 left-1 flex items-center gap-2  bg-opacity-50 p-2 rounded-lg">
//           <img
//             src={user?.avatar ? user?.avatar : "/profile_man.png"}
//             alt="Profile"
//             className="w-8 h-8 border object-cover rounded-full"
//           />
//           <h2 className="text-white text-lg font-semibold">{user?.userName}</h2>
//           <FollowButton followingList={followingList} userId={id} />
//         </div>

//         {/* Close Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-2 right-2 text-white hover:text-red-500 transition p-1 rounded-full bg-black bg-opacity-50"
//         >
//           <IoClose size={24} />
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
  // const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const containerRef = useRef(null);
  const initializeRef = useRef(false);
  const roomId= localStorage.getItem("id")

  const appId = 823274026;
  const serverSecret = "6f40692561db94794ce2599b7bc00671";

  const userID = Date.now().toString(); // Unique ID for user
  const userName = "pk78"; // change if you want dynamic

  const roleParam = (searchParams.get("role") || "Audience").toLowerCase();

  const role =
    roleParam === "host"
      ? ZegoUIKitPrebuilt.Host
      : roleParam === "cohost"
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appId,
    serverSecret,
    roomId || "",
    userID,
    userName
  );

  const sharedLinks = [];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: "Join as co-host",
      url:
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        `?roomId=${roomId}&role=cohost`,
    });
  }

  sharedLinks.push({
    name: "Join as audience",
    url:
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      `?roomId=${roomId}&role=audience`,
  });

  const myMeeting = async (element) => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
        },
      },
    });
  };

  useEffect(() => {
    if (!roomId) {
      console.error("roomId not found");
      return;
    }
    if (initializeRef.current) return;
    if (containerRef.current) {
      initializeRef.current = true;
      myMeeting(containerRef.current);
    }
  }, [roomId]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Room;
