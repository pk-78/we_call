import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import UserProfile from "../models/userProfile.model.js";

export const createUser = async (req, res) => {
  const { name, userName, email, gender, password, confirmPassword } = req.body;
  try {
    if (
      [name, userName, email, gender, password, confirmPassword].some(
        (field) => field?.trim === ""
      )
    ) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res
        .status(409)
        .json({ success: false, error: "User already exists with this email" });
    }

    // Check if username already exists
    const userNameExists = await User.findOne({ userName });
    if (userNameExists) {
      return res
        .status(409)
        .json({ success: false, error: "Username is already taken" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Password and confirmPassword is not matching",
      });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, error: "Please enter a strong password" });
    }
    const newProfile = new UserProfile(); // Default values from schema will be applied
    await newProfile.save();

    // Create a new User and link the UserProfile
    const newUser = new User({
      name,
      userName,
      email,
      gender,
      password,
      confirmPassword,
      otherProfile: newProfile._id, // Link the UserProfile to this User
    });

    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "User Created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both userName and email exist
    const user = await User.findOne({ email })
      .select("+password")
      .populate("otherProfile");
    console.log("mila", user);

    // If no user is found with both userName and email
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided email.",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    console.log("ye h", token);
    res.status(200).json({
      success: true,
      data: user,

      message: "Login successful.",
      token,
      user: { id: user._id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: err.message,
    });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      age,
      location,
      name,
      language,
      password,
      confirmPassword,
      hobby,
      description,
      tags,
    } = req.body;
    // console.log(id)
    const user = await User.findOneAndUpdate(
      { _id: id },
      { name, age, location, language, hobby, description, tags },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided userid.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        error: "Password and confirmPassword is not matching",
      });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: err.message,
    });
  }
};
export const editLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { city, state } = req.body;
    // console.log(id)
    const user = await User.findByIdAndUpdate(
      { _id: id }, // The user's ID
      { location: { city: city, state: state } }, // The updated location
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided userid.",
      });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: err.message,
    });
  }
};

export const getuserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format.",
      });
    }

    // Fetch user and populate otherProfile
    const user = await User.findOne({ _id: id }).populate("otherProfile");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided ID.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found successfully",
      user,
    });
  } catch (err) {
    console.error("Error in getuserById:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: err.message,
    });
  }
};

export const getAlluser = async (req, res) => {
  try {
    const user = await User.find().populate("otherProfile");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided user ID.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found successfully",
      user,
    });
  } catch (err) {
    console.error("Error in getting All User:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: err.message,
    });
  }
};

export const getUserByLocation = async (req, res) => {
  const { city, state } = req.body;
  try {
    if (!city && !state) {
      return res.status(404).json({
        success: false,
        message: "City and State is not found.",
      });
    }

    const user = await User.find({
      $or: [{ "location.city": city }, { "location.state": state }],
    }).populate("otherProfile");
    res.status(200).json({
      success: true,
      message: "Users Found",
      user,
    });
  } catch (err) {
    console.error("Error in getting User by location", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: err.message,
    });
  }
};

export const getRandomUser = async (req, res) => {
  const { tag } = req.body;
  console.log(tag);

  if (!tag || !Array.isArray(tag)) {
    return res.status(400).json({
      success: false,
      message: "Tag is required and should be an array",
    });
  }

  try {
    // Find a user where at least one tag matches
    const user = await User.find({ tags: { $in: tag } }).populate(
      "otherProfile"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with matching tags",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User found",
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the user",
      error: error.message,
    });
  }
};
export const profilePicture = async (req, res) => {
  const { id } = req.params;
  console.log(req.file);
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file found",
      });
    }
    const profileLink = `${req.protocol}://${req.get("host")}/profile/${
      req.file.filename
    }`;
    const user = await User.findByIdAndUpdate(
      id,
      { avatar: profileLink },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile Picture updated SuccessFully",
      profileLink,
    });
  } catch (error) {
    console.log("error in profile picture", error);
    return res.status(500).json({
      success: false,
      message: "An error occured while uploading profile",
    });
  }
};
export const bannerPicture = async (req, res) => {
  const { id } = req.params;
  console.log(req.file);
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file found",
      });
    }
    const bannerLink = `${req.protocol}://${req.get("host")}/banner/${
      req.file.filename
    }`;
    const user = await User.findByIdAndUpdate(
      id,
      { coverImage: bannerLink },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cover Picture updated SuccessFully",
      bannerLink,
    });
  } catch (error) {
    console.log("error in profile picture", error);
    return res.status(500).json({
      success: false,
      message: "An error occured while uploading profile",
    });
  }
};

export const dailyCheckIn = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user Found",
      });
    }
    console.log(user.lastLogin);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (
      user.lastLogin &&
      new Date(user.lastLogin).toDateString() === today.toDateString()
    ) {
      return res.status(200).json({
        success: true,
        message: "Already Logged In Today",
      });
    }

    if (new Date(user.lastLogin).toDateString() === yesterday.toDateString()) {
      user.dailyCheckIn += 1;
    } else {
      user.dailyCheckIn = 1;
    }
    console.log(today);
    console.log(yesterday);
    user.lastLogin = today;
    console.log(user.lastLogin);
    console.log(user.coins);
    user.coins += 40 + 10 * user.dailyCheckIn; // Example reward logic
    console.log(user.coins);
    const rewardCoins = 40 + 10 * user.dailyCheckIn;
    res.status(200).json({
      message: "Daily login successful",
      streak: user.dailyCheckIn,
      points: rewardCoins,
      user,
    });
    await user.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in daily checkIn controller",
      error: error,
    });
  }
};
