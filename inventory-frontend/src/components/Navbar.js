import React from "react";

export default function Navbar() {
  return (
    <div style={{
      height: "60px",
      background: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      borderBottom: "1px solid #eee"
    }}>
      <input
        placeholder="Search products..."
        style={{
          padding: "8px 12px",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid #ddd"
        }}
      />

      <div style={{
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        background: "#4f46e5"
      }} />
    </div>
  );
}