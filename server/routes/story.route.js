const express = require("express");
const {
  getAllStories,
  getAllStoriesByUser,
  getStoryById,
  postStory,
  deleteStory,
  updateStory,
  viewStory,
  increaseLike,
  decreaseDislike,
  decreaseLike,
  increaseDislike,
  getTrendingStories,
  getMostViewedStories,
  getRecentStories,
  getMostLikedStories,
} = require("../controllers/story.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const storyRouter = express.Router();

storyRouter.get("/stories/all", getAllStories);
storyRouter.get("/:userId/stories", authMiddleware, getAllStoriesByUser);
storyRouter.get("/stories/:id", getStoryById);
storyRouter.post("/stories/add", authMiddleware, postStory);
storyRouter.delete("/stories/:id", authMiddleware, deleteStory);
storyRouter.put("/stories/:id", authMiddleware, updateStory);
storyRouter.patch("/stories/:id/like/increment", authMiddleware, increaseLike);
storyRouter.patch("/stories/:id/like/decrement", authMiddleware, decreaseLike);
storyRouter.patch("/stories/:id/dislike/increment", authMiddleware, increaseDislike);
storyRouter.patch("/stories/:id/dislike/decrement", authMiddleware, decreaseDislike);
storyRouter.patch("/stories/:id/viewed", viewStory);
storyRouter.get("/stories/trending", getTrendingStories);
storyRouter.get("/stories/mostviewed", getMostViewedStories);
storyRouter.get("/stories/recent", getRecentStories);
storyRouter.get("/stories/mostliked", getMostLikedStories);

module.exports = storyRouter;
