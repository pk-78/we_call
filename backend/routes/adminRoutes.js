import express from "express";
import { acceptWalletPayment, adminLogin, adminSignup, getAllCompletePayment, getAllPendingPayment, getAllRejectedPayment, rejectWalletPayment } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/adminSignup", adminSignup);
router.post("/adminLogin", adminLogin);
router.get("/getPendingPayment", getAllPendingPayment);
router.get("/getApprovedPayment", getAllCompletePayment);
router.get("/getRejectedPayment", getAllRejectedPayment);
router.post("/approvePayment", acceptWalletPayment);
router.post("/rejectPayment", rejectWalletPayment);

export default router;
