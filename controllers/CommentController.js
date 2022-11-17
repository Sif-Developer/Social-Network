const Comment = require("../models/Comment");

ç;

const CommentController = {
  async createComment(req, res) {
    try {
     const comment = await Comment.create({
        ...req.body,
    userId: req.user._id,
      });
    res.status(201).send(comment);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error posting comment" });
    }
  },
};

module.exports = CommentController;
