const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    phone: Number,
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    age: Number,
    gender: String,
    country: String,
    city: String,
    tokens: []
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
