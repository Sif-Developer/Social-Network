const { Router } = require("express")
const express = require("express")
const PostController = require("../controllers/PostController")
const router = express.Router()

router.post("/createPost", PostController.createPost)
router.put("/updatePost/:_id", PostController.updatePost)
router.delete("/deletePost/:_id", PostController.deletePost)

module.exports = router