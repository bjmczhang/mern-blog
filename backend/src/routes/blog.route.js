const express = require("express");
const Blog = require("../model/blog.model");
const router = express.Router();

// create a blog post
router.post("/create-post", async (req, res) => {
  try {
    // console.log("Blog data from api:", req.body);
    const newPost = new Blog({ ...req.body });
    await newPost.save();
    res
      .status(201)
      .send({ message: "Blog post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).send({ message: "Error creating blog post" });
  }
});

// get all blogs
router.get("/", async (req, res) => {
  try {
    const { search, category, location } = req.query;
    console.log(search);
    let query = {};
    if (search) {
      query = {
        ...query,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      };
    }

    if (category) {
      query = { ...query, category: category };
    }

    if (location) {
      query = { ...query, location: location };
    }

    const posts = await Blog.find(query).sort({ createdAt: -1 });
    res.status(200).send({
      message: "All blogs retrieved successfully",
      posts,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send({ message: "Error fetching blogs" });
  }
});

// get a single blog by id
router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const postId = req.params.id;
    const post = await Blog.findById(postId);
    if (!post) {
      return res.status(404).send({ message: "Blog post not found" });
    }

    // Todo: with also fetch comment related to the post
    res.status(200).send({
      message: "Blog post retrieved successfully",
      post,
    });
  } catch (error) {
    console.error("Error fetching single post:", error);
    res.status(500).send({ message: "Error fetching single post" });
  }
});

// Update a blog post
router.patch("/update-post/:id", async (req, res) => {
  try {
    // console.log(req.params.id);
    const postId = req.params.id;
    const updatedPost = await Blog.findByIdAndUpdate(
      postId,
      { ...req.body },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).send({ message: "Blog post not found" });
    }
    res.status(200).send({
      message: "Blog post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).send({ message: "Error updating blog post" });
  }
});

// Delete a blog post
router.delete("/delete-post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Blog.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).send({ message: "Blog post not found" });
    }
    res.status(200).send({
      message: "Blog post deleted successfully",
      post: deletedPost,
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).send({ message: "Error deleting blog post" });
  }
});

// Related blogs
router.get("/related/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Blog ID is required" });
    }
    const post = await Blog.findById(id);

    if (!post) {
      return res.status(404).send({ message: "Blog post not found" });
    }
    const titleRegex = new RegExp(post.title.split(" ").join("|"), "i");

    const relatedQuery = {
      _id: { $ne: id }, // Exclude the current blog post
      title: { $regex: titleRegex }, // Match similar titles
    };

    const relatedPosts = await Blog.find(relatedQuery).limit(5); // Limit to 5 related posts

    res.status(200).send({
      message: "Related blogs retrieved successfully",
      post: relatedPosts,
    });
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    res.status(500).send({ message: "Error fetching related blogs" });
  }
});

module.exports = router;
