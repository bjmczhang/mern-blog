const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const verifyToken = (req, res, next) => {
  // const token = req.cookies.token;
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token
  if (!token) {
    return res
      .status(403)
      .send({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.userId) {
      return res.status(401).send({ message: "Invalid token provided" });
    }
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
