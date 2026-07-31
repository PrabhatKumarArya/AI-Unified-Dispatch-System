export default function AdminSettings() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Settings
      </h1>

      <div className="bg-white rounded-2xl shadow p-8">

        <div className="space-y-6">

          <label className="flex items-center justify-between">

            <span>Enable AI Recommendations</span>

            <input
              type="checkbox"
              defaultChecked
            />

          </label>

          <label className="flex items-center justify-between">

            <span>Enable Notifications</span>

            <input
              type="checkbox"
              defaultChecked
            />

          </label>

          <label className="flex items-center justify-between">

            <span>Maintenance Mode</span>

            <input
              type="checkbox"
            />

          </label>

        </div>

      </div>

    </div>
  );
}