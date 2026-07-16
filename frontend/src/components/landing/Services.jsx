import {
  FaHamburger,
  FaShoppingBasket,
  FaPills,
  FaBoxOpen,
} from "react-icons/fa";

const services = [
  {
    icon: <FaHamburger size={35} />,
    title: "Food Delivery",
    description:
      "Fast and optimized delivery from restaurants to customers.",
  },
  {
    icon: <FaShoppingBasket size={35} />,
    title: "Grocery",
    description:
      "Smart grocery dispatch with optimized rider assignment.",
  },
  {
    icon: <FaPills size={35} />,
    title: "Pharmacy",
    description:
      "Priority medicine delivery with minimal waiting time.",
  },
  {
    icon: <FaBoxOpen size={35} />,
    title: "Parcel",
    description:
      "Reliable parcel transportation using AI route optimization.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-slate-800">
          Our Delivery Services
        </h2>

        <p className="text-center text-slate-500 mt-4 max-w-2xl mx-auto">
          One intelligent platform that efficiently manages deliveries across
          multiple service categories.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-8 shadow hover:shadow-xl transition duration-300 hover:-translate-y-2"
            >
              <div className="text-blue-600 mb-5">{service.icon}</div>

              <h3 className="text-xl font-semibold mb-3">
                {service.title}
              </h3>

              <p className="text-slate-600 text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}