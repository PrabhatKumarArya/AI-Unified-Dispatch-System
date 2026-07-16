import {
  FaBolt,
  FaCoins,
  FaMapMarkedAlt,
  FaRobot,
  FaLeaf,
  FaChartLine,
} from "react-icons/fa";

const benefits = [
  {
    icon: <FaBolt size={32} />,
    title: "Faster Deliveries",
    description:
      "AI selects the quickest rider and route to reduce delivery time.",
  },
  {
    icon: <FaCoins size={32} />,
    title: "Lower Operational Cost",
    description:
      "Smart batching and optimized routing reduce fuel and delivery expenses.",
  },
  {
    icon: <FaMapMarkedAlt size={32} />,
    title: "Optimized Routes",
    description:
      "Continuously computes the most efficient delivery paths using real-time data.",
  },
  {
    icon: <FaRobot size={32} />,
    title: "AI Decision Engine",
    description:
      "Makes intelligent dispatch decisions based on traffic, ETA, and rider availability.",
  },
  {
    icon: <FaLeaf size={32} />,
    title: "Eco Friendly",
    description:
      "Reduced travel distance means lower fuel consumption and carbon emissions.",
  },
  {
    icon: <FaChartLine size={32} />,
    title: "Business Insights",
    description:
      "Real-time analytics help improve fleet performance and customer satisfaction.",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-800">
            Why Choose Our AI Dispatch System?
          </h2>

          <p className="text-slate-500 mt-4 max-w-3xl mx-auto">
            Our platform combines Artificial Intelligence, real-time tracking,
            and route optimization to deliver a smarter logistics experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-blue-600 mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>

              <p className="text-slate-600 mt-4 leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}