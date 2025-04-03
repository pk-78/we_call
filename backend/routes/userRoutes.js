import express from "express";
import {
  addPost,
  bannerPicture,
  createUser,
  dailyCheckIn,
  editLocation,
  editUser,
  getAllPost,
  getAlluser,
  getPostById,
  getPostByUserId,
  getRandomUser,
  getuserById,
  getUserByLocation,
  loginUser,
  profilePicture,
} from "../controllers/user.controller.js";
import { followingList } from "../controllers/userProfile.controller.js";
import { profileUpload, bannerUpload, postUpload } from "../middleware/multer.js";


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

export default router;
