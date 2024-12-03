import express from "express";
import { createUser, editUser, getuserById, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.put("/edituser/:id", editUser)
router.get("/getuser/:id", getuserById)

export default router;
