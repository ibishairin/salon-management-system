const Payment = require("../models/Payment");
const Appointment = require("../models/Appointment");


// ================= CREATE PAYMENT =================
exports.createPayment = async (req, res) => {
  try {
    const { appointmentId, method, transactionId } = req.body;

    if (!appointmentId || !method) {
      return res.status(400).json({ message: "Appointment and method required" });
    }

    const appointment = await Appointment.findById(appointmentId)
      .populate("service");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Only customer who booked can pay
    if (appointment.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const payment = await Payment.create({
      appointment: appointmentId,
      customer: req.user._id,
      stylist: appointment.stylist,
      amount: appointment.service.price,
      method,
      transactionId: transactionId || "MANUAL-" + Date.now(),
      status: "Success",
    });

    // Update appointment payment status
    appointment.paymentStatus = "Paid";
    await appointment.save();

    res.status(201).json(payment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ================= GET ALL PAYMENTS (Admin) =================
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("customer", "name email")
      .populate("stylist", "name")
      .populate("appointment");

    res.json(payments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ================= GET CUSTOMER PAYMENTS =================
exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ customer: req.user._id })
      .populate("appointment");

    res.json(payments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ================= GET STYLIST EARNINGS =================
exports.getStylistPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ stylist: req.user._id });

    const totalEarnings = payments.reduce((sum, p) => sum + p.amount, 0);

    res.json({
      totalEarnings,
      payments,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
