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

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { _id, firstName, lastName } = req.user;

    if (!title || !content) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingDraft = await Story.findOne({ userId: _id, title, content });

    if (existingDraft) {
      await User.findByIdAndUpdate(_id, {
        $pull: { draftPosts: existingDraft._id },
      });

      await Story.findByIdAndDelete(existingDraft._id);
    }

    const newStory = new Story({
      userId: _id,
      title,
      content,
      author: `${firstName} ${lastName}`,
      likes: 0,
      dislikes: 0,
      views: 0,
    });

    await newStory.save();

    res.status(201).json({
      message: "Story posted successfully",
      story: newStory,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error posting story",
      error: err.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByIdAndDelete(id);
    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "Story not found" });
    }
    res.status(200).json({
      success: true,
      message: "Story deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting story",
      error: err.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const story = await Story.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "Story not found" });
    }
    res.status(200).json({
      success: true,
      message: "Story updated successfully",
      story: story,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating story",
      error: err.message,
    });
  }
};

const getDrafts = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).populate("draftPosts");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "Drafts retrieved successfully",
      drafts: user.draftPosts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching drafts",
      error: err.message,
    });
  }
};

const saveDraft = async (req, res) => {
  try {
    const { _id } = req.user;
    const { title, content } = req.body;
    const user = User.findById(_id);
    const draft = new Story({
      userId: _id,
      title,
      content,
    });

    await draft.save();
    user.draftPosts.push(draft._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Draft saved successfully",
      draft: draft,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error saving draft",
      error: err.message,
    });
  }
};

module.exports = {
  savePost,
  getSavedPosts,
  unsavePost,
  createPost,
  deletePost,
  updatePost,
  getDrafts,
  saveDraft,
};
