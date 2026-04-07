import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

const MySchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("Today");
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/appointments/stylist");
      setAppointments(res.data);
    } catch (err) {
      // Failed to fetch schedule
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const markCompleted = async (id) => {
    try {
      await axios.put(`/appointments/${id}/status`, {
        status: "Completed"
      });
      fetchAppointments();
    } catch (err) {
      // Failed to update status
    }
  };

  if (loading) {
    return <div className="p-8">Loading schedule...</div>;
  }

  const todayDate = new Date().toISOString().split("T")[0];

  const filteredAppointments = appointments.filter((a) => {
    const apptDate = new Date(a.date).toISOString().split("T")[0];

    if (filter === "Today") return apptDate === todayDate;
    if (filter === "Upcoming") return apptDate > todayDate;
    if (filter === "Completed") return a.status === "Completed";
    return true;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        My Schedule
      </h1>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {["Today", "Upcoming", "Completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg ${
              filter === type
                ? "bg-purple-600 text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Appointment List */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-6 text-gray-500">
          No appointments found.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredAppointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold text-purple-700">
                  {appt.service?.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {new Date(appt.date).toLocaleDateString()} | {appt.timeSlot}
                </p>

                <p className="text-sm text-gray-600">
                  Customer: {appt.customer?.name}
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

              {/* Action */}
              {appt.status === "Booked" && (
                <button
                  onClick={() => markCompleted(appt._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Mark Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MySchedule;