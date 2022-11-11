const express = require("express");

const app = express();

const PORT = 3030;

const { dbConnection } = require("./config/config");
const UserController = require("./controllers/UserController");

app.use(express.json())

app.use("/users", UserController.registerUser)




dbConnection()

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));