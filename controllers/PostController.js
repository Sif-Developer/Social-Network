const Post = require("../models/Post");

const PostController = {
  async createPost(req, res) {
    try {
      const post = await Post.create({ ...req.body });
      res.status(201).send(post);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  },
  async updatePost(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      res.send({ message: "Post updated successfully", post });
    } catch (error) {
      console.error(error);
    }
  },

  async deletePost(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id);
      res.send({ post, message: "Post successfully deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Problem while deleteing" });
    }
  },

  async getPostByTitle(req, res) {
    try {
      const posts = await Post.find({
        $text: { $search: req.params.title },
      });
      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        msg: "Error while getting the post by title",
        error,
      });
    }
  },
  async getPostById(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Problem while finding Post by id" });
    }
  },
  async getAllPosts(req,res){
    try {
        const posts = await Post.find()
        res.send(posts)
    } catch (error) {
        console.error(error)
        res
        .status(500)
        .send({msg: "Problem while getting all posts", error})
    }
  },
};

module.exports = PostController;
