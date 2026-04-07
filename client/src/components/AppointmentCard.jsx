import { useAuth } from "../hooks/useAuth";

const AppointmentCard = ({ appointment, onCancel, onComplete }) => {
  const { user } = useAuth();

  const {
    _id,
    customer,
    stylist,
    service,
    date,
    time,
    status
  } = appointment;

  const statusColor = {
    Booked: "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700"
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-5 border hover:shadow-lg transition">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {service?.name}
        </h2>

        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${
            statusColor[status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <p><span className="font-medium">Date:</span> {date}</p>
        <p><span className="font-medium">Time:</span> {time}</p>
        <p><span className="font-medium">Customer:</span> {customer?.name || 'Unknown Customer'}</p>
        <p><span className="font-medium">Stylist:</span> {stylist?.name || 'Unknown Stylist'}</p>
        <p><span className="font-medium">Price:</span> ₹{service?.price}</p>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-3">

        {/* Customer Cancel */}
        {user?.role === "customer" && status === "Booked" && (
          <button
            onClick={() => onCancel(_id)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition"
          >
            Cancel
          </button>
        )}

        {/* Stylist/Admin Complete */}
        {(user?.role === "admin" ||
          user?.role === "stylist") &&
          status === "Booked" && (
            <button
              onClick={() => onComplete(_id)}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition"
            >
              Mark Completed
            </button>
          )}
      </div>
    </div>
  );
};

export default AppointmentCard;