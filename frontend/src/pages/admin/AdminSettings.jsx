import { useState } from "react";
import { FaSave, FaShieldAlt, FaBell, FaRobot, FaDatabase } from "react-icons/fa";

const TABS = ["General", "AI Settings", "Notifications", "Security", "System"];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("General");
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    platformName: "AI Unified Dispatch",
    supportEmail: "support@dispatch.ai",
    defaultETA: 20,
    maxOrdersPerRider: 3,
    aiConfidenceThreshold: 85,
    autoDispatch: true,
    batchRouting: true,
    emailNotifications: true,
    smsAlerts: false,
    maintenanceMode: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === "checkbox" ? checked : value });
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6 page-enter">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 mt-1">Configure platform-wide settings.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              activeTab === t
                ? "bg-blue-600 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        {activeTab === "General" && (
          <div className="space-y-6 max-w-xl">
            <h2 className="text-lg font-bold text-slate-800 mb-4">General Settings</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Platform Name</label>
              <input name="platformName" value={settings.platformName} onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Support Email</label>
              <input name="supportEmail" value={settings.supportEmail} onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Default ETA (minutes)</label>
              <input type="number" name="defaultETA" value={settings.defaultETA} onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Max Orders Per Rider</label>
              <input type="number" name="maxOrdersPerRider" value={settings.maxOrdersPerRider} onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        )}

        {activeTab === "AI Settings" && (
          <div className="space-y-6 max-w-xl">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FaRobot className="text-blue-600" /> AI Configuration
            </h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                AI Confidence Threshold: {settings.aiConfidenceThreshold}%
              </label>
              <input type="range" name="aiConfidenceThreshold" min="70" max="99"
                value={settings.aiConfidenceThreshold} onChange={handleChange}
                className="w-full accent-blue-600" />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>70% (Lenient)</span><span>99% (Strict)</span>
              </div>
            </div>
            {[
              { name: "autoDispatch", label: "Auto-Dispatch Orders", desc: "AI automatically assigns riders without manual approval" },
              { name: "batchRouting", label: "Batch Routing", desc: "Group nearby orders for the same rider to reduce travel" },
            ].map((s) => (
              <div key={s.name} className="flex items-start justify-between p-4 border border-slate-100 rounded-xl">
                <div>
                  <p className="font-medium text-slate-700">{s.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
                  <input type="checkbox" name={s.name} checked={settings[s.name]} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-blue-600 transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition peer-checked:translate-x-5" />
                </label>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Notifications" && (
          <div className="space-y-6 max-w-xl">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FaBell className="text-blue-600" /> Notification Settings
            </h2>
            {[
              { name: "emailNotifications", label: "Email Notifications", desc: "Send order and system updates via email" },
              { name: "smsAlerts", label: "SMS Alerts", desc: "Send delivery status updates via SMS" },
            ].map((s) => (
              <div key={s.name} className="flex items-start justify-between p-4 border border-slate-100 rounded-xl">
                <div>
                  <p className="font-medium text-slate-700">{s.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
                  <input type="checkbox" name={s.name} checked={settings[s.name]} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-blue-600 transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition peer-checked:translate-x-5" />
                </label>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Security" && (
          <div className="space-y-6 max-w-xl">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-blue-600" /> Security Settings
            </h2>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
              JWT authentication is enabled. All API requests are secured with Bearer tokens.
            </div>
            <button className="border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition">
              Regenerate API Keys
            </button>
          </div>
        )}

        {activeTab === "System" && (
          <div className="space-y-6 max-w-xl">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FaDatabase className="text-blue-600" /> System Settings
            </h2>
            <div className="flex items-start justify-between p-4 border border-red-100 rounded-xl bg-red-50">
              <div>
                <p className="font-medium text-red-700">Maintenance Mode</p>
                <p className="text-xs text-red-500 mt-0.5">Disables the platform for all users</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
                <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-red-500 transition-colors" />
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition peer-checked:translate-x-5" />
              </label>
            </div>
          </div>
        )}

        {/* Save button */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition"
          >
            <FaSave size={14} />
            Save Changes
          </button>
          {saved && (
            <span className="text-green-600 text-sm font-semibold">✓ Settings saved!</span>
          )}
        </div>
      </div>
    </div>
  );
}