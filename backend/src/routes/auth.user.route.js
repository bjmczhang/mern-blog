const express = require("express");
const User = require("../model/user.model");
const generateToken = require("../middleware/generateToken");

const router = express.Router();
// register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });
    // console.log(user);
    await user.save();
    res.status(200).send({
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    console.error("Failed to register", error);
    res.status(500).json({ message: "Registration failed!" });
  }
});

// login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    // generate token here
    const token = await generateToken(user._id);
    // console.log(token);
    res.cookie("token", token, {
      httpOnly: true, // enable this only when you have https:// otherwise you have to make it false
      secure: true,
      sameSite: true,
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Failed to login", error);
    res.status(500).json({ message: "Login failed!" });
  }
});

// Logout a user
router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Failed to logout", error);
    res.status(500).json({ message: "Logout failed!" });
  }
});

// get all users

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "id email role");
    res.status(200).send({ message: "Users fetched successfully", users });
  } catch (error) {
    console.error("Failed to fetch users", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Failed to delete user", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// update a user role
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("Failed to update user role", error);
    res.status(500).json({ message: "Failed to update user role" });
  }
});

module.exports = router;
