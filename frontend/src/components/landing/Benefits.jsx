import { FaBolt, FaCoins, FaMapMarkedAlt, FaRobot, FaLeaf, FaChartLine } from "react-icons/fa";

const benefits = [
  { icon: <FaBolt size={24} />, title: "Faster Deliveries", description: "AI selects the quickest rider and route to reduce delivery time by up to 40%.", color: "#f59e0b", bg: "#fffbeb" },
  { icon: <FaCoins size={24} />, title: "Lower Operational Cost", description: "Smart batching and optimized routing reduce fuel and delivery expenses.", color: "#10b981", bg: "#f0fdf4" },
  { icon: <FaMapMarkedAlt size={24} />, title: "Optimized Routes", description: "Continuously computes the most efficient delivery paths using real-time data.", color: "#3b82f6", bg: "#eff6ff" },
  { icon: <FaRobot size={24} />, title: "AI Decision Engine", description: "Makes intelligent dispatch decisions based on traffic, ETA, and rider availability.", color: "#8b5cf6", bg: "#f5f3ff" },
  { icon: <FaLeaf size={24} />, title: "Eco Friendly", description: "Reduced travel distance means lower fuel consumption and carbon emissions.", color: "#22c55e", bg: "#f0fdf4" },
  { icon: <FaChartLine size={24} />, title: "Business Insights", description: "Real-time analytics help improve fleet performance and customer satisfaction.", color: "#ef4444", bg: "#fff1f2" },
];

export default function Benefits() {
  return (
    <section id="benefits" style={{ width: "100%", background: "#f8fafc", padding: "5rem 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "inline-block",
              background: "#f5f3ff",
              color: "#7c3aed",
              border: "1px solid #ddd6fe",
              borderRadius: "9999px",
              padding: "4px 16px",
              fontSize: "0.78rem",
              fontWeight: 600,
              marginBottom: "1rem",
              letterSpacing: "0.06em",
            }}
          >
            WHY CHOOSE US
          </div>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0f172a", margin: "0 0 1rem" }}>
            Why Choose Our AI Dispatch System?
          </h2>
          <p style={{ color: "#64748b", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Our platform combines Artificial Intelligence, real-time tracking, and route optimization to deliver a smarter logistics experience.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {benefits.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "20px",
                border: "1.5px solid #f1f5f9",
                padding: "2rem",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                transition: "all 0.3s ease",
                display: "flex",
                gap: "1.25rem",
                alignItems: "flex-start",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.09)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: item.bg,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: item.color,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.5rem" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}