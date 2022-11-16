const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys");

const UserController = {
  async registerUser(req, res) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, password });
      res.status(201).send({ message: "User successfully registered", user });
    } catch (error) {
      console.error(error);
    }
  },
  async loginUser(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
        return res.status(400).send("Email or password is incorrect");
      }
      const isMatch = bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send("Email or password is incorrect");
      }
      const token = jwt.sign({ _id: user._id }, jwt_secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ message: "Welcome " + user.first_name, token });
    } catch (error) {
      console.error(error);
    }
  },

  async logoutUser(req,res) {
    try { await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Logout done" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error while trying to logout ",
      });
    }
  },
};

module.exports = UserController;
