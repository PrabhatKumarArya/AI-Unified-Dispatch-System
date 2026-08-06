import { useState } from "react";
import { FaTruck, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2e8f0",
        width: "100%",
      }}
    >
      <nav
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
          height: "68px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <div
            style={{
              background: "#2563eb",
              borderRadius: "10px",
              padding: "8px",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaTruck size={18} />
          </div>
          <div>
            <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1e293b", lineHeight: 1.2 }}>
              Unified Dispatch
            </div>
            <div style={{ fontSize: "0.65rem", color: "#94a3b8", lineHeight: 1 }}>AI Powered Logistics</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            color: "#475569",
            fontWeight: 500,
            fontSize: "0.925rem",
          }}
          className="hidden md:flex"
        >
          {["#home", "#services", "#workflow", "#benefits"].map((href, i) => (
            <li key={href}>
              <a
                href={href}
                style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
                onMouseLeave={(e) => (e.target.style.color = "#475569")}
              >
                {["Home", "Services", "Workflow", "Benefits"][i]}
              </a>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="hidden md:flex">
          <Link to="/login">
            <button
              style={{
                border: "1.5px solid #2563eb",
                color: "#2563eb",
                background: "transparent",
                padding: "8px 20px",
                borderRadius: "10px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.875rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#eff6ff")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Login
            </button>
          </Link>
          <Link to="/register">
            <button
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "9px 22px",
                borderRadius: "10px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.875rem",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1d4ed8")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#2563eb")}
            >
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#475569" }}
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: "#fff",
            borderTop: "1px solid #e2e8f0",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {["Home", "Services", "Workflow", "Benefits"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{ textDecoration: "none", color: "#475569", fontWeight: 500 }}
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button style={{ width: "100%", padding: "10px", border: "1.5px solid #2563eb", borderRadius: "10px", color: "#2563eb", background: "none", fontWeight: 600, cursor: "pointer" }}>
              Login
            </button>
          </Link>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <button style={{ width: "100%", padding: "10px", border: "none", borderRadius: "10px", background: "#2563eb", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
              Get Started
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}