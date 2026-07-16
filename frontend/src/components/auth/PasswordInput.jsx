import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
}