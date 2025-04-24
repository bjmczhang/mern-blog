const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

// parse options
app.use(express.json());
app.use(cors());

// routes
const blogRoute = require("./src/routes/blog.route");
const commentRoute = require("./src/routes/comment.route");
const userRoute = require("./src/routes/auth.user.route");

app.use("/api/blogs", blogRoute);
app.use("/api/comments", commentRoute);
app.use("/api/auth", userRoute);

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  app.get("/", (req, res) => {
    res.send("MERN Blog Server is running....!");
  });
}

main()
  .then(() => console.log("Mongodb connected successfully!"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
