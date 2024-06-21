const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    guest: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    placeId: {type: String, required: true},
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    maxGuests: { type: String, required: true },
    price: {type: Number, required: true},cvfbfgnj
    email: {type: String, required: true},
    phone: {type: String, required: true}
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports = BookingModel;