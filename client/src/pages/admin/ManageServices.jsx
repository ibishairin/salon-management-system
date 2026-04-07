import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "Hair",
    durationMinutes: "",
    basePrice: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await axios.get("/services");
      setServices(res.data);
    } catch (err) {
      // Failed to fetch services
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`/services/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post("/services", form);
      }

      setForm({
        name: "",
        category: "Hair",
        durationMinutes: "",
        basePrice: "",
      });

      fetchServices();
    } catch (err) {
      // Failed to save service
    }
  };

  const handleEdit = (service) => {
    // Map backend fields to frontend fields
    setForm({
      name: service.name || "",
      category: service.category || "Hair",
      durationMinutes: service.duration || service.durationMinutes || "",
      basePrice: service.price || service.basePrice || "",
    });
    setEditingId(service._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      // Failed to delete service
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Manage Services
      </h1>

      {/* Add / Edit Form */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Service" : "Add Service"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Service Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
            required
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border p-2 rounded"
          >
            <option>Hair</option>
            <option>Skin</option>
            <option>Makeup</option>
            <option>Spa</option>
            <option>Other</option>
          </select>

          <input
            type="number"
            placeholder="Duration (minutes)"
            value={form.durationMinutes}
            onChange={(e) =>
              setForm({ ...form, durationMinutes: e.target.value })
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Price (₹)"
            value={form.basePrice}
            onChange={(e) =>
              setForm({ ...form, basePrice: e.target.value })
            }
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="col-span-full md:col-span-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            {editingId ? "Update" : "Add"}
          </button>

        </form>
      </div>

      {/* Services Table */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Price</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{service.name}</td>
                <td className="p-4">{service.category || 'Hair'}</td>
                <td className="p-4">{(service.duration || service.durationMinutes)} min</td>
                <td className="p-4">₹ {(service.price || service.basePrice)}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(service._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <div className="p-6 text-gray-500 text-center">
            No services found.
          </div>
        )}
      </div>

    </div>
  );
};

export default ManageServices;
