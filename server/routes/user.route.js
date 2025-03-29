const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { getSavedPosts, savePost } = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("user/stories/saved", authMiddleware, getSavedPosts);
userRouter.post("user/stories/:id/save", authMiddleware, savePost);


module.exports = userRouter;