const Service = require("../models/Service");


// ================= CREATE SERVICE (Admin) =================
const createService = async (req, res) => {
  try {
    const { name, category, description, price, duration, basePrice, durationMinutes } = req.body;

    // Accept both field names for compatibility
    const servicePrice = price || basePrice;
    const serviceDuration = duration || durationMinutes;

    if (!name || !servicePrice || !serviceDuration) {
      return res.status(400).json({
        message: "Name, price and duration are required",
      });
    }

    const service = await Service.create({
      name,
      category: category || "Hair",
      description,
      price: servicePrice,
      duration: serviceDuration,
    });

    res.status(201).json(service);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ================= GET ALL SERVICES =================
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    
    // Add default category for existing services that don't have one
    const processedServices = services.map(service => ({
      ...service.toObject(),
      category: service.category || "Hair"
    }));
    
    res.json(processedServices);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ================= GET SERVICE BY ID =================
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json(service);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ================= UPDATE SERVICE (Admin) =================
const updateService = async (req, res) => {
  try {
    const { name, category, description, price, duration } = req.body;

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    service.name = name || service.name;
    service.category = category || service.category;
    service.description = description || service.description;
    service.price = price || service.price;
    service.duration = duration || service.duration;

    await service.save();

    res.json({
      message: "Service updated successfully",
      service,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ================= DELETE SERVICE (Admin) =================
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    await service.deleteOne();

    res.json({
      message: "Service deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ================= EXPORT =================
module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};