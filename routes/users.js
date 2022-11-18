const express = require("express");

const router = express.Router();

const UserController = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");

router.post("/registerUser", UserController.registerUser);
router.post("/loginUser", UserController.loginUser)
router.delete("/logoutUser",authentication, UserController.logoutUser)
router.get("/getUserById/:_id", UserController.getUserById)
router.get("/getUserByName/:first_name", UserController.getUserByFirstName)
router.get("/getInfo", authentication, UserController.getInfo)

module.exports = router;
