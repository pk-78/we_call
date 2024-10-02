import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { url } from "../url/url";
import axios from "axios";
import UserContext from "../context/UserContext";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const onSubmit = async (data) => {
    if (password.length <= 8) {
      toast.error("password should have atleast 8 character");
    } else if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password are not matching");
    } else {
      try {
        // Send POST request to the API

        const response = await axios.post(`${url}/api/user/signup`, data);

        // Handle success response
        toast.success(response.data.message || "Signup successful!");
        navigate("/login");
      } catch (error) {
        // Handle error response
        console.log(error);
        toast.error(
          error.response?.data?.error || "Signup failed. Please try again."
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-gray">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h1 className="text-2xl font-bold text-teal-blue mb-4 text-center">
          Signup
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("name", { required: "This field is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>

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
              htmlFor="userName"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter Your Username
            </label>
            <input
              type="text"
              id="userName"
              placeholder="UserName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("userName", { required: "This field is required" })}
            />
            {errors.userName && (
              <p className="text-red-500 text-xs italic">
                {errors.userName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <h2 className="text-gray-700 font-bold mb-2">Choose Gender</h2>
            <label htmlFor="male" className="mr-4">
              <input
                type="radio"
                id="male"
                value="male"
                className="mr-2"
                {...register("gender", { required: "This field is required" })}
              />
              Male
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                value="female"
                className="mr-2"
                {...register("gender", { required: "This field is required" })}
              />
              Female
            </label>
            {errors.gender && (
              <p className="text-red-500 text-xs italic">
                {errors.gender.message}
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

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-bold mb-2"
            >
              Confirm Your Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("confirmPassword", {
                required: "This field is required",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-teal-blue hover:bg-light-blue w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-700 mb-2">OR</p>
          <button className="flex items-center justify-center w-full bg-teal-blue hover:bg-light-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign up with <FcGoogle className="ml-2" />
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Already have an account?{" "}
            <NavLink to="/login" className="text-teal-blue hover:underline">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
