import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  friends: {
    type: Number,
    default: 0,
  },
  followers: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
  rating: {
    type: String,
    default: 4,
  },
  coins: {
    type: Number,
    default: 0,
  },
});
const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;
