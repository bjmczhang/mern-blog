# 

# 1. Intro

## 1.1 Technology

- For Frontend:
  
  React, tailwindcss, Redux Toolkit

- For Backend:
  
  Node.js, Express.js, mongoDB, mongoose, JWT, bcryptjs

## 1.2 Functionality

- To post blog

- edit or update

- delete blog

- manage users
  
  - delete users
  
  - update role

## 1.3 Project Structure

https://expressjs.com/en/starter/installing.html

# 2. Setting up

## 2.1 Create Project Folders

- backend

- frontend

## 2.2 Backend Installing

[Installing Express](https://expressjs.com/en/starter/installing.html)

```bash
npm init -y
```

```bash
npm install express
```

## 2.3 Create a Server

```js
// index.js

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("MERN Blog Server is running....!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
ort}`)
})
```

## 2.4 Install Nodemon

```bash
npm i nodemon
```

## 2.5 Create Scripts

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
},
```

## 2.6 Install Mongoose

https://mongoosejs.com/docs/

```bash
npm install mongoose --save
```

## 2.7 Connect MongoDB

Include mongoose in our project:

```js
// index.js

const mongoose = require('mongoose');
```

Create MongoDB project and cluster, write down the username and password

https://cloud.mongodb.com/

install driver:

```bash
npm install mongodb
```

Add the connection string into our application code:

```js
async function main() {
  await mongoose.connect('<connection string>');
}
```

Logs the connection result:

```js
main()
  .then(() => console.log("Mongodb connected successfully!"))
  .catch((err) => console.log(err));
```

## 2.8 Store Environment Variables

https://www.npmjs.com/package/dotenv

https://www.npmjs.com/package/cors

Install **dotenv** and **cors**:

```bash
npm i dotenv cors
```

Import cors:

```js
// index.js


const cors = require('cors')

// parse options
app.use(express.json());
app.use(cors())
```

> ### ✅ `app.use(express.json())`
> 
> 这个是 Express 内置的中间件，用来解析 **JSON 格式的请求体**。
> 
> 举个例子，如果前端发了一个 `POST` 请求，内容是 JSON：
> 
> `{   "username": "ben",   "password": "123456" }`
> 
> 你就可以在后端用：
> 
> `req.body.username`
> 
> 来获取 `"ben"`。
> 
> 如果你不加 `express.json()`，`req.body` 就是 `undefined`。
> 
> ---
> 
> ### ✅ `app.use(cors())`
> 
> 这个是使用 `cors` 中间件，允许 **跨域请求**。
> 
> 简单说，如果你的前端在 `http://localhost:3000`，后端在 `http://localhost:4000`，不加这个的话浏览器会阻止请求。加上 `cors()` 后，Express 会自动设置响应头，允许来自其他域名的请求。

Import and configure dotenv:

```js
require('dotenv').config()
```

创建 `.env` 并写入：

```js
// .env

MONGODB_URL = `<connection string>`
```

```js
// index.js


async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  app.get("/", (req, res) => {
    res.send("MERN Blog Server is running....!");
  });
}
```

## 2.9 Add IP Access List Entry

![](C:\Users\ben\AppData\Roaming\marktext\images\2025-04-23-11-10-21-image.png)

# 3. Create Models

https://mongoosejs.com/docs/

Define BlogSchema and Blog Model:

```js
// src/model/blog.model.js


const mongoose = require("mongoose");

// TODO: Modify this after user created
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  content: String,
  coverImg: String,
  category: String,
  author: String,
  rating: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
```

> 这段代码创建的 MongoDB 集合名默认是：**`blogs`**
> 
> Mongoose 会**自动将模型名 `"Blog"` 变为小写并加上复数**，也就是：
> 
> `"Blog" → "blogs"`
> 
> 如果你想明确指定 collection 名（例如叫 `blog2`）：
> 
> 可以传入第三个参数：
> 
> ```js
> const Blog = mongoose.model("Blog", BlogSchema, "blog2");
> ```
> 
> 这样，MongoDB 中对应的集合名就会是 `blog2`，不会被 Mongoose 自动变形。

# 4. express.Router

Use the `express.Router` class to create modular, mountable route handlers. A `Router` instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

The following code creates a router as a module, loads a middleware function in it, defines some routes, and mounts the router module on a path in the main app:

