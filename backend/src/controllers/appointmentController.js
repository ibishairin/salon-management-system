const Appointment = require("../models/Appointment");

// ================= CREATE APPOINTMENT (Customer) =================
exports.createAppointment = async (req, res) => {
  try {
    const { stylist, service, date, time } = req.body;

    if (!stylist || !service || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const appointment = await Appointment.create({
      customer: req.user._id,
      stylist,
      service,
      date: new Date(date),
      time,
    });

    res.status(201).json(appointment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET ALL APPOINTMENTS (Admin) =================
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("customer", "name")
      .populate("stylist", "name")
      .populate("service", "name price")
      .sort({ date: -1 });

    // Handle cases where populated references are null (users deleted)
    const processedAppointments = appointments.map(appt => ({
      ...appt.toObject(),
      customer: appt.customer || { name: 'Unknown Customer', email: 'unknown@example.com' },
      stylist: appt.stylist || { name: 'Unknown Stylist' },
      service: appt.service || { name: 'Unknown Service', price: 0 }
    }));

    res.json(processedAppointments);

  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: error.message });
  }
};


// ================= GET CUSTOMER APPOINTMENTS =================
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      customer: req.user._id,
    })
      .populate("stylist", "name")
      .populate("service", "name price")
      .sort({ date: -1 });

    // Handle cases where populated references are null
    const processedAppointments = appointments.map(appt => ({
      ...appt.toObject(),
      stylist: appt.stylist || { name: 'Unknown Stylist' },
      service: appt.service || { name: 'Unknown Service', price: 0 }
    }));

    res.json(processedAppointments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET STYLIST SCHEDULE =================
exports.getStylistAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      stylist: req.user._id,
    })
      .populate("customer", "name")
      .populate("service", "name price")
      .sort({ date: -1 });

    // Handle cases where populated references are null
    const processedAppointments = appointments.map(appt => ({
      ...appt.toObject(),
      customer: appt.customer || { name: 'Unknown Customer' },
      service: appt.service || { name: 'Unknown Service', price: 0 }
    }));

    res.json(processedAppointments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= CANCEL APPOINTMENT (Customer) =================
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("customer", "name email")
      .populate("stylist", "name")
      .populate("service", "name price");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Any customer can cancel any appointment
    if (req.user.role !== 'customer') {
      return res.status(403).json({ message: "Only customers can cancel appointments" });
    }

    // Only allow cancelling booked appointments
    if (appointment.status !== "Booked") {
      return res.status(400).json({ message: "Cannot cancel an appointment that is not in Booked status" });
    }

    appointment.status = "Cancelled";
    await appointment.save();

    // Handle cases where populated references are null
    const processedAppointment = {
      ...appointment.toObject(),
      customer: appointment.customer || { name: 'Unknown Customer', email: 'unknown@example.com' },
      stylist: appointment.stylist || { name: 'Unknown Stylist' },
      service: appointment.service || { name: 'Unknown Service', price: 0 }
    };

    res.json({ message: "Appointment cancelled successfully", appointment: processedAppointment });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= UPDATE STATUS (Admin) =================
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id)
      .populate("customer", "name email")
      .populate("stylist", "name")
      .populate("service", "name price");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status || appointment.status;
    await appointment.save();

    // Handle cases where populated references are null
    const processedAppointment = {
      ...appointment.toObject(),
      customer: appointment.customer || { name: 'Unknown Customer', email: 'unknown@example.com' },
      stylist: appointment.stylist || { name: 'Unknown Stylist' },
      service: appointment.service || { name: 'Unknown Service', price: 0 }
    };

    res.json({ message: "Status updated", appointment: processedAppointment });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= DELETE APPOINTMENT (Admin) =================
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await appointment.deleteOne();

    res.json({ message: "Appointment deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= UPDATE PAYMENT STATUS (Admin) =================
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const appointment = await Appointment.findById(req.params.id)
      .populate("service");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Update appointment payment status
    appointment.paymentStatus = paymentStatus || appointment.paymentStatus;
    await appointment.save();

    // If marking as paid, create a payment record for revenue calculation
    if (paymentStatus === "Paid") {
      const Payment = require("../models/Payment");
      
      // Check if payment record already exists
      const existingPayment = await Payment.findOne({ appointment: appointment._id });
      
      if (!existingPayment) {
        // Create payment record for revenue tracking
        const newPayment = await Payment.create({
          appointment: appointment._id,
          customer: appointment.customer,
          stylist: appointment.stylist,
          amount: appointment.service?.price || 0,
          method: "Cash",
          transactionId: "ADMIN-" + Date.now(),
          status: "Success",
        });
      }
    }

    res.json({
      message: "Payment status updated successfully",
      appointment: {
        ...appointment.toObject(),
        paymentStatus: appointment.paymentStatus
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET SINGLE APPOINTMENT =================
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("customer", "name email")
      .populate("stylist", "name")
      .populate("service", "name price category");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appointment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
