const { default: mongoose } = require("mongoose");
const Story = require("../models/story.model");
const User = require("../models/user.model");

//get all stories (feed)
const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json({
      message: "Stories fetched successfully",
      stories: stories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching stories",
      error: err,
    });
  }
};

//get all stories by author/user
const getAllStoriesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const stories = await Story.find({ userId });

    res.status(200).json({
      message: "Stories fetched successfully",
      stories: stories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching story",
      error: err,
    });
  }
};

//get a story by its id
const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }
    res.status(200).json({
      message: "Story fetched successfully",
      story: story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching story getStory",
      error: err,
    });
  }
};

//create a new story
const postStory = async (req, res) => {
  try {
    const { userId, title, content, author, likes, dislikes } = req.body;
    if (!userId || !title || !content || !author) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newStory = new Story({
      userId,
      title,
      content,
      author,
      likes,
      dislikes,
    });

    await newStory.save();
    res.status(201).json({
      message: "Story created successfully",
      story: newStory,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error posting story",
      error: err.message,
    });
  }
};

//delete a story
const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByIdAndDelete(id);
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }
    res.status(200).json({
      message: "Story deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting story",
      error: err,
    });
  }
};

//update/edit a story
const updateStory = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const story = await findByIdAndUpdate(
      id,
      {
        title: title,
        content: content,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }
    res.status(200).json({
      message: "Story updated successfully",
      story: story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating story",
      error: err,
    });
  }
};

//like a story
const increaseLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const user = await User.findById(_id);
    const story = await Story.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }
    if (user.likedPosts.includes(id)) {
      return res.status(400).json({
        message: "You already liked this story",
      });
    }

    user.likedPosts.push(id);
    await user.save();

    res.status(200).json({
      message: "Story like increased successfully",
      story: story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error increasing like on story",
      error: err.message,
    });
  }
};

const decreaseLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const user = await User.findById(_id);
    const story = await Story.findByIdAndUpdate(
      id,
      {
        $inc: { likes: -1 },
      },
      {
        new: true,
      }
    );
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }
    user.likedPosts.pull(id);
    await user.save();

    res.status(200).json({
      message: "Story like increased successfully",
      story: story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error increasing like on story",
      error: err.message,
    });
  }
};

//dislike a story
const increaseDislike = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByIdAndUpdate(id, {
      $inc: { dislikes: 1 },
    });
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.status(200).json({
      message: "Story like increased successfully",
      story: story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error increasing like on story",
      error: err.message,
    });
  }
};

const decreaseDislike = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByIdAndUpdate(id, {
      $inc: { dislikes: -1 },
    });
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.status(200).json({
      message: "Story like increased successfully",
      story: story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error increasing like on story",
      error: err.message,
    });
  }
};

//view a story (views)
const viewStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByIdAndUpdate(
      id,
      {
        $inc: { views: 1 },
      },
      {
        new: true,
      }
    );
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.status(200).json({
      message: "Story viewed successfully",
      story: story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error viewing story",
      error: err,
    });
  }
};

//get trending stories
const getTrendingStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .sort({ views: -1, dislikes: 1, likes: -1 })
      .limit(5);
    res.status(200).json({
      message: "Trending stories fetched successfully",
      trendingStories: stories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error getting trending stories",
      error: err.message,
    });
  }
};

//get most viewed stories
const getMostViewedStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ views: -1 }).limit(5);
    res.status(200).json({
      message: "Most viewed stories fetched successfully",
      mostViewedStories: stories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error getting most viewed stories",
      error: err.message,
    });
  }
};

//get most liked stories
const getMostLikedStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ likes: -1 }).limit(5);
    res.status(200).json({
      message: "Most liked stories fetched successfully",
      mostLikedStories: stories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error getting most liked stories",
      error: err.message,
    });
  }
};

//get recent stories
const getRecentStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json({
      message: "Recent stories fetched successfully",
      recentStories: stories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error getting recent stories",
      error: err.message,
    });
  }
};

module.exports = {
  getAllStories,
  getAllStoriesByUser,
  getStoryById,
  postStory,
  deleteStory,
  updateStory,
  increaseLike,
  decreaseLike,
  increaseDislike,
  decreaseDislike,
  viewStory,
  getMostLikedStories,
  getRecentStories,
  getMostViewedStories,
  getTrendingStories,
};
