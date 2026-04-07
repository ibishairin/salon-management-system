const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getServiceRecommendations,
} = require("../controllers/recommendationController");

// @route   GET /api/recommendations/services
// @desc    Get AI-powered service recommendations for the logged-in customer
// @access  Private (Customer only)
router.get("/services", protect, getServiceRecommendations);

module.exports = router;
