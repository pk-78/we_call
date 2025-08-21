import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../url/url";
import UserContext from "../context/UserContext";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useContext(UserContext);

  const onSubmit = async (data) => {
    setLoading(true);
    if (data.password.length <= 8) {
      toast.error("Password should have at least 8 characters");
    } else if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password do not match");
    } else {
      try {
        const response = await axios.post(`${url}/api/user/signup`, data);
        toast.success(response.data.message || "Signup successful!");
        navigate("/login");
      } catch (error) {
        toast.error(
          error.response?.data?.error || "Signup failed. Please try again."
        );
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300 text-black p-6">
      {/* Top Logo */}
      <div className="flex justify-left mb-6">
        <img src="./we_stream.png" alt="Logo" className="w-60 h-auto" />
      </div>

      {/* Bottom: Intro + Signup Side by Side */}
      <div className="flex flex-col md:flex-row flex-1 justify-center items-center gap-10 px-6">
        {/* Left Side - Intro */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Join the global
            <br />
            <span className="text-teal-700">live-streaming platform</span>
          </h1>
          <p className="text-lg md:text-xl text-teal-800 mb-8">
            Engage, entertain, and share your world with others.
          </p>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full max-w-md bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center text-teal-700 mb-6">
            Signup
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter Your Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "This field is required" })}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter Your Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "This field is required" })}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter Your Username
              </label>
              <input
                type="text"
                id="userName"
                {...register("userName", {
                  required: "This field is required",
                })}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* User Type */}
            <div className="mb-4">
              <h2 className="text-gray-700 font-medium mb-2">
                Choose User Type
              </h2>
              <div className="flex gap-6">
                {["streamer", "viewer"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={type}
                      {...register("userType", {
                        required: "This field is required",
                      })}
                      className="form-radio text-teal-600"
                    />
                    <span className="ml-2 capitalize text-sm text-gray-700">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
              {errors.userType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userType.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="mb-4">
              <h2 className="text-gray-700 font-medium mb-2">Choose Gender</h2>
              <div className="flex gap-6">
                {["male", "female"].map((gender) => (
                  <label
                    key={gender}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={gender}
                      {...register("gender", {
                        required: "This field is required",
                      })}
                      className="form-radio text-teal-600"
                    />
                    <span className="ml-2 capitalize text-sm text-gray-700">
                      {gender}
                    </span>
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter Your Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "This field is required",
                })}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Your Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "This field is required",
                })}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded mt-4 transition"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-700">
              Already have an account?{" "}
              <NavLink to="/login" className="text-teal-700 hover:underline">
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
