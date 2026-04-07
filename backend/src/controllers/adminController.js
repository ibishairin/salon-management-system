const Appointment = require("../models/Appointment");
const Payment = require("../models/Payment");
const User = require("../models/User");
const Service = require("../models/Service");

// ================= GET ADMIN DASHBOARD =================
exports.getDashboard = async (req, res) => {
  try {
    // Total appointments
    const totalAppointments = await Appointment.countDocuments();

    // Completed appointments
    const completedAppointments = await Appointment.countDocuments({ status: "Completed" });

    // Cancelled appointments
    const cancelledAppointments = await Appointment.countDocuments({ status: "Cancelled" });

    // Total revenue
    const allPayments = await Payment.find({});
    
    const revenueData = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // Total stylists
    const totalStylists = await User.countDocuments({ role: "stylist" });

    // Total services
    const totalServices = await Service.countDocuments();

    res.json({
      totalAppointments,
      completedAppointments,
      cancelledAppointments,
      totalRevenue,
      totalStylists,
      totalServices,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
