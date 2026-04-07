const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAvailability,
  updateAvailability,
  getAllStylists,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Profile
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

// Admin only
router.get("/", protect, authorize("admin"), getAllUsers);
router.put("/:id/role", protect, authorize("admin"), updateUserRole);
router.delete("/:id", protect, authorize("admin"), deleteUser);

// Stylist availability
router.get("/availability", protect, authorize("stylist"), getAvailability);
router.put("/availability", protect, authorize("stylist"), updateAvailability);

// Get all stylists
router.get("/stylists", protect, getAllStylists);

module.exports = router;