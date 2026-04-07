import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { useAuth } from "../../hooks/useAuth";

const ManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data);
    } catch (err) {
      // Failed to fetch users
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, newRole) => {
    try {
      await axios.put(`/users/${id}/role`, { role: newRole });
      fetchUsers();
    } catch (err) {
      alert("Failed to update role");
    }
  };

  const deleteUser = async (id) => {
    if (id === user._id) {
      alert("You cannot delete yourself.");
      return;
    }

    try {
      await axios.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  if (loading) {
    return <div className="p-8">Loading users...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Manage Users
      </h1>

      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4 font-medium">{u.name}</td>
                <td className="p-4">{u.email}</td>

                <td className="p-4">
                  <select
                    value={u.role}
                    onChange={(e) =>
                      changeRole(u._id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="customer">Customer</option>
                    <option value="stylist">Stylist</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ManageUsers;