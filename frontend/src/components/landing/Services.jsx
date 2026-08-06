import { FaHamburger, FaShoppingBasket, FaPills, FaBoxOpen } from "react-icons/fa";

const services = [
  {
    icon: <FaHamburger size={32} />,
    emoji: "🍕",
    title: "Food Delivery",
    description: "Fast and optimized delivery from restaurants to customers. AI assigns the nearest rider instantly.",
    color: "#f97316",
    bg: "#fff7ed",
  },
  {
    icon: <FaShoppingBasket size={32} />,
    emoji: "🛒",
    title: "Grocery",
    description: "Smart grocery dispatch with optimized rider assignment and real-time route planning.",
    color: "#22c55e",
    bg: "#f0fdf4",
  },
  {
    icon: <FaPills size={32} />,
    emoji: "💊",
    title: "Pharmacy",
    description: "Priority medicine delivery with minimal waiting time. Emergency orders handled first.",
    color: "#3b82f6",
    bg: "#eff6ff",
  },
  {
    icon: <FaBoxOpen size={32} />,
    emoji: "📦",
    title: "Parcel",
    description: "Reliable parcel transportation using AI route optimization and batch delivery grouping.",
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
];

export default function Services() {
  return (
    <section id="services" style={{ width: "100%", background: "#fff", padding: "5rem 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "inline-block",
              background: "#f0f9ff",
              color: "#0284c7",
              border: "1px solid #bae6fd",
              borderRadius: "9999px",
              padding: "4px 16px",
              fontSize: "0.78rem",
              fontWeight: 600,
              marginBottom: "1rem",
              letterSpacing: "0.06em",
            }}
          >
            OUR SERVICES
          </div>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0f172a", margin: "0 0 1rem" }}>
            One Platform. Every Delivery.
          </h2>
          <p style={{ color: "#64748b", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            One intelligent platform that efficiently manages deliveries across multiple service categories.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {services.map((service, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "20px",
                border: "1.5px solid #f1f5f9",
                padding: "2rem 1.75rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
                e.currentTarget.style.borderColor = service.color + "40";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
                e.currentTarget.style.borderColor = "#f1f5f9";
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  background: service.bg,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: service.color,
                  marginBottom: "1.25rem",
                }}
              >
                {service.icon}
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.75rem" }}>
                {service.title}
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}