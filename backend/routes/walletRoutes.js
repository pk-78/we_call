import express from "express";
import { getUserTransactions, initiateTransaction } from "../controllers/wallet.controller.js";

const router = express.Router()

router.post("/initiateTransaction/:id", initiateTransaction)
router.get("/getAllTransaction/:id", getUserTransactions)

export default router