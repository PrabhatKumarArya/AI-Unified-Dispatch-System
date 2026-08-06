import { FaGithub, FaLinkedin, FaEnvelope, FaTruck } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={{ width: "100%", background: "#0f172a", color: "#fff", padding: "4rem 0 0" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "3rem",
          paddingBottom: "3rem",
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
            <div style={{ background: "#2563eb", borderRadius: "10px", padding: "8px", color: "#fff", display: "flex" }}>
              <FaTruck size={18} />
            </div>
            <span style={{ fontSize: "1.1rem", fontWeight: 800 }}>Unified Dispatch</span>
          </div>
          <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.8, margin: 0 }}>
            AI-powered delivery orchestration platform that intelligently assigns riders across multiple services while minimizing delivery time and operational cost.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", color: "#f1f5f9" }}>Quick Links</h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {["#home", "#services", "#workflow", "#analytics"].map((href, i) => (
              <li key={href}>
                <a
                  href={href}
                  style={{ color: "#64748b", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) => (e.target.style.color = "#64748b")}
                >
                  {["Home", "Services", "Workflow", "Analytics"][i]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", color: "#f1f5f9" }}>Connect</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { icon: <FaEnvelope size={14} />, text: "support@dispatch.ai" },
              { icon: <FaGithub size={14} />, text: "GitHub" },
              { icon: <FaLinkedin size={14} />, text: "LinkedIn" },
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#64748b", fontSize: "0.875rem" }}>
                <span style={{ color: "#3b82f6" }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid #1e293b",
          padding: "1.25rem 1.5rem",
          textAlign: "center",
          color: "#475569",
          fontSize: "0.8rem",
        }}
      >
        © 2026 AI Unified Dispatch System. All Rights Reserved.
      </div>
    </footer>
  );
}