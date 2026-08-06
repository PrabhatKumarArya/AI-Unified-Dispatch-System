import { useState } from "react";
import { FaUserCircle, FaEdit, FaSave, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { getStoredUser } from "../../utils/helpers";

export default function CustomerProfile() {
  const storedUser = getStoredUser();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: storedUser?.name || "Customer User",
    email: storedUser?.email || "customer@dispatch.ai",
    phone: "9876543210",
    address: "123 Main Street, Bhopal, MP",
    joined: "January 2026",
  });

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  }

  function handleSave() {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="mt-8 max-w-2xl mx-auto space-y-6 page-enter">
      <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>

      {/* Avatar card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto">
          {profile.name.charAt(0)}
        </div>
        <h2 className="text-xl font-bold text-slate-800 mt-4">{profile.name}</h2>
        <p className="text-slate-500 text-sm">{profile.email}</p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Customer</span>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Active</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
          {[
            { label: "Total Orders", value: "24" },
            { label: "Completed", value: "21" },
            { label: "Member Since", value: profile.joined },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-xl font-bold text-slate-800">{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit form */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">Personal Information</h2>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
            >
              <FaEdit size={13} /> Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition hover:bg-blue-700"
            >
              <FaSave size={13} /> Save
            </button>
          )}
        </div>

        {saved && (
          <div className="bg-green-50 text-green-700 text-sm px-4 py-2.5 rounded-xl mb-4">
            ✓ Profile updated successfully!
          </div>
        )}

        <div className="space-y-4">
          {[
            { name: "name", label: "Full Name", icon: <FaUserCircle />, type: "text" },
            { name: "email", label: "Email Address", icon: <FaEnvelope />, type: "email" },
            { name: "phone", label: "Phone Number", icon: <FaPhone />, type: "tel" },
            { name: "address", label: "Default Address", icon: <FaMapMarkerAlt />, type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                {field.label}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">{field.icon}</span>
                <input
                  type={field.type}
                  name={field.name}
                  value={profile[field.name]}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm transition ${
                    editing
                      ? "border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      : "border-slate-100 bg-slate-50 text-slate-600 cursor-default"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}