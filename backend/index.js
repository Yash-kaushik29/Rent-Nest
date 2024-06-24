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
const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");
const fs = require('fs');
const mime = require('mime-types');
const saltRounds = 10;
const Booking = require("./models/Booking")
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + '/uploads'));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "DELETE"],
  })
);

const salt = bcrypt.genSaltSync(saltRounds);
const bucket = 'yash-booking-app';

async function uploadToS3(path, originalFilename, mimetype) {
  const client = new S3Client({
    region: "ap-southeast-2",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    },
  });

  const parts = originalFilename.split('.');
  const ext = parts[parts.length - 1];
  const newFileName = Date.now() + '.' + ext;
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Body: fs.readFileSync(path),
    Key: newFileName,
    ContentType: mimetype,
    ACL: 'public-read'
  }))

  return `http://${bucket}.s3.amazonaws.com/${newFileName}`;
}

app.post("/api/register", async (req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
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

app.post("/api/login", async (req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
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

app.get("/api/getUser", (req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
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

app.post("/api/logout", async(req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
  res.cookie("token", "").json({});
})

app.post("/api/save-image", async(req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
  const {url} = req.body;
  const newName = "image" + Date.now() + ".jpg";

  await download.image({
    url: url, 
    dest: '/tmp/' + newName,
  });

  const link = await uploadToS3('/tmp/' + newName, newName, mime.lookup('/tmp/' + newName));

  res.json(link)
})

const photosMiddleware = multer({ dest: "/tmp" });

app.post("/api/upload", photosMiddleware.array('photos', 100), async(req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
  const uploadedFiles = [];
  const files = req.files;

  for(let i=0; i<files.length; i++) {
    const {path, originalname, mimetype} = files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
    console.log(url)
  }

  res.json(uploadedFiles);
});

app.post("/api/savePlace", (req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
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

app.put("/api/updatePlace", (req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
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

app.get("/api/getAccomodations", (req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
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

app.get("/api/getAccomodation/:id", async(req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
  const {id} = req.params;

  const accomodation = await Accomodation.findOne({_id: id});
  res.json(accomodation);
});

app.get("/api/getPlaces", async(req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
  try {
    const data = await Accomodation.find({});
    res.json(data);
  } catch(error) {
    console.log(error);
  }
});

app.get("/api/getPlace/:id", async(req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
  const {id} = req.params;

  try {
    const data = await Accomodation.findOne({_id: id});
    res.json(data);
  } catch(error) {
    console.log(error);
  }
})

app.post("/api/booking", (req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
  const { token } = req.cookies;

  const {placeId, checkInDate, checkOutDate, maxGuests, price, phone} = req.body.bookingData;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async(err, user) => {
      if (err) {
        throw err;
      } else {
        const newBooking = new Booking({
          guest: user.userID, email: user.email,
          placeId, checkIn: checkInDate, checkOut: checkOutDate, maxGuests, price, phone
        })
        newBooking.save();
        res.status(200).json(newBooking);
      }
    });
  }  
})

app.get("/api/getBookings", (req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
  const {token} = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async(err, user) => {
    if (err) {
      throw err;
    } else {
      try {
        const bookings = await Booking.find({guest: user.userID});
        res.status(200).send(bookings)
      } catch (error) {
        res.status(500).json({error: 'Error retrieving bookings'});
      }
    }
  });
})

app.delete("/api/deleteBooking/:id", async(req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
  const {id} = req.params;

  try {
    await Booking.deleteOne({_id: id});
    res.status(200).json("Success");
  } catch(error) {
    res.status(501).json("Internal Server Error")
  }
})

app.get("/api/getBooking/:id", (req, res) => {
  mongoose
  .connect(process.env.MONGODB_URI_KEY, {
    dbName: "RENTNEST",
  })
  .then(() => {
    console.log("Database connected".blue.bold);
  })
  .catch((err) => {
    console.log(err.red);
  });
  const {id} = req.params;
  const {token} = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async(err, user) => {
    if (err) {
      throw err;
    } else {
      try {
        const booking = await Booking.find({_id: id});
        res.status(200).send(booking)
      } catch (error) {
        res.status(500).json({error: 'Error retrieving booking'});
      }
    }
  });
});

app.listen(5000, () => {
  console.log(`Server running on port ${process.env.PORT}`.white);
});
