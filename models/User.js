const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

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
    tokens: [],
    postIds: [{type: ObjectId, ref: "Post"}],
  },
  { timestamps: true }


  );
  UserSchema.index({
    first_name: "text",
  })


const User = mongoose.model("User", UserSchema);

module.exports = User;
