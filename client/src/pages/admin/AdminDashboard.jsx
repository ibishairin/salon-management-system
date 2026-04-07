import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    totalRevenue: 0,
    totalStylists: 0,
    totalServices: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("/admin/dashboard");
      setStats(res.data);
    } catch (error) {
      // Failed to fetch dashboard data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const handlePaymentUpdate = () => {
      fetchDashboardData();
    };

    window.addEventListener('paymentUpdated', handlePaymentUpdate);
    
    return () => {
      window.removeEventListener('paymentUpdated', handlePaymentUpdate);
    };
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Appointments */}
        <div className="bg-white shadow-md rounded-2xl p-6 border">
          <p className="text-gray-500 text-sm mb-2">
            Total Appointments
          </p>
          <h2 className="text-3xl font-bold text-purple-700">
            {stats.totalAppointments}
          </h2>
        </div>

        {/* Completed */}
        <div className="bg-green-50 shadow-md rounded-2xl p-6 border border-green-200">
          <p className="text-green-600 text-sm mb-2">
            Completed
          </p>
          <h2 className="text-3xl font-bold text-green-700">
            {stats.completedAppointments}
          </h2>
        </div>

        {/* Cancelled */}
        <div className="bg-red-50 shadow-md rounded-2xl p-6 border border-red-200">
          <p className="text-red-600 text-sm mb-2">
            Cancelled
          </p>
          <h2 className="text-3xl font-bold text-red-700">
            {stats.cancelledAppointments}
          </h2>
        </div>

        {/* Revenue */}
        <div className="bg-yellow-50 shadow-md rounded-2xl p-6 border border-yellow-200">
          <p className="text-yellow-600 text-sm mb-2">
            Total Revenue
          </p>
          <h2 className="text-3xl font-bold text-yellow-700">
            ₹ {stats.totalRevenue}
          </h2>
        </div>

        {/* Stylists */}
        <div className="bg-blue-50 shadow-md rounded-2xl p-6 border border-blue-200">
          <p className="text-blue-600 text-sm mb-2">
            Total Stylists
          </p>
          <h2 className="text-3xl font-bold text-blue-700">
            {stats.totalStylists}
          </h2>
        </div>

        {/* Services */}
        <div className="bg-purple-50 shadow-md rounded-2xl p-6 border border-purple-200">
          <p className="text-purple-600 text-sm mb-2">
            Total Services
          </p>
          <h2 className="text-3xl font-bold text-purple-700">
            {stats.totalServices}
          </h2>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;