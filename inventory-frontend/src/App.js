import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";

// 🔐 simple auth check
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// 🔐 Protected Route Wrapper
function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTE (LOGIN) */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED APP LAYOUT */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div
              style={{
                display: "flex",
                minHeight: "100vh",
                background: "#f5f7fb",
              }}
            >
              {/* SIDEBAR */}
              <Sidebar />

              {/* MAIN AREA */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* NAVBAR */}
                <Navbar />

                {/* PAGE CONTENT */}
                <div style={{ padding: "20px", flex: 1 }}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/analytics" element={<Analytics />} />

                    {/* fallback */}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;