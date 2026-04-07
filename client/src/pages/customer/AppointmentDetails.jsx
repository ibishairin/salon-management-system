import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../api/axiosInstance";

const AppointmentDetail = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAppointment = async () => {
    try {
      const res = await axios.get(`/appointments/${id}`);
      setAppointment(res.data);
    } catch (error) {
      // Failed to fetch appointment
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [id]);

  const cancelAppointment = async () => {
    try {
      await axios.put(`/appointments/${id}/cancel`);
      fetchAppointment();
      alert("Appointment cancelled successfully");
    } catch (error) {
      // Failed to cancel appointment
      alert("Failed to cancel appointment");
    }
  };

  if (loading) {
    return <div className="p-8">Loading appointment details...</div>;
  }

  if (!appointment) {
    return <div className="p-8">Appointment not found.</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Appointment Details
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">

        {/* Service */}
        <div>
          <h2 className="text-xl font-semibold text-purple-700">
            {appointment.service?.name}
          </h2>
          <p className="text-gray-500">
            {appointment.service?.category}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500 text-sm">Customer</p>
            <p className="font-semibold">
              {appointment.customer?.name}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Stylist</p>
            <p className="font-semibold">
              {appointment.stylist?.name}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Date</p>
            <p className="font-semibold">
              {new Date(appointment.date).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Time Slot</p>
            <p className="font-semibold">
              {appointment.time}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Price</p>
            <p className="font-semibold text-green-600">
              ₹{appointment.service?.price || 0}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Appointment Status</p>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                appointment.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : appointment.status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {appointment.status}
            </span>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Payment Status</p>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                appointment.paymentStatus === "Paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {appointment.paymentStatus || "Unpaid"}
            </span>
          </div>

        </div>

        {/* Action Buttons */}
        {appointment.status === "Booked" && (
          <div className="pt-6 flex gap-4 flex-wrap">
            {appointment.paymentStatus !== "Paid" && (
              <Link
                to={`/customer/payment/${appointment._id}`}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Pay Now with UPI
              </Link>
            )}
            <button
              onClick={cancelAppointment}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Cancel Appointment
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

export default AppointmentDetail;
