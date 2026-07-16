export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
}