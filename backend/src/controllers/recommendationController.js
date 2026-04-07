const Appointment = require("../models/Appointment");
const Service = require("../models/Service");

// ================= AI SERVICE RECOMMENDATION =================
// This recommendation algorithm considers:
// 1. Customer's booking history - services they've booked before
// 2. Popular services among similar customers (same price range)
// 3. Frequently booked services
exports.getServiceRecommendations = async (req, res) => {
  try {
    const customerId = req.user._id;

    // Get all completed appointments for this customer
    const customerAppointments = await Appointment.find({
      customer: customerId,
      status: "Completed",
    }).populate("service", "name price description duration");

    // Get all services
    const allServices = await Service.find({});

    // 1. Get customer's preferred services (from their booking history)
    const bookedServiceIds = customerAppointments.map((a) =>
      a.service._id.toString()
    );
    const bookedServices = customerAppointments.map((a) => a.service);

    // Calculate average price range the customer usually books
    let avgPrice = 0;
    if (bookedServices.length > 0) {
      const totalPrice = bookedServices.reduce(
        (sum, s) => sum + (s.price || 0),
        0
      );
      avgPrice = totalPrice / bookedServices.length;
    }

    // 2. Get popular services (most booked by all customers in similar price range)
    const priceRangeMin = avgPrice * 0.7; // 30% below average
    const priceRangeMax = avgPrice * 1.3; // 30% above average

    const similarPriceAppointments = await Appointment.find({
      status: "Completed",
    })
      .populate("service", "name price")
      .lean();

    // Count service frequency within price range
    const serviceFrequency = {};
    similarPriceAppointments.forEach((apt) => {
      const serviceId = apt.service._id.toString();
      const servicePrice = apt.service.price || 0;

      // Count only services in similar price range
      if (avgPrice === 0 || (servicePrice >= priceRangeMin && servicePrice <= priceRangeMax)) {
        serviceFrequency[serviceId] = (serviceFrequency[serviceId] || 0) + 1;
      }
    });

    // Sort by frequency
    const popularServices = Object.entries(serviceFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id]) => id);

    // 3. Build recommendation scores
    const recommendations = allServices.map((service) => {
      let score = 0;
      const serviceId = service._id.toString();

      // Boost score if customer has booked this service before
      if (bookedServiceIds.includes(serviceId)) {
        score += 50;
      }

      // Boost score if it's popular in similar price range
      if (popularServices.includes(serviceId)) {
        score += 30;
      }

      // Boost score if service is in customer's price range
      if (avgPrice > 0) {
        const priceDiff = Math.abs(service.price - avgPrice);
        if (priceDiff <= avgPrice * 0.3) {
          score += 20;
        }
      }

      // New customers get popular services
      if (bookedServices.length === 0 && popularServices.includes(serviceId)) {
        score += 40;
      }

      return {
        service,
        score,
        reason: getRecommendationReason(
          bookedServiceIds.includes(serviceId),
          popularServices.includes(serviceId),
          avgPrice,
          service.price,
          bookedServices.length
        ),
      };
    });

    // Sort by score and take top recommendations
    const sortedRecommendations = recommendations
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    res.json({
      recommendations: sortedRecommendations,
      customerPreferences: {
        avgBudget: avgPrice,
        bookedServicesCount: bookedServices.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to generate recommendation reason
function getRecommendationReason(
  isBookedBefore,
  isPopular,
  avgPrice,
  servicePrice,
  totalBooked
) {
  if (totalBooked === 0) {
    return isPopular
      ? "Popular choice among customers"
      : "Recommended for you";
  }

  if (isBookedBefore && isPopular) {
    return "You've enjoyed this before and it's popular!";
  }

  if (isBookedBefore) {
    return "Based on your previous bookings";
  }

  if (isPopular) {
    return "Popular in your price range";
  }

  if (avgPrice > 0 && Math.abs(servicePrice - avgPrice) <= avgPrice * 0.3) {
    return "Matches your budget";
  }

  return "Recommended for you";
}
