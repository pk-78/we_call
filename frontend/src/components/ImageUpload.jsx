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
  const [myId, setMyId]= useState(id)

  console.log("Meri h", id);

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
    formData.append("postImage", image); // Ensure it's a File object
    
    // console.log(formData);
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
      
      // console.log(response);
      toast.success(response.data.message)
      setDate("")
      setDescription("")
      setTime("")
      setImage(null)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-[700px] w-[500px] bg-white shadow-lg rounded-lg p-6 mx-auto overflow-y-auto">
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
              onChange={submitImage}
            />
            <p className="text-gray-600">
              {image ? (
                <p className="text-red-600">Choose another Image</p>
              ) : (
                "Click to choose image"
              )}
            </p>
          </label>
        </div>
        {image ? <img className="h-60  " src={imageUrl} alt="" /> : ""}

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
            value={description}
            onChange={(e) => {
              console.log(e.target.value);
              setDescription(e.target.value);
            }}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            placeholder="Write a description..."
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="date" className="text-gray-700 font-medium mb-2">
            Description
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            placeholder="Write a description..."
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="time" className="text-gray-700 font-medium mb-2">
            Description
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            placeholder="Write a description..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            onClick={submitHandler}
            className="bg-teal-600 text-white py-2 px-6 rounded-lg font-semibold shadow-md hover:bg-teal-700 focus:outline-none"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
