import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endpoints";
import { useNavigate, useSearchParams } from "react-router-dom";

// Salon UPI Details
const SALON_UPI_ID = "ibishairin@ptyes";
const SALON_NAME = "ibisha irin justin";

const BookAppointment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [customerPreferences, setCustomerPreferences] = useState(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [form, setForm] = useState({
    service: "",
    stylist: "",
    date: "",
    timeSlot: "",
    paymentOption: "payLater"
  });
  const [loading, setLoading] = useState(false);
  
  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [submittingPayment, setSubmittingPayment] = useState(false);

  // Fetch services & stylists
  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRes = await axios.get("/services");
        const stylistsRes = await axios.get("/users/stylists");

        setServices(servicesRes.data);
        setStylists(stylistsRes.data);

        // Check for service query parameter from recommendations page
        const serviceId = searchParams.get("service");
        if (serviceId) {
          setForm(prev => ({ ...prev, service: serviceId }));
        }
      } catch (err) {
        // Failed to load booking data
      }
    };

    fetchData();
  }, [searchParams]);

  // Fetch AI recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoadingRecommendations(true);
      try {
        const res = await axios.get(ENDPOINTS.RECOMMENDATIONS.GET_SERVICES);
        setRecommendations(res.data.recommendations || []);
        setCustomerPreferences(res.data.customerPreferences || null);
      } catch (err) {
        // Failed to load recommendations
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, []);

  // Handle clicking on a recommended service
  const handleSelectRecommendation = (serviceId) => {
    setForm({ ...form, service: serviceId });
  };

  // Quick book - book with default values
  const handleQuickBook = async (rec) => {
    if (!form.date || !form.timeSlot) {
      alert("Please select a date and time first");
      return;
    }
    
    if (!form.stylist) {
      alert("Please select a stylist first");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/appointments", {
        service: rec.service._id,
        stylist: form.stylist,
        date: form.date,
        time: form.timeSlot,
        price: rec.service.price
      });

      const appointment = response.data;

      if (form.paymentOption === "payNow") {
        // Just show QR code - payment will be recorded after customer confirms
        alert(`Appointment booked for ${rec.service.name}! Please complete payment.`);
        setCreatedAppointment(appointment);
        setShowPaymentModal(true);
      } else {
        alert(`Appointment booked for ${rec.service.name}! You can pay later.`);
        navigate("/customer/appointments");
      }
    } catch (err) {
      // Quick book failed
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Generate UPI payment link for QR code
  const generateUpiLink = (amount, appointmentId) => {
    const upiLink = `upi://pay?pa=${SALON_UPI_ID}&pn=${encodeURIComponent(SALON_NAME)}&am=${amount}&cu=INR&tn=Appointment-${appointmentId}`;
    return upiLink;
  };

  // Generate QR code URL
  const generateQRCodeUrl = (text) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
  };

  // Handle payment submission from modal
  const handlePaymentSubmit = async () => {
    if (!transactionId.trim()) {
      alert("Please enter your UPI transaction ID after making payment");
      return;
    }

    setSubmittingPayment(true);
    try {
      await axios.post("/payments", {
        appointmentId: createdAppointment._id,
        method: "UPI",
        transactionId: transactionId.trim()
      });
      
      alert("Payment submitted successfully!");
      setShowPaymentModal(false);
      navigate("/customer/appointments");
    } catch (err) {
      // Payment failed
      alert("Payment failed. Please try again.");
    } finally {
      setSubmittingPayment(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedService = services.find(
        (s) => s._id === form.service
      );

      const response = await axios.post("/appointments", {
        service: form.service,
        stylist: form.stylist,
        date: form.date,
        time: form.timeSlot,
        price: selectedService.price
      });

      const appointment = response.data;

      if (form.paymentOption === "payNow") {
        // Just show QR code - payment will be recorded after customer confirms
        alert("Appointment booked! Please complete payment by scanning the QR code.");
        setCreatedAppointment(appointment);
        setShowPaymentModal(true);
      } else {
        alert("Appointment booked successfully! You can pay later from appointment details.");
        navigate("/customer/appointments");
      }

    } catch (err) {
      // Failed to book appointment
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const selectedService = services.find(s => s._id === form.service);
  const amount = selectedService?.price || 0;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Book Appointment
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl">

        <form onSubmit={handleSubmit} className="grid gap-6">

          {/* Service */}
          <div>
            <label className="block mb-2 font-medium">
              Select Service
            </label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            >
              <option value="">-- Choose Service --</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name} (₹{service.price})
                </option>
              ))}
            </select>
          </div>

          {/* Stylist */}
          <div>
            <label className="block mb-2 font-medium">
              Select Stylist
            </label>
            <select
              name="stylist"
              value={form.stylist}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            >
              <option value="">-- Choose Stylist --</option>
              {stylists.map((stylist) => (
                <option key={stylist._id} value={stylist._id}>
                  {stylist.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 font-medium">
              Select Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>

          {/* Time Slot */}
          <div>
            <label className="block mb-2 font-medium">
              Select Time
            </label>
            <input
              type="time"
              name="timeSlot"
              value={form.timeSlot}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>

          {/* Payment Option */}
          <div>
            <label className="block mb-2 font-medium">
              Payment Option
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                form.paymentOption === "payNow" 
                  ? "border-green-500 bg-green-50" 
                  : "border-gray-200 hover:border-gray-300"
              }`}>
                <input
                  type="radio"
                  name="paymentOption"
                  value="payNow"
                  checked={form.paymentOption === "payNow"}
                  onChange={handleChange}
                  className="hidden"
                />
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="font-semibold">Pay Now</p>
                    <p className="text-xs text-gray-500">Scan & pay instantly</p>
                  </div>
                </div>
              </label>
              
              <label className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                form.paymentOption === "payLater" 
                  ? "border-purple-500 bg-purple-50" 
                  : "border-gray-200 hover:border-gray-300"
              }`}>
                <input
                  type="radio"
                  name="paymentOption"
                  value="payLater"
                  checked={form.paymentOption === "payLater"}
                  onChange={handleChange}
                  className="hidden"
                />
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🕐</span>
                  <div>
                    <p className="font-semibold">Pay Later</p>
                    <p className="text-xs text-gray-500">Pay at salon</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`py-3 rounded-lg hover:bg-purple-700 transition ${
              form.paymentOption === "payNow"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-purple-600 text-white"
            }`}
          >
            {loading ? "Booking..." : form.paymentOption === "payNow" ? "Book & Pay Now" : "Book Appointment"}
          </button>

        </form>

      </div>


      {/* Payment Modal - Show QR code and collect transaction ID */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">Scan & Pay</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Please scan this QR code with your UPI app to complete payment of ₹{amount}
            </p>

            {/* QR Code */}
            <div className="bg-white p-4 rounded-xl border-2 border-gray-100 mb-4 flex justify-center">
              <img
                src={generateQRCodeUrl(generateUpiLink(amount, createdAppointment?._id))}
                alt="UPI Payment QR Code"
                className="w-56 h-56"
              />
            </div>

            {/* UPI Details */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-600 mb-1">Pay to UPI ID:</p>
              <p className="font-semibold text-lg">{SALON_UPI_ID}</p>
              <p className="text-sm text-gray-500">Account: {SALON_NAME}</p>
              <p className="font-bold text-green-600 mt-2">Amount: ₹{amount}</p>
            </div>

            {/* Transaction ID Input */}
            <div className="mb-4">
              <label className="block mb-2 font-medium text-sm">
                Enter UPI Transaction ID
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="e.g., 321456789012"
                className="w-full border p-3 rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-1">
                After scanning and paying, enter the transaction ID from your UPI app
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  navigate("/customer/appointments");
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300"
              >
                Skip for Now
              </button>
              <button
                onClick={handlePaymentSubmit}
                disabled={submittingPayment}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {submittingPayment ? "Submitting..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookAppointment;
