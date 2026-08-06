import { FaTruck } from "react-icons/fa";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f5f0ff 100%)",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "#fff",
          borderRadius: "24px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          minHeight: "560px",
        }}
      >
        {/* Left panel — branding */}
        <div
          style={{
            width: "44%",
            background: "linear-gradient(160deg, #2563eb 0%, #4f46e5 100%)",
            padding: "3rem 2.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#fff",
            flexShrink: 0,
          }}
          className="hidden md:flex"
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: "12px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaTruck size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>AI Unified Dispatch</div>
              <div style={{ fontSize: "0.72rem", opacity: 0.7, marginTop: "2px" }}>AI Powered Logistics</div>
            </div>
          </div>

          {/* Middle content */}
          <div>
            <div style={{ fontSize: "2.6rem", fontWeight: 800, lineHeight: 1.15 }}>
              Smart<br />Deliveries<br />Powered<br />by AI
            </div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", marginTop: "1.25rem", lineHeight: 1.7 }}>
              Orchestrate food, grocery, pharmacy and parcel deliveries from one intelligent platform.
            </p>
            <div style={{ fontSize: "4rem", marginTop: "2rem" }}>🚚</div>
          </div>

          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>
            © 2026 AI Unified Dispatch System
          </p>
        </div>

        {/* Right panel — form */}
        <div
          style={{
            flex: 1,
            padding: "3rem 2.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflowY: "auto",
          }}
        >
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>
            {title}
          </h2>
          <p style={{ color: "#64748b", marginTop: "8px", marginBottom: "2rem", fontSize: "0.9rem" }}>
            {subtitle}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}