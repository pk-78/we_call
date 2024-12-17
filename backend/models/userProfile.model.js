import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  friends: {
    type: Number,
    default: 1,
  },
  followers: {
    type: Number,
    default: 1,
  },
  following: {
    type: Number,
    default: 1,
  },
  rating: {
    type: Number, // Changed to Number
    default: 4,
  },
  coins: {
    type: Number,
    default: 200,
  },
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;
