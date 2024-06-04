const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const colors = require("colors");
const User = require("./models/User");
const saltRounds = 10;
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTREST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const salt = bcrypt.genSaltSync(saltRounds);

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const data = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    }).then(() => {
      res.status(200).json("User stored in DB");
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    const result = bcrypt.compareSync(password, user.password);
    if (result) {
      res.status(200).json("Successfully Logged In!");
    }
  } catch(err) {
    console.log(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`.yellow);
});
