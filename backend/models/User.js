const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: { type: String, required: true },
}, {
  timestamps: true,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
