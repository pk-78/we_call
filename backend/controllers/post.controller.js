import mongoose from "mongoose";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const toggleLike = async (req, res) => {
  const { id } = req.params; // User ID
  const { postId } = req.body;

  try {
    // Validate
    if (!id || !postId) {
      return res.status(400).json({
        success: false,
        message: "User ID or Post ID is missing.",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    // Check if already liked
    const alreadyLiked = post.like.includes(id);

    if (alreadyLiked) {
      // Unlike
      post.like = post.like.filter((userId) => userId !== id);
    } else {
      // Like
      post.like.push(id);
    }

    await post.save();

    return res.status(200).json({
      success: true,
      message: alreadyLiked ? "Post unliked." : "Post liked.",
      likeCount: post.like.length,
      likes: post.like,
    });
  } catch (error) {
    console.error("Like toggle error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const gift = async (req, res) => {
  const { id } = req.params;
  const { postId, postUploader, gift } = req.body;

  const giftData = {
    butterfly: 50,
    lollipop: 75,
    rose: 100,
  };

  const earnData = {
    butterfly: 400,
    lollipop: 600,
    rose: 800,
  };

  try {
    // Validate
    if (!id || !postId || !gift) {
      return res.status(400).json({
        success: false,
        message: "User ID, Post ID, or Gift is missing.",
      });
    }

    const giftCost = giftData[gift];
    const earningAmount = earnData[gift];

    if (!giftCost || !earningAmount) {
      return res.status(400).json({
        success: false,
        message: "Invalid gift selected.",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    const user = await User.findById(id);
    if (user.coins < giftCost) {
      return res.status(400).json({
        success: false,
        message: "You do not have enough balance.",
      });
    }
    if (!user.gift) user.gift = {};

    // user.gift[gift] = (user.gift[gift] || 0) + 1;

    const postUploaderUser = await User.findById(postUploader);
    if (!postUploaderUser.gift) postUploaderUser.gift = {};

    postUploaderUser.gift[gift] = (postUploaderUser.gift[gift] || 0) + 1;

    // Deduct coins according to gift
    user.coins = user.coins - giftCost;
    user.coinConsumption = Number(user.coinConsumption) + giftCost;

    // Add earning according to gift
    postUploaderUser.TotalEarning =
      (postUploaderUser.TotalEarning || 0) + earningAmount;

    post.gift.push(id);

    await post.save();
    await user.save();
    await postUploaderUser.save();

    return res.status(200).json({
      success: true,
      message: `${gift} sent successfully.`,
      giftCount: post.gift.length,
      gifts: post.gift,
      postUploaderUser,
      user,
    });
  } catch (error) {
    console.error("Gift error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const addComment = async (req, res) => {
  const { id } = req.params;
  const { postId, comment } = req.body;

  try {
    if (!id || !postId) {
      return res.status(400).json({
        success: false,
        message: "User ID or Post ID is missing.",
      });
    }

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "No comment found",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }
    post.comment.push({
      userId: id,

      comment,
    });

    await post.save();
    return res.status(200).json({
      success: true,
      message: "Comment added successfully",
      comments: post.comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};
