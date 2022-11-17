const { Router } = require("express")
const express = require("express")
const PostController = require("../controllers/PostController")
const { authentication, isAdmin } = require("../middlewares/authentication")
const router = express.Router()

router.post("/createPost",authentication, isAdmin, PostController.createPost)
router.put("/updatePost/:_id",authentication, isAdmin, PostController.updatePost)
router.delete("/deletePost/:_id",authentication, isAdmin, PostController.deletePost)
router.get("/getPostByTitle/:title",PostController.getPostByTitle)
router.get("/getPostById/:_id",PostController.getPostById)
router.get("/getAllPosts", PostController.getAllPosts)



module.exports = router