import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const Earnings = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await axios.get("/appointments/stylist");
        setAppointments(res.data);
      } catch (err) {
        // Failed to fetch earnings
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  if (loading) {
    return <div className="p-8">Loading earnings...</div>;
  }

  const completed = appointments.filter(
    (a) => a.status === "Completed"
  );

  const totalEarnings = completed.reduce(
    (sum, a) => sum + (a.service?.price || 0),
    0
  );

  // Monthly grouping
  const monthlyRevenue = {};

  completed.forEach((a) => {
    const month = new Date(a.date).toLocaleString("default", {
      month: "short",
      year: "numeric"
    });

    if (!monthlyRevenue[month]) monthlyRevenue[month] = 0;
    monthlyRevenue[month] += a.service?.price || 0;
  });

  const monthlyData = Object.keys(monthlyRevenue).map((month) => ({
    month,
    revenue: monthlyRevenue[month]
  }));

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">

      <h1 className="text-3xl font-bold text-gray-800">
        My Earnings
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500 text-sm">Completed Appointments</p>
          <h2 className="text-2xl font-bold text-green-600">
            {completed.length}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500 text-sm">Total Earnings</p>
          <h2 className="text-2xl font-bold text-purple-700">
            ₹{totalEarnings}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500 text-sm">Total Appointments</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {appointments.length}
          </h2>
        </div>

      </div>

      {/* Monthly Chart */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="mb-4 font-semibold text-gray-700">
          Monthly Earnings
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#7c3aed" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Appointment List */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="mb-4 font-semibold text-gray-700">
          Completed Appointments
        </h3>

        {completed.length === 0 ? (
          <p className="text-gray-500">No completed appointments yet.</p>
        ) : (
          <div className="space-y-3">
            {completed.map((appt) => (
              <div
                key={appt._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">
                    {appt.service?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(appt.date).toLocaleDateString()}
                  </p>
                </div>

                <p className="font-semibold text-green-600">
                  ₹{appt.service?.price || 0}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Earnings;