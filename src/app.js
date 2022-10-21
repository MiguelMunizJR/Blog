//* Dependencies
const express = require("express");
const db = require("./utils/database");
const initModels = require('./models/initModel');

//* Routes
const port = require("./config").port;
const userRouter = require("./users/users.router");
const authRouter = require('./auth/auth.router');

//* Initial Config
const app = express();

app.use(express.json());

//* Autenticacion y sincronizacion de nuestra DB
db.authenticate()
  .then((res) => console.log("Database Autenticate!"))
  .catch((err) => console.log(err));

db.sync()
  .then((res) => console.log("Database Synced!"))
  .catch((err) => console.log(err));

//* Init Models
initModels();

//* Prefijos:
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "OK",
    users: `localhost: ${port}/api/v1/users`,
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
