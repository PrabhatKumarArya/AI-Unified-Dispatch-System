import {
  FaClipboardList,
  FaBrain,
  FaRoute,
  FaMotorcycle,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const workflowSteps = [
  {
    title: "Collect Orders",
    icon: <FaClipboardList size={34} />,
    description:
      "Orders are received from Food, Grocery, Pharmacy, and Parcel services.",
  },
  {
    title: "AI Analysis",
    icon: <FaBrain size={34} />,
    description:
      "AI evaluates rider availability, traffic, deadlines, and nearby deliveries.",
  },
  {
    title: "Route Optimization",
    icon: <FaRoute size={34} />,
    description:
      "The system computes the fastest and most cost-efficient delivery route.",
  },
  {
    title: "Dispatch Rider",
    icon: <FaMotorcycle size={34} />,
    description:
      "The best rider receives the optimized pickup and delivery sequence.",
  },
  {
    title: "Delivery Completed",
    icon: <FaCheckCircle size={34} />,
    description:
      "Orders are delivered successfully and analytics are updated in real time.",
  },
];

export default function Workflow() {
  return (
    <section id="workflow" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-800">
            AI Dispatch Workflow
          </h2>

          <p className="mt-4 text-slate-600 max-w-3xl mx-auto text-lg">
            Every order passes through an intelligent pipeline that minimizes
            delivery time, travel distance, and operational cost while ensuring
            timely deliveries.
          </p>
        </div>

        {/* Workflow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-20">
          {workflowSteps.map((step, index) => (
            <div key={index} className="relative">

              {/* Arrow (Hidden on Last Card) */}
              {index !== workflowSteps.length - 1 && (
                <div className="hidden lg:flex absolute top-16 -right-8 text-blue-400">
                  <FaArrowRight size={22} />
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-md p-8 h-full hover:-translate-y-2 hover:shadow-xl transition duration-300">

                {/* Step Number */}
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-5">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="text-blue-600 mb-5">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-slate-800">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-slate-600 leading-7">
                  {step.description}
                </p>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}