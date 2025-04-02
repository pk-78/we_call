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
  
  
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
