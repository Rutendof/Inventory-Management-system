import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  const isAuthenticated = token && token !== "null" && token !== "undefined";

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}