import express from "express";
import {
  bannerPicture,
  createUser,
  dailyCheckIn,
  editLocation,
  editUser,
  getAlluser,
  getRandomUser,
  getuserById,
  getUserByLocation,
  loginUser,
  profilePicture,
} from "../controllers/user.controller.js";
import { followingList } from "../controllers/userProfile.controller.js";
import { profileUpload, bannerUpload } from "../middleware/multer.js";


const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.put("/edituser/:id", editUser);
router.put("/editlocation/:id", editLocation);
router.get("/getuser/:id", getuserById);
router.get("/getallUsers", getAlluser);
router.post("/getuserByLocation", getUserByLocation);
router.post("/getRandomUser", getRandomUser);
router.post("/following/:id", followingList);
router.post("/updateProfile/:id", profileUpload, profilePicture);
router.post("/updatebanner/:id", bannerUpload, bannerPicture);
router.post("/dailyCheckIn/:id", dailyCheckIn)

export default router;
