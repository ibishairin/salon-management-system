const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../src/models/User");

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const exists = await User.findOne({ email: "admin@salon.com" });

  if (exists) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@salon.com",
    password: hashedPassword,
    role: "admin"
  });

  console.log("Admin created");
  process.exit();
};

createAdmin();