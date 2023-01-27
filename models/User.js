const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    imageUser: {
      type: String,
    },
    phone: {
      type: Number,
      required: [true, "Please fill the phone field"],
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "This email is not accepted"],
      unique: true,
      required: [true, "Please fill email field"],
    },
    password: {
      type: String,
      required: [true, "Please fill password field"],
    },
    first_name: {
      type: String,
      required: [true, "Please fill name field"],
    },
    last_name: {
      type: String,
      required: [true, "Please fill the last name field"],
    },
    age: {
      type: Number,
      required: [true, "Please fill the age field"],
    },
    gender: {
      type: String,
      required: [true, "Please fill the gender field"],
    },
    country: {
      type: String,
      required: [true, "Please fill the country field"],
    },
    city: {
      type: String,
      required: [true, "Please fill the last name field"],
    },
    tokens: [],
    postIds: [{ type: ObjectId, ref: "Post" }],
    postsLiked: [{ type: ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);
UserSchema.index({
  first_name: "text",
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
