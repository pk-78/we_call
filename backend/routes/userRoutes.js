import express from "express";
import {
  createUser,
  editLocation,
  editUser,
  getAlluser,
  getRandomUser,
  getuserById,
  getUserByLocation,
  loginUser,
} from "../controllers/user.controller.js";
import { followingList } from "../controllers/userProfile.controller.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.put("/edituser/:id", editUser);
router.put("/editlocation/:id", editLocation);
router.get("/getuser/:id", getuserById);
router.get("/getallUsers", getAlluser);
router.post("/getuserByLocation", getUserByLocation);
router.post("/getRandomUser", getRandomUser)
router.post("/following/:id",followingList)

export default router;
