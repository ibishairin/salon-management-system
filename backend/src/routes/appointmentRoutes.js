const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAllAppointments,
  getMyAppointments,
  getStylistAppointments,
  updateAppointmentStatus,
  updatePaymentStatus,
  deleteAppointment,
  getAppointmentById,
  cancelAppointment,
} = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const {
  validateAppointment,
  validateStatusUpdate,
  validatePaymentStatusUpdate,
} = require("../middleware/validationMiddleware");

// Customer - Create appointment
router.post("/", protect, authorize("customer"), validateAppointment, createAppointment);

// Customer - Get my appointments
router.get("/my", protect, authorize("customer"), getMyAppointments);

// Stylist - Get stylist appointments
router.get("/stylist", protect, authorize("stylist"), getStylistAppointments);

// Admin - Get all appointments
router.get("/", protect, authorize("admin"), getAllAppointments);

// ===== SPECIFIC ROUTES FIRST (before /:id) =====

// Customer - Cancel own appointment (must be before /:id route)
router.put("/:id/cancel", protect, authorize("customer"), cancelAppointment);

// Admin - Update appointment status (must be before /:id route)
router.put("/:id/status", protect, authorize("admin"), validateStatusUpdate, updateAppointmentStatus);

// Admin - Update payment status (must be before /:id route)
router.put("/:id/payment", protect, authorize("admin"), validatePaymentStatusUpdate, updatePaymentStatus);

// Admin - Delete appointment (must be before /:id route)
router.delete("/:id", protect, authorize("admin"), deleteAppointment);

// Get single appointment (must be last as it's the most generic)
router.get("/:id", protect, getAppointmentById);

module.exports = router;
