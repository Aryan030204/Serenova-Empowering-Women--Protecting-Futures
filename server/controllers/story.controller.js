const Story = require("../models/story.model");

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
      message: "Error fetching story",
      error: err,
    });
  }
};

const postStory = async (req, res) => {
  try {
    const { userId, title, content, author, likes, dislikes } = req.body;
    if (!userId || !title || !content || !author) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!likes || !dislikes) {
      likes = 0;
      dislikes = 0;
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
      error: err,
    });
  }
};

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

const likeStory = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await findByIdAndUpdate(
      id,
      {
        $inc: { likes: 1 },
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
      message: "Story liked successfully",
      story: story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error liking story",
      error: err,
    });
  }
};

const dislikeStory = async (req, res) => {
  try {
    const { id } = rrw.params;
    const story = await findByIdAndUpdate(
      id,
      {
        $inc: { dislikes: 1 },
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
      message: "Story disliked successfully",
      story: story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error disliking story",
      error: err,
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
    likeStory,
    dislikeStory
}
