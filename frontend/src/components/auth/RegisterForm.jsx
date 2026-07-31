import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";

import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import { registerUser } from "../../services/authService";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "customer",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        password: formData.password,
      });

      if (data.message) {
        alert(data.message);
      }

      if (data.token) {
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
      }
    } catch (err) {
      alert("Registration Failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <InputField
        label="Full Name"
        name="fullName"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={handleChange}
      />

      <InputField
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <InputField
        label="Phone Number"
        type="tel"
        name="phone"
        placeholder="Enter phone number"
        value={formData.phone}
        onChange={handleChange}
      />

      <div>
        <label className="block mb-2 font-medium">
          Role
        </label>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        >
          <option value="customer">Customer</option>
          <option value="rider">Delivery Partner</option>
          <option value="admin">Administrator</option>
        </select>
      </div>

      <PasswordInput
        label="Password"
        placeholder="Create password"
        value={formData.password}
        onChange={(e) =>
          setFormData({
            ...formData,
            password: e.target.value,
          })
        }
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm password"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({
            ...formData,
            confirmPassword: e.target.value,
          })
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:bg-slate-400"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <p className="text-center">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 font-semibold"
        >
          Login
        </Link>
      </p>

    </form>
  );
}