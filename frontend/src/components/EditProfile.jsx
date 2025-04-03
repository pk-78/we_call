import React from "react";
import { useForm } from "react-hook-form";

export default function EditProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function OnSubmit(data) {
    console.log(data);
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center mb-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit(OnSubmit)} className="space-y-6">
        
          {/* UserId Input */}
          <div className="flex flex-col">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              {...register("userName", { required: "UserName is required" })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-600 focus:border-teal-600"
            />
            {errors.userName && (
              <p className="text-pink-500 text-xs mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          {/* ID Input */}
          {/* <div className="flex flex-col">
            <label
              htmlFor="Id"
              className="block text-sm font-medium text-gray-700"
            >
              ID
            </label>
            <input
              type="number"
              id="Id"
              name="Id"
              {...register("Id", { required: "UserId is required" })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-600 focus:border-teal-600"
            />
            {errors.Id && (
              <p className="text-pink-500 text-xs mt-1">{errors.Id.message}</p>
            )}
          </div> */}

          {/* Email Input */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-600 focus:border-teal-600"
            />
            {errors.email && (
              <p className="text-pink-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Location Input */}
          <div className="flex flex-col">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              {...register("location", { required: "Location is required" })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-600 focus:border-teal-600"
            />
            {errors.location && (
              <p className="text-pink-500 text-xs mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Gender Radio Selection */}
          <div className="flex flex-col">
            <h2 className="text-sm font-medium text-gray-700">Gender</h2>
            <div className="flex space-x-4 mt-2">
              <label htmlFor="male" className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  value="male"
                  {...register("gender", {
                    required: "This field is required",
                  })}
                  className="mr-2 focus:ring-teal-600"
                />
                Male
              </label>
              <label htmlFor="female" className="flex items-center">
                <input
                  type="radio"
                  id="female"
                  value="female"
                  {...register("gender", {
                    required: "This field is required",
                  })}
                  className="mr-2 focus:ring-teal-600"
                />
                Female
              </label>
            </div>
            {errors.gender && (
              <p className="text-pink-500 text-xs mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Age Input */}
          <div className="flex flex-col">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              {...register("age", { required: "Age is required" })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-600 focus:border-teal-600"
            />
            {errors.age && (
              <p className="text-pink-500 text-xs mt-1">{errors.age.message}</p>
            )}
          </div>

          {/* Mobile Number Input */}
          <div className="flex flex-col">
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              type="number"
              id="mobileNumber"
              name="mobileNumber"
              {...register("mobileNumber", {
                required: "Mobile Number is required",
              })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-600 focus:border-teal-600"
            />
            {errors.mobileNumber && (
              <p className="text-pink-500 text-xs mt-1">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg shadow-lg hover:bg-teal-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
