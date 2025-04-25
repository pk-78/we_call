import mongoose, { mongo } from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    amount: {
      type: Number,
    },
    initialCoin: {
      type: Number,
    },
    finalCoin: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
