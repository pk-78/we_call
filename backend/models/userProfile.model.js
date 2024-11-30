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
  },
  coins: {
    type: Number,
    default: 0,
  },
  locationCity: {
    type: String,
  },
});
const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;
