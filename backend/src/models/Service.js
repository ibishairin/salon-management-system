const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["Hair", "Skin", "Makeup", "Spa", "Other"],
      default: "Hair",
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number, // in minutes
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);