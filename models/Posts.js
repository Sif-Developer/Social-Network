const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },

  { timestamps: true }
);

PostSchema.index({
  title: "text",
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
