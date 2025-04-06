import express from "express";
import {  gift, toggleLike } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/like/:id", toggleLike);
router.post("/gift/:id", gift);

export default router;
