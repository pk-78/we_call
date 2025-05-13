import React, { useContext, useEffect, useRef } from "react";
import { FaHome } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLiveTv, MdPostAdd } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom"; // <-- Added useLocation
import UserContext from "../context/UserContext";
import { BiWalletAlt } from "react-icons/bi";
import axios from "axios";
import { url } from "../url/url";

export default function Navbar({ name }) {
  const navigate = useNavigate();
  const location = useLocation(); // <-- Hook to get current URL
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const isUser = localStorage.getItem("isUser");
  const userType = localStorage.getItem("userType");
  const id = localStorage.getItem("id");


  console.log("Inside navbar:", isLoggedIn);

  // 🧠 Hide navbar if route is `/live-room/:id`
  const shouldHideNavbar = /^\/live-room\/[^/]+$/.test(location.pathname);
  const prevValueRef = useRef(shouldHideNavbar);
  useEffect(() => {
    const endLive = async () => {
      try {
        const response = await axios.post(`${url}/api/user/endLive/${id}`);
        console.log("✅ Live ended API response:", response.data);
      } catch (error) {
        console.error("❌ Error ending live:", error);
      }
    };

    // Trigger only when value changes from true to false
    if (prevValueRef.current === true && shouldHideNavbar === false) {
      endLive();
      setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
      }, 200);
    }

    // Update previous value
    prevValueRef.current = shouldHideNavbar;
  }, [shouldHideNavbar, id, navigate]);
  if (shouldHideNavbar) return null;

  function logoutHandler() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/login");
  }

  if (userType === "admin") return null;

  return (
    <nav className="bg-teal-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Navigation Links */}
        <ul className="flex flex-grow justify-center md:space-x-6 space-x-9">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white font-bold"
                  : "text-light-gray hover:border-b-2 hover:border-white hover:text-white transition-all"
              }
            >
              {/* Show icon on mobile, text on larger screens */}
              <span className=" text-xl md:hidden">
                <FaHome />
              </span>
              <span className="hidden md:inline">Home</span>
            </NavLink>
          </li>

          {isUser === "false" && isLoggedIn && (
            <li>
              <NavLink
                to="/golive"
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-2 border-white font-bold"
                    : "text-light-gray hover:border-b-2 hover:border-white hover:text-white transition-all"
                }
              >
                {/* Show icon on mobile, text on larger screens */}
                <span className=" text-xl md:hidden">
                  <MdLiveTv />
                </span>
                <span className="hidden md:inline">Go Live</span>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/post"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white font-bold"
                  : "text-light-gray hover:border-b-2 hover:border-white hover:text-white transition-all"
              }
            >
              {/* Show icon on mobile, text on larger screens */}
              <span className=" text-xl md:hidden">
                <MdPostAdd />
              </span>
              <span className="hidden md:inline">Posts</span>
            </NavLink>
          </li>

          {isUser === "false" && isLoggedIn && (
            <li>
              <NavLink
                to="/wallet"
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-2 border-white font-bold"
                    : "text-light-gray hover:border-b-2 hover:border-white hover:text-white transition-all"
                }
              >
                {/* Show icon on mobile, text on larger screens */}
                <span className=" text-xl md:hidden">
                  <BiWalletAlt />
                </span>
                <span className="hidden md:inline">Wallet</span>
              </NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <NavLink
                to="/setting"
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-2 border-white font-bold"
                    : "text-light-gray hover:border-b-2 hover:border-white hover:text-white transition-all"
                }
              >
                {/* Show icon on mobile, text on larger screens */}
                <span className=" text-xl md:hidden">
                  <IoSettingsSharp />
                </span>
                <span className="hidden md:inline">Setting</span>
              </NavLink>
            </li>
          )}
        </ul>

        {/* Authentication Buttons */}
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <div className="flex gap-3 text-xl">
              <h2 className="text-light-gray hover:text-white transition-colors cursor-pointer duration-300">
                {name}
              </h2>
              <button
                className="text-light-gray hover:text-white transition-colors duration-300"
                onClick={logoutHandler}
              >
                {/* Show icon on mobile, text on larger screens */}
                <span className="text-xl ">
                  <LuLogOut />
                </span>
              </button>
            </div>
          ) : (
            <>
              <button
                className="text-light-gray hover:text-white transition-colors duration-300"
                onClick={() => navigate("/login")}
              >
                <span className="lg:hidden">Login</span>
                <span className="hidden lg:inline">Login</span>
              </button>
              <button
                className="text-light-gray hover:text-white transition-colors duration-300"
                onClick={() => navigate("/signup")}
              >
                <span className="lg:hidden">Signup</span>
                <span className="hidden lg:inline">Signup</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
