const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { getSavedPosts, savePost, unsavePost } = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/user/stories/saved", authMiddleware, getSavedPosts);
userRouter.post("/user/stories/:id/save", authMiddleware, savePost);
userRouter.post("/user/stories/:id/unsave", authMiddleware, unsavePost);

module.exports = userRouter;