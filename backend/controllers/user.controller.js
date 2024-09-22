import User from "../models/user.js";

export const createUser = async (req, res) => {
  const { name, userName, email, gender, password } = req.body;
  try {
    if (!name || !userName || !email || !gender || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists with this email" });
    }

    // Check if username already exists
    const userNameExists = await User.findOne({ userName });
    if (userNameExists) {
      return res
        .status(400)
        .json({ success: false, error: "Username is already taken" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, error: "Please enter a strong password" });
    }
    const newUser = new User({ name, userName, email, gender, password });
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

    // Compare the password directly (without hashing)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    // If everything is correct, return success and login the user
    res.status(200).json({
      success: true,
      data: user,
      message: "Login successful.",
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
