const express = require("express");

const app = express();
const PORT = 8000;
const cors = require("cors")

const { dbConnection } = require("./config/config");
const { typeError } = require("./middlewares/errors")
app.use(express.json(), cors())
app.use(cors({
    origin: "http://localhost:3000", // Permitir solicitudes desde este origen
  }));

app.use("/users", require("./routes/users"))
app.use("/posts", require("./routes/posts"))
app.use("/comments", require("./routes/comments"))


app.use(typeError)
dbConnection()

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));


module.exports = app