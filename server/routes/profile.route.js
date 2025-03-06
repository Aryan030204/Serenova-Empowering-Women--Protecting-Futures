const authMiddleware = require("../middlewares/auth.middleware");

const profileRouter = require("express").Router();

profileRouter.get("/profile", authMiddleware, (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "something went wrong",
      Error: err.message,
    });
  }
});

module.exports = profileRouter;
