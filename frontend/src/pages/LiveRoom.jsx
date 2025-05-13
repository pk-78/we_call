// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// const LiveRoom = () => {
//   const { id } = useParams();
//   const [searchParams] = useSearchParams();
//   const containerRef = useRef(null);
//   const zpRef = useRef(null); // Store zp instance
//   const [roomEnded, setRoomEnded] = useState(false); // Track if room ended

//   const roomId = id;

//   const appId = 823274026;
//   const serverSecret = "6f40692561db94794ce2599b7bc00671";

//   const userID = Date.now().toString();
//   const userName = "pk78";

//   const roleParam = (searchParams.get("role") || "Audience").toLowerCase();
//   const role =
//     roleParam === "host"
//       ? ZegoUIKitPrebuilt.Host
//       : roleParam === "cohost"
//       ? ZegoUIKitPrebuilt.Cohost
//       : ZegoUIKitPrebuilt.Audience;

//   const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//     appId,
//     serverSecret,
//     roomId || "",
//     userID,
//     userName
//   );

//   const sharedLinks = [];
//   if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
//     sharedLinks.push({
//       name: "Join as co-host",
//       url:
//         window.location.protocol +
//         "//" +
//         window.location.host +
//         window.location.pathname +
//         `?roomId=${roomId}&role=cohost`,
//     });
//   }

//   sharedLinks.push({
//     name: "Join as audience",
//     url:
//       window.location.protocol +
//       "//" +
//       window.location.host +
//       window.location.pathname +
//       `?roomId=${roomId}&role=audience`,
//   });

//   const myMeeting = async (element) => {
//     const zp = ZegoUIKitPrebuilt.create(kitToken);
//     zpRef.current = zp; // Save instance
//     zp.joinRoom({
//       container: element,
//       sharedLinks,
//       scenario: {
//         mode: ZegoUIKitPrebuilt.LiveStreaming,
//         config: { role },
//       },
//     });
//   };

//   useEffect(() => {
//     if (!roomId) {
//       console.error("roomId not found");
//       return;
//     }
//     if (containerRef.current) {
//       myMeeting(containerRef.current);
//     }

//     return () => {
//       console.log("Destroying Zego session...");
//       if (zpRef.current) {
//         zpRef.current.destroy(); // Close camera, mic, etc.
//       }
//       setRoomEnded(true); // Mark session as ended
//     };
//   }, [roomId]);

//   if (roomEnded) {
//     return (
//       <div style={{ padding: "2rem", textAlign: "center" }}>
//         <h2>Live session ended.</h2>
//         <p>Thank you for joining!</p>
//       </div>
//     );
//   }

//   return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
// };

// export default LiveRoom;

import React, { useContext, useEffect, useRef, useState } from "react"; // ⬅️ import useState

import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axios from "axios";
import { url } from "../url/url";
import UserContext from "../context/UserContext";
import NoBalanceLeftLive from "../components/NoBalanceLeftLive";
import { useDetectBackButton } from "../context/useDetectBackButton";


const Room = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const containerRef = useRef(null);
  const initializeRef = useRef(false);
  const [isLive, setIsLive] = useState(false);
  const { userDetail } = useContext(UserContext);
  const [counter, setCounter] = useState(0);
  const [noBalance, setNoBalance] = useState(false);
  const intervalRef = useRef(null);

  useDetectBackButton(() => {
    const shouldLeave = window.confirm("Do you really want to leave the live room?");
    if (!shouldLeave) {
      window.history.pushState(null, "", window.location.pathname); // cancel the back
    }
    console.log("kuh ha")
  });

  const userRole = searchParams.get("role");
  console.log(userRole);

  const myId = localStorage.getItem("id");

  const roomId = id;
  console.log(userDetail?.name);

  const appId = 823274026;
  const serverSecret = "6f40692561db94794ce2599b7bc00671";

  const userID = Date.now().toString(); // Unique ID for user
  const userName = userDetail?.name || "pk"; // change if you want dynamic
  const navigate = useNavigate();
  let joinTime = null;

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
    const startLive = async () => {
      try {
        const id = myId;
        const response = await axios.post(`${url}/api/user/startLive/${id}`);
        console.log("✅ Live started API response:", response.data);
      } catch (error) {
        console.error("❌ Error starting live:", error);
      }
    };

    const endLive = async () => {
      try {
        const id = myId;
        const response = await axios.post(`${url}/api/user/endLive/${id}`);
        console.log("✅ Live ended API response:", response.data);
      } catch (error) {
        console.error("❌ Error ending live:", error);
      }
    };

    zp.joinRoom({
      container: element,
      sharedLinks,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
          liveStreamingMode: "host", // 👈 VERY IMPORTANT
          onliveStreamingStarted: (state) => {
            console.log("Live streaming state updated:", state);
            if (state === "started") {
              console.log("🚀 Live started (User clicked Go Live)");
              setIsLive(true);
            } else if (state === "ended") {
              console.log("🛑 Live ended (User clicked End Live)");
              setIsLive(false);
            }
          },
          turnOnCameraWhenJoining: true, // 👈 Also Important
          turnOnMicrophoneWhenJoining: true, // 👈 Also Important
        },
      },
      onJoinRoom: () => {
        console.log("✅ User joined the room");
        if (userRole === "host" || userRole === "cohost") {
          startLive();
        }
        joinTime = new Date();

        // Start 10-second interval counter
        intervalRef.current = setInterval(() => {
          setCounter((prev) => prev + 1);
        }, 60000);
      },

      onLeaveRoom: () => {
        console.log("❌ User left the room");
        if (userRole === "host" || userRole === "cohost") {
          endLive();
        }

        const leaveTime = new Date();
        const durationInMs = leaveTime - joinTime;

        const seconds = Math.floor((durationInMs / 1000) % 60);
        const minutes = Math.floor((durationInMs / (1000 * 60)) % 60);
        const hours = Math.floor((durationInMs / (1000 * 60 * 60)) % 24);

        console.log(`🕒 Stream duration: ${hours}h ${minutes}m ${seconds}s`);

        clearInterval(intervalRef.current); // clear timer
        navigate("/");
        setTimeout(() => {
          window.location.reload(); // Force refresh
        }, 50);
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
  useEffect(() => {
    const liveCoinDeductPerMin = async () => {
      if (userRole === "host") {
        return;
      }
      try {
        const response = await axios.post(
          `${url}/api/user/streamcoindeductpermin/${myId}`,
          {
            streamerId: roomId,
          }
        );
        console.log(response);
        // if (response.data.success === true) {
        //   navigate(`/live-room/${user._id}`);
        // }
      } catch (error) {
        console.log("error", error);
        if (error.response.data.message === "You dont have enough balance") {
          setNoBalance(true);
        }

        // console.log("I am trying")
        setTimeout(() => {
          navigate("/");
          window.location.reload(); // Reload after navigating
        }, 5000);
      }
    };

    if (counter > 0) {
      console.log(`⏱️ Counter: ${counter}`);
      liveCoinDeductPerMin();

      // if(counter===2 && userRole!=="host" && userRole!=="cohost")
      // {
      //   // leaveRoom();
      // console.log("kuch hua h guru")
      // }
    }
  }, [counter]);

  return (
    <div>
     
      {noBalance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <NoBalanceLeftLive />
        </div>
      )}

      <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
      {isLive && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "red",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            fontWeight: "bold",
            zIndex: 9999,
            fontSize: "18px",
          }}
        >
          🔴 You are Live!
        </div>
      )}
    </div>
  );
};

export default Room;
