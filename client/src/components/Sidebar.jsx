import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const linkClasses = (path) =>
    `block px-4 py-2 rounded-lg transition-all duration-200 ${
      location.pathname === path
        ? "bg-purple-700 text-white font-medium"
        : "text-purple-100 hover:bg-purple-600 hover:text-white"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-purple-800 text-white flex flex-col p-6">
      <nav className="flex-1 space-y-3">

        {/* ADMIN MENU */}
        {user?.role === "admin" && (
          <>
            <Link to="/admin/dashboard" className={linkClasses("/admin/dashboard")}>
              Dashboard
            </Link>
            <Link to="/admin/appointments" className={linkClasses("/admin/appointments")}>
              Manage Appointments
            </Link>
            <Link to="/admin/services" className={linkClasses("/admin/services")}>
              Manage Services
            </Link>
            <Link to="/admin/users" className={linkClasses("/admin/users")}>
              Manage Users
            </Link>
            <Link to="/admin/reports" className={linkClasses("/admin/reports")}>
              Reports
            </Link>
          </>
        )}

        {/* CUSTOMER MENU */}
        {user?.role === "customer" && (
          <>
            <Link to="/customer/book" className={linkClasses("/customer/book")}>
              Book Appointment
            </Link>
            <Link to="/customer/appointments" className={linkClasses("/customer/appointments")}>
              My Appointments
            </Link>
            <Link to="/customer/recommendations" className={linkClasses("/customer/recommendations")}>
              Recommendations
            </Link>
          </>
        )}

        {/* STYLIST MENU */}
        {user?.role === "stylist" && (
          <>
            <Link to="/stylist/dashboard" className={linkClasses("/stylist/dashboard")}>
              Dashboard
            </Link>
            <Link to="/stylist/schedule" className={linkClasses("/stylist/schedule")}>
              My Schedule
            </Link>
            <Link to="/stylist/earnings" className={linkClasses("/stylist/earnings")}>
              My Earnings
            </Link>
            <Link to="/stylist/availability" className={linkClasses("/stylist/availability")}>
              Availability
            </Link>
          </>
        )}

        {/* PROFILE - Role-specific links */}
        {user?.role === "admin" && (
          <Link to="/admin/profile" className={linkClasses("/admin/profile")}>
            Profile
          </Link>
        )}
        {user?.role === "customer" && (
          <Link to="/customer/profile" className={linkClasses("/customer/profile")}>
            Profile
          </Link>
        )}
        {user?.role === "stylist" && (
          <Link to="/stylist/profile" className={linkClasses("/stylist/profile")}>
            Profile
          </Link>
        )}

      </nav>
    </aside>
  );
};

export default Sidebar;
