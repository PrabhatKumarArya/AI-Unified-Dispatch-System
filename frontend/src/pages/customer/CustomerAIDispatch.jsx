import {
    FaRobot,
    FaMotorcycle,
    FaRoute,
    FaMoneyBillWave,
} from "react-icons/fa";

export default function CustomerAIDispatch({ recommendations = [] }) {
    return (
        <div>

            {/* AI Header */}
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl text-white p-8">

                <h1 className="text-4xl font-bold flex items-center gap-3">
                    <FaRobot />
                    AI Dispatch Center
                </h1>

                <p className="mt-3 opacity-90">
                    AI analyzes riders, traffic, delivery priority and
                    distance to recommend the most efficient dispatch
                    strategy.
                </p>

                <div className="mt-6 inline-block bg-white/20 rounded-xl px-5 py-3">
                    AI Confidence :{" "}
                    <span className="font-bold">
                        {recommendations.length > 0 ? "96%" : "Waiting..."}
                    </span>
                </div>

            </div>

            {/* Recommendations */}
            <div className="grid md:grid-cols-2 gap-8 mt-10">

                {recommendations.length === 0 ? (

                    <div className="md:col-span-2 bg-white rounded-2xl shadow p-8 text-center">

                        <FaRobot className="mx-auto text-4xl text-slate-400" />

                        <p className="mt-4 text-slate-500">
                            No AI dispatch recommendations available.
                        </p>

                    </div>

                ) : (

                    recommendations.map((item) => (

                        <div
                            key={item.orderId}
                            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
                        >

                            <h2 className="text-2xl font-bold mb-6">
                                {item.orderId}
                            </h2>

                            <div className="space-y-4">

                                {/* Recommended Rider */}
                                <div className="flex gap-4">

                                    <FaMotorcycle className="text-blue-600 mt-1" />

                                    <div>
                                        <p className="font-semibold">
                                            Recommended Rider
                                        </p>

                                        <p>
                                            {item.rider?.name ||
                                                item.rider ||
                                                "Not assigned"}
                                        </p>
                                    </div>

                                </div>

                                {/* Reason */}
                                <div className="flex gap-4">

                                    <FaRoute className="text-green-600 mt-1" />

                                    <div>
                                        <p className="font-semibold">
                                            Reason
                                        </p>

                                        <p>
                                            {item.reason ||
                                                "AI recommendation generated"}
                                        </p>
                                    </div>

                                </div>

                                {/* Savings */}
                                <div className="flex gap-4">

                                    <FaMoneyBillWave className="text-purple-600 mt-1" />

                                    <div>
                                        <p className="font-semibold">
                                            Estimated Savings
                                        </p>

                                        <p>
                                            {item.savings || "₹0"}
                                        </p>
                                    </div>

                                </div>

                                {/* ETA */}
                                <div>
                                    <p className="font-semibold">
                                        ETA : {item.eta || "Calculating..."}
                                    </p>
                                </div>

                                {/* Assign */}
                                <button
                                    className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                                >
                                    Assign Rider
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}