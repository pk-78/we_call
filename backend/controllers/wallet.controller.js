import User from "../models/user.model.js";
import Wallet from "../models/walletHistory.model.js";

export const initiateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const {upiId} = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user found",
      });
    }
    if (user.TotalEarning < 23000) {
      return res.status(400).json({
        success: false,
        message: "Not enough balance",
      });
    }

    const token = user.TotalEarning;
    const amount = (token / 226).toFixed(2);

    user.TotalEarning = 0;
    await user.save();

    const newTransaction = new Wallet({
      userId: id,
      token,
      amount,
      status: "pending",
      upiId
    });

    await newTransaction.save();

    return res.status(201).json({
      message: "Withdrawal request submitted",
      transaction: newTransaction,
    });
  } catch (err) {
    console.error("Error initiating transaction:", err);
    return res.status(500).json({ message: "Server error", err: err });
  }
};

export const getUserTransactions = async (req, res) => {
  try {
    const { id } = req.params;

    const transactions = await Wallet.find({ userId:id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "History Found",
      transactions,
    });
  } catch (err) {
    console.error("Failed to fetch transactions:", err);
    return res.status(500).json({ message: "server error", err: err });
  }
};
