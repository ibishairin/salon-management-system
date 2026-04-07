import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
const ManageService = () => {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "Hair",
    durationMinutes: "",
    basePrice: "",
  });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    setEditingId(service._id);
    setForm({
      name: service.name,
      category: service.category,
      durationMinutes: service.durationMinutes,
      basePrice: service.basePrice,
    });
  };

  const toggleActive = async (service) => {
    try {
      await axios.put(`/services/${service._id}`, {
        isActive: !service.isActive,
      });
      fetchServices();
    } catch (err) {
      // Failed to update status
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Manage Services
      </h1>

      {/* Form Section */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Service" : "Add Service"}
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Service Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
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
            name="durationMinutes"
            placeholder="Duration (min)"
            value={form.durationMinutes}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            name="basePrice"
            placeholder="Price (₹)"
            value={form.basePrice}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </form>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{service.name}</td>
                <td className="p-4">{service.category}</td>
                <td className="p-4">{service.durationMinutes} min</td>
                <td className="p-4">₹ {service.basePrice}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      service.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => toggleActive(service)}
                    className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                  >
                    {service.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <div className="p-6 text-gray-500 text-center">
            No services available.
          </div>
        )}
      </div>

    </div>
  );
};

export default ManageService;