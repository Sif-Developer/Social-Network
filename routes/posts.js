const { Router } = require("express")
const express = require("express")
const PostController = require("../controllers/PostController")
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication")
const router = express.Router()

router.post("/createPost",authentication, PostController.createPost)
router.put("/updatePost/:_id",authentication, PostController.updatePost)
router.delete("/deletePost/:_id",authentication, isAdmin, PostController.deletePost)
router.get("/getPostByTitle/:title",PostController.getPostByTitle)
router.get("/getPostById/:_id",PostController.getPostById)
router.get("/getAllPosts", PostController.getAllPosts)
router.put("/insertComment/:_id", authentication, PostController.insertComment)
router.put("/likePost/:_id",authentication, PostController.likePost)



module.exports = router