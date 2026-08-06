import { useState } from "react";
import { FaSave, FaBell, FaLock, FaPalette } from "react-icons/fa";

const TABS = ["Preferences", "Notifications", "Privacy"];

export default function CustomerSettings() {
  const [activeTab, setActiveTab] = useState("Preferences");
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    defaultService: "Food",
    language: "English",
    orderUpdates: true,
    promoEmails: false,
    smsAlerts: true,
    shareLocation: true,
    analytics: false,
  });

  function handleToggle(key) {
    setSettings({ ...settings, [key]: !settings[key] });
    setSaved(false);
  }

  function handleChange(e) {
    setSettings({ ...settings, [e.target.name]: e.target.value });
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const Toggle = ({ name, label, desc }) => (
    <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0">
      <div>
        <p className="font-medium text-slate-700 text-sm">{label}</p>
        {desc && <p className="text-xs text-slate-400 mt-0.5">{desc}</p>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
        <input type="checkbox" checked={settings[name]} onChange={() => handleToggle(name)} className="sr-only peer" />
        <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-blue-600 transition-colors" />
        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition peer-checked:translate-x-5" />
      </label>
    </div>
  );

  return (
    <div className="mt-8 max-w-xl mx-auto space-y-6 page-enter">
      <h1 className="text-3xl font-bold text-slate-800">Settings</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              activeTab === t ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        {activeTab === "Preferences" && (
          <div className="space-y-4">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FaPalette className="text-blue-600" size={16} /> Preferences
            </h2>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Default Service</label>
              <select
                name="defaultService"
                value={settings.defaultService}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {["Food", "Grocery", "Pharmacy", "Parcel"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Language</label>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {["English", "Hindi"].map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
        )}

        {activeTab === "Notifications" && (
          <div>
            <h2 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <FaBell className="text-blue-600" size={15} /> Notifications
            </h2>
            <Toggle name="orderUpdates" label="Order Updates" desc="Get notified about delivery status changes" />
            <Toggle name="promoEmails" label="Promotional Emails" desc="Receive offers and discount updates" />
            <Toggle name="smsAlerts" label="SMS Alerts" desc="Get SMS updates for your deliveries" />
          </div>
        )}

        {activeTab === "Privacy" && (
          <div>
            <h2 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <FaLock className="text-blue-600" size={15} /> Privacy
            </h2>
            <Toggle name="shareLocation" label="Share Location" desc="Allow location access for better dispatch" />
            <Toggle name="analytics" label="Usage Analytics" desc="Help improve the platform by sharing usage data" />
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition"
          >
            <FaSave size={13} /> Save
          </button>
          {saved && <span className="text-green-600 text-sm font-semibold">✓ Saved!</span>}
        </div>
      </div>
    </div>
  );
}