import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import { loginUser } from "../../services/authService";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      if (data.message && !data.token) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      switch (data.role) {
        case "customer":
          navigate("/customer/dashboard");
          break;

        case "rider":
          navigate("/rider/dashboard");
          break;

        case "admin":
          navigate("/admin/dashboard");
          break;

        default:
          navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <InputField
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex justify-between items-center text-sm">

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Remember Me
        </label>

        <button
          type="button"
          className="text-blue-600 hover:underline"
        >
          Forgot Password?
        </button>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white py-3 rounded-xl font-semibold transition"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <p className="text-center text-slate-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-semibold hover:underline"
        >
          Register
        </Link>
      </p>

    </form>
  );
}