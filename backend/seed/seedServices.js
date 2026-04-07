require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("../src/models/Service");

mongoose.connect(process.env.MONGO_URI);

const seedServices = async () => {
  try {
    console.log("Clearing old services...");
    await Service.deleteMany();

    const services = [
      {
        name: "Haircut",
        description: "Professional haircut with styling",
        price: 500,
        duration: 45,
      },
      {
        name: "Hair Coloring",
        description: "Full hair coloring service",
        price: 2500,
        duration: 120,
      },
      {
        name: "Facial",
        description: "Skin rejuvenation facial treatment",
        price: 1500,
        duration: 60,
      },
      {
        name: "Beard Styling",
        description: "Beard trimming and shaping",
        price: 300,
        duration: 30,
      },
      {
        name: "Hair Spa",
        description: "Deep conditioning hair spa treatment",
        price: 1800,
        duration: 90,
      },
    ];

    await Service.insertMany(services);

    console.log("Services seeded successfully ✅");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedServices();