import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const Availability = () => {
  const [workingDays, setWorkingDays] = useState([]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [blockedDates, setBlockedDates] = useState([]);
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch existing availability
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await axios.get("/users/availability");
        setWorkingDays(res.data.workingDays || []);
        setStartTime(res.data.startTime || "09:00");
        setEndTime(res.data.endTime || "18:00");
        setBlockedDates(res.data.blockedDates || []);
      } catch (err) {
        // Failed to load availability
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  const toggleDay = (day) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter((d) => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  const addBlockedDate = () => {
    if (!newBlockedDate) return;
    setBlockedDates([...blockedDates, newBlockedDate]);
    setNewBlockedDate("");
  };

  const removeBlockedDate = (date) => {
    setBlockedDates(blockedDates.filter((d) => d !== date));
  };

  const saveAvailability = async () => {
    try {
      await axios.put("/users/availability", {
        workingDays,
        startTime,
        endTime,
        blockedDates
      });

      alert("Availability updated successfully");
    } catch (err) {
      alert("Failed to save availability");
    }
  };

  if (loading) {
    return <div className="p-8">Loading availability...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">

      <h1 className="text-3xl font-bold text-gray-800">
        Manage Availability
      </h1>

      {/* Working Days */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Working Days
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {daysOfWeek.map((day) => (
            <label
              key={day}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={workingDays.includes(day)}
                onChange={() => toggleDay(day)}
              />
              {day}
            </label>
          ))}
        </div>
      </div>

      {/* Working Hours */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Working Hours
        </h2>

        <div className="flex gap-6">
          <div>
            <label className="block text-sm mb-1">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        </div>
      </div>

      {/* Blocked Dates */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Blocked Dates (Leave / Unavailable)
        </h2>

        <div className="flex gap-4 mb-4">
          <input
            type="date"
            value={newBlockedDate}
            onChange={(e) => setNewBlockedDate(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={addBlockedDate}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {blockedDates.map((date) => (
            <div
              key={date}
              className="flex justify-between bg-gray-100 p-2 rounded"
            >
              <span>{date}</span>
              <button
                onClick={() => removeBlockedDate(date)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={saveAvailability}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Save Availability
      </button>

    </div>
  );
};

export default Availability;