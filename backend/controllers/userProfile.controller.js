import User from "../models/user.model.js";
import UserProfile from "../models/userProfile.model.js";

export const followingList = async (req, res) => {
  const { id } = req.params;
  const { otherId } = req.body;

  //   console.log(id,otherId)

  if (!otherId) {
    return res.status(400).json({
      success: false,
      message: "Other person id is required",
    });
  }
  try {
    const user1 = await User.findById(id).populate("otherProfile");
    if (!user1 || !user1.otherProfile) {
      return res.status(404).json({
        success: false,
        message: "User or UserProfile is not found in user1",
      });
    }
    const user2 = await User.findById(otherId).populate("otherProfile");
    if (!user2 || !user2.otherProfile) {
      return res.status(404).json({
        success: false,
        message: "User or UserProfile is not found in user2",
        id,
        otherId,
      });
    }
    const userProfile1 = await UserProfile.findByIdAndUpdate(
      user1.otherProfile._id,
      { $addToSet: { following: otherId } }, // Ensures no duplicates
      { new: true }
    );
    const userProfile2 = await UserProfile.findByIdAndUpdate(
      user2.otherProfile._id,
      { $addToSet: { followers: id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Following list updated successfully",
      userProfile1,
      userProfile2,
    });
  } catch (error) {
    console.log("Error in followingList controller", error);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};
