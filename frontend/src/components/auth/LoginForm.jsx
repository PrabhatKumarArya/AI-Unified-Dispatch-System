import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { loginUser } from "../../services/authService";
import { validateLoginForm } from "../../utils/validators";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const role = data.user.role;
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "rider") navigate("/rider/dashboard");
      else navigate("/customer/dashboard");
    } catch (err) {
      setServerError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {serverError}
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="login-email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.email ? "border-red-400 bg-red-50" : "border-slate-300 bg-white"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
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
            id="login-password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full border rounded-xl px-4 py-3 pr-11 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.password ? "border-red-400 bg-red-50" : "border-slate-300 bg-white"
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
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      {/* Remember me + Forgot password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="rounded border-slate-300"
          />
          Remember Me
        </label>
        <button type="button" className="text-sm text-blue-600 hover:underline font-medium">
          Forgot Password?
        </button>
      </div>

      {/* Submit */}
      <button
        id="login-submit"
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
      >
        {loading ? <><FaSpinner className="animate-spin" /> Signing In...</> : "Sign In"}
      </button>

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 font-semibold hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}