const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken"); // Import the middleware
const mongoose = require("mongoose");

// Create a Post
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    console.log(user, title, description, image);

    if (!title || !description || !image || !user) {
      return res.status(400).json({
        success: false,
        message: "Please Provide all field",
      });
    }

    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res.status(201).json({
        success: false,
        message: "Unable to find user",
      });
    }

    const newPost = new Post({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newPost.save({ session });
    existingUser.posts.push(newPost);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Bolg Created",
      newPost,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error While Creating Blog",
    });
  }
});

// Get All Posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user");
    if (!posts) {
      return res.status(200).json({
        success: false,
        message: "No Blogs Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All Blogs",
      posts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error While Getting Blogs",
    });
  }
});

// Update Post
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Blog Updated",
      post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error While Updating Image",
    });
  }
});

//get single blog
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found with this ID",
      });
    }
    res.status(200).json({
      success: true,
      message: "Fetch single blog",
      post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error While Getting This Blog",
    });
  }
});

// Delete Post
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete(req.params.id).populate("user");
    await post.user.posts.pull(post);
    await post.user.save();

    res.status(200).json({
      success: true,
      message: "Blog Deleted",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Error While Deleteing This Blog",
    });
  }
});

//get users blog
router.get("/my-posts/:id", verifyToken, async (req, res) => {
  try {
    const posts = await User.findById(req.params.id).populate("posts");
    if (!posts) {
      return res.status(404).json({
        success: false,
        message: "Blogs not found with this Id",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Blogs",
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "error in user blogs",
    });
  }
});
module.exports = router;
