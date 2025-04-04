const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true, // Ensures MongoDB auto-generates _id
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true, // ❌ Removed unique constraint
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
      min: 0,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// ✅ Ensure userId is always a valid ObjectId
storySchema.pre("save", function (next) {
  if (!mongoose.Types.ObjectId.isValid(this.userId)) {
    return next(new Error("Invalid userId"));
  }
  next();
});

module.exports = mongoose.model("Story", storySchema);
