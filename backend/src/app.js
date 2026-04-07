const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// ===== Core Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Logging (development only)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ===== Routes =====
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/recommendations", require("./routes/recommendationRoutes"));

// ===== Health Check Route =====
app.get("/", (req, res) => {
  res.send("Salon Management System API Running...");
});

// ===== Error Handling Middleware =====
app.use(notFound);
app.use(errorHandler);

module.exports = app;