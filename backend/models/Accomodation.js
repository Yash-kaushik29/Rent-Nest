const mongoose = require("mongoose");

const accomodationSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    address: {type: String, required: true},
    description: {type: String, required: true},
    images: [String],
    description: {type: String, required: true},
    features: {type: String},
    price: {type: Number},
    checkIn: {type: String, required: true},
    checkOut: {type: String, required: true},
    maxGuests: {type: String, required: true}
});

const AccomodationModel = mongoose.model("Accomodation", accomodationSchema);

module.exports = AccomodationModel;