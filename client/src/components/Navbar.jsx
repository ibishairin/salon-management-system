import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-purple-700 to-purple-800 text-white px-8 py-4 flex justify-between items-center shadow-md">

      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-amber-400">
          Salon Management System
        </h1>
      </div>

      {/* Right Section */}
      {user && (
        <div className="flex items-center gap-6">

          <div className="text-right">
            <p className="text-sm font-semibold">
              {user.name}
            </p>
            <p className="text-xs text-amber-300 capitalize">
              {user.role}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-amber-400 text-purple-900 px-4 py-2 rounded-lg font-semibold hover:bg-amber-300 transition duration-200"
          >
            Logout
          </button>

        </div>
      )}
    </header>
  );
};

export default Navbar;