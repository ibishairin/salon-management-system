import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const [loading, setLoading] = useState(true);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/users/profile");
        setForm({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone || ""
        });
      } catch (err) {
        // Failed to load profile
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/users/profile", form);
      setUser(res.data);
      alert("Profile updated successfully");
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/users/change-password", passwordData);
      alert("Password updated successfully");
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (err) {
      alert("Password change failed");
    }
  };

  if (loading) {
    return <div className="p-8">Loading profile...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-10">

      <h1 className="text-3xl font-bold text-gray-800">
        My Profile
      </h1>

      {/* Profile Info */}
      <div className="bg-white shadow rounded-xl p-6 max-w-xl">
        <h2 className="text-lg font-semibold mb-4">
          Personal Information
        </h2>

        <form onSubmit={updateProfile} className="space-y-4">

          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Role</label>
            <input
              type="text"
              value={user?.role}
              disabled
              className="w-full border p-2 rounded bg-gray-100 capitalize"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Update Profile
          </button>

        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white shadow rounded-xl p-6 max-w-xl">
        <h2 className="text-lg font-semibold mb-4">
          Change Password
        </h2>

        <form onSubmit={changePassword} className="space-y-4">

          <div>
            <label className="block text-sm mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Change Password
          </button>

        </form>
      </div>

    </div>
  );
};

export default Profile;