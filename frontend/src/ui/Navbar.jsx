import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  function logoutHandler() {
    console.log("clicked1");
    setIsLoggedIn(false); // Update the state correctly
    navigate("/login");
    console.log("clicked2");
  }

  return (
    <nav className="bg-teal-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Navigation Links */}
        <ul className="flex flex-grow justify-center md:space-x-6 space-x-3">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white font-bold"
                  : "text-light-gray hover:border-b-2 hover:border-white hover:text-white transition-all"
              }
            >
              Home
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink
                to="/party"
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-2 border-white font-bold"
                    : "text-light-gray hover:border-b-2 hover:border-white hover:text-white transition-all"
                }
              >
                Party
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/golive"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white font-bold"
                  : "text-light-gray hover:border-b-2 hover:border-white hover:text-white transition-all"
              }
            >
              Go Live
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/post"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white font-bold"
                  : "text-light-gray hover:border-b-2 hover:border-white hover:text-white transition-all"
              }
            >
              Posts
            </NavLink>
          </li>
          {isLoggedIn ? (
            <li>
              <NavLink
                to="/setting"
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-2 border-white font-bold"
                    : "text-light-gray hover:border-b-2 hover:border-white hover:text-white transition-all"
                }
              >
                Setting
              </NavLink>
            </li>
          ) : (
            <div></div>
          )}
        </ul>

        {/* Authentication Buttons */}
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <button
                className="text-light-gray hover:text-white transition-colors duration-300"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="text-light-gray hover:text-white transition-colors duration-300"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="text-light-gray hover:text-white transition-colors duration-300"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
