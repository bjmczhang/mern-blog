const express = require("express");
const router = express.Router();
const Comment = require("../model/comment.model");

// create a comment
router.post("/post-comment", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(200).send({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).send({ message: "Error creating comment" });
  }
});

// get all comments count
router.get("/total-comments", async (req, res) => {
  try {
    const totalComments = await Comment.countDocuments();
    res.status(200).send({
      message: "Total comments retrieved successfully",
      totalComments,
    });
  } catch (error) {
    console.error("An error occurred while getting comment count", error);
    res
      .status(500)
      .send({ message: "An error occurred while getting comment count" });
  }
});

module.exports = router;
