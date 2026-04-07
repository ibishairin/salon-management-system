const express = require("express");
const router = express.Router();

const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { validateService } = require("../middleware/validationMiddleware");

// Public
router.get("/", getAllServices);
router.get("/:id", getServiceById);

// Admin only
router.post("/", protect, authorize("admin"), validateService, createService);
router.put("/:id", protect, authorize("admin"), validateService, updateService);
router.delete("/:id", protect, authorize("admin"), deleteService);

module.exports = router;