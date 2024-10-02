import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function NotLoggedIn() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, notLoggedInPage, setNotLoggedInPage } =
    useContext(UserContext);

  return (
    <div className="flex flex-col mt-8 items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Oops! You're not logged in
        </h1>
        <p className="text-gray-700 mb-8">
          Please log in to continue accessing this content.
        </p>

        <button
          className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-500 transition-colors duration-300 mb-4"
          onClick={() => {
            setNotLoggedInPage(false);
            navigate("/login");
          }}
        >
          Click here to Login
        </button>

        <p className="text-gray-500">Don't have an account?</p>
        <button
          className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-500 transition-colors duration-300 mt-4"
          onClick={() => {
            setNotLoggedInPage(false);
            navigate("/signup");
          }}
        >
          Click here to Sign Up
        </button>
      </div>
    </div>
  );
}
