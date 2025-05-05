import mongoose from "mongoose";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import Payment from "../models/paymentHistory.model.js";
import User from "../models/user.model.js";
dotenv.config();

export const payment = async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: "receipt#1",
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);

    return res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
      response: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something Went Wrong");
  }
};
export const checkPaymentAndAddCoins = async (req, res) => {
  const { id } = req.params;
  const { paymentId, amount, coinsToAdd } = req.body;
  const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  console.log(amount);
  console.log(coinsToAdd);
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Something Went Wrong Please Try Again!!",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found Please Try Again!!",
      });
    }

    if (payment.status !== "authorized") {
      return res.status(404).json({
        success: false,
        message: "Payment is not authorized",
      });
    }
    if (Number(payment.amount) / 100 !== Number(amount)) {
      return res.status(400).json({
        success: false,
        message: "Amount do not match",
      });
    }
    const totalCoins = Number(user.coins) + Number(coinsToAdd);
    const newPayment = new Payment({
      userId: id,
      paymentId: paymentId,
      amount: amount,
      initialCoin: user.coins,
      finalCoin: totalCoins,
    });
    user.coins = Number(user.coins) + Number(coinsToAdd);
    await newPayment.save();
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Coins added successfully!",
      coins: user.coins,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkPayment = async (req, res) => {
  const { paymentId } = req.params;

  const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  try {
    const payment = await razorpay.payments.fetch(paymentId);

    if (!payment) {
      return res.status(500).json();
    }
    res.json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency,
      response: payment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server Error"});
  }
};

export const paymentHistory = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "UserId not found",
      });
    }

    const history = await Payment.find({ userId: id });
    if (!history) {
      return res.status(400).json({
        success: false,
        message: "No History Found",
      });
    }

    return res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server Error"});
  }
};
