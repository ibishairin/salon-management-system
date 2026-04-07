import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";

// Salon UPI Details
const SALON_UPI_ID = "ibishairin@ptyes";
const SALON_NAME = "ibisha irin justin";

const Payment = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axios.get(`/appointments/${appointmentId}`);
        setAppointment(res.data);
      } catch (error) {
        // Failed to fetch appointment
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) {
      fetchAppointment();
    }
  }, [appointmentId]);

  // Generate UPI payment link for QR code
  const generateUpiLink = (amount, appointmentId) => {
    const upiLink = `upi://pay?pa=${SALON_UPI_ID}&pn=${encodeURIComponent(SALON_NAME)}&am=${amount}&cu=INR&tn=Appointment-${appointmentId}`;
    return upiLink;
  };

  // Generate QR code URL using a free QR API
  const generateQRCodeUrl = (text) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
  };

  const handlePayNow = async () => {
    if (!transactionId.trim()) {
      alert("Please enter your UPI transaction ID after making payment");
      return;
    }

    setProcessing(true);

    try {
      // Create payment record with the transaction ID entered by customer
      await axios.post("/payments", {
        appointmentId: appointment._id,
        method: "UPI",
        transactionId: transactionId.trim()
      });

      alert("Payment submitted successfully!");
      navigate("/customer/appointments");
    } catch (error) {
      // Payment failed
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading payment details...</div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">Appointment not found</div>
      </div>
    );
  }

  // Check if already paid
  if (appointment.paymentStatus === "Paid") {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Already Paid</h2>
          <p className="text-gray-600">This appointment has already been paid.</p>
          <button
            onClick={() => navigate("/customer/appointments")}
            className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Back to Appointments
          </button>
        </div>
      </div>
    );
  }

  const amount = appointment.service?.price || 0;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto">
        
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Pay for Appointment
        </h1>

        {/* Appointment Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">
            {appointment.service?.name}
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Date</p>
              <p className="font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Time</p>
              <p className="font-medium">{appointment.time}</p>
            </div>
            <div>
              <p className="text-gray-500">Stylist</p>
              <p className="font-medium">{appointment.stylist?.name}</p>
            </div>
            <div>
              <p className="text-gray-500">Amount</p>
              <p className="font-bold text-green-600 text-lg">₹{amount}</p>
            </div>
          </div>
        </div>

        {/* QR Code Payment Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Scan & Pay with UPI</h2>
          <p className="text-gray-600 mb-4 text-sm">
            Scan this QR code with any UPI app (Google Pay, PhonePe, Paytm, etc.)
          </p>

          {/* QR Code */}
          <div className="bg-white p-4 rounded-xl border-2 border-gray-100 mb-6 flex justify-center">
            <img
              src={generateQRCodeUrl(generateUpiLink(amount, appointment._id))}
              alt="UPI Payment QR Code"
              className="w-64 h-64"
            />
          </div>

          {/* UPI Details */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Pay to UPI ID:</p>
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

          {/* Submit Payment Button */}
          <button
            onClick={handlePayNow}
            disabled={processing}
            className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 disabled:opacity-50 text-lg font-semibold"
          >
            {processing ? "Processing..." : "I've Completed Payment"}
          </button>

          <button
            onClick={() => navigate("/customer/appointments")}
            className="w-full mt-3 text-gray-600 py-2 hover:underline"
          >
            Back to Appointments
          </button>
        </div>

      </div>
    </div>
  );
};

export default Payment;
