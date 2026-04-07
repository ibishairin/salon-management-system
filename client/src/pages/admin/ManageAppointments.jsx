import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      // Failed to fetch appointments
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/appointments/${id}/status`, { status });
      fetchAppointments();
    } catch (error) {
      // Failed to update status
    }
  };

  const updatePaymentStatus = async (id, paymentStatus) => {
    try {
      await axios.put(`/appointments/${id}/payment`, { paymentStatus });
      fetchAppointments();
      
      // Trigger revenue recalculation by dispatching a custom event
      window.dispatchEvent(new CustomEvent('paymentUpdated', { 
        detail: { appointmentId: id, paymentStatus } 
      }));
    } catch (error) {
      // Failed to update payment status
    }
  };

  const filteredAppointments =
    filter === "All"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  if (loading) {
    return <div className="p-8">Loading appointments...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Manage Appointments
      </h1>

      {/* Filter Section */}
      <div className="mb-6 flex gap-4">
        {["All", "Booked", "Completed", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg ${
              filter === status
                ? "bg-purple-600 text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Stylist</th>
              <th className="p-4">Service</th>
              <th className="p-4">Price</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.map((appt) => (
              <tr key={appt._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{appt.customer?.name || 'Unknown Customer'}</td>
                <td className="p-4">{appt.stylist?.name || 'Unknown Stylist'}</td>
                <td className="p-4">{appt.service?.name}</td>
                <td className="p-4 font-semibold text-green-600">
                  ₹{appt.service?.price || 0}
                </td>
                <td className="p-4">
                  {new Date(appt.date).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      appt.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : appt.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      appt.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {appt.paymentStatus}
                  </span>
                </td>

                <td className="p-4 flex gap-2">
                  {appt.status === "Booked" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(appt._id, "Completed")
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Complete
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(appt._id, "Cancelled")
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  
                  {appt.paymentStatus === "Unpaid" && (
                    <button
                      onClick={() =>
                        updatePaymentStatus(appt._id, "Paid")
                      }
                      className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                    >
                      Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAppointments.length === 0 && (
          <div className="p-6 text-gray-500 text-center">
            No appointments found.
          </div>
        )}
      </div>

    </div>
  );
};

export default ManageAppointments;
