const User = require("../models/user.model");
const Story = require("../models/story.model");
const mongoose = require("mongoose");

const savePost = async (req, res) => {
  try {
    const { id } = req.params; // Story ID
    const { _id } = req.user; // User ID

    const user = await User.findById(_id);
    const story = await Story.findById(id);

    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "Story not found" });
    }

    const storyId = new mongoose.Types.ObjectId(id);

    if (user.savedPosts.some((postId) => postId.equals(storyId))) {
      return res.status(400).json({
        success: false,
        message: "Story already saved",
      });
    }

    user.savedPosts.push(storyId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Story saved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const unsavePost = async (req, res) => {
  try {
    const { id } = req.params; // Story ID
    const { _id } = req.user; // User ID

    const user = await User.findById(_id);

    const storyId = new mongoose.Types.ObjectId(id);

    if (!user.savedPosts.some((postId) => postId.equals(storyId))) {
      return res.status(400).json({
        success: false,
        message: "Story not found in saved posts",
      });
    }

    user.savedPosts = user.savedPosts.filter(
      (postId) => !postId.equals(storyId)
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: "Story unsaved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const getSavedPosts = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id).populate("savedPosts");

    res.status(200).json({
      success: true,
      savedPosts: user.savedPosts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};


module.exports = {
  savePost,
  getSavedPosts,
  unsavePost
};
