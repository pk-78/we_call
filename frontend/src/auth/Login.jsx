import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { url } from "../url/url";
import UserContext from "../context/UserContext";

export default function Login({ setName }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useContext(UserContext);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/user/login`, formData);
      const { success, data: userData, user, token } = response.data;

      if (success) {
        toast.success("Login successful!");
        setIsLoggedIn(true);
        setName(userData?.name);
        localStorage.setItem("id", user.id);
        localStorage.setItem("token", token);
        localStorage.setItem("isUser", user.isUser);
        navigate("/home");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300 text-black p-6">
      {/* Top Logo */}
      <div className="flex justify-left mb-6 ">
        <img src="./we_stream.png" alt="Logo" className="w-60 h-auto" />
      </div>

      {/* Bottom Split Section: Text + Login */}
      <div className="flex flex-col md:flex-row flex-1 justify-center items-center gap-10 px-6">
        {/* Left side - Intro text */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Join the global
            <br />
            <span className="text-teal-700">live-streaming platform</span>
          </h1>
          <p className="text-lg md:text-xl text-teal-800 mb-8">
            for content creation, social communication, and live entertainment.
          </p>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-md bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center text-teal-700 mb-6">
            Login
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
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
                placeholder="Email"
                {...register("email", { required: "This field is required" })}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

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
                placeholder="Password"
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

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded mt-4 transition"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-700">
              Don’t have an account?{" "}
              <NavLink to="/signup" className="text-teal-700 hover:underline">
                Signup
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
