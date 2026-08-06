import { FaClipboardList, FaBrain, FaRoute, FaMotorcycle, FaCheckCircle, FaArrowRight } from "react-icons/fa";

const workflowSteps = [
  { title: "Collect Orders", icon: <FaClipboardList size={28} />, description: "Orders received from Food, Grocery, Pharmacy, and Parcel services." },
  { title: "AI Analysis", icon: <FaBrain size={28} />, description: "AI evaluates rider availability, traffic, deadlines, and nearby deliveries." },
  { title: "Route Optimization", icon: <FaRoute size={28} />, description: "The system computes the fastest and most cost-efficient delivery route." },
  { title: "Dispatch Rider", icon: <FaMotorcycle size={28} />, description: "The best rider receives the optimized pickup and delivery sequence." },
  { title: "Delivered ✓", icon: <FaCheckCircle size={28} />, description: "Orders delivered successfully. Analytics updated in real time." },
];

export default function Workflow() {
  return (
    <section id="workflow" style={{ width: "100%", background: "#fff", padding: "5rem 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "inline-block",
              background: "#eff6ff",
              color: "#2563eb",
              border: "1px solid #bfdbfe",
              borderRadius: "9999px",
              padding: "4px 16px",
              fontSize: "0.78rem",
              fontWeight: 600,
              marginBottom: "1rem",
              letterSpacing: "0.06em",
            }}
          >
            HOW IT WORKS
          </div>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0f172a", margin: "0 0 1rem" }}>
            AI Dispatch Workflow
          </h2>
          <p style={{ color: "#64748b", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Every order passes through an intelligent pipeline that minimizes delivery time, travel distance, and operational cost.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            position: "relative",
          }}
        >
          {workflowSteps.map((step, i) => (
            <div key={i} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
              {/* Arrow between cards (not last) */}
              {i < workflowSteps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: "2.25rem",
                    right: "-1rem",
                    zIndex: 5,
                    color: "#bfdbfe",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaArrowRight size={16} />
                </div>
              )}

              <div
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  border: "1.5px solid #f1f5f9",
                  padding: "2rem 1.5rem",
                  textAlign: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                  transition: "all 0.3s",
                  width: "100%",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = "#bfdbfe"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.05)"; e.currentTarget.style.borderColor = "#f1f5f9"; }}
              >
                {/* Step number */}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "#2563eb",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    margin: "0 auto 1.25rem",
                  }}
                >
                  {i + 1}
                </div>

                {/* Icon */}
                <div style={{ color: "#2563eb", marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                  {step.icon}
                </div>

                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.75rem" }}>
                  {step.title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.8rem", lineHeight: 1.7, margin: 0 }}>
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