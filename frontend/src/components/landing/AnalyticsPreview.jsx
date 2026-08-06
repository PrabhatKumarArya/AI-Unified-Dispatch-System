import { FaTruckMoving, FaMotorcycle, FaClock, FaRoad } from "react-icons/fa";

const stats = [
  { icon: <FaTruckMoving size={24} />, value: "1,284", label: "Orders Today", color: "#3b82f6", bg: "#eff6ff" },
  { icon: <FaMotorcycle size={24} />, value: "326", label: "Active Riders", color: "#10b981", bg: "#f0fdf4" },
  { icon: <FaClock size={24} />, value: "17 min", label: "Average ETA", color: "#f59e0b", bg: "#fffbeb" },
  { icon: <FaRoad size={24} />, value: "248 km", label: "Distance Saved", color: "#8b5cf6", bg: "#f5f3ff" },
];

export default function AnalyticsPreview() {
  return (
    <section id="analytics" style={{ width: "100%", background: "#f8fafc", padding: "5rem 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0f172a", margin: "0 0 1rem" }}>
            Live Dispatch Analytics
          </h2>
          <p style={{ color: "#64748b", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Monitor deliveries, rider performance, and AI optimization in real time.
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "20px",
                border: "1.5px solid #f1f5f9",
                padding: "1.75rem",
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.05)"; }}
            >
              <div style={{ width: "52px", height: "52px", background: s.bg, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: s.color, flexShrink: 0 }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "4px" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Panel */}
        <div
          style={{
            background: "linear-gradient(145deg, #0f172a, #1a1040)",
            borderRadius: "28px",
            padding: "2.5rem",
            boxShadow: "0 32px 72px rgba(15,23,42,0.2)",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <h3 style={{ color: "#fff", fontSize: "1.4rem", fontWeight: 800, margin: 0 }}>AI Dispatch Dashboard</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: "9999px", padding: "6px 14px" }}>
              <span style={{ width: "8px", height: "8px", background: "#34d399", borderRadius: "50%", display: "inline-block", animation: "pulse-ring 1.5s infinite" }} />
              <span style={{ color: "#34d399", fontSize: "0.78rem", fontWeight: 600 }}>Live</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {/* Left - Bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "Rider Utilization", pct: 92, color: "#34d399" },
                { label: "AI Dispatch Accuracy", pct: 96, color: "#60a5fa" },
                { label: "On-Time Rate", pct: 89, color: "#fb923c" },
              ].map((b) => (
                <div key={b.label} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "16px", padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "10px" }}>
                    <span style={{ color: "#94a3b8" }}>{b.label}</span>
                    <span style={{ color: b.color, fontWeight: 700 }}>{b.pct}%</span>
                  </div>
                  <div style={{ background: "#1e293b", borderRadius: "9999px", height: "8px" }}>
                    <div style={{ background: b.color, width: `${b.pct}%`, height: "8px", borderRadius: "9999px", opacity: 0.85 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Right - Map placeholder */}
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "220px",
                padding: "2rem",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🗺️</div>
              <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.5rem", textAlign: "center" }}>
                Live Dispatch Map
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.8rem", textAlign: "center", margin: 0 }}>
                Real-time rider tracking and route visualization
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}