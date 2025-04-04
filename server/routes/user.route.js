const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getSavedPosts,
  savePost,
  unsavePost,
  createPost,
  updatePost,
  deletePost,
  getDrafts,
  saveDraft,
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/user/stories/saved", authMiddleware, getSavedPosts);
userRouter.post("/user/stories/:id/save", authMiddleware, savePost);
userRouter.post("/user/stories/:id/unsave", authMiddleware, unsavePost);
userRouter.post("/user/stories/create", authMiddleware, createPost);
userRouter.put("/user/stories/:id/update", authMiddleware, updatePost);
userRouter.delete("/user/stories/:id/delete", authMiddleware, deletePost);
userRouter.get("/user/stories/drafts", authMiddleware, getDrafts);
userRouter.post("/user/stories/drafts/save",authMiddleware, saveDraft);

module.exports = userRouter;
