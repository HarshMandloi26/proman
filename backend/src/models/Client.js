const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true }, 
    imageUrl: { type: String },
    description: { type: String },
    rating: { type: Number, min: 1, max: 5, default: 5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
