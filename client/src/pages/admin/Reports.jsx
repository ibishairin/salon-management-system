import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const Reports = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/appointments");
        setAppointments(res.data);
      } catch (err) {
        // Failed to fetch reports data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="p-6">Loading reports...</p>;
  }

  // === Calculations ===
  const totalAppointments = appointments.length;

  const completed = appointments.filter(a => a.status === "Completed");
  const booked = appointments.filter(a => a.status === "Booked");
  const cancelled = appointments.filter(a => a.status === "Cancelled");

  const totalRevenue = completed.reduce(
    (sum, a) => sum + (a.service?.price || 0),
    0
  );

  // Pie chart data
  const statusData = [
    { name: "Booked", value: booked.length },
    { name: "Completed", value: completed.length },
    { name: "Cancelled", value: cancelled.length }
  ];

  const COLORS = ["#facc15", "#22c55e", "#ef4444"];

  // Revenue per month (basic grouping)
  const monthlyRevenue = {};

  completed.forEach(a => {
    const month = new Date(a.date).toLocaleString("default", {
      month: "short"
    });

    if (!monthlyRevenue[month]) monthlyRevenue[month] = 0;
    monthlyRevenue[month] += a.service?.price || 0;
  });

  const monthlyData = Object.keys(monthlyRevenue).map(month => ({
    month,
    revenue: monthlyRevenue[month]
  }));

  return (
    <div className="p-6 space-y-8">

      <h1 className="text-2xl font-bold text-gray-800">
        Reports & Analytics
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500 text-sm">Total Appointments</p>
          <h2 className="text-xl font-semibold">
            {totalAppointments}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500 text-sm">Completed</p>
          <h2 className="text-xl font-semibold">
            {completed.length}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h2 className="text-xl font-semibold">
            ₹{totalRevenue}
          </h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-8">

        {/* Status Pie Chart */}
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="mb-4 font-semibold text-gray-700">
            Appointment Status
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                outerRadius={80}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue Bar Chart */}
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="mb-4 font-semibold text-gray-700">
            Monthly Revenue
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default Reports;