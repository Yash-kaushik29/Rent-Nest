const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const colors = require("colors");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Accomodation = require("./models/Accomodation")
const cookieParser = require("cookie-parser");
const download = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const saltRounds = 10;
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + '/uploads'));

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
    methods: ["POST", "PUT", "GET"],
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

app.get("/getUser", (req, res) => {
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

app.post("/save-image", async(req, res) => {
  const {url} = req.body;
  const newName = "image" + Date.now() + ".jpg";

  await download.image({
    url: url, 
    dest: __dirname + '/uploads/' + newName,
  });

  res.json(newName)
})

const photosMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photosMiddleware.array('photos', 50), (req, res) => {
  const uploadedFiles = [];
  const files = req.files;

  for(let i=0; i<files.length; i++) {
    const {path, originalname} = files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];

    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ''));
  }

  res.json(uploadedFiles);
});

app.post("/savePlace", (req, res) => {
  const { token } = req.cookies;
  const {title, address, description, images, perks, extraInfo, checkIn, checkOut, price, maxGuests} = req.body.placeData;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async(err, user) => {
      if (err) {
        throw err;
      } else {
        const newAccomodation = new Accomodation({
          owner: user.userID,
          title, address, description, images, perks, extraInfo, checkIn, checkOut, price, maxGuests
        })
        newAccomodation.save();
        res.json(newAccomodation);
      }
    });
  }  
});

app.put("/updatePlace", (req, res) => {
  const { token } = req.cookies;
  const {id, title, address, description, images, perks, extraInfo, checkIn, checkOut, price, maxGuests} = req.body.placeData;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async(err, user) => {
      if (err) {
        throw err;
      } else {
        const updatedAccomodation = await Accomodation.findOneAndUpdate(
          { _id: id }, // Find the accommodation by id
          {
            owner: user.userID,
            title, 
            address, 
            description, 
            images, 
            perks, 
            extraInfo, 
            checkIn, 
            checkOut, 
            price, 
            maxGuests
          },
          { new: true, upsert: true } // Create if it doesn't exist, return the updated document
        );

        res.json(updatedAccomodation)
      }
    });
  }  
});

app.get("/getAccomodations", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
      if (err) {
        res.status(401).json({error: 'Token verification failed'});
      } else {
        try {
          const accommodations = await Accomodation.find({ owner: user.userID });
          res.json(accommodations);
        } catch (error) {
          res.status(500).json({error: 'Error retrieving accommodations'});
        }
      }
    });
  } else {
    res.status(401).json({error: 'No token provided'});
  }
});

app.get("/getAccomodation/:id", async(req, res) => {
  const {id} = req.params;

  const accomodation = await Accomodation.findOne({_id: id});
  res.json(accomodation);
});

app.get("/getPlaces", async(req, res) => {
  try {
    const data = await Accomodation.find();
  res.json(data);
  } catch(error) {
    console.log(error);
  }
});

app.get("/getPlace/:id", async(req, res) => {
  const {id} = req.params;

  try {
    const data = await Accomodation.findOne({_id: id});
    res.json(data);
  } catch(error) {
    console.log(error);
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`.white);
});
