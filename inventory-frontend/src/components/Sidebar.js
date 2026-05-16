import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Box, BarChart3, LogIn, LogOut } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 15px",
    borderRadius: "10px",
    textDecoration: "none",
    color: isActive ? "white" : "#cbd5e1",
    background: isActive ? "#4f46e5" : "transparent",
    marginBottom: "10px"
  });

  return (
    <div
      style={{
        width: "220px",
        background: "#0f172a",
        color: "white",
        padding: "20px",
        minHeight: "100vh"
      }}
    >
      <h2 style={{ marginBottom: "30px" }}> Inventory</h2>

      <NavLink to="/" style={linkStyle}>
        <LayoutDashboard size={18} />
        Dashboard
      </NavLink>

      <NavLink to="/products" style={linkStyle}>
        <Box size={18} />
        Products
      </NavLink>

      <NavLink to="/analytics" style={linkStyle}>
        <BarChart3 size={18} />
        Analytics
      </NavLink>

      {/* LOGIN / LOGOUT BUTTON */}
      {!token ? (
        <NavLink to="/login" style={linkStyle}>
          <LogIn size={18} />
          Login
        </NavLink>
      ) : (
        <div
          onClick={handleLogout}
          style={{
            ...linkStyle({ isActive: false }),
            cursor: "pointer",
            marginTop: "20px",
            background: "#ef4444",
            color: "white"
          }}
        >
          <LogOut size={18} />
          Logout
        </div>
      )}
    </div>
  );
}