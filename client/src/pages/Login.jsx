import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { validatePassword, validatePhone } from "../utils/validation";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Check if input is phone (10 digits) or email
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!loginId) {
      newErrors.loginId = "Email or phone number is required";
    } else if (phoneRegex.test(loginId)) {
      setIsPhone(true);
    } else if (emailRegex.test(loginId)) {
      setIsPhone(false);
    } else {
      newErrors.loginId = "Please enter a valid email or 10-digit phone number";
    }
    
    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      const credentials = isPhone 
        ? { phone: loginId, password }
        : { email: loginId, password };
      const user = await login(credentials);

      // Role-based redirect (important)
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "stylist") navigate("/stylist/dashboard");
      else navigate("/customer/appointments");

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid credentials";
      alert(errorMsg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Salon Management System
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <input
              type="text"
              placeholder="Email or Phone Number"
              value={loginId}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.loginId ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500"
              }`}
              onChange={(e) => {
                setLoginId(e.target.value);
                if (errors.loginId) setErrors({ ...errors, loginId: null });
              }}
            />
            {errors.loginId && (
              <p className="text-red-500 text-sm mt-1">{errors.loginId}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500"
              }`}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-600 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;
