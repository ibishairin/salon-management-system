const express = require("express");
const router = express.Router();

const { getReports } = require("../controllers/reportController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.get("/", protect, authorize("admin"), getReports);

module.exports = router;