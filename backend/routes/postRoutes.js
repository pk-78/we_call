import express from "express";
import {  addComment, gift, toggleLike } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/like/:id", toggleLike);
router.post("/gift/:id", gift);
router.post("/comment/:id", addComment)

export default router;
