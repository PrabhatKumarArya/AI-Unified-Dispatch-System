import { useState } from "react";
import { Link } from "react-router-dom";

import InputField from "./InputField";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      email,
      password,
    });
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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
      >
        Sign In
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