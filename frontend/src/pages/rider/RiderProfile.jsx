import { useState } from "react";
import { FaMotorcycle, FaStar, FaEdit, FaSave, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCard } from "react-icons/fa";
import { getStoredUser } from "../../utils/helpers";

export default function RiderProfile() {
  const storedUser = getStoredUser();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: storedUser?.name || "Rahul Sharma",
    email: storedUser?.email || "rider@dispatch.ai",
    phone: "9876543210",
    zone: "Zone A — North Bhopal",
    vehicleType: "Motorcycle",
    vehicleNumber: "MP09-AB-1234",
    licenseId: "DL-4567-2019",
  });

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  }

  function handleSave() {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const stats = [
    { label: "Deliveries", value: "180" },
    { label: "Rating", value: "4.9⭐" },
    { label: "Month Earn", value: "₹18.2K" },
    { label: "On-Time", value: "91%" },
  ];

  return (
    <div className="mt-8 max-w-2xl mx-auto space-y-6 page-enter">
      <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>

      {/* Avatar card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold mx-auto">
          {profile.name.charAt(0)}
        </div>
        <h2 className="text-xl font-bold mt-4">{profile.name}</h2>
        <p className="text-blue-200 text-sm">{profile.email}</p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <FaMotorcycle size={11} /> Rider
          </span>
          <span className="bg-green-400/30 text-green-200 text-xs font-semibold px-3 py-1 rounded-full">Online</span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/20">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-lg font-bold">{s.value}</p>
              <p className="text-blue-200 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit form */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">Personal Information</h2>
          {!editing ? (
            <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-blue-600 text-sm font-medium hover:underline">
              <FaEdit size={13} /> Edit
            </button>
          ) : (
            <button onClick={handleSave} className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-1.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition">
              <FaSave size={13} /> Save
            </button>
          )}
        </div>

        {saved && (
          <div className="bg-green-50 text-green-700 text-sm px-4 py-2.5 rounded-xl mb-4">✓ Profile updated!</div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { name: "name", label: "Full Name", icon: <FaStar />, type: "text" },
            { name: "phone", label: "Phone", icon: <FaPhone />, type: "tel" },
            { name: "zone", label: "Zone", icon: <FaMapMarkerAlt />, type: "text" },
            { name: "vehicleType", label: "Vehicle Type", icon: <FaMotorcycle />, type: "text" },
            { name: "vehicleNumber", label: "Vehicle Number", icon: <FaIdCard />, type: "text" },
            { name: "licenseId", label: "License ID", icon: <FaIdCard />, type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                {field.label}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">{field.icon}</span>
                <input
                  type={field.type}
                  name={field.name}
                  value={profile[field.name]}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm transition ${
                    editing
                      ? "border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      : "border-slate-100 bg-slate-50 text-slate-600 cursor-default"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Email (read-only) */}
        <div className="mt-4">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full pl-10 pr-4 py-2.5 border border-slate-100 bg-slate-50 text-slate-400 rounded-xl text-sm cursor-default"
            />
          </div>
        </div>
      </div>
    </div>
  );
}