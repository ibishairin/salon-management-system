import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import ConsistentLandingPage from "./pages/ConsistentLandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageAppointments from "./pages/admin/ManageAppointments";
import ManageServices from "./pages/admin/ManageServices";
import ManageUsers from "./pages/admin/ManageUsers";
import Reports from "./pages/admin/Reports";

// Customer
import BookAppointment from "./pages/customer/BookAppointment";
import MyAppointments from "./pages/customer/MyAppointments";
import AppointmentDetails from "./pages/customer/AppointmentDetails";
import Payment from "./pages/customer/Payment";
import Recommendations from "./pages/customer/Recommendations";

// Stylist
import StylistDashboard from "./pages/stylist/StylistDashboard";
import MySchedule from "./pages/stylist/MySchedule";
import Earnings from "./pages/stylist/Earnings";
import Availability from "./pages/stylist/Availability";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<ConsistentLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ADMIN ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route element={<Layout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/appointments" element={<ManageAppointments />} />
              <Route path="/admin/services" element={<ManageServices />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/reports" element={<Reports />} />
              <Route path="/admin/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* CUSTOMER ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
            <Route element={<Layout />}>
              <Route path="/customer/book" element={<BookAppointment />} />
              <Route path="/customer/appointments" element={<MyAppointments />} />
              <Route path="/customer/appointments/:id" element={<AppointmentDetails />} />
              <Route path="/customer/payment/:appointmentId" element={<Payment />} />
              <Route path="/customer/recommendations" element={<Recommendations />} />
              <Route path="/customer/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* STYLIST ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={["stylist"]} />}>
            <Route element={<Layout />}>
              <Route path="/stylist/dashboard" element={<StylistDashboard />} />
              <Route path="/stylist/schedule" element={<MySchedule />} />
              <Route path="/stylist/earnings" element={<Earnings />} />
              <Route path="/stylist/availability" element={<Availability />} />
              <Route path="/stylist/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
