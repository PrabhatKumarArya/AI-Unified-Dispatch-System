import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { registerUser } from "../../services/authService";
import { validateRegisterForm } from "../../utils/validators";
import { SERVICE_TYPES } from "../../utils/constants";

const ROLES = [
  { value: "customer", label: "Customer — Place & track deliveries" },
  { value: "rider", label: "Rider — Accept & complete deliveries" },
  { value: "admin", label: "Admin — Manage the platform" },
];

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateRegisterForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const role = data.user.role;
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "rider") navigate("/rider/dashboard");
      else navigate("/customer/dashboard");
    } catch (err) {
      setServerError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {serverError}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="register-name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.name ? "border-red-400 bg-red-50" : "border-slate-300"
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="register-email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.email ? "border-red-400 bg-red-50" : "border-slate-300"
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="register-password"
            placeholder="Min. 6 characters"
            value={formData.password}
            onChange={handleChange}
            className={`w-full border rounded-xl px-4 py-3 pr-11 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.password ? "border-red-400 bg-red-50" : "border-slate-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          I am a...
        </label>
        <select
          name="role"
          id="register-role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
      </div>

      {/* Submit */}
      <button
        id="register-submit"
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 mt-2"
      >
        {loading ? <><FaSpinner className="animate-spin" /> Creating Account...</> : "Create Account"}
      </button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}