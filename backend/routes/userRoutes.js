import express from "express";
import {
  addPost,
  bannerPicture,
  changeUPi,
  createUser,
  dailyCheckIn,
  editLocation,
  editUser,
  endLive,
  getAllPost,
  getAlluser,
  getNameProfile,
  getPostById,
  getPostByUserId,
  getRandomUser,
  getuserById,
  getUserByLocation,
  loginUser,
  profilePicture,
  startLive,
} from "../controllers/user.controller.js";
import { followingList } from "../controllers/userProfile.controller.js";
import { profileUpload, bannerUpload, postUpload } from "../middleware/multer.js";
import { streamCoinDeductperMin, streamCoinDeductstart } from "../controllers/live.controller.js";


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
router.post("/schedule/:id",postUpload, addPost)
router.post("/getPost",getPostById)
router.get("/getPostByUserId/:id",getPostByUserId)
router.get("/getAllPost",getAllPost)
router.get("/getNameAndProfile/:id", getNameProfile)
router.post("/startLive/:id", startLive)
router.post("/endLive/:id", endLive)
router.post("/streamcoindeductpermin/:id", streamCoinDeductperMin)
router.post("/streamcoindeductstart/:id", streamCoinDeductstart)
router.post("/changeUpi/:id", changeUPi)

export default router;
