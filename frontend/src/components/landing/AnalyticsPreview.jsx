import {
  FaTruckMoving,
  FaMotorcycle,
  FaClock,
  FaRoad,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaTruckMoving size={28} />,
    value: "1,284",
    title: "Orders Today",
  },
  {
    icon: <FaMotorcycle size={28} />,
    value: "326",
    title: "Active Riders",
  },
  {
    icon: <FaClock size={28} />,
    value: "17 min",
    title: "Average ETA",
  },
  {
    icon: <FaRoad size={28} />,
    value: "248 km",
    title: "Distance Saved",
  },
];

export default function AnalyticsPreview() {
  return (
    <section id="analytics" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-slate-800">
          Live Dispatch Analytics
        </h2>

        <p className="text-center text-slate-500 mt-4 max-w-3xl mx-auto">
          Monitor deliveries, rider performance, and AI optimization in
          real time through an intelligent analytics dashboard.
        </p>

        {/* Stat Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl shadow p-8 hover:shadow-xl transition"
            >
              <div className="text-blue-600 mb-4">
                {item.icon}
              </div>

              <h3 className="text-3xl font-bold">
                {item.value}
              </h3>

              <p className="text-slate-600 mt-2">
                {item.title}
              </p>
            </div>
          ))}

        </div>

        {/* Dashboard Preview */}

        <div className="mt-20 bg-slate-900 rounded-3xl p-10 shadow-2xl">

          <h3 className="text-3xl text-white font-bold">
            AI Dispatch Dashboard
          </h3>

          <div className="grid lg:grid-cols-2 gap-10 mt-10">

            {/* Left */}

            <div className="space-y-6">

              <div className="bg-slate-800 rounded-xl p-5">
                <h4 className="text-white font-semibold">
                  Rider Utilization
                </h4>

                <div className="w-full bg-slate-700 rounded-full h-4 mt-4">

                  <div className="bg-green-500 h-4 rounded-full w-[92%]"></div>

                </div>

                <p className="text-slate-300 mt-3">
                  92%
                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-5">

                <h4 className="text-white font-semibold">
                  AI Dispatch Accuracy
                </h4>

                <div className="w-full bg-slate-700 rounded-full h-4 mt-4">

                  <div className="bg-blue-500 h-4 rounded-full w-[96%]"></div>

                </div>

                <p className="text-slate-300 mt-3">
                  96%
                </p>

              </div>

            </div>

            {/* Right */}

            <div className="bg-slate-800 rounded-2xl flex items-center justify-center min-h-[250px]">

              <h3 className="text-white text-2xl font-bold">
                🗺️ Live Dispatch Map
              </h3>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}