import { createContext, useState, useEffect } from "react";
import axios from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ================= LOGIN =================
  const login = async (credentials) => {
    try {
      const res = await axios.post("/auth/login", credentials);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      setUser(res.data);

      return res.data;

    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  };

  // ================= REGISTER =================
  const register = async (data) => {
    try {
      const res = await axios.post("/auth/register", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      setUser(res.data);

      return res.data;

    } catch (error) {
      throw error.response?.data?.message || "Registration failed";
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
