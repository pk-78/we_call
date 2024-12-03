import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: false,
    },
    description:{
      type:String
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    avatar: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    location: {
      type: String,
    },
    hobby: {
      type: String,
    },
    language: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    userProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
