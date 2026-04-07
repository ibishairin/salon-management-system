const express = require("express");
const router = express.Router();

const {
  createPayment,
  getAllPayments,
  getMyPayments,
  getStylistPayments,
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { validatePayment } = require("../middleware/validationMiddleware");

// Customer
router.post("/", protect, authorize("customer"), validatePayment, createPayment);
router.get("/my", protect, authorize("customer"), getMyPayments);

// Stylist
router.get("/stylist", protect, authorize("stylist"), getStylistPayments);

// Admin
router.get("/", protect, authorize("admin"), getAllPayments);

module.exports = router;