import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

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
    const newUser = new User({
      name,
      userName,
      email,
      gender,
      password,
      confirmPassword,
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
    const user = await User.findOne({ email });
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
    } = req.body;
    // console.log(id)
    const user = await User.findOneAndUpdate(
      { _id: id },
      { name, age, location, language, hobby, description },
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
export const getuserById = async (req, res) => {
  try {
    const { id } = req.params;

    // console.log(id)
    const user = await User.findOne({ _id: id }).populate("userProfile");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided userid.",
      });
    }

    res.status(200).json({ message: "User Found successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: err.message,
    });
  }
};
