const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const colors = require("colors");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const saltRounds = 10;
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
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
    methods: ["POST"],
  })
);

const salt = bcrypt.genSaltSync(saltRounds);

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already Exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "Account Created Successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Please Enter a Valid Email" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        var token = jwt.sign(
          { email: user.email, userID: user._id, username: user.username },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "7d" }
        );
        res
          .cookie("token", token)
          .json({ success: true, message: "Logged In Successfully!", user });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Invalid Credentials!" });
      }
    } else {
      res
        .status(400)
        .json({ success: false, message: "Account Does Not Exist!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/getUser", async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async(err, user) => {
      if (err) {
        throw err;
      } else {
        const {username, email, _id} = await User.findOne({_id: user.userID})
        res.json({username, email, _id});
      }
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", async(req, res) => {
  res.cookie("token", "").json({});
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`.white);
});
