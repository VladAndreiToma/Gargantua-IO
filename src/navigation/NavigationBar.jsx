import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const components = ["Home", "Simulation", "About"];

export default function NavigationBar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // adăugăm animația în DOM
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes slideIn {
        from { opacity: 0; transform: translateX(100%); }
        to { opacity: 1; transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "11vh",
        background: "linear-gradient(90deg, #0b0018 0%, #1b0033 50%, #002244 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem 3rem",
        color: "white",
        fontFamily: "'Orbitron', sans-serif",
        letterSpacing: "1px",
        zIndex: 10,
        boxShadow: "0 0 15px rgba(0,0,0,0.5)",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          fontSize: "1.4rem",
          fontWeight: "bold",
          background: "linear-gradient(90deg, #a855f7, #3b82f6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Gargantua
      </div>

      {/* MENU */}
      {isMobile ? (
        <>
          {/* Menu Icon */}
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              transition: "transform 0.3s ease",
              transform: menuOpen ? "rotate(90deg)" : "rotate(0)",
            }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Dropdown */}
          {menuOpen && (
            <div
              style={{
                position: "fixed",
                top: "11vh",
                right: 0,
                width: "100vw",
                height: "89vh",
                background: "linear-gradient(160deg, rgba(20,0,40,0.98), rgba(0,0,0,0.95))",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2.5rem",
                animation: "slideIn 0.4s ease forwards",
                overflowY: "auto",
              }}
            >
              {components.map((comp) => (
                <Link
                  key={comp}
                  to={`/${comp.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    textDecoration: "none",
                    transition: "color 0.3s ease, transform 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#a855f7";
                    e.target.style.transform = "scale(1.1)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "white";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  {comp}
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        // Desktop Links
        <div style={{ display: "flex", gap: "2rem" }}>
          {components.map((comp) => (
            <Link
              key={comp}
              to={`/${comp.toLowerCase()}`}
              style={{
                color: "white",
                fontSize: "1rem",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.color = "#a855f7")}
              onMouseOut={(e) => (e.target.style.color = "white")}
            >
              {comp}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
