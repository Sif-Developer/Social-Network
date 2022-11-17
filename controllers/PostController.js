const Post = require("../models/Post");

const PostController = {
    async createPost(req, res) {
        try {
            const post = await Post.create({ ...req.body });
            res.status(201).send(post);
        } catch (error) {
            console.error(error)
            res.status(400).send(error)
        }
    },
    
};
module.exports = PostController;
