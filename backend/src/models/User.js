const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "stylist", "customer"],
      default: "customer",
    },

    availability: {
      workingDays: [String],
      startTime: String,
      endTime: String,
      blockedDates: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);