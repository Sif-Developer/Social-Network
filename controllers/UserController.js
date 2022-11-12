const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys");

const UserController = {
  async registerUser(req, res) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({...req.body, password});
      res.status(201).send({ message: "User successfully registered", user });
    } catch (error) {
      console.error(error);
    }
  },
  // async loginUser(req, res) {
  //   try {
  //     const user = await User.findOne({
  //       email: req.body.email,
  //     });
  //     const token = jwt.sign({ _id: user._id }, jwt_secret);
  //     if (user.tokens.length > 4) user.tokens.shift();
  //     user.tokens.push(token);
  //     await user.save();
  //     res.send({ message: "Bienvenid@ " + user.name, token });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
};

module.exports = UserController;
