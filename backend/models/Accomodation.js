const mongoose = require("mongoose");

const accomodationSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    images: [String],
    perks: { type: [String] },
    extraInfo: { type: String },
    price: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    maxGuests: { type: String, required: true },
  },
  { timestamps: true }
);

const AccomodationModel = mongoose.model("Accomodation", accomodationSchema);

module.exports = AccomodationModel;
