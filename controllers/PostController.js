const Post = require("../models/Post");
const User = require("../models/User");

const PostController = {
  async createPost(req, res, next) {
    try {
      const post = await Post.create({
        ...req.body,
        userId: req.user._id,
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { postIds: post._id },
      });
      res.status(201).send(post);
    } catch (error) {
      console.error(error);
      next(error);
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

  async getPostByName(req, res) {
    try {
      if (req.params.title.length > 20) {
        return res.status(400).send("Búsqueda demasiado larga");
      }
      const title = new RegExp(req.params.title, "i");

      const posts = await Post.find({ title });

      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        msg: "Error while getting the post",
        error,
      });
    }
  },

  async getProductsByName(req, res) {
    try {
      const posts = await Post.find({
        $text: {
          $search: req.params.name,
        },
      });

      res.send(posts);
    } catch (error) {
      console.log(error);
    }
  },

  async getPostById(req, res) {
    try {
      const post = await Post.findById(req.params._id).populate(
        "userId",
        "first_name last_name country"
      );
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Problem while finding Post by id" });
    }
  },
  async getAllPosts(req, res) {
    try {
      const posts = await Post.find()
        .limit(req.query.limit)
        .skip((req.query.page - 1) * req.query.limit);
      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Problem while getting posts", error });
    }
  },

  async insertComment(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        {
          $push: {
            comments: { comment: req.body.comment, userId: req.user._id },
          },
        },
        { new: true }
      );
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with your review" });
    }
  },

  async likePost(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { $push: { likes: req.user._id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { postsLiked: req.params._id } },
        { new: true }
      );

      res.send({ msg: "Post successfully liked!", post });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Problem with the like" });
    }
  },

  async deleteLikePost(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { $pull: { likes: req.user._id } },
        { new: true }
      );
      await User.findByIdAndUpdate(req.user._id, { new: true });
      res.send({ post, msg: "Like successfully deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Problem deleting your like" });
    }
  },
};

module.exports = PostController;
