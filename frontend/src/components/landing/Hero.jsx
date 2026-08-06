import { useNavigate } from "react-router-dom";

const BADGE_STYLE = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  background: "#eff6ff",
  color: "#2563eb",
  border: "1px solid #bfdbfe",
  borderRadius: "9999px",
  padding: "5px 14px",
  fontSize: "0.78rem",
  fontWeight: 600,
};

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      style={{
        width: "100%",
        background: "linear-gradient(180deg, #f8faff 0%, #fff 100%)",
        padding: "6rem 0 5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div>
          <div style={BADGE_STYLE}>
            <span style={{ width: "6px", height: "6px", background: "#2563eb", borderRadius: "50%", display: "inline-block" }} />
            AI Powered Delivery Optimization
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
              fontWeight: 900,
              color: "#0f172a",
              lineHeight: 1.1,
              marginTop: "1.5rem",
              marginBottom: 0,
            }}
          >
            One Intelligent Fleet{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              For Every Delivery
            </span>
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              marginTop: "1.5rem",
              maxWidth: "480px",
            }}
          >
            Optimize Food, Grocery, Pharmacy and Parcel deliveries using Artificial Intelligence, smart routing, and real-time dispatch.
          </p>

          <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/register")}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "14px 32px",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#2563eb"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Get Started Free
            </button>
            <button
              style={{
                background: "#fff",
                color: "#374151",
                border: "1.5px solid #e2e8f0",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "#94a3b8"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
            >
              Learn More
            </button>
          </div>

          {/* Trust stats */}
          <div style={{ display: "flex", gap: "2rem", marginTop: "3rem", flexWrap: "wrap" }}>
            {[
              { value: "10K+", label: "Deliveries" },
              { value: "500+", label: "Riders" },
              { value: "96%", label: "AI Accuracy" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#2563eb" }}>{s.value}</div>
                <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Hero card */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              background: "linear-gradient(145deg, #0f172a, #1e1b4b)",
              borderRadius: "24px",
              padding: "2rem",
              width: "100%",
              maxWidth: "460px",
              boxShadow: "0 32px 72px rgba(15,23,42,0.25)",
            }}
          >
            <div style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600, marginBottom: "1rem", letterSpacing: "0.08em" }}>
              LIVE DISPATCH OVERVIEW
            </div>

            {/* Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
              {[
                { label: "Active Orders", value: "284", color: "#60a5fa" },
                { label: "Online Riders", value: "86", color: "#34d399" },
                { label: "Avg ETA", value: "17 min", color: "#fb923c" },
                { label: "AI Accuracy", value: "96%", color: "#a78bfa" },
              ].map((m) => (
                <div
                  key={m.label}
                  style={{ background: "rgba(255,255,255,0.07)", borderRadius: "14px", padding: "1rem" }}
                >
                  <div style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: "4px" }}>{m.label}</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 800, color: m.color }}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Utilization bar */}
            <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: "14px", padding: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#94a3b8", marginBottom: "8px" }}>
                <span>Rider Utilization</span>
                <span style={{ color: "#34d399", fontWeight: 700 }}>92%</span>
              </div>
              <div style={{ background: "#1e293b", borderRadius: "9999px", height: "8px" }}>
                <div style={{ background: "linear-gradient(90deg, #34d399, #10b981)", width: "92%", height: "8px", borderRadius: "9999px" }} />
              </div>
            </div>

            {/* Live orders */}
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { id: "#A0241", service: "Food 🍕", status: "Delivered", color: "#34d399" },
                { id: "#A0242", service: "Grocery 🛒", status: "On Route", color: "#fb923c" },
                { id: "#A0243", service: "Pharmacy 💊", status: "Pending", color: "#fbbf24" },
              ].map((o) => (
                <div
                  key={o.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "10px",
                    padding: "8px 14px",
                    fontSize: "0.8rem",
                  }}
                >
                  <span style={{ color: "#60a5fa", fontWeight: 700 }}>{o.id}</span>
                  <span style={{ color: "#94a3b8" }}>{o.service}</span>
                  <span style={{ color: o.color, fontWeight: 600 }}>{o.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}