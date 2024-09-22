import React from "react";

export default function ImageUpload() {
  return (
    <div className="h-[700px] w-[500px] bg-white  shadow-lg rounded-lg p-6 mx-auto">
      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-teal-600">Create Post</h1>
      </div>

      {/* Form Section */}
      <div className="space-y-6">
        {/* Image Upload */}
        <div className="flex flex-col items-center justify-center">
          <label
            htmlFor="fileUpload"
            className="w-full cursor-pointer border-2 border-dashed border-gray-300 p-6 text-center rounded-lg hover:border-teal-500 hover:bg-gray-100"
          >
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              //   accept="image"
              accept="image/*, video/*"
            />
            <p className="text-gray-600">Click to upload image</p>
          </label>
        </div>

        {/* Description Input */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            placeholder="Write a description..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-teal-600 text-white py-2 px-6 rounded-lg font-semibold shadow-md hover:bg-teal-700 focus:outline-none"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
