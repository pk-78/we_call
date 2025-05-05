import mongoose from "mongoose";
import User from "../models/user.model.js";

export const streamCoinDeductperMin = async (req,res) => {
  const { id } = req.params;

  const { streamerId } = req.body;
  console.log(streamerId)

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const streamer = await User.findById(streamerId);
    if (!streamer) {
      return res.status(400).json({
        success: false,
        message: "Streamer not found",
      });
    }
    if (user.coins < 10) {
      return res.status(400).json({
        success: false,
        message: "You dont have enough balance",
      });
    }
    user.coins = user.coins - 10;
    streamer.TotalEarning = (streamer.TotalEarning || 0) + 100;

    await user.save();
    await streamer.save();
    return res.status(200).json({
      success: true,
      message: "coins deducted",
      userCoins: user.coins,
    });
  } catch (error) {
    console.error("stream coin deduction", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
export const streamCoinDeductstart = async (req,res) => {
  const { id } = req.params;

  const { streamerId } = req.body;
  console.log(streamerId)

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const streamer = await User.findById(streamerId);
    if (!streamer) {
      return res.status(400).json({
        success: false,
        message: "Streamer not found",
      });
    }
    if (user.coins < 10) {
      return res.status(400).json({
        success: false,
        message: "You dont have enough balance",
      });
    }
    user.coins = user.coins - 5;
    streamer.TotalEarning = (streamer.TotalEarning || 0) + 50;

    await user.save();
    await streamer.save();
    return res.status(200).json({
      success: true,
      message: "coins deducted",
      userCoins: user.coins,
    });
  } catch (error) {
    console.error("stream coin deduction", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
