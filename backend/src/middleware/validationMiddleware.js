const { body, validationResult } = require("express-validator");

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// User Registration Validation
const validateRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .optional()
    .isIn(["customer", "stylist", "admin"])
    .withMessage("Role must be customer, stylist, or admin"),
  handleValidationErrors,
];

// User Login Validation
const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password").trim().notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

// Appointment Creation Validation
const validateAppointment = [
  body("stylist")
    .trim()
    .notEmpty()
    .withMessage("Stylist is required")
    .isMongoId()
    .withMessage("Invalid stylist ID"),
  body("service")
    .trim()
    .notEmpty()
    .withMessage("Service is required")
    .isMongoId()
    .withMessage("Invalid service ID"),
  body("date")
    .trim()
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Invalid date format"),
  body("time")
    .trim()
    .notEmpty()
    .withMessage("Time is required")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Time must be in HH:MM format"),
  handleValidationErrors,
];

// Service Validation
const validateService = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Service name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Service name must be between 2 and 100 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("duration")
    .notEmpty()
    .withMessage("Duration is required")
    .isInt({ min: 15, max: 480 })
    .withMessage("Duration must be between 15 and 480 minutes"),
  body("category")
    .optional()
    .isIn(["Hair", "Nail", "Skin", "Massage", "Spa", "Other"])
    .withMessage("Category must be Hair, Nail, Skin, Massage, Spa, or Other"),
  handleValidationErrors,
];

// Payment Validation
const validatePayment = [
  body("appointmentId")
    .trim()
    .notEmpty()
    .withMessage("Appointment ID is required")
    .isMongoId()
    .withMessage("Invalid appointment ID"),
  body("method")
    .trim()
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["Cash", "Card", "UPI", "Razorpay"])
    .withMessage("Payment method must be Cash, Card, UPI, or Razorpay"),
  body("transactionId")
    .optional()
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("Transaction ID must be between 5 and 50 characters"),
  handleValidationErrors,
];

// Update Status Validation
const validateStatusUpdate = [
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Booked", "Completed", "Cancelled"])
    .withMessage("Status must be Booked, Completed, or Cancelled"),
  handleValidationErrors,
];

// Update Payment Status Validation
const validatePaymentStatusUpdate = [
  body("paymentStatus")
    .trim()
    .notEmpty()
    .withMessage("Payment status is required")
    .isIn(["Unpaid", "Paid"])
    .withMessage("Payment status must be Unpaid or Paid"),
  handleValidationErrors,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateAppointment,
  validateService,
  validatePayment,
  validateStatusUpdate,
  validatePaymentStatusUpdate,
  handleValidationErrors,
};
