import {
  FaRobot,
  FaMotorcycle,
  FaRoute,
  FaMoneyBillWave,
} from "react-icons/fa";

const recommendations = [
  {
    orderId: "#1024",
    rider: "Rider-07",
    reason: "Closest rider (1.2 km)",
    eta: "14 min",
    savings: "₹35",
  },
  {
    orderId: "#1025",
    rider: "Rider-11",
    reason: "Already near pickup",
    eta: "11 min",
    savings: "₹28",
  },
];

export default function CustomerAIDispatch() {
  return (
    <div className="mt-8">

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white p-8">

        <h1 className="text-4xl font-bold flex items-center gap-3">
          <FaRobot />
          AI Dispatch Center
        </h1>

        <p className="mt-3 opacity-90">
          AI analyzes riders, traffic, delivery priority and distance
          to recommend the most efficient dispatch strategy.
        </p>

        <div className="mt-6 inline-block bg-white/20 rounded-xl px-5 py-3">
          AI Confidence : <span className="font-bold">96%</span>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-10">

        {recommendations.map((item) => (

          <div
            key={item.orderId}
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
          >

            <h2 className="text-2xl font-bold mb-6">
              {item.orderId}
            </h2>

            <div className="space-y-4">

              <div className="flex gap-4">
                <FaMotorcycle className="text-blue-600 mt-1" />
                <div>
                  <p className="font-semibold">Recommended Rider</p>
                  <p>{item.rider}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaRoute className="text-green-600 mt-1" />
                <div>
                  <p className="font-semibold">Reason</p>
                  <p>{item.reason}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaMoneyBillWave className="text-purple-600 mt-1" />
                <div>
                  <p className="font-semibold">Estimated Savings</p>
                  <p>{item.savings}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold">
                  ETA : {item.eta}
                </p>
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
                Assign Rider
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}