const express = require("express");
const {
  getAllStories,
  getAllStoriesByUser,
  getStoryById,
  postStory,
  deleteStory,
  updateStory,
  likeStory,
  dislikeStory,
  viewStory,
} = require("../controllers/story.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const storyRouter = express.Router();

storyRouter.get("/stories/all", getAllStories);
storyRouter.get("/:userId/stories", authMiddleware, getAllStoriesByUser);
storyRouter.get("/stories/:id", getStoryById);
storyRouter.post("/stories/add", authMiddleware, postStory);
storyRouter.delete("/stories/:id", authMiddleware, deleteStory);
storyRouter.put("/stories/:id", authMiddleware, updateStory);
storyRouter.patch("/stories/:id/like", authMiddleware, likeStory);
storyRouter.patch("/stories/:id/dislike", authMiddleware, dislikeStory);
storyRouter.patch("/stories/:id/viewed", viewStory);

module.exports = storyRouter;
