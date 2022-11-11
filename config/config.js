const mongoose = require("mongoose");

const { MONGO_URI } = require("./keys");

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Data base connected successfully!");
  } catch (error) {
    console.error(error);

    throw new Error("Error initializing database");
  }
};

module.exports = {
  dbConnection,
};
