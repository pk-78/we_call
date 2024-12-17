import express from "express";
import {
  createUser,
  editLocation,
  editUser,
  getAlluser,
  getuserById,
  getUserByLocation,
  loginUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.put("/edituser/:id", editUser);
router.put("/editlocation/:id", editLocation);
router.get("/getuser/:id", getuserById);
router.get("/getallUsers", getAlluser);
router.post("/getuserByLocation", getUserByLocation);

export default router;
