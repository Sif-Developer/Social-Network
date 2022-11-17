const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_token, jwt_secret } = require("../config/keys");
const Post = require("../models/Post");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, jwt_secret);
    const user = await User.findOne({ _id: payload._id, tokens: token });
    if (!user) {
      return res.status(401).send({ message: "You're not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error, message: "Problem with the token" });
  }
};

const isAdmin = async (req, res, next) => {
  const admins = ["admin", "superadmin"];
  if (!admins.includes(req.user.role)) {
    return res.status(403).send({
      message: "You do not have permission",
    });
  }
  next();
};

const isAuthor = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "You are not the author" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({
        error,
        message: "Problem checking if you are the author",
      });
  }
};
module.exports = { authentication, isAdmin, isAuthor };
