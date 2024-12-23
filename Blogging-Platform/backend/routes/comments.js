// routes/comments.js
const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const { verifyToken } = require("../middleware/verifyToken");

// CREATE COMMENT
router.post("/:postId", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json("Post not found");

    const newComment = new Comment({
      content: req.body.content,
      author: req.user.id,
      post: post._id,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL COMMENTS FOR A POST
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "username")
      .sort({ createdAt: -1 }); // Newest comments first
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE COMMENT
router.put("/:commentId", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json("Comment not found");

    if (comment.author.toString() !== req.user.id)
      return res.status(403).json("You can only edit your own comments");

    comment.content = req.body.content;
    const updatedComment = await comment.save();
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE COMMENT
router.delete("/:commentId", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json("Comment not found");

    if (comment.author.toString() !== req.user.id)
      return res.status(403).json("You can only delete your own comments");

    await comment.remove();
    res.status(200).json("Comment deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
