import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import axios from "axios";
import { url } from "../url/url";
import UserContext from "../context/UserContext";

export default function Login({ setName }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setUserDetail } = useContext(UserContext);

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      // API call to check if user exists with provided username, email, and password
      const response = await axios.post(`${url}/api/user/login`, formData);

      console.log(response);

      // Extract the success status and user data from the response
      const { success, data: userData } = response.data;

      // Validate the response
      if (success) {
        const { user, token } = response.data;
        toast.success("Login successful!");
        setIsLoggedIn(true);
        // setUserDetail(response.data.data)
        setName(userData?.name);
        localStorage.setItem("id", user.id);
        localStorage.setItem("token",token);
        navigate("/home"); // Redirect to home page or dashboard
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-gray">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h1 className="text-2xl font-bold text-teal-blue mb-4 text-center">
          Login
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
              Submit
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-700 mb-2">OR</p>
          <button className="flex items-center justify-center w-full bg-teal-blue hover:bg-light-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign in with <FcGoogle className="ml-2" />
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Dont have an account?{" "}
            <NavLink to="/signup" className="text-teal-blue hover:underline">
              Signup
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
