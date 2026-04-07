import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axiosInstance";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/appointments/my");
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

  const cancelAppointment = async (id) => {
    try {
      await axios.put(`/appointments/${id}/cancel`);
      fetchAppointments();
    } catch (error) {
      // Cancel failed
      alert("Failed to cancel appointment");
    }
  };

  if (loading) {
    return <div className="p-8">Loading your appointments...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        My Appointments
      </h1>

      {appointments.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-6 text-gray-500">
          You have no appointments yet.
        </div>
      ) : (
        <div className="grid gap-6">

          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold text-purple-700">
                  {appt.service?.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {new Date(appt.date).toLocaleDateString()} | {appt.time}
                </p>

                <p className="text-sm text-gray-600">
                  Stylist: {appt.stylist?.name}
                </p>

                <p className="text-sm font-medium text-green-600 mt-1">
                  ₹{appt.service?.price || 0}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${
                    appt.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : appt.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {appt.status}
                </span>
              </div>

              <div className="flex flex-col gap-2 items-end">

                <Link
                  to={`/customer/appointments/${appt._id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Details
                </Link>

                {appt.status === "Booked" && (
                  <button
                    onClick={() => cancelAppointment(appt._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Cancel
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default MyAppointments;
