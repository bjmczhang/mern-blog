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

  
