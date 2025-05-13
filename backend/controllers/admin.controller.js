import mongoose from "mongoose";
import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Wallet from "../models/walletHistory.model.js";
import User from "../models/user.model.js";

export const adminSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    return res.status(200).json({
      message: "Admin Signup successfull",
      newAdmin,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      successs: false,
      message: error.message,
    });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Either email or password is wrong",
      });
    }

    const comparePassword = await bcrypt.compare(password, admin.password);
    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Either email or password is wrong",
      });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
      adminId: admin._id,
      userType:"admin"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPendingPayment = async (req, res) => {
  try {
    const allPending = await Wallet.find({ status: "pending" });
    if (!allPending) {
      return res.status(200).json({
        success: true,
        message: "No pending Payments",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment fetched successfully",
      allPending,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
      message: "Something went wrong",
    });
  }
};

export const getAllCompletePayment = async (req, res) => {
  try {
    const completePayment = await Wallet.find({ status: "approved" });
    if (!completePayment) {
      return res.status(400).json({
        success: false,
        message: " some issue",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment fetched successfully",
      completePayment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
      message: "Something went wrong",
    });
  }
};
export const getAllRejectedPayment = async (req, res) => {
  try {
    const rejectedPayment = await Wallet.find({ status: "rejected" });
    if (!rejectedPayment) {
      return res.status(400).json({
        success: false,
        message: " some issue",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment fetched successfully",
      rejectedPayment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
      message: "Something went wrong",
    });
  }
};

export const acceptWalletPayment = async (req, res) => {
  const { transactionId, paymentId } = req.body;
  try {
    const paymentOrder = await Wallet.findById(paymentId);
    if(paymentOrder.status==="rejected"){
        return res.status(400).json({
            success:false,
            message:"Already rejected"
        })
    }

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: "No payment order found",
      });
    }

    paymentOrder.status = "approved";
    paymentOrder.transactionId = transactionId;

    await paymentOrder.save();

    return res.status(200).json({
      success: true,
      message: "Payment approved",
      paymentOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: "Something went wrong",
    });
  }
};

export const rejectWalletPayment = async (req, res) => {
  const { comment, paymentId } = req.body;

  try {
    const paymentOrder = await Wallet.findById(paymentId).populate("userId");
    if(paymentOrder.status==="rejected"){
        return res.status(400).json({
            success:false,
            message:"Already rejected"
        })
    }

    if (!paymentOrder) {
      return res.status(400).json({
        success: false,
        message: "No payment order found",
      });
    }

    const user = paymentOrder.userId;
    const updatedEarning = (user.TotalEarning || 0) + paymentOrder.token;
    console.log(updatedEarning);

    await User.findByIdAndUpdate(user._id, {
      TotalEarning: updatedEarning,
    });

    paymentOrder.status = "rejected";
    paymentOrder.comment = comment;

    await paymentOrder.save();

    return res.status(200).json({
      success: true,
      message: "Payment rejected",
      paymentOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong",
    });
  }
};
