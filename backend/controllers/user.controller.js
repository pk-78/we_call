import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import UserProfile from "../models/userProfile.model.js";
import Post from "../models/post.model.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { name, userName, email, gender, password, confirmPassword, userType } =
    req.body;
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const newProfile = new UserProfile(); // Default values from schema will be applied
    await newProfile.save();

    const isUser = userType !== "streamer";

    // Create a new User and link the UserProfile
    const newUser = new User({
      name,
      userName,
      email,
      gender,
      password: hashedPassword,
      confirmPassword,
      isUser,
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
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
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
      user: { id: user._id, isUser: user.isUser },
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
      name,
      userName,
      language,
      age,
      oldPassword,
      password,
      confirmPassword,
      hobby,
      description,
      tags,
    } = req.body;
    console.log(req.body);

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        error: "Password and confirmPassword do not match",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided ID.",
      });
    }
    if (oldPassword) {
      const checkHashedPAss = await bcrypt.hash(oldPassword, 10);
      if (user.password !== checkHashedPAss) {
        return res.status(400).json({
          success: false,
          message: "Incorrect Old password",
        });
      }
    }

    // Update only the provided fields
    user.userName = userName || user.userName;
    user.name = name || user.name;
    user.age = age || user.age;
    user.language = language || user.language;
    user.hobby = hobby || user.hobby;
    user.description = description || user.description;
    user.tags = tags || user.tags;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

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
    const user = await User.find({ isUser: false }).populate("otherProfile");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found .",
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
      $or: [
        { "location.city": city },
        { "location.state": state },
        { isUser: false },
      ],
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
    const user = await User.find({
      tags: { $in: tag },
      isUser: false,
    }).populate("otherProfile");

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
  const imageUrl = req.file.path;
  console.log(req.file);
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file found",
      });
    }
    // const profileLink = `${req.protocol}://${req.get("host")}/profile/${
    //   req.file.filename
    // }`;
    const user = await User.findByIdAndUpdate(
      id,
      { avatar: imageUrl },
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
      profileLink:imageUrl,
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
  const imageUrl = req.file.path;
  console.log(req.file);
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file found",
      });
    }
    // const bannerLink = `${req.protocol}://${req.get("host")}/banner/${
    //   req.file.filename
    // }`;
    const user = await User.findByIdAndUpdate(
      id,
      { coverImage: imageUrl },
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
      bannerLink:imageUrl,
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
      user.dailyCheckIn = Number(user.dailyCheckIn) + 1;
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

export const addPost = async (req, res) => {
  const { id } = req.params;
  const imageUrl = req.file.path; // This is the Cloudinary URL
  console.log(imageUrl)


  try {
    const { description, time, date } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this Id",
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Extract file path
    // const imageLink = `${req.protocol}://${req.get("host")}/posts/${
    //   req.file.filename
    // }`;

    // Create a new post
    const newPost = new Post({
      imageLink:imageUrl,
      description,
      date,
      time,
      owner: id,
    });

    // Save the post to DB
    const savedPost = await newPost.save();

    // Add the post ID to the user's posts array
    await User.findByIdAndUpdate(id, {
      $push: { posts: savedPost._id },
    });

    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "post not found with this id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post found successfully",
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};
export const getPostByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the user and populate the 'posts' field with actual post data
    const user = await User.findById(id).populate("posts");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      posts: user.posts, // Return all posts of the user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const allPost = await Post.find();
    if (!allPost) {
      return res.status(404).json({
        success: false,
        message: "No post found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post Fetch Successfully",
      posts: allPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

export const transaction = async (req, res) => {
  const { id } = req.params;
};

export const getNameProfile = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "No id Found",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Found ",
      users: { name: user.name, profile: user.avatar, _id: user._id },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const startLive = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }
    user.isLive = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User Is Live",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const endLive = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }
    user.isLive = false;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User Is Not Live",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const changeUPi = async (req, res) => {
  const { id } = req.params;
  const { upiId } = req.body;
  console.log(upiId)
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    user.upiId = upiId;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Upi Id changed",
      upiId: user.upiId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
