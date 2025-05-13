import React, { useContext, useState } from "react";
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
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData) => {
    console.log(formData);
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/admin/adminLogin`, formData);

      console.log(response);
      const {success, adminId, userType}= response.data
      console.log(adminId)

      if (success) {
        toast.success("Login successful!");
       
        localStorage.setItem("userType",userType)
        navigate("/adminHomePage");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-gray">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h1 className="text-2xl font-bold text-teal-blue mb-4 text-center">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter Your Email
            </label>

            <input
              type="email"
              id="email"
              placeholder="Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter Your Password
            </label>

            <input
              type="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("password", { required: "This field is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-teal-blue hover:bg-light-blue w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <div className="flex justify-center items-center">
                {loading ? <div class="loader"></div> : "Submit"}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
