import express from "express";
import { checkPayment, checkPaymentAndAddCoins, payment, paymentHistory } from "../controllers/payment.controller.js";

const router = express.Router();


router.post("/orders", payment)
router.get("/payment/:paymentId", checkPayment)
router.post("/checkPaymentAndAddcoins/:id", checkPaymentAndAddCoins)
router.get("/paymentHistory/:id",paymentHistory)



export default router