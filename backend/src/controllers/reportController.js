const Appointment = require("../models/Appointment");
const Payment = require("../models/Payment");


// ================= GET REPORTS (ADMIN) =================
exports.getReports = async (req, res) => {
  try {
    // Total appointments
    const totalAppointments = await Appointment.countDocuments();

    // Status breakdown
    const completed = await Appointment.countDocuments({ status: "Completed" });
    const booked = await Appointment.countDocuments({ status: "Booked" });
    const cancelled = await Appointment.countDocuments({ status: "Cancelled" });

    // Revenue calculation
    const revenueData = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    res.json({
      totalAppointments,
      completed,
      booked,
      cancelled,
      totalRevenue,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};