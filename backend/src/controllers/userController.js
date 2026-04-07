const User = require("../models/User");
const bcrypt = require("bcryptjs");


// ================= GET PROFILE (All Logged In Users) =================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone !== undefined ? phone : user.phone;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= CHANGE PASSWORD =================
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET ALL USERS (Admin Only) =================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= UPDATE USER ROLE (Admin Only) =================
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["admin", "stylist", "customer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({ message: "User role updated", user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= DELETE USER (Admin Only) =================
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET STYLIST AVAILABILITY =================
exports.getAvailability = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.role !== "stylist") {
      return res.status(403).json({ message: "Only stylists can view availability" });
    }

    res.json({
      workingDays: user.availability?.workingDays || [],
      startTime: user.availability?.startTime || "09:00",
      endTime: user.availability?.endTime || "18:00",
      blockedDates: user.availability?.blockedDates || [],
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= UPDATE STYLIST AVAILABILITY =================
exports.updateAvailability = async (req, res) => {
  try {
    const { workingDays, startTime, endTime, blockedDates } = req.body;

    const user = await User.findById(req.user._id);

    if (user.role !== "stylist") {
      return res.status(403).json({ message: "Only stylists can update availability" });
    }

    user.availability = {
      workingDays,
      startTime,
      endTime,
      blockedDates,
    };

    await user.save();

    res.json({ message: "Availability updated", availability: user.availability });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET ALL STYLISTS =================
exports.getAllStylists = async (req, res) => {
  try {
    const stylists = await User.find({ role: "stylist" }).select("-password");
    res.json(stylists);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
