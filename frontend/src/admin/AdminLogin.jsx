import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { url } from "../url/url";

export default function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/admin/adminLogin`, formData);
      const { success, adminId, userType } = response.data;

      if (success) {
        toast.success("Login successful!");
        localStorage.setItem("userType", userType);
        navigate("/adminHomePage");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300 text-black">
      {/* Left Side - Welcome Text */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome Back, <br />
          <span className="text-teal-700">Admin</span>
        </h1>
        <p className="text-lg md:text-xl text-teal-800 mb-8">
          Manage your platform with ease and control.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center text-teal-700 mb-6">
            Admin Login
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Enter Your Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="admin@example.com"
                {...register("email", { required: "This field is required" })}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                Enter Your Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                {...register("password", { required: "This field is required" })}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
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
            <p className="text-gray-700 text-sm">
              Not an admin?{" "}
              <NavLink to="/" className="text-teal-700 hover:underline">
                Go to Home
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