```js
// blog.route.js

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Blog routes is here");
});

module.exports = router;
```

Then, load the router module in the app:

```js
// index.js

const blogRoute = require("./src/routes/blog.route");
app.use("/api/blogs", blogRoute);
```

> But if the parent route `/api/blogs` has path parameters, it will not be accessible by default from the sub-routes. To make it accessible, you will need to pass the `mergeParams` option to the Router constructor [reference](https://expressjs.com/en/5x/api.html#app.use):
> 
> ```js
> const router = express.Router({ mergeParams: true })
> ```

# 5. CRUD

## 5.1 Create

```js
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
  res.send("Blog routes is here");
});

module.exports = router;
```

## 5.2 Get All Blogs

```js
router.get("/", async (req, res) => {
  try {
    const posts = await Blog.find();
    res.status(200).send({
      message: "All blogs retrieved successfully",
      posts,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send({ message: "Error fetching blogs" });
  }
});
```

## 5.3 Search Blogs

```js
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
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

    const posts = await Blog.find(query);
    res.status(200).send({
      message: "All blogs retrieved successfully",
      posts,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send({ message: "Error fetching blogs" });
  }
});
```

> - 使用 `$or` 表示只要任意一项匹配就算符合条件。
> 
> - `$regex: search` 表示模糊匹配（正则表达式）。
> 
> - `$options: "i"` 表示不区分大小写（i = ignore case）

## 5.4 Filter

```js
....

const { search, category, location } = req.query;

if (category) {
      query = { ...query, category: category };
    }

    if (location) {
      query = { ...query, location: location };
    }
```

## 5.5 Sort

```js
const posts = await Blog.find(query).sort({ createdAt: -1 });
```

## 5.6 Get Blog By ID

```js
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
```

## 5.7 Update A Blog Post

```js
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
```

## 5.8 Delete A Blog Post

```js
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
```

## 5.9 Find Related Blogs

```js
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
```

## 5.10 Hashing Password

Install bcrypt:

https://www.npmjs.com/package/bcrypt

```bash
npm i bcrypt
```

Usage:

```js
UserSchema.pre("save", async function () {
  const user = this;

  if (!user.isModified("password")) return;

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

UserSchema.methods.comparePassword = function (givenPassword) {
  return bcrypt.compare(givenPassword, this.password);
};
```

## 5.11 Generate Token

Install JWT:

https://www.npmjs.com/package/bcrypt

```bash
npm i jsonwebtoken
```

Create a JWT_SECRET_KEY - we can use any strings or we can use node method to generate one:

```bash
node
```

```bash
crypto.randomBytes(32).toString("hex")
```

save it in `.env`

创建 generateToken 函数，它的任务是用用户 ID 找到数据库里的用户，然后生成包含该用户基本信息的 token。：

```js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

module.exports = generateToken;
```

JWT 是一个用于生成用户身份认证用的 Token 的工具函数。一般在用户登录成功之后调用，用于后续接口鉴权。

- `jsonwebtoken`: Node.js 的 JWT 库，用来生成和验证 token。

- `JWT_SECRET`: 从环境变量中读取的密钥，用来签名 token。
  
  - **签名密钥非常重要，一定要保密**。谁知道这个密钥，就能伪造 token。

`jwt.sign(payload, secret, options)`：

- **payload**：你想塞进 token 的内容（注意不能太大，也不能包含敏感信息）。
  
  - `userId`: 让后续接口知道是谁。
  
  - `role`: 让后端知道这个用户是不是管理员等。

- **secret**：签名密钥。

- **options**：
  
  - `expiresIn: "1h"`：表示这个 token 1 小时之后过期。

这个 token 会被客户端存下来（如 localStorage 或 cookie），然后在访问受保护的接口时带上（通常是放在请求头 `Authorization: Bearer <token>`）。

> “JWT 就是一张签了名的身份证明卡，用户只要拿着它，就能告诉后端：‘我是我’，而不用每次都重新证明一次。”

生成 token 并存储到 cookie 中：

```js
const token = await generateToken(user._id);
    // console.log(token);
    res.cookie("token", token, {
      httpOnly: true, // enable this only when you have https:// otherwise you have to make it false
      secure: true,
      sameSite: true,
    });
```

## 5.12 退出登录

```js

```
