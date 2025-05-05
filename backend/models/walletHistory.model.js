import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    token: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    transactionId: {
      type: String,
    },
    comment: {
      type: String,
    },
    upiId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("wallet", walletSchema);
export default Wallet;
