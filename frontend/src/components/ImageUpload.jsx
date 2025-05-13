import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { url } from "../url/url";

export default function ImageUpload({ id }) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [myId, setMyId] = useState(id);

  function submitImage(e) {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a file");
    } else {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  }

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("date", date);
    formData.append("time", time);
    formData.append("description", description);
    formData.append("postImage", image);

    try {
      const response = await axios.post(
        `${url}/api/user/schedule/${myId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);
      setDate("");
      setDescription("");
      setTime("");
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl w-full md:w-[500px] mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 overflow-y-auto h-auto max-h-[90vh]">
      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-teal-600">
          Create Post
        </h1>
      </div>

      {/* Form Section */}
      <div className="space-y-6">
        {/* Image Upload */}
        <div className="flex flex-col items-center justify-center">
          <label
            htmlFor="fileUpload"
            className="w-full cursor-pointer border-2 border-dashed border-gray-300 p-4 sm:p-6 text-center rounded-lg hover:border-teal-500 hover:bg-gray-100"
          >
            <input
              id="fileUpload"
              type="file"
              accept="image/*, video/*"
              className="hidden"
              onChange={submitImage}
            />
            <p className="text-gray-600">
              {image ? (
                <span className="text-red-600">Choose another Image</span>
              ) : (
                "Click to choose image"
              )}
            </p>
          </label>
        </div>

        {image && (
          <img
            className="h-40 sm:h-60 object-cover mx-auto rounded-md"
            src={imageUrl}
            alt="preview"
          />
        )}

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="text-gray-700 font-medium mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            placeholder="Write a description..."
          />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label htmlFor="date" className="text-gray-700 font-medium mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Time */}
        <div className="flex flex-col">
          <label htmlFor="time" className="text-gray-700 font-medium mb-2">
            Time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            onClick={submitHandler}
            className="w-full sm:w-auto bg-teal-600 text-white py-2 px-6 rounded-lg font-semibold shadow-md hover:bg-teal-700 focus:outline-none"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
