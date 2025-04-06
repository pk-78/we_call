import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { url } from "../url/url";
import UserContext from "../context/UserContext";
import toast from "react-hot-toast";

const hobbiesEnum = [
  "Reading",
  "Traveling",
  "Cooking",
  "Gardening",
  "Photography",
  "Music",
  "Dancing",
  "Painting",
  "Sports",
  "Fitness",
  "Writing",
  "Crafting",
  "Fishing",
  "Gaming",
  "Yoga",
  "Meditation",
  "Hiking",
  "Cycling",
  "Collecting",
  "Watching Movies",
];

const languagesEnum = [
  "Hindi",
  "English",
  "Punjabi",
  "Marathi",
  "Gujarati",
  "Tamil",
  "Telugu",
  "Malayalam",
  "Kannada",
  "Bengali",
  "Odia",
  "Assamese",
  "Urdu",
];

const tagsEnum = [
  "Kind",
  "Generous",
  "Compassionate",
  "Loving",
  "Empathetic",
  "Caring",
  "Adventurous",
  "Energetic",
  "Cheerful",
  "Charming",
  "Optimistic",
  "Outgoing",
  "Creative",
  "Imaginative",
  "Innovative",
  "Visionary",
  "Curious",
  "Intellectual",
  "Confident",
  "Ambitious",
  "Determined",
  "Fearless",
  "Independent",
  "Resilient",
  "Charismatic",
  "Friendly",
  "Approachable",
  "Persuasive",
  "Diplomatic",
];

export default function EditProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useContext(UserContext);
  console.log(id);
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.put(`${url}/api/user/edituser/${id}`, data);
      console.log("dfddfd", response);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center mb-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto max-h-[90vh]">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-600 focus:border-teal-600"
            />
          </div>
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
              {...register("userName")}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-600 focus:border-teal-600"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              {...register("description")}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-600 focus:border-teal-600"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="text"
              id="age"
              {...register("age")}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-600 focus:border-teal-600"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              {...register("oldPassword")}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-600 focus:border-teal-600"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-600 focus:border-teal-600"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-600 focus:border-teal-600"
            />
          </div>

          {/* Hobbies */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hobbies
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
              {hobbiesEnum.map((hobby) => (
                <label
                  key={hobby}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input type="checkbox" value={hobby} {...register("hobby")} />
                  <span>{hobby}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Languages
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
              {languagesEnum.map((lang) => (
                <label
                  key={lang}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="checkbox"
                    value={lang}
                    {...register("language")}
                  />
                  <span>{lang}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
              {tagsEnum.map((tag) => (
                <label
                  key={tag}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input type="checkbox" value={tag} {...register("tags")} />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
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
