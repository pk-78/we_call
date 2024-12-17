import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  friends: {
    type: [String],
    default: [],
  },
  followers: {
    type: [String],
    default: [],
  },
  following: {
    type: [String],
    default: [],
  },
  rating: {
    type: String,
    default: 4,
  },
  coins: {
    type: Number,
    default: 200,
  },
  
});
const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;
