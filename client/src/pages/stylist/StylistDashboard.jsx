import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

const StylistDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/appointments/stylist");
      setAppointments(res.data);
    } catch (err) {
      // Failed to fetch dashboard data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  const todayDate = new Date().toISOString().split("T")[0];

  const todayAppointments = appointments.filter(
    (a) =>
      new Date(a.date).toISOString().split("T")[0] === todayDate
  );

  const completed = appointments.filter(
    (a) => a.status === "Completed"
  );

  const upcoming = appointments.filter(
    (a) =>
      new Date(a.date) > new Date() &&
      a.status === "Booked"
  );

  const totalEarnings = completed.reduce(
    (sum, a) => sum + (a.service?.price || 0),
    0
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">

      <h1 className="text-3xl font-bold text-gray-800">
        Stylist Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500 text-sm">Today's Appointments</p>
          <h2 className="text-2xl font-bold text-purple-700">
            {todayAppointments.length}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500 text-sm">Upcoming</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {upcoming.length}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500 text-sm">Completed</p>
          <h2 className="text-2xl font-bold text-green-600">
            {completed.length}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500 text-sm">Total Earnings</p>
          <h2 className="text-2xl font-bold text-yellow-600">
            ₹{totalEarnings}
          </h2>
        </div>

      </div>

      {/* Today’s Appointments Preview */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Today’s Schedule
        </h3>

        {todayAppointments.length === 0 ? (
          <p className="text-gray-500">
            No appointments today.
          </p>
        ) : (
          <div className="space-y-4">
            {todayAppointments.map((appt) => (
              <div
                key={appt._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">
                    {appt.service?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {appt.time}
                  </p>
                  <p className="text-sm text-gray-500">
                    Customer: {appt.customer?.name}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs ${
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
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default StylistDashboard;