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
} = require("../controllers/story.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const storyRouter = express.Router();

storyRouter.get("/stories/all", getAllStories);
storyRouter.get("/:userId/stories", authMiddleware, getAllStoriesByUser);
storyRouter.get("/stories/:id", getStoryById);
storyRouter.post("/stories/add", authMiddleware, postStory);
storyRouter.delete("/stories/:id", authMiddleware, deleteStory);
storyRouter.put("/stories/:id", authMiddleware, updateStory);
storyRouter.patch("/stories/:id", authMiddleware, likeStory);
storyRouter.patch("/stories/:id", authMiddleware, dislikeStory);

module.exports = storyRouter;
